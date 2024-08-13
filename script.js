document.addEventListener("DOMContentLoaded", function() {
    const countdown = document.getElementById("countdown");
    const weddingDate = new Date("2024-12-28T00:00:00").getTime();

    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdown.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

        if (distance < 0) {
            clearInterval(interval);
            countdown.innerHTML = "O grande dia chegou!";
        }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
});

let currentSlide = 0;

function moveSlide(direction) {
    const slides = document.querySelectorAll(".carousel-slide img");
    const totalSlides = slides.length;

    currentSlide = (currentSlide + direction + totalSlides) % totalSlides;

    const slideWidth = slides[currentSlide].clientWidth;
    const carouselSlide = document.querySelector(".carousel-slide");

    // Novo cálculo para centralização e evitar espaços em branco
    const offset = (carouselSlide.clientWidth - slideWidth) / 2;
    carouselSlide.style.transform = `translateX(${-currentSlide * slideWidth + offset}px)`;
}

document.addEventListener("DOMContentLoaded", function() {
    const carouselSlide = document.querySelector(".carousel-slide");
    const slides = document.querySelectorAll(".carousel-slide img");
    let isDragging = false;
    let startPosition = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID = 0;
    let currentIndex = 0;

    carouselSlide.addEventListener('touchstart', touchStart);
    carouselSlide.addEventListener('touchend', touchEnd);
    carouselSlide.addEventListener('touchmove', touchMove);

    function touchStart(event) {
        isDragging = true;
        startPosition = getPositionX(event);
        prevTranslate = currentTranslate; // Salva a posição atual
        cancelAnimationFrame(animationID);
    }

    function touchEnd() {
        isDragging = false;

        const movedBy = currentTranslate - prevTranslate;

        if (movedBy < -100) {
            if (currentIndex < slides.length - 1) {
                currentIndex += 1;
            } else {
                // Se estiver na última imagem, volta para a primeira
                currentIndex = 0;
            }
        } else if (movedBy > 100) {
            if (currentIndex > 0) {
                currentIndex -= 1;
            }
        }

        setPositionByIndex();
    }

    function touchMove(event) {
        if (!isDragging) return;
        const currentPosition = getPositionX(event);
        currentTranslate = prevTranslate + currentPosition - startPosition;
    }

    function getPositionX(event) {
        return event.touches[0].clientX;
    }

    function animation() {
        setSliderPosition();
        if (isDragging) requestAnimationFrame(animation);
    }

    function setSliderPosition() {
        carouselSlide.style.transform = `translateX(${currentTranslate}px)`;
    }

    function setPositionByIndex() {
        const slideWidth = slides[currentIndex].clientWidth;
        const offset = (carouselSlide.clientWidth - slideWidth) / 2;
        currentTranslate = -currentIndex * slideWidth + offset;
        setSliderPosition();
    }

    // Inicializa o carrossel com a primeira imagem centralizada
    setPositionByIndex();
});
