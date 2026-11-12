# Prototipo de Tienda Online

## Descripción del proyecto

Diseño y desarrollo de un prototipo de sitio web para una tienda online, orientado a la exhibición de productos y la gestión de pedidos mediante un carrito de compras alternativo al pago electrónico.

El proyecto utiliza **HTML, CSS/SCSS y JavaScript**, incorporando archivos **JSON** para almacenar y cargar dinámicamente la información de los productos.

## Funcionalidades

- **Catálogo dinámico:** carga y visualización de productos mediante archivos JSON.
- **Buscador de productos:** permite filtrar productos dentro del catálogo.
- **Tarjetas de productos:** presentación individual de cada producto con información relevante.
- **Carrito de compras:** permite agregar y eliminar productos, modificar cantidades y calcular automáticamente el total de compra.
- **Persistencia de datos:** almacenamiento del carrito para conservar los productos seleccionados durante la navegación.
- **Gestión de pedidos:** formulario para recopilar los datos de contacto del cliente y generar el pedido mediante JavaScript.
- **Visualización del pedido en consola:** al presionar el botón de envío, se muestran en la consola del navegador los productos seleccionados, las cantidades, el total de compra y los datos de contacto ingresados.
- **Diseño responsivo:** adaptación de la interfaz a distintos tamaños de pantalla.

## Tecnologías utilizadas

- HTML5
- CSS3
- SCSS
- JavaScript (ES6+)
- JSON
- LocalStorage

## ¿Cómo utilizar la tienda?

1. Explorar el catálogo de productos disponibles.
2. Utilizar el buscador para encontrar productos específicos.
3. Seleccionar los productos deseados mediante el botón **Agregar al carrito**.
4. Abrir el carrito para revisar los productos seleccionados.
5. Modificar las cantidades o eliminar productos según sea necesario.
6. Revisar el total de la compra.
7. Completar los datos de contacto solicitados en el proceso de confirmación.
8. Abrir las herramientas de desarrollador del navegador (`CTRL + SHIFT + J`) y seleccionar la pestaña **Console**.
9. Presionar el botón **Enviar pedido** y verificar en la consola la información del pedido generado, incluyendo los productos, cantidades, total de compra y datos de contacto.

## Modalidad de compra

A diferencia de una tienda online tradicional, este prototipo no incorpora una pasarela de pago ni un sistema de envío de pedidos a un servidor. Sin embargo, el proceso de gestión de compra es funcional: al confirmar el pedido, JavaScript recopila la información del carrito y los datos de contacto del cliente, y los muestra estructurados en la consola del navegador.

Esta implementación permite demostrar el funcionamiento del flujo de compra y la generación de pedidos sin necesidad de integrar servicios externos.

## Objetivo

Desarrollar una experiencia de comercio electrónico funcional, intuitiva y adaptable, aplicando conceptos de desarrollo frontend, manipulación del DOM, modularización de JavaScript, consumo de datos JSON y almacenamiento local.

## Estado del proyecto

Prototipo funcional con fines demostrativos y de aprendizaje.
