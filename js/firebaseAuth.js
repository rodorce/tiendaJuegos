firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      let cart = document.querySelector('#cartIcon')
      let user = document.querySelector('#userIcon')
      cartIcon.href = '../cart.html'
      userIcon.innerText = "Cerrar sesion"
      userIcon.href=""
      userIcon.style.color = "white"
      userIcon.addEventListener('click' , () => {
        firebase.auth().signOut().then(function() {
          cartIcon.href = "#"
          userIcon.href = "../login.html"
          userIcon.innerHTML = '<img src="./assets/icons/account.svg" style="padding-right: 2em;"/>'
        }).catch(function(error) {
          // An error happened.
        });
      })
      // userIcon.style.textDecoration = "none"
      console.log(user.email)
    } else {
      console.log("User not logged in")
    }
  });