

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      //Usuario con sesion iniciada
      let cartIcon = document.querySelector('#cartIcon')
      let userIcon = document.querySelector('#userIcon')
      let btnCheckout = document.querySelector('.btnCheckout')
      let btnPay = document.querySelector('.btnPay')
      cartIcon.href = '../cart.html'
      btnPay.href = '../inventory.html'
      userIcon.href="../inventory.html"
      btnCheckout.href = '../checkout.html'
      addToCart(user);
      showCart(user.uid);
      checkOut(user.uid)
      giveKeys(user.uid)
    
      userIcon.innerText = "Cerrar sesion"
      userIcon.style.color = "white"
      userIcon.addEventListener('click' , () => {
        firebase.auth().signOut().then(function() {
          window.location = '../index.html'
          userIcon.href = "../login.html"
          userIcon.innerHTML = '<img src="./assets/icons/account.svg" style="padding-right: 2em;"/>'
        }).catch(function(error) {
          // An error happened.
        });
      })
      // userIcon.style.textDecoration = "none"
      // let btnCheckout = document.querySelector('.btnCheckout')
      // btnCheckout.href = '../checkout.html'
    } else {
      cartIcon.href = "../login.html"
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
      firebase.database().ref('users/' + user.uid).push({
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
    var ref = firebase.database().ref("users").child(user);
    ref.orderByKey().on("child_added", function(snapshot) {
      let value = snapshot.val()
          let horizontalCard = `<div class="horizontalCard">
          <div class="imageContainer">
          <img src="${value.gameImg}" alt="imgProd" class="imgProd">
          </div>
        <h3 class="title titleCart">
          ${value.gameName}
        </h3>
        <img src="./assets/icons/delete.svg" alt="" class="remove">
        <h4 style="font-weight: bold; margin-top: 10px; margin-bottom: 10px">$${value.gamePrice}</h4>
        <h4 style="font-weight: bold; margin-top: 10px; margin-bottom: 10px">${value.gamePlatform}</h4>
        <h6 class="descProd">
        ${value.gameDesc}
        </h6>
      </div>`
      allCartItems.innerHTML = allCartItems.innerHTML + horizontalCard
      }
      )
      setTimeout(function(){
        let card = document.querySelectorAll('.horizontalCard')
        let lastCard = card[card.length - 1]
        lastCard.parentNode.removeChild(lastCard)
      }, 300);
  }

  function checkOut(user) {
    var ref = firebase.database().ref("users").child(user);
    let total = 0
    let checkOutItemsGames = document.querySelector('.juego')
    let checkOutItemsPrice = document.querySelector('.precio')
    let totalText = document.querySelector('.totalPrice')
    ref.orderByKey().on("child_added", function(snapshot) {
      let value = snapshot.val()
      checkOutItemsGames.innerHTML +=`<p class="gameName">${value.gameName}</p>`
      checkOutItemsPrice.innerHTML += `<p class="gamePrice">$${value.gamePrice}</p>`
      total = total + parseInt(value.gamePrice)
      setTimeout(function(){
        firebase.database().ref('users/' + user).update({
          totalPrice : total
        });
      }, 500);
      var userId = firebase.auth().currentUser.uid;
      return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
      // var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
     totalText.innerHTML = `$${snapshot.val().totalPrice}`
});
    })
    
    setTimeout(function(){
      let lgameName = document.querySelectorAll('.gameName')
      let lgamePrice = document.querySelectorAll('.gamePrice')
      let lastGameName = lgameName[lgameName.length - 1]
      let lastGamePrice = lgamePrice[lgamePrice.length - 1]
      lastGameName.parentNode.removeChild(lastGameName)
      lastGamePrice.parentNode.removeChild(lastGamePrice)
    },300)
  }

  function makeId() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }

  function giveKeys(user) {
    var ref = firebase.database().ref("users").child(user);
    let nombreJuego = document.querySelector('.nombreJuego')
    let claveJuego = document.querySelector('.claveJuego')
    ref.orderByKey().on("child_added", function(snapshot) {
      let value = snapshot.val()
      console.log(value.gameName)
      nombreJuego.innerHTML += `<p class="gameCopy">${value.gameName}</p>`
      claveJuego.innerHTML += `<p class="gameKey">${makeId()}-${makeId()}-${makeId()}-${makeId()}</p>`
    })
  }

