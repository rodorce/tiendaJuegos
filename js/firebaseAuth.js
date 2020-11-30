firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      //Usuario con sesion iniciada
      addToCart(user);
      prueba(user.uid);
      let cart = document.querySelector('#cartIcon')
      let userIcon = document.querySelector('#userIcon')
      cartIcon.href = '../cart.html'
      userIcon.innerText = "Cerrar sesion"
      userIcon.href=""
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
      let price = carritoItem.parentElement.parentElement.children[0].children[0].children[1].children[0].children[1].children[0].textContent
      let desc = carritoItem.previousElementSibling.previousElementSibling.previousElementSibling.textContent
      let img = carritoItem.parentElement.parentElement.parentElement.children[0].children[0].children[0].src
      console.log(carritoItem.parentElement.parentElement.parentElement.children[0].children[0].children[0].src)
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

  function prueba(user) {
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
        <h4 style="font-weight: bold; margin-top: 10px; margin-bottom: 10px">${value.gamePrice}</h4>
        <h4 style="font-weight: bold; margin-top: 10px; margin-bottom: 10px">${value.gamePlatform}</h4>
        <h6 class="descProd">
        ${value.gameDesc}
        </h6>
        <p class="cantidad">
        Cantidad
        </p>
        <input type="number" name="cantidad" id="cantidad">
      </div>`
      allCartItems.innerHTML = allCartItems.innerHTML + horizontalCard
      })
  }