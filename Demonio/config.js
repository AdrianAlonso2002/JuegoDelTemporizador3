const startButton = document.getElementById('start-button');
const advanceButton = document.getElementById('advance-button');
const progressBar = document.getElementById('progress');
const progressBar2 = document.getElementById('progress-bar');
const scarySound = document.getElementById('scary-sound');
const jumpscare = document.getElementById('jumpscare');
const jumpscareSound = document.getElementById('jumpscare-sound');
const runningSound = document.getElementById('running-sound');
const statusText = document.getElementById('status-text');

let progress = 0;
let volumeInterval;
let isSoundPlaying = false;
let currentVolume = 0;
let increasing = true;
let advanceInterval;

startButton.addEventListener('click', startGame);
advanceButton.addEventListener('mousedown', startAdvancing);
advanceButton.addEventListener('mouseup', stopAdvancing);
advanceButton.addEventListener('mouseleave', stopAdvancing);
advanceButton.addEventListener('touchstart', startAdvancing);
advanceButton.addEventListener('touchend', stopAdvancing);
advanceButton.addEventListener('touchcancel', stopAdvancing);

function startGame() {
    startButton.style.display = 'none';
    advanceButton.style.display = 'block';
    progressBar2.style.display = 'block'; 
    playScarySound();
}

function startAdvancing() {
    runningSound.volume = 0.1;
    runningSound.play();
    advanceInterval = setInterval(advance, 100); // Incrementar cada 100 ms
}

function stopAdvancing() {
    runningSound.pause();
    runningSound.currentTime = 0; // Reiniciar el sonido para la próxima vez
    clearInterval(advanceInterval);
}

function advance() {
    if (!isSoundPlaying) {
        progress += 0.2;
        progressBar.style.width = progress + '%';

        if (progress >= 100) {
            Swal.fire({
                icon: 'success',
                title: 'Has huido de Melendi!',
                text: 'La contraseña es: miedumiedu',
                confirmButtonText: 'Menos mal...',
            });
        }
    } else if (currentVolume > 0.50) {
        triggerJumpscare();
    } else {
        progress += 0.2;
        progressBar.style.width = progress + '%';

        if (progress >= 100) {
            Swal.fire({
                icon: 'success',
                title: 'Has huido de Melendi!',
                text: 'La contraseña es: correr',
                confirmButtonText: 'Menos mal...',
            });
        }
    }

    if (progress > 50) {
        statusText.textContent = '¡Ya queda menos para salir!';
    } else {
        statusText.textContent = '¡Corre, escapa del Melendi demoniaco!';
    }
}

function playScarySound() {
    scarySound.volume = 0;
    scarySound.play();
    isSoundPlaying = true;
    updateVolume();

    scarySound.addEventListener('ended', () => {
        scarySound.currentTime = 0;
        scarySound.play();
    });
}

function updateVolume() {
    clearInterval(volumeInterval);
    volumeInterval = setInterval(() => {
        if (increasing) {
            console.log(currentVolume);
            currentVolume += 0.01;
            if (currentVolume >= 1) {
                currentVolume = 1;
                increasing = false;
                // Mantener el volumen en 1 por un tiempo aleatorio entre 1 y 3 segundos
                setTimeout(() => {
                    volumeInterval = setInterval(updateVolume, 100);
                }, getRandomTime(1000, 5000));
                clearInterval(volumeInterval);
            }
        } else {
            console.log(currentVolume);
            currentVolume -= 0.01;
            if (currentVolume <= 0.01) {
                currentVolume = 0.01;
                increasing = true;
                // Mantener el volumen en 0.2 por un tiempo aleatorio entre 1 y 3 segundos
                setTimeout(() => {
                    volumeInterval = setInterval(updateVolume, 100);
                }, getRandomTime(1000, 5000));
                clearInterval(volumeInterval);
            }
        }
        scarySound.volume = currentVolume;
    }, 100);
}

function getRandomTime(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function triggerJumpscare() {
    clearInterval(volumeInterval);
    scarySound.pause();
    jumpscare.style.display = 'flex';
    jumpscareSound.play();
    setTimeout(() => {
        Swal.fire({
            title: "Melendi demoniaco te ha pillado!",
            text: "Intenta huir sin que te pille!",
            imageUrl: "demonio.png",
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "Demonio",
            confirmButtonText: 'Que miedo...'
          });
    }, 1000);
}