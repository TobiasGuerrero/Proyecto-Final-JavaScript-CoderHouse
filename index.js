// ----- FUNCIONES -----

function imprimirProductos (){

  let i = 0;

  fetch("/prod.json")
  .then((data)=> {return data.json()})
  .then((res)=>{
    res.producto.forEach((el)=>{

      const contenedor = document.getElementById(el.categoria)

      const card = document.createElement("div");
    
      card.innerHTML= `
      
      <div class="card" style="width: 17rem; height: 28rem;"">
      <img class="card-img-top" src="${el.img}" alt="Card image cap" style="width: 100%;height: 15rem;">
      <div class="card-body" style="display:flex; flex-direction: column; justify-content: space-between;">
      <h5 class="card-title">${el.nombre}</h5>
      <p class="card-text">$${el.precio}</p>
      <button id= "btnCompra${i}" class="btn btn-primary">Añadir al Carrito</button>
      </div>
      </div>
      
      `;
      
      contenedor.appendChild(card);
      
      const seleccion = document.getElementById(`btnCompra${i}`)
      seleccion.addEventListener("click", ()=> {
        agregarAlCarrito(carrito, el);
        imprimirCarrito(carrito);
      })

      i++;
      
    })
  })

  imprimirCarrito(carrito);
}

function agregarAlCarrito(carrito, producto){
  carrito.push(producto);
  subirCarritoAlStorage(carrito)

  Toastify({
    type: "success",
    text: "Producto agregado al carrito",
    position: "top-right",
    stopOnFocus: false,
    style: {
      background: "linear-gradient(to right, green, black)",
    }
    }).showToast();
  }

function imprimirCarrito (carrito){
  
  let i=0;
  const contenedor = document.getElementById("carrito")
  contenedor.innerHTML="";

  for(const producto of carrito){

    const card = document.createElement("div");
    
  card.innerHTML= `
  
  <div class="card" style="width: 17rem; height: 28rem;">
    <img class="card-img-top" src="${producto.img}" alt="Card image cap" style="width: 100%;height: 15rem;">
      <div class="card-body" style="display:flex; flex-direction: column; justify-content: space-between;">
        <h5 class="card-title">${producto.nombre}</h5>
        <p class="card-text">$${producto.precio}</p>
        <button id= "btnRetirar${i}" class="btn btn-primary">Retirar del Carrito</button>
      </div>
  </div>
  
  `;

  contenedor.appendChild(card);

  const seleccion = document.getElementById(`btnRetirar${i}`);
  seleccion.addEventListener("click", ()=> {retirarDelCarrito(producto)});

  i++;
  }

  const precioTotal = document.getElementById("precio-total");
  carrito.reduce((acc, prod) => acc + prod.precio, 0) == 0 ? precioTotal.innerHTML = `<h3>CARRITO VACIO</h3>` : precioTotal.innerHTML = `<h3>Total: ${carrito.reduce((acc, prod) => acc + prod.precio, 0)}</h3>`;
  
  document.getElementById("cant__prod").innerHTML = carrito.length;
}
function retirarDelCarrito(producto){
  const retirar = carrito.indexOf(producto)
  carrito.splice(retirar,1)
  imprimirCarrito(carrito)
  subirCarritoAlStorage(carrito)

  Toastify({
    text: "Producto retirado del carrito",
    position: "top-right",
    stopOnFocus: false,
    style: {
      background: "linear-gradient(to right, red, black)",
    }
    }).showToast();
}

function subirCarritoAlStorage(carrito){
  localStorage.setItem("carritoEnStorage", JSON.stringify(carrito));
}

// ----- HEADER -----

document.querySelector(".header__button").addEventListener("click", () => {
  document.querySelector(".nav").classList.toggle("activo");
  document.querySelector(".button__x").classList.toggle("activo");
  document.querySelector(".button__menu").classList.toggle("activo");
});

document.querySelector(".carrito").addEventListener("click", ()=> {
  document.getElementById("linkCarrito").classList.toggle("activo");
});

// ----- MAIN -----

const carrito = JSON.parse(localStorage.getItem("carritoEnStorage")) || [];

// ----- INICIO DEL CODIGO -----

imprimirProductos();

