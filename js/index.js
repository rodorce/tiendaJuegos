const gamesUrl = 'https://tiendajuegos-92ebb.firebaseio.com/games.json'

  function fetchData() {
  let productsColumn = document.querySelector('.productsColumns')
  let featuredColumns = document.querySelector('.featuredColumn')
  fetch(gamesUrl)
  .then((response) => {
    return response.json()
  })
  .then((data) => {
    
    for(i in data) {
      let name = data[i].name;
      let platform = data[i].platform;
      let price = data[i].price;
      let category = data[i].category;
      let desc = data[i].desc;
      let imgUrl = data[i].imgUrl;
      let newCard = `
      <div class="column is-one-quarter-desktop">
      <div class="card">
      <div class="card-image">
        <figure class="image is-4by3">
          <img src="${imgUrl}" alt="Placeholder image">
        </figure>
      </div>
      <div class="card-content">
        <div class="media">
          
          <div class="media-content">
            <p class="title is-4 is-size-4-mobile">${name}</p>
            <div class="row">
              <div class="columns">
                <div class="column">
                  <p class="subtitle is-6;" style="font-weight:bold">${platform}</p>
                </div>
                <div class="column">
                  <p class="subtitle is-6 has-text-right" style="padding-right:2em; font-weight: bold;">
                  <span>$</span>
                  <span>${price}</span>
                  </p>
                  </div>
              </div>
            </div>
          </div>
        </div>
    
        <div class="content">
          <p>${desc}</p>
          <br>
          <br>
          <a class="button btnCarrito is-black is-outlined" onclick="agregarJuego()"><img src="./assets/icons/shopping_cart.svg" style="width: 20px; height: 20px;margin-left:8px;margin-right:5px;" alt="" class="src">Agregar al carrito</a>
        </div>
      </div>
    </div>
    </div>`
    productsColumn.innerHTML = productsColumn.innerHTML + newCard;
    
    if(data[i].featured) {
      let featuredItem = `<div class="column is-one-quarter-desktop">
      <div class="card">
      <div class="card-image">
        <figure class="image is-4by3">
          <img src="${imgUrl}" alt="Placeholder image">
        </figure>
      </div>
      <div class="card-content">
        <div class="media">
          
          <div class="media-content">
            <p class="title is-4 is-size-4-mobile">${name}</p>
            <div class="row">
              <div class="columns">
                <div class="column">
                  <p class="subtitle is-6;" style="font-weight:bold">${platform}</p>
                </div>
                <div class="column">
                  <p class="subtitle is-6 has-text-right" style="padding-right:2em; font-weight: bold;">
                  <span>$</span>
                  <span>${price}</span>
                  </p>
                  </div>
              </div>
            </div>
          </div>
        </div>
    
        <div class="content">
          <p>${desc}</p>
          <br>
          <br>
          <a class="button btnCarrito is-black is-outlined" onclick="agregarJuego()"><img src="./assets/icons/shopping_cart.svg" style="width: 20px; height: 20px;margin-left:8px;margin-right:5px;" alt="" class="src">Agregar al carrito</a>
        </div>
      </div>
    </div>
    </div>`
    featuredColumns.innerHTML = featuredColumns.innerHTML + featuredItem;
    }
     
    }
    // console.log(data)
  })
  .catch((err) => {
    // Do something for an error here
  })
}

function fetchCategories() {
  let productsColumn = document.querySelector('.productsColumns')
  fetch(gamesUrl)
  .then ((response) => {
    return response.json()
  })
  .then((data) => {
    const items = document.querySelectorAll('.categories-item');
    items.forEach(item => {
	  item.addEventListener('click',(e)=>{
      productsColumn.innerHTML =""
		for(i in data) {
      if (item.textContent == data[i].category) {
        let name = data[i].name;
        let platform = data[i].platform;
        let price = data[i].price;
        let desc = data[i].desc;
        let imgUrl = data[i].imgUrl;
        let newCard = `
        <div class="column is-one-quarter-desktop">
        <div class="card">
        <div class="card-image">
          <figure class="image is-4by3">
            <img src="${imgUrl}" alt="Placeholder image">
          </figure>
        </div>
        <div class="card-content">
          <div class="media">
            
            <div class="media-content">
              <p class="title is-4">${name}</p>
              <div class="row">
                <div class="columns">
                  <div class="column">
                    <p class="subtitle is-6;" style="font-weight:bold">${platform}</p>
                  </div>
                  <div class="column">
                    <p class="subtitle is-6 has-text-right" style="padding-right:2em; font-weight: bold;">
                    <span>$</span>
                    <span>${price}</span>
                    </p>
                    </div>
                </div>
              </div>
            </div>
          </div>
      
          <div class="content">
            <p>${desc}</p>
            <br>
            <br>
            <a class="button btnCarrito is-black is-outlined" onclick="agregarJuego()"><img src="./assets/icons/shopping_cart.svg" style="width: 20px; height: 20px;margin-left:8px;margin-right:5px;" alt="" class="src">Agregar al carrito</a>
          </div>
        </div>
      </div>
      </div>`
        productsColumn.innerHTML = productsColumn.innerHTML + newCard;
        let card = document.querySelectorAll('.card')
      } else if (item.textContent == 'Todos') {
        productsColumn.innerHTML = ""
        for(i in data) {
          let name = data[i].name;
        let platform = data[i].platform;
        let price = data[i].price;
        let desc = data[i].desc;
        let imgUrl = data[i].imgUrl;
        let newCard = `
        <div class="column is-one-quarter-desktop">
        <div class="card">
        <div class="card-image">
          <figure class="image is-4by3">
            <img src="${imgUrl}" alt="Placeholder image">
          </figure>
        </div>
        <div class="card-content">
          <div class="media">
            
            <div class="media-content">
              <p class="title is-4">${name}</p>
              <div class="row">
                <div class="columns">
                  <div class="column">
                    <p class="subtitle is-6;" style="font-weight:bold">${platform}</p>
                  </div>
                  <div class="column">
                    <p class="subtitle is-6 has-text-right" style="padding-right:2em; font-weight: bold;">
                    <span>$</span>
                    <span>${price}</span>
                    </p>
                    </div>
                </div>
              </div>
            </div>
          </div>
      
          <div class="content">
            <p>${desc}</p>
            <br>
            <br>
            <a class="button btnCarrito is-black is-outlined" onclick="agregarJuego()"><img src="./assets/icons/shopping_cart.svg" style="width: 20px; height: 20px;margin-left:8px;margin-right:5px;" alt="" class="src">Agregar al carrito</a>
          </div>
        </div>
      </div>
      </div>`
        productsColumn.innerHTML = productsColumn.innerHTML + newCard;
        }
      }
    }
	}
	)
})
  })
  .catch((err) => {

  })
  
}

function fetchPlatform() {
  let productsColumn = document.querySelector('.productsColumns')
  fetch(gamesUrl)
  .then ((response) => {
    return response.json()
  })
  .then((data) => {
    const items = document.querySelectorAll('.platform-item');
    items.forEach(item => {
	  item.addEventListener('click',(e)=>{
      productsColumn.innerHTML =""
		for(i in data) {
      if (item.textContent == data[i].platform) {
        let name = data[i].name;
        let platform = data[i].platform;
        let price = data[i].price;
        let desc = data[i].desc;
        let imgUrl = data[i].imgUrl;
        let newCard = `
        <div class="column is-one-quarter-desktop">
        <div class="card">
        <div class="card-image">
          <figure class="image is-4by3">
            <img src="${imgUrl}" alt="Placeholder image">
          </figure>
        </div>
        <div class="card-content">
          <div class="media">
            
            <div class="media-content">
              <p class="title is-4">${name}</p>
              <div class="row">
                <div class="columns">
                  <div class="column">
                    <p class="subtitle is-6;" style="font-weight:bold">${platform}</p>
                  </div>
                  <div class="column">
                    <p class="subtitle is-6 has-text-right" style="padding-right:2em; font-weight: bold;">
                    <span>$</span>
                    <span>${price}</span>
                    </p>
                    </div>
                </div>
              </div>
            </div>
          </div>
      
          <div class="content">
            <p>${desc}</p>
            <br>
            <br>
            <a class="button btnCarrito is-black is-outlined" onclick="agregarJuego()"><img src="./assets/icons/shopping_cart.svg" style="width: 20px; height: 20px;margin-left:8px;margin-right:5px;" alt="" class="src">Agregar al carrito</a>
          </div>
        </div>
      </div>
      </div>`
        productsColumn.innerHTML = productsColumn.innerHTML + newCard;
      } else if (item.textContent == 'Todos') {
        productsColumn.innerHTML = ""
        for(i in data) {
          let name = data[i].name;
        let platform = data[i].platform;
        let price = data[i].price;
        let desc = data[i].desc;
        let imgUrl = data[i].imgUrl;
        let newCard = `
        <div class="column is-one-quarter-desktop">
        <div class="card">
        <div class="card-image">
          <figure class="image is-4by3">
            <img src="${imgUrl}" alt="Placeholder image">
          </figure>
        </div>
        <div class="card-content">
          <div class="media">
            
            <div class="media-content">
              <p class="title is-4">${name}</p>
              <div class="row">
                <div class="columns">
                  <div class="column is-mobile">
                    <p class="subtitle is-6;" style="font-weight:bold">${platform}</p>
                  </div>
                  <div class="column">
                    <p class="subtitle is-6 has-text-right is-size-3-mobile" style="padding-right:2em; font-weight: bold;">
                    <span>$</span>
                    <span>${price}</span>
                    </p>
                    </div>
                </div>
              </div>
            </div>
          </div>
      
          <div class="content">
            <p>${desc}</p>
            <br>
            <br>
            <a class="button btnCarrito is-black is-outlined" onclick="agregarJuego()"><img src="./assets/icons/shopping_cart.svg" style="width: 20px; height: 20px;margin-left:8px;margin-right:5px;" alt="" class="src">Agregar al carrito</a>
          </div>
        </div>
      </div>
      </div>`
        productsColumn.innerHTML = productsColumn.innerHTML + newCard;
        }
      }
    }
	}
	)
})
  })
  .catch((err) => {

  })
}

function agregarJuego() {
  var x = document.getElementById("snackbar");
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}

function mostrarJuegosNav(){
  let juegos = document.querySelectorAll('.navbar-item')
  let plataforma = document.querySelectorAll(".platform-item")
  let todosJuegos = document.querySelector('#todosJuegos')
  juegos[1].addEventListener('click', () => {
    plataforma[1].click();
    todosJuegos.scrollIntoView()
  })

  juegos[2].addEventListener('click', () => {
    plataforma[2].click();
    todosJuegos.scrollIntoView()
  })
  juegos[3].addEventListener('click', () => {
    plataforma[3].click();
    todosJuegos.scrollIntoView()
  })
  juegos[4].addEventListener('click', () => {
    plataforma[4].click();
    todosJuegos.scrollIntoView()
  })
}