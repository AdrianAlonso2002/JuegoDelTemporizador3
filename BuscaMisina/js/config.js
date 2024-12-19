const startButton = document.getElementById('start-button');
const startText = document.getElementById('start-text');

startButton.addEventListener('click', startGame);

function startGame() {
    startButton.style.display = 'none';
    startText.style.display = 'none';
    const body = document.body;
    const audio = document.getElementById("wanted");
    audio.play();

    const IMAGE_FILES = [
        'img/copo.png',
        'img/gato1.png',
        'img/gato2.png',
        'img/gato3.png',
        'img/gato4.png',
        'img/gato5.png',
        'img/gato6.png',
        'img/lechuza.png',
        'img/luigi.png',
        'img/pinguino.png'
    ];
    const TARGET_IMAGE = 'img/gato7.png'; // Imagen ganadora
    const TOTAL_IMAGES = 1000; // Número total de imágenes repetidas
    const IMAGE_SIZE = 50; // Tamaño de las imágenes en píxeles

    const images = [];
    const directions = []; // Direcciones de movimiento
    const positions = []; // Posiciones de las imágenes (en lugar de estilos)

    // Función para crear una imagen
    function createImage(src, isTarget = false) {
        const img = document.createElement('img');
        img.src = src;
        img.classList.add('image');
        if (isTarget) img.classList.add('target');

        // Establecer tamaño dinámico
        img.style.width = `${IMAGE_SIZE}px`;
        img.style.height = `${IMAGE_SIZE}px`;

        // Posición inicial aleatoria
        const x = Math.random() * (window.innerWidth - IMAGE_SIZE);
        const y = Math.random() * (window.innerHeight - IMAGE_SIZE);
        positions.push({ x, y });

        // Direcciones iniciales aleatorias
        directions.push({ dx: Math.random() * 4 - 2, dy: Math.random() * 4 - 2 });

        // Establecer posición inicial con transform
        img.style.transform = `translate(${x}px, ${y}px)`;
        document.body.appendChild(img);

        // Verificar si la imagen se cargó correctamente
        img.onerror = () => console.error(`No se pudo cargar la imagen: ${src}`);
        return img;
    }

    // Crear imágenes repetidas
    for (let i = 0; i < TOTAL_IMAGES; i++) {
        const randomIndex = Math.floor(Math.random() * IMAGE_FILES.length);
        const imgSrc = IMAGE_FILES[randomIndex];
        const img = createImage(imgSrc);
        images.push(img);
    }

    // Crear la imagen objetivo
    const target = createImage(TARGET_IMAGE, true);
    images.push(target);

    // Evento de clic para la imagen objetivo
    target.addEventListener('click', (e) => {
        e.stopPropagation();
        Swal.fire({
            icon: 'success',
            title: 'Has encontrado a Misina!',
            text: 'La contraseña es: misinaparda',
            confirmButtonText: 'JIJIJI',
        });
    });

    // Función para mover todas las imágenes
    function moveImages() {
        for (let i = 0; i < images.length; i++) {
            const { dx, dy } = directions[i];
            let { x, y } = positions[i];

            // Cambiar dirección si alcanza un borde
            if (x + dx < 0 || x + IMAGE_SIZE + dx > window.innerWidth) directions[i].dx = -dx;
            if (y + dy < 0 || y + IMAGE_SIZE + dy > window.innerHeight) directions[i].dy = -dy;

            // Actualizar posición
            positions[i].x += directions[i].dx;
            positions[i].y += directions[i].dy;

            // Aplicar transform
            images[i].style.transform = `translate(${positions[i].x}px, ${positions[i].y}px)`;
        }

        // Volver a llamar a moveImages en el próximo cuadro
        requestAnimationFrame(moveImages);
    }

    // Iniciar el movimiento de las imágenes
    requestAnimationFrame(moveImages);

}
