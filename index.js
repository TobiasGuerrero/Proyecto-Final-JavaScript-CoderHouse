// ----- FUNCIONES -----

function imprimirHTML(){
  const contenedor = document.getElementById("div__main");
  contenedor.innerHTML = `
        <section id="linkGabinetes">
          <h3>GABINETES</h3>
          <div class="card-container" id="gabinetes"></div>
        </section>

        <section id="linkFuentes">
          <h3>FUENTES</h3>
          <div class="card-container" id="fuentes"></div>
        </section>

        <section id="linkPlacasMadre">
          <h3>PLACAS MADRE</h3>
          <div class="card-container" id="placasMadre"></div>
        </section>

        <section id="linkProcesadores">
          <h3>PROCESADORES</h3>
          <div class="card-container" id="procesadores"></div>
        </section>

        <section id="linkMemoriasRam">
          <h3>MEMORIAS RAM</h3>
          <div class="card-container" id="memoriasRam"></div>
        </section>

        <section id="linkPlacasVideo">
          <h3>PLACAS DE VIDEO </h3>
          <div class="card-container" id="placasVideo"></div>
        </section>`;

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
  console.log(carrito.length)
  if(carrito.length == 0){
    carrito.push(producto);
    producto.cant++;
  }else{
    const buscar = carrito.indexOf(producto);
    if(buscar == -1){
      carrito.push(producto);
      producto.cant++;
    }else{
      carrito[buscar].cant++;
    }
  }

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

  const carro = document.getElementById("linkCarrito");
  carro.innerHTML = "";
  carro.innerHTML= `
  
  <h3>CARRITO </h3>
  <div class="card-container" id="carrito"></div>
  <h3 id="precio-total">CARRITO VACIO.</h3>
  <div id="div__pagar"></div>
  
  `;
  
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
        <p class="card-text">$${producto.precio} - Cantidad:${producto.cant}</p>
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
  carrito.reduce((acc, prod) => acc + prod.precio, 0) == 0 ? precioTotal.innerHTML = `<h3>CARRITO VACIO</h3>` : precioTotal.innerHTML = `<h3>Total: ${carrito.reduce((acc, prod) => acc + prod.precio*prod.cant, 0)}</h3>`;
  
  const cantTotalProd = document.getElementById("cant__prod");
  carrito.reduce((acc, prod) => acc + prod.cant, 0) == 0 ? cantTotalProd.innerHTML = 0 : cantTotalProd.innerHTML = carrito.reduce((acc, prod) => acc + prod.cant, 0);

  realizarPago(carrito);
}

function retirarDelCarrito(producto){

  const retirar = carrito.indexOf(producto)
  carrito[retirar].cant--
  carrito[retirar].cant == 0 && carrito.splice(retirar, 1);

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

function vaciarCarrito(carrito){
  carrito = [];
  subirCarritoAlStorage(carrito);
  imprimirCarrito(carrito);
}

function realizarPago(carrito){
  if(carrito.length != 0){
  const contenedor = document.getElementById("div__pagar");
  contenedor.innerHTML = `<button id="btn__pagar">Realizar Compra.</button>`;

  document.getElementById("btn__pagar").addEventListener("click", ()=>{
    swal("Compra Realizada con exito.", "Gracias por su compra!.", "success");
    vaciarCarrito(carrito);
  })}else{document.getElementById("div__pagar").innerHTML = ""}
}

// ----- HEADER -----

document.querySelector(".header__button").addEventListener("click", () => {
  document.querySelector(".nav").classList.toggle("activo");
  document.querySelector(".button__x").classList.toggle("activo");
  document.querySelector(".button__menu").classList.toggle("activo");
});

document.querySelector(".carrito").addEventListener("click", ()=> {
  document.getElementById("linkCarrito").classList.toggle("activo");
  document.querySelector(".activo") != null ? document.getElementById("div__main").innerHTML="" : location.reload();
});

// ----- MAIN -----

const carrito = JSON.parse(localStorage.getItem("carritoEnStorage")) || [];

// ----- INICIO DEL CODIGO -----

imprimirHTML();