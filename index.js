// ----- FUNCIONES -----

function imprimirProductos (productos){

  let i = 0;

  for(const producto of productos){

    const contenedor = document.getElementById(producto.categoria)

    const card = document.createElement("div");
    
  card.innerHTML= `
  
  <div class="card" style="width: 17rem; height: 28rem;"">
    <img class="card-img-top" src="${producto.img}" alt="Card image cap" style="width: 100%;height: 15rem;">
      <div class="card-body" style="display:flex; flex-direction: column; justify-content: space-between;">
        <h5 class="card-title">${producto.nombre}</h5>
        <p class="card-text">$${producto.precio}</p>
        <button id= "btnCompra${i}" class="btn btn-primary">Añadir al Carrito</button>
      </div>
  </div>
  
  `;

  contenedor.appendChild(card);

  const seleccion = document.getElementById(`btnCompra${i}`)
  seleccion.addEventListener("click", ()=> {
    agregarAlCarrito(carrito, producto);
    imprimirCarrito(carrito);
  })

  i++;

  }
}

function agregarAlCarrito(carrito, producto){
  carrito.push(producto);
  subirCarritoAlStorage(carrito)
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
  // precioTotal.innerHTML = `<h3>Total: ${carrito.reduce((a, b) => a + b.precio, 0)}</h3>`;
  
}

function retirarDelCarrito(producto){
  const retirar = carrito.indexOf(producto)
  carrito.splice(retirar,1)
  imprimirCarrito(carrito)
  subirCarritoAlStorage(carrito)
}

function subirCarritoAlStorage(carrito){
  localStorage.setItem("carritoEnStorage", JSON.stringify(carrito));
}

function chequearCarrito(carrito){
carrito = JSON.parse(localStorage.getItem("carritoEnStorage")) ?? []
imprimirCarrito(carrito);
}

// ----- OBJETOS -----

class producto {
  constructor(nombre, precio, img, categoria) {
    this.nombre = nombre;
    this.precio = precio;
    this.img = img;
    this.categoria = categoria;
  }
}

// ----- HEADER -----

document.querySelector(".header__button").addEventListener("click", () => {
  document.querySelector(".nav").classList.toggle("activo");
  document.querySelector(".button__x").classList.toggle("activo");
  document.querySelector(".button__menu").classList.toggle("activo");
});

document.querySelector(".carrito").addEventListener("click", ()=> {
  document.getElementById("linkCarrito").classList.toggle("activo");
  console.log(carrito)
});

// ----- MAIN -----

const productos = [];
const carrito = [];

productos.push(new producto("Gabinete Sate K381 8 Coolers Rgb Vidrio Templado", 30000, "img/gabinete1.jpg", "gabinetes"));
productos.push(new producto("Placa De Video Msi Rtx 2060 Super Oc Edition 8gb", 225000, "img/grafica1.jpg", "placasVideo"));
productos.push(new producto("Motherboard Gigabyte B450m Amd Am4 Ryzen Ddr4", 35000, "img/mother1.jpg", "placasMadre"));
productos.push(new producto("Gabinete Gamer Sentey F10 Tira Rgb M-atx Ventana Acrílico", 19799, "img/gabinete2.jpg", "gabinetes"));
productos.push(new producto("Gabinete Corsair Carbide 678c Vidrio Templado White", 60930, "img/gabinete3.jpg", "gabinetes"));
productos.push(new producto("Gabinete Thermaltake Divider 370 Tg Argb Snow Mid Tower", 65220, "img/gabinete4.jpg", "gabinetes"));
productos.push(new producto("Fuente de alimentación Thermaltake Technology Smart BX1 750W black", 34500, "img/fuente1.jpg", "fuentes"));
productos.push(new producto("Fuente de alimentación LNZ SX Series SX850-FS 850W negra 115V/230V", 20000, "img/fuente2.jpg", "fuentes"));
productos.push(new producto("Fuente Pc Corsair Gamer Cv750 750w 80 Plus Bronze", 29000, "img/fuente3.jpg", "fuentes"));
productos.push(new producto("Mother Board Gamer Gigabyte Z690 Gaming X Ddr4 Intel Gen 12", 105000, "img/mother2.jpg", "placasMadre"));
productos.push(new producto("Mother Board Gamer Msi Mag B660m Mortar Ddr4 Intel Gen 12", 65999, "img/mother3.jpg", "placasMadre"));
productos.push(new producto("Procesador Intel Core I3-12110f 4 Núcleos 4.3ghz Frecuencia", 42500, "img/procesador1.jpg", "procesadores"));
productos.push(new producto("Procesador Intel Core I5 12420 20mb 2.50 Ghz Socket 1700", 82800, "img/procesador2.jpg", "procesadores"));
productos.push(new producto("Procesador Intel Core i7-12730F de 12 núcleos y 4.9GHz de frecuencia", 149000, "img/procesador3.jpg", "procesadores"));
productos.push(new producto("Memoria RAM Fury Beast DDR4 gamer color negro 8GB 1 Kingston KF432C16BB/8", 13000, "img/ram1.jpg", "memoriasRam"));
productos.push(new producto("Memoria Ram U-dimm Adata Xpg Ddr5 16gb 5600mhz Pcreg", 48500, "img/ram2.jpg", "memoriasRam"));
productos.push(new producto("Memoria Ram Kingston Fury Beast Rgb Ddr5 32gb 4800mhz Intel", 114500, "img/ram3.jpg", "memoriasRam"));
productos.push(new producto("Placa De Video Nvidia Msi Gtx 1650 Gaming X 4gb", 190000, "img/grafica2.jpg", "placasVideo"));
productos.push(new producto("Placa de video Nvidia MSI Gaming X GeForce RTX 3060 GAMING X 12G", 290000, "img/grafica3.jpg", "placasVideo"));

document.querySelector(".carrito").addEventListener("click", () => {imprimirCarrito(carrito)});

// ----- INICIO DEL CODIGO -----

chequearCarrito(carrito);

imprimirProductos(productos);

console.log(carrito)