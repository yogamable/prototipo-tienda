let productos = [];

let promesaProductos = null;

export async function cargarProductos() {
    if(!promesaProductos){

        promesaProductos = fetch('productos.json')
        .then(response => {
            if(!response.ok) {
                throw new Error('No se pudieron cargar los productos');
            }
            return response.json();
        })
        .then(data => {
            productos = data;
            return productos;
        })
        .catch(error => {
            promesaProductos = null;
            throw error;
        });
    }
    return promesaProductos;
}

export function obtenerProductos(){
    return productos;
}