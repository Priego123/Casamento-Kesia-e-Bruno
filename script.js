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

    const offset = (carouselSlide.clientWidth - slideWidth) / 2;
    carouselSlide.style.transform = `translateX(${-currentSlide * slideWidth + offset}px)`;

    updateDots();
}

window.addEventListener("load", () => {
    moveSlide(0);
});

function updateDots() {
    const dotsContainer = document.querySelector(".carousel-dots");
    dotsContainer.innerHTML = "";

    for (let i = 0; i < document.querySelectorAll(".carousel-slide img").length; i++) {
        const dot = document.createElement("div");
        dot.classList.add("carousel-dot");
        if (i === currentSlide) {
            dot.classList.add("active");
        }
        dot.addEventListener("click", () => {
            currentSlide = i;
            moveSlide(0);
        });
        dotsContainer.appendChild(dot);
    }
}

updateDots();


