let registrarUsuario = document.querySelector("#registrarUsuario")
var database = firebase.database(); 
registrarUsuario.addEventListener("click", () => {
    let email = document.querySelector('#email').value
    let password = document.querySelector("#password").value
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
         if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
    })
}
);