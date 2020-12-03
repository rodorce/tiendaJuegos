

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      //Usuario con sesion iniciada
      showCart(user.uid)
      addToCart(user)
      deleteQuery(user.uid)
      checkOut(user.uid)
      let closeSession = document.querySelector('.closeSession')
      let cartIcon = document.querySelector('#cartIcon')
      let userIcon = document.querySelector('#userIcon')
      let btnInventory = document.querySelector('.btnPay')
      closeSession.style.display = "block"
      cartIcon.href = '../cart.html'
      userIcon.href="../inventory.html"
      
      
      // userIcon.innerText = "Cerrar sesion"
      userIcon.style.color = "white"
      closeSession.addEventListener('click' , () => {
        firebase.auth().signOut().then(function() {
          window.location = '../index.html'
          closeSession.style.display = "none"
          userIcon.href = "../login.html"
          userIcon.innerHTML = '<img src="./assets/icons/account.svg" style="padding-right: 2em;"/>'
        }).catch(function(error) {
          // An error happened.
        });
      })
      btnInventory.href = '../inventory.html'
      userIcon.style.textDecoration = "none"
    } else {
      cartIcon.href = "../login.html"
      userIcon.href = "../login.html"
      console.log("User not logged in")
    }
  });

  function addToCart(user) {
    const carritoItems = document.querySelectorAll('.btnCarrito')
    carritoItems.forEach(carritoItem => {
    carritoItem.addEventListener('click',(e)=>{
      let title = carritoItem.parentElement.parentElement.children[0].children[0].children[0].textContent
      let platform = carritoItem.parentElement.parentElement.children[0].children[0].children[1].children[0].children[0].children[0].textContent
      console.log(carritoItem.parentElement.parentElement.children[0].children[0].children[1].children[0].children[1].children[0].children[0].nextElementSibling.textContent)
      let price = carritoItem.parentElement.parentElement.children[0].children[0].children[1].children[0].children[1].children[0].children[0].nextElementSibling.textContent
      let desc = carritoItem.previousElementSibling.previousElementSibling.previousElementSibling.textContent
      let img = carritoItem.parentElement.parentElement.parentElement.children[0].children[0].children[0].src
      // console.log(title)
      // console.log(platform)
      // console.log(price)
      // console.log(desc)
      firebase.database().ref('users/' + user.uid + '/cart').push({
          gameImg : img,
          gameName : title,
          gameDesc : desc,
          gamePlatform : platform,
          gamePrice : price,
          quantity : 1
      });
    }
    )
  })
  }

  function showCart(user) {
    let allCartItems = document.querySelector('.allCartItems')
    var ref = firebase.database().ref("users").child(user).child('cart');
    ref.orderByKey().on("child_added", function(snapshot) {
      let value = snapshot.val()
          let horizontalCard = `<div class="horizontalCard">
          <div class="imageContainer">
          <img src="${value.gameImg}" alt="imgProd" class="imgProd">
          </div>
        <h3 class="title titleCart">${value.gameName}</h3>
        <img class="deleteCart" src="./assets/icons/delete.svg" alt="" class="remove" onclick="borrarItem();">
        <h4 style="font-weight: bold; margin-top: 10px; margin-bottom: 10px">$${value.gamePrice}</h4>
        <h4 style="font-weight: bold; margin-top: 10px; margin-bottom: 10px">${value.gamePlatform}</h4>
        <h6 class="descProd">
        ${value.gameDesc}
        </h6>
      </div>`
      allCartItems.innerHTML = allCartItems.innerHTML + horizontalCard
      
      }
      )
  }

  function checkOut(user) {
    
    var ref = firebase.database().ref("users").child(user).child('cart');
    let total = 0
    let checkOutItemsGames = document.querySelector('.juego')
    let checkOutItemsPrice = document.querySelector('.precio')
    let totalText = document.querySelector('.totalPrice')
    ref.orderByKey().on("child_added", function(snapshot) {
      let value = snapshot.val()
      checkOutItemsGames.innerHTML +=`<p class="gameName">${value.gameName}</p>`
      checkOutItemsPrice.innerHTML += `<p class="gamePrice">$${value.gamePrice}</p>`
      total = total + parseInt(value.gamePrice)
      firebase.database().ref('users/' + user).update({
        totalPrice : total
      });
      
      
      
    });
          return firebase.database().ref('/users/' + user).once('value').then(function(snapshot) {
         totalText.innerHTML = `$${snapshot.val().totalPrice}`
    })
  }

  function createKeys(user) {
    let ref = firebase.database().ref("users").child(user).child('cart');
    ref.orderByKey().on("child_added", function(snapshot) {
      let value = snapshot.val()
      let key = `${makeId()}-${makeId()}-${makeId()}-${makeId()}`
      firebase.database().ref('users/' + user + '/ownedGames').push({
        ownedTitle : value.gameName,
        key : key
      });
    })
  }


  function deleteQuery(user){
    setTimeout(() => {

      let items = document.querySelectorAll('.deleteCart')
      items.forEach(item => {
        item.addEventListener('click', (e)=> {
          let title = item.previousElementSibling.textContent
          // console.log(item)
          console.log(title)
          var ref = firebase.database().ref('users').child(user).child('/cart');
          var query = ref.orderByChild('gameName').equalTo(title);
          query.on('child_added', function(snapshot) {
            snapshot.ref.remove();
            })
  
        })
      })
    }, 400)
  }
  