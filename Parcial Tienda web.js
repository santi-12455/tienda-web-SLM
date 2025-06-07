const productos = [
  { id: 1, nombre: 'Audífonos inalambricos', precio: 500000, imagen: 'Imagenes/audifonos.jpg' },
  { id: 2, nombre: 'Mouse Gamer', precio: 250000, imagen: 'Imagenes/mouse.jpg' },
  { id: 3, nombre: 'Teclado Mecánico', precio: 270000, imagen: 'Imagenes/teclado.jpg' },
  { id: 4, nombre: 'Cámara HD', precio: 1500000, imagen: 'Imagenes/camara.jpg' },
  { id: 5, nombre: 'Parlantes Bluetooth', precio: 300000, imagen: 'Imagenes/parlante.jpg' }
];

const carrito = {};

function renderProductos() {
  const contenedor = document.getElementById('productos');
  contenedor.innerHTML = ''; // Limpia contenido previo si se recarga
  productos.forEach(p => {
    contenedor.innerHTML += `
      <div class="col-md-4 mb-4">
        <div class="card producto">
          <div class="producto-imagen-contenedor">
            <img src="${p.imagen}" class="card-img-top" alt="${p.nombre}">
          </div>
          <div class="card-body">
            <h5 class="card-title">${p.nombre}</h5>
            <p class="card-text">Precio: $${p.precio.toLocaleString()}</p>
            <button class="btn btn-primary" onclick="agregarProducto(${p.id})">Agregar</button>
          </div>
        </div>
      </div>`;
  });
}

function agregarProducto(id) {
  carrito[id] = (carrito[id] || 0) + 1;
  renderCarrito();
}

function cambiarCantidad(id, cambio) {
  carrito[id] += cambio;
  if (carrito[id] <= 0) delete carrito[id];
  renderCarrito();
}

function renderCarrito() {
  const contenedor = document.getElementById('carrito');
  const totalSpan = document.getElementById('total');
  contenedor.innerHTML = '';
  let total = 0;
  for (const id in carrito) {
    const producto = productos.find(p => p.id == id);
    const cantidad = carrito[id];
    total += producto.precio * cantidad;
    contenedor.innerHTML += `
      <div class="carrito-item">
        ${producto.nombre} x ${cantidad} - $${(producto.precio * cantidad).toLocaleString()}
        <div>
          <button class="btn btn-sm btn-success" onclick="cambiarCantidad(${id}, 1)">+</button>
          <button class="btn btn-sm btn-danger" onclick="cambiarCantidad(${id}, -1)">-</button>
        </div>
      </div>`;
  }
  totalSpan.textContent = total.toLocaleString();
}

renderProductos();