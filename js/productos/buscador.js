
import { mostrarProductos } from './renderProductos.js';


export function iniciarBuscador(productos) {

    const contenedor = document.querySelector('.sec-productos-buscador');
    const inputPalabra = document.querySelector('#busca-palabra');
    const selectCategoria = document.querySelector('#busca-categoria');
    const btnBuscar = document.querySelector('#btn-buscar');

    if (!contenedor || !inputPalabra || !selectCategoria || !btnBuscar) {
        return;
    }

    function filtrarProductos() {

        const palabra = inputPalabra.value.toLowerCase().trim();
        const categoria = selectCategoria.value;

        const resultado = productos.filter(producto => {

            const coincidePalabra =
                producto.nombre.toLowerCase().includes(palabra);

            const coincideCategoria =
                categoria === 'todos' ||
                categoria === '' ||
                producto.categoria === categoria;

            return coincidePalabra && coincideCategoria;
        });

        mostrarProductos(contenedor, resultado);
    }

    btnBuscar.addEventListener('click', filtrarProductos);

    inputPalabra.addEventListener('input', filtrarProductos);

    selectCategoria.addEventListener('change', filtrarProductos);

}
