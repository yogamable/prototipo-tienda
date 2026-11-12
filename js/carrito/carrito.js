
import {
    obtenerCarrito,
    guardarCarrito,
    vaciarCarrito
} from './carritoStorage.js';


/** ESTADO DEL CARRITO **/

let carrito = obtenerCarrito();

let siguienteIdCarrito = carrito.length > 0
    ? Math.max(...carrito.map(producto => Number(producto.idCarrito) || 0)) + 1
    : 1;


/** ELEMENTOS DEL DOM **/

const tituloProductos = document.querySelector('.titulo-productos');
const mensajeCarritoVacio = document.querySelector('#carrito-vacio');
const listaCarrito = document.querySelector('.carrito-lista');
const carritoJS = document.querySelector('.carrito-js');

const totalCompra = document.querySelector('.total-compra');
const carritoFooter = document.querySelector('.carrito-footer');

const formularioPedido = document.querySelector('#formulario-pedido');
const contenedorFormulario = document.querySelector('#contenedor-formulario');

const mensajeConfirmacion = document.querySelector('#mensaje-confirmacion');
const divConfirmacion = document.querySelector('.div-confirmacion');
const btnSeguirComprando = document.querySelector('#btn-seguir-comprando');

const btnAbrir = document.querySelector('.btnAbrir');
const btnCerrar = document.querySelector('.btnCerrar');
const cartAside = document.querySelector('.aside-carrito');


/** ACTUALIZAR INTERFAZ **/

function actualizarCarrito() {

    if (!listaCarrito || !totalCompra || !carritoFooter) return;

    listaCarrito.innerHTML = '';

    let total = 0;

    carrito.forEach(producto => {

        total += Number(producto.precio);

        const item = document.createElement('li');
        item.classList.add('carrito-item');

        item.innerHTML = `
            <p>${producto.nombre}</p>

            <p>
                $${Number(producto.precio).toLocaleString('es-CL')}.- 
            </p>

            <button class="btn-eliminar" data-id="${producto.idCarrito}">
                <span class="material-symbols-outlined">
                    delete
                </span>
            </button>
        `;

        listaCarrito.appendChild(item);

    });

    // Mostrar total
    totalCompra.textContent =
        `$ ${total.toLocaleString('es-CL')}.-`;

    // Mostrar mensaje si el carrito está vacío
    mensajeCarritoVacio.hidden = carrito.length > 0;

    // Mostrar u ocultar formulario
    contenedorFormulario.hidden = carrito.length === 0;

    // Mostrar u ocultar footer
    carritoFooter.hidden = carrito.length === 0;

    // Mostrar u ocultar botón de envío
    let botonEnviar = carritoFooter.querySelector('.btn-enviar-pedido');

    if (carrito.length > 0) {

        if (!botonEnviar) {

            carritoFooter.insertAdjacentHTML('beforeend', `
                <button type="button" class="btn-enviar-pedido">
                    Enviar pedido
                </button>
            `);

        }

    } else {

        if (botonEnviar) {
            botonEnviar.remove();
        }

    }

}


/** AGREGAR PRODUCTOS AL CARRITO **/

function agregarProducto(idProducto) {

    const producto = window.productosDisponibles?.find(
        item => String(item.id) === String(idProducto)
    );

    if (!producto) return;

    // Crear una nueva unidad con ID propio
    const nuevoProducto = {
        ...producto,
        idCarrito: siguienteIdCarrito++
    };

    carrito.push(nuevoProducto);

    guardarCarrito(carrito);

    // Mostrar nuevamente el carrito si estaba la confirmación
    divConfirmacion.hidden = true;
    carritoJS.hidden = false;

    actualizarCarrito();

}


/** ELIMINAR PRODUCTOS **/

function eliminarProducto(idCarrito) {

    carrito = carrito.filter(
        producto => Number(producto.idCarrito) !== Number(idCarrito)
    );

    guardarCarrito(carrito);

    actualizarCarrito();

}


/** ABRIR Y CERRAR CARRITO **/

function abrirCarrito() {

    if (!cartAside) return;

    cartAside.classList.add('aside-activo');

    btnAbrir?.setAttribute('aria-expanded', 'true');

    btnCerrar?.focus();

}

function cerrarCarrito() {

    if (!cartAside) return;

    cartAside.classList.remove('aside-activo');

    btnAbrir?.setAttribute('aria-expanded', 'false');

    btnAbrir?.focus();

}


/** EVENTOS DEL CARRITO **/

document.addEventListener('click', (e) => {

    const btnAgregar = e.target.closest('.btn-agregar');
    const btnEliminar = e.target.closest('.btn-eliminar');
    const btnEnviar = e.target.closest('.btn-enviar-pedido');
    const btnSeguir = e.target.closest('#btn-seguir-comprando');


    if (btnAgregar) {

        agregarProducto(btnAgregar.dataset.id);

        return;

    }

    if (btnEliminar) {

        eliminarProducto(btnEliminar.dataset.id);

        return;

    }

    if (btnEnviar) {

        enviarPedido();

        return;

    }

    if (btnSeguir) {

        reiniciarCarrito();

        return;

    }

});


/** EVENTOS ABRIR Y CERRAR **/

btnAbrir?.addEventListener('click', (e) => {

    e.preventDefault();

    abrirCarrito();

});

btnCerrar?.addEventListener('click', (e) => {

    e.preventDefault();

    cerrarCarrito();

});

document.addEventListener('keydown', (e) => {

    if (
        e.key === 'Escape' &&
        cartAside?.classList.contains('aside-activo')
    ) {

        cerrarCarrito();

    }

});


/** SINCRONIZACIÓN ENTRE PESTAÑAS **/

window.addEventListener('storage', (e) => {

    if (e.key === 'carritoCompras') {

        carrito = obtenerCarrito();

        siguienteIdCarrito = carrito.length > 0
            ? Math.max(...carrito.map(producto => Number(producto.idCarrito) || 0)) + 1
            : 1;

        actualizarCarrito();

    }

});


/** ENVÍO DEL PEDIDO **/

function enviarPedido() {

    // Comprobar que existan productos
    if (carrito.length === 0) {

        alert('Tu carrito está vacío');

        return;

    }

    // Validar datos de contacto
    if (!formularioPedido.reportValidity()) {

        return;

    }

    // Obtener datos del cliente
    const datosContacto = {

        nombre: document.querySelector('#nombre-cliente').value.trim(),

        correo: document.querySelector('#correo-cliente').value.trim(),

        telefono: document.querySelector('#telefono-cliente').value.trim()

    };


    // Preparar información del pedido
    const pedido = {

        contacto: datosContacto,

        productos: carrito.map(producto => ({

            id: producto.id,
            idCarrito: producto.idCarrito,
            nombre: producto.nombre,
            precio: producto.precio

        })),

        total: carrito.reduce(
            (acumulador, producto) => acumulador + Number(producto.precio),
            0
        )

    };


    // Mostrar información del pedido en consola
    console.log('PEDIDO RECIBIDO:', pedido);


    // Vaciar productos del almacenamiento
    vaciarCarrito();

    // Vaciar estado del carrito en memoria
    carrito = [];

    // Reiniciar siguiente ID
    siguienteIdCarrito = 1;

    // Confirmar eliminación en consola
    console.log('El carrito se ha vaciado correctamente.');

    // Limpiar formulario
    formularioPedido.reset();

    // Actualizar carrito
    actualizarCarrito();

    // Ocultar contenido del carrito
    carritoJS.hidden = true;
    contenedorFormulario.hidden = true;
    carritoFooter.hidden = true;

    // Mostrar confirmación
    mensajeConfirmacion.textContent =
        '¡Tu pedido ha sido enviado! Pronto nos contactaremos contigo.';

    divConfirmacion.hidden = false;

}


/** VOLVER A LA VISTA DEL CARRITO **/

function reiniciarCarrito() {

    // Ocultar confirmación
    divConfirmacion.hidden = true;

    // Mostrar contenido del carrito
    carritoJS.hidden = false;

    // Actualizar vista del carrito vacío
    actualizarCarrito();

}


/** INICIALIZACIÓN **/

// Ocultar confirmación al cargar la página
divConfirmacion.hidden = true;

// Mostrar estado inicial del carrito
actualizarCarrito();
