import 'js/carrito/carrito.js';
import { cargarProductos } from './data/cargadorData.js';
import { mostrarDestacados } from './productos/renderProductos.js';
import { iniciarBuscador } from './productos/buscador.js';
import { iniciarCarousel } from './componentes/carousel.js';

// INICIALIZAR SITIO

async function iniciarSitio() {
    try {
        // Cargar catálogo de productos
        const productos = await cargarProductos();
        // Compartir productos con el carrito
        window.productosDisponibles = productos;
        // Mostrar productos destacados
        mostrarDestacados(productos);
        // Iniciar buscador
        iniciarBuscador(productos);
    } catch (error) {
        console.error('Error al iniciar el sitio:', error);
    }

    // Iniciar carrusel
    iniciarCarousel();
}

// EJECUTAR
iniciarSitio();