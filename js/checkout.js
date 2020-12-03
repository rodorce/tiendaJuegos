firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      //Usuario con sesion iniciada
      giveKeys(user.uid)
      emptyCart(user.uid)
      let closeSession = document.querySelector('.closeSession')
      let cartIcon = document.querySelector('#cartIcon')
      let userIcon = document.querySelector('#userIcon')
      let btnInventory = document.querySelector('.btnPay')
      closeSession.style.display = "block"
      cartIcon.href = '../cart.html'
      userIcon.href="../inventory.html"
      btnInventory.href = '../inventory.html'
      
      
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
      userIcon.style.textDecoration = "none"
    } else {
      cartIcon.href = "../login.html"
      userIcon.href = "../login.html"
      console.log("User not logged in")
    }
  });
  
  function makeId() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }

  function giveKeys(user) {
    createKeys(user)
    emptyCart(user)
    var ref = firebase.database().ref("users").child(user).child("ownedGames");
    let nombreJuego = document.querySelector('.nombreJuego')
    let claveJuego = document.querySelector('.claveJuego')
    ref.orderByKey().on("child_added", function(snapshot) {
      let value = snapshot.val()
      console.log(`Titulo : ${value.ownedTitle}`)
      nombreJuego.innerHTML += `<p class="gameCopy">${value.ownedTitle}</p>`
      claveJuego.innerHTML += `<p class="gameKey">${value.key}</p>`
    })
  }

  function emptyCart(user) {
    var ref = firebase.database().ref("users").child(user).child("cart");
    ref.orderByKey().on('child_added', function(snapshot) {
        snapshot.ref.remove();
        })
  }