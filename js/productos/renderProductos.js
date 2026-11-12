
export function crearCard(producto) {

    const card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML = `
        <div class="card-img">
            <img src="${producto.imagen}" alt="${producto.nombre}">
        </div>

        <div class="card-info">
            <h2>${producto.nombre}</h2>
            <p class="p-descrip">${producto.descripcion}</p>
            <p class="p-precio">
                $ ${Number(producto.precio).toLocaleString('es-CL')}
            </p>
        </div>

        <div class="card-btn">
            <button class="btn-agregar" data-id="${producto.id}">
                Agregar
            </button>
        </div>
    `;

    return card;
}


export function mostrarProductos(contenedor, listaProductos) {

    if (!contenedor) return;

    contenedor.innerHTML = '';

    if (listaProductos.length === 0) {
        contenedor.innerHTML = '<p>No se encontraron productos</p>';
        return;
    }

    listaProductos.forEach(producto => {
        contenedor.appendChild(crearCard(producto));
    });
}


export function mostrarDestacados(productos) {

    const contenedor = document.querySelector('#productos-destacados');

    if (!contenedor) return;

    const destacados = productos.filter(
        producto => producto.destacados === true
    );

    mostrarProductos(contenedor, destacados);
}
