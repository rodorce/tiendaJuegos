function borrarTarjeta() {
const itemsCard = document.querySelectorAll('.deleteCart');
console.log(itemsCard)
itemsCard.forEach(item => {
  item.addEventListener('click',(e)=>{
      let card = item.parentElement;
      console.log(card)
  card.remove();
}
)})
}

function borrarItem() {
    borrarTarjeta();
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 500);
  }
