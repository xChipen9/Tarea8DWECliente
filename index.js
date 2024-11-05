function getCookie(name) {
  let cookieArr = document.cookie.split(";");
  for (let i = 0; i < cookieArr.length; i++) {
      let cookiePair = cookieArr[i].split("=");
      if (name == cookiePair[0].trim()) {
          return decodeURIComponent(cookiePair[1]);
      }
  }
  return null;
}

function setCookie(name, value, days) {
  let date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = name + "=" + encodeURIComponent(value) + ";expires=" + date.toUTCString() + ";path=/";
}

let carrito = JSON.parse(getCookie("carrito")) || [];

function mostrarCarrito() {
  const contenidoCarrito = document.getElementById("contenido-carrito");
  contenidoCarrito.innerHTML = "";

  let total = 0;
  carrito.forEach(item => {
      const div = document.createElement("div");
      div.textContent = `${item.nombre} - Cantidad: ${item.cantidad} - Precio: $${item.precio}`;
      total += item.precio * item.cantidad;

      const btnEliminar = document.createElement("button");
      btnEliminar.textContent = "Eliminar";
      btnEliminar.onclick = () => eliminarProducto(item.id);
      div.appendChild(btnEliminar);

      contenidoCarrito.appendChild(div);
  });

  total *= 1.21; 
  document.getElementById("total-precio").textContent = `Total con IVA: $${total.toFixed(2)}`;

  setCookie("carrito", JSON.stringify(carrito), 7);
}

document.querySelectorAll(".agregar-carrito").forEach(btn => {
  btn.addEventListener("click", () => {
      const producto = btn.parentElement;
      const id = producto.getAttribute("data-id");
      const nombre = producto.getAttribute("data-nombre");
      const precio = parseFloat(producto.getAttribute("data-precio"));

      const itemExistente = carrito.find(item => item.id === id);
      if (itemExistente) {
          itemExistente.cantidad++;
      } else {
          carrito.push({ id, nombre, precio, cantidad: 1 });
      }
      mostrarCarrito();
  });
});

function eliminarProducto(id) {
  carrito = carrito.filter(item => item.id !== id);
  mostrarCarrito();
}

document.getElementById("vaciar-carrito").addEventListener("click", () => {
  carrito = [];
  mostrarCarrito();
});

mostrarCarrito();
