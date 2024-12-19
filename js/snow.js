document.addEventListener("DOMContentLoaded", () => {
    let clickCount = 0;
    const maxClicks = 3;
    document.addEventListener("click", () => {
        if (clickCount >= maxClicks) return;

        clickCount++;
        
        const body = document.body;
        const audio = document.getElementById("christmasMusic");
        audio.play();

        const snowflakes = [];

        function createSnowflake() {
            const snowflake = document.createElement("div");
            snowflake.classList.add("snowflake");
            snowflake.textContent = "❄";

            // Posición inicial y tamaño aleatorios
            snowflake.style.left = Math.random() * window.innerWidth + "px";
            snowflake.style.fontSize = Math.random() * 20 + 10 + "px";

            // Duración de la animación aleatoria
            const fallDuration = Math.random() * 10 + 5; // Entre 3 y 8 segundos
            snowflake.style.animationDuration = fallDuration + "s";

            // Opacidad aleatoria
            snowflake.style.opacity = Math.random();

            body.appendChild(snowflake);
            snowflakes.push(snowflake);

            // Eliminar el copo después de que termine la animación
            setTimeout(() => {
                snowflake.remove();
                snowflakes.splice(snowflakes.indexOf(snowflake), 1);
            }, fallDuration * 3000);
        }

        // Crear copos de nieve continuamente
        setInterval(createSnowflake, 120);
        document.addEventListener("click", handleClick);
    });
});