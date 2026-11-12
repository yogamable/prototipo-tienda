
const CLAVE_CARRITO = 'carritoCompras';

export function obtenerCarrito() {

    const datosGuardados = localStorage.getItem(CLAVE_CARRITO);

    return datosGuardados ? JSON.parse(datosGuardados) : [];
}


export function guardarCarrito(carrito) {

    localStorage.setItem(
        CLAVE_CARRITO,
        JSON.stringify(carrito)
    );
}


export function vaciarCarrito() {

    localStorage.removeItem(CLAVE_CARRITO);
}
