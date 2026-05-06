document.addEventListener("DOMContentLoaded", () => {
    // 1. Seleccionamos el contenedor y las tarjetas
    const carrusel = document.querySelector('.carrusel-texto-deslizable');
    const tarjetas = document.querySelectorAll('.tarjeta-aviso');
    
    // Si no hay tarjetas, detenemos la ejecución para evitar errores
    if (tarjetas.length === 0) return; 

    let intervaloCarrusel;

    function moverDerecha() {
        // Calculamos cuánto debemos desplazarnos:
        // Ancho de una tarjeta + el espacio (gap) de 16px que definiste en CSS
        const anchoDesplazamiento = tarjetas[0].offsetWidth + 16; 

        // Verificamos si ya llegamos al final del carrusel
        // Usamos una pequeña tolerancia (-2) por el redondeo de píxeles en algunos navegadores
        const llegoAlFinal = carrusel.scrollLeft + carrusel.clientWidth >= carrusel.scrollWidth - 2;

        if (llegoAlFinal) {
            // Si está en la última tarjeta, regresa suavemente al inicio
            carrusel.scrollTo({
                left: 0,
                behavior: 'smooth'
            });
        } else {
            // Si no, avanza una tarjeta a la derecha
            carrusel.scrollBy({
                left: anchoDesplazamiento,
                behavior: 'smooth'
            });
        }
    }

    // 2. Función para iniciar el temporizador (5 segundos = 5000 ms)
    function iniciarCarrusel() {
        intervaloCarrusel = setInterval(moverDerecha, 5000);
    }

    // 3. Función para detener el temporizador
    function pausarCarrusel() {
        clearInterval(intervaloCarrusel);
    }

    // Arrancamos el carrusel por primera vez
    iniciarCarrusel();

    // 4. Mejoras de Experiencia de Usuario (UX)
    // Pausamos si el usuario pasa el mouse (en computadoras)
    carrusel.addEventListener('mouseenter', pausarCarrusel);
    carrusel.addEventListener('mouseleave', iniciarCarrusel);

    // CRUCIAL PARA MÓVILES: Pausamos si el usuario toca la pantalla para leer
    // Así evitamos que el carrusel se mueva mientras tienen el dedo encima
    carrusel.addEventListener('touchstart', pausarCarrusel);
    carrusel.addEventListener('touchend', iniciarCarrusel);
});