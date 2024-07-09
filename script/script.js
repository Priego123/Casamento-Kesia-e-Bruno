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
