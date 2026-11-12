
export function iniciarCarousel() {

    const slides = document.querySelectorAll('.carousel-img');

    if (slides.length === 0) return;

    let cuenta = 0;

    function mostrarSlide(index) {

        slides.forEach(slide => {
            slide.classList.remove('active');
        });

        slides[index].classList.add('active');
    }

    function siguienteSlide() {

        cuenta = (cuenta + 1) % slides.length;

        mostrarSlide(cuenta);
    }

    mostrarSlide(cuenta);

    if (slides.length > 1) {
        setInterval(siguienteSlide, 3000);
    }

}
