let iniciarSesion = document.querySelector("#iniciarSesion")
var database = firebase.database(); 

iniciarSesion.addEventListener('click', () => {
    let email = document.querySelector('#email').value 
    let password = document.querySelector('#password').value
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        if (errorCode == 'auth/weak-password') {
            alert('The password is too weak.');
          } else {
            alert(errorMessage);
          }
          console.log(error);
      });
})

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      console.log("User successfully logged in")
      window.location = '../index.html'
    } else {
      // No user is signed in.
      console.log("User not signed in")
    }
  });
  