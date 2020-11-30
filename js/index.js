const gamesUrl = 'https://tiendajuegos-92ebb.firebaseio.com/games.json'

document.addEventListener('DOMContentLoaded', () => {

    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  
    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {
  
      // Add a click event on each of them
      $navbarBurgers.forEach( el => {
        el.addEventListener('click', () => {
  
          // Get the target from the "data-target" attribute
          const target = el.dataset.target;
          const $target = document.getElementById(target);
  
          // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
          el.classList.toggle('is-active');
          $target.classList.toggle('is-active');
  
        });
      });
    }
  
  });

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
      <div class="column is-one-fourth">
      <div class="card">
      <div class="card-image">
        <figure class="image is-4by3">
          <img src="${imgUrl}" alt="Placeholder image">
        </figure>
      </div>
      <div class="card-content">
        <div class="media">
          <div class="media-left">
          </div>
          <div class="media-content">
            <p class="title is-4">${name}</p>
            <div class="row">
              <div class="columns">
                <div class="column">
                  <p class="subtitle is-6;" style="font-weight:bold">${platform}</p>
                </div>
                <div class="column">
                  <p class="subtitle is-6 has-text-right" style="padding-right:2em; font-weight: bold;">$${price}</p>
                  </div>
              </div>
            </div>
          </div>
        </div>
    
        <div class="content">
          <p>${desc}</p>
          <br>
          <br>
          <a class="button is-black is-outlined"><img src="./assets/icons/shopping_cart.svg" style="width: 20px; height: 20px;margin-left:8px;margin-right:5px;" alt="" class="src">Agregar al carrito</a>
        </div>
      </div>
    </div>
    </div>`
    productsColumn.innerHTML = productsColumn.innerHTML + newCard;
    
    if(data[i].featured) {
      let featuredItem = `<div class="column">
      <div class="card">
        <div class="card-image">
          <figure class="image is-4by3">
            <img src="${imgUrl}" alt="Placeholder image">
          </figure>
        </div>
        <div class="card-content">
          <div class="media">
            <div class="media-left">
            </div>
            <div class="media-content">
              <p class="title is-4">${name}</p>
              <div class="row">
                <div class="columns">
                  <div class="column">
                    <p class="subtitle is-6;" style="font-weight:bold">${platform}</p>
                  </div>
                  <div class="column">
                    <p class="subtitle is-6 has-text-right" style="padding-right:2em; font-weight: bold;">$${price}</p>
                    </div>
                </div>
              </div>
            </div>
          </div>
      
          <div class="content">
            ${desc}
            <br>
            <br>
            <a class="button is-black is-outlined"><img src="https://img.icons8.com/cotton/64/000000/shopping-cart--v1.png" style="width: 20px; height: 20px;margin-left:8px;margin-right:5px;" alt="" class="src">Agregar al carrito</a>
          </div>
        </div>
      </div>
    </div>`
    featuredColumns.innerHTML = featuredColumns.innerHTML + featuredItem;
    }
      console.log(data[i].name)
    }
    console.log(data)
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
      <div class="column is-one-fourth">
      <div class="card">
      <div class="card-image">
        <figure class="image is-4by3">
          <img src="${imgUrl}" alt="Placeholder image">
        </figure>
      </div>
      <div class="card-content">
        <div class="media">
          <div class="media-left">
          </div>
          <div class="media-content">
            <p class="title is-4">${name}</p>
            <div class="row">
              <div class="columns">
                <div class="column">
                  <p class="subtitle is-6;" style="font-weight:bold">${platform}</p>
                </div>
                <div class="column">
                  <p class="subtitle is-6 has-text-right" style="padding-right:2em; font-weight: bold;">$${price}</p>
                  </div>
              </div>
            </div>
          </div>
        </div>
    
        <div class="content">
          <p>${desc}</p>
          <br>
          <br>
          <a class="button is-black is-outlined"><img src="./assets/icons/shopping_cart.svg" style="width: 20px; height: 20px;margin-left:8px;margin-right:5px;" alt="" class="src">Agregar al carrito</a>
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
      <div class="column is-one-fourth">
      <div class="card">
      <div class="card-image">
        <figure class="image is-4by3">
          <img src="${imgUrl}" alt="Placeholder image">
        </figure>
      </div>
      <div class="card-content">
        <div class="media">
          <div class="media-left">
          </div>
          <div class="media-content">
            <p class="title is-4">${name}</p>
            <div class="row">
              <div class="columns">
                <div class="column">
                  <p class="subtitle is-6;" style="font-weight:bold">${platform}</p>
                </div>
                <div class="column">
                  <p class="subtitle is-6 has-text-right" style="padding-right:2em; font-weight: bold;">$${price}</p>
                  </div>
              </div>
            </div>
          </div>
        </div>
    
        <div class="content">
          <p>${desc}</p>
          <br>
          <br>
          <a class="button is-black is-outlined"><img src="./assets/icons/shopping_cart.svg" style="width: 20px; height: 20px;margin-left:8px;margin-right:5px;" alt="" class="src">Agregar al carrito</a>
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