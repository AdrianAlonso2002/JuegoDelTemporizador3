// Variables globales
var dialPosition = 0;
var vidas = 3;
var timerId = null;
var targetDate = null;
let clickCount = 0;
// Cargar el guardado al cargar la página
window.onload = cargarGuardado;

function iniciarTemporizador(duracion) {
    targetDate = new Date().getTime() + duracion * 60 * 60 * 1000;
    localStorage.setItem('targetDate', targetDate);
    updateTimer();
    if (timerId) {
        clearInterval(timerId);
    }
    timerId = setInterval(updateTimer, 1000);
}

// Función para calcular el tiempo restante y actualizar el temporizador
function updateTimer() {

    var now = new Date();

    var difference = targetDate - now;

    if (difference <= 0 || vidas == 0) {
        if (vidas > 0 && localStorage.getItem(`password1`) != 'desbloqueada') {
            return;
        } else
            if (vidas > 0 && localStorage.getItem(`password1`) === 'desbloqueada' && localStorage.getItem(`pista12`) != 'desbloqueada') {
                perderVida();
                return;
            } else if (localStorage.getItem(`pista12`) === 'desbloqueada'){
                console.log("No se pierde el juego si se ha ganado");
            } else {
                document.body.classList.add('blackout');
                document.getElementById('gameOverMessage').style.display = 'flex';
                return;
            }
    }

    var hours = Math.floor(difference / (1000 * 60 * 60));
    var minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((difference % (1000 * 60)) / 1000);

    //Mostrar imagen o pista al cabo del tiempo
    //Password1 Pista-Imagen
    if (hours < 24 && localStorage.getItem(`password1`) === 'desbloqueada' && localStorage.getItem(`password2`) !== 'desbloqueada') {
        document.querySelectorAll('#images img')[0].src = 'img/foto1.png';

    } else if (localStorage.getItem(`password1`) === 'desbloqueada' && localStorage.getItem(`password2`) === 'desbloqueada') {
        document.querySelectorAll('#images img')[0].src = 'img/foto1.png';
    }
    //Password2 Imagen-Pista
    if (hours < 24 && localStorage.getItem(`password2`) === 'desbloqueada' && localStorage.getItem(`password3`) !== 'desbloqueada') {
        document.querySelectorAll('#images p')[1].innerText = 'NSCGQ';
        document.querySelectorAll('#images button')[1].removeAttribute('hidden');
    } else if (localStorage.getItem(`password2`) === 'desbloqueada' && localStorage.getItem(`password3`) === 'desbloqueada') {
        document.querySelectorAll('#images p')[1].innerText = 'NSCGQ';
        document.querySelectorAll('#images button')[1].removeAttribute('hidden');
    }
    //Password3 Pista+Imagen
    //Password4 Imagen-Pista
    if (hours < 24 && localStorage.getItem(`password4`) === 'desbloqueada' && localStorage.getItem(`password5`) !== 'desbloqueada') {
        document.querySelectorAll('#images p')[3].innerText = '¡Encuentra a la misina!';
        document.querySelectorAll('#images button')[3].removeAttribute('hidden');
    } else if (localStorage.getItem(`password4`) === 'desbloqueada' && localStorage.getItem(`password5`) === 'desbloqueada') {
        document.querySelectorAll('#images p')[3].innerText = '¡Encuentra a la misina!';
        document.querySelectorAll('#images button')[3].removeAttribute('hidden');
    }
    //Password5 Imagen-Pista
    if (hours < 24 && localStorage.getItem(`password5`) === 'desbloqueada' && localStorage.getItem(`password6`) !== 'desbloqueada') {
        document.querySelectorAll('#images p')[4].innerText = '¿Qué es?';
        document.querySelectorAll('#images button')[4].removeAttribute('hidden');
    } else if (localStorage.getItem(`password5`) === 'desbloqueada' && localStorage.getItem(`password6`) === 'desbloqueada') {
        document.querySelectorAll('#images p')[4].innerText = '¿Qué es?';
        document.querySelectorAll('#images button')[4].removeAttribute('hidden');
    }
    //Password6 Pista-Imagen
    if (hours < 24 && localStorage.getItem(`password6`) === 'desbloqueada' && localStorage.getItem(`password7`) !== 'desbloqueada') {
        document.querySelectorAll('#images img')[5].src = 'img/foto6.png';

    } else if (localStorage.getItem(`password6`) === 'desbloqueada' && localStorage.getItem(`password7`) === 'desbloqueada') {
        document.querySelectorAll('#images img')[5].src = 'img/foto6.png';
    }
    //Password7 Pista-Imagen
    if (hours < 24 && localStorage.getItem(`password7`) === 'desbloqueada' && localStorage.getItem(`password8`) !== 'desbloqueada') {
        document.querySelectorAll('#images img')[6].src = 'img/foto7.png';
    } else if (localStorage.getItem(`password7`) === 'desbloqueada' && localStorage.getItem(`password8`) === 'desbloqueada') {
        document.querySelectorAll('#images img')[6].src = 'img/foto7.png';
    }
    //Password8 Imagen-Pista
    if (hours < 24 && localStorage.getItem(`password8`) === 'desbloqueada' && localStorage.getItem(`password9`) !== 'desbloqueada') {
        document.querySelectorAll('#images p')[7].innerText = 'Escucha al melendi navideño...';
        document.querySelectorAll('#images button')[7].removeAttribute('hidden');
    } else if (localStorage.getItem(`password8`) === 'desbloqueada' && localStorage.getItem(`password9`) === 'desbloqueada') {
        document.querySelectorAll('#images p')[7].innerText = 'Escucha al melendi navideño...';
        document.querySelectorAll('#images button')[7].removeAttribute('hidden');
    }
    //Password9 Pista-Imagen
    if (hours < 24 && localStorage.getItem(`password9`) === 'desbloqueada' && localStorage.getItem(`password10`) !== 'desbloqueada') {
        document.querySelectorAll('#images img')[8].src = 'img/foto9.png';
    } else if (localStorage.getItem(`password9`) === 'desbloqueada' && localStorage.getItem(`password10`) === 'desbloqueada') {
        document.querySelectorAll('#images img')[8].src = 'img/foto9.png';
    }
    //Password10 Pista-Imagen
    //Password11 Pista-Imagen
    //Password12 Pista+Imagen

    // Verificar si la bandera está en localStorage
    if (localStorage.getItem('perderVida') === 'true') {
        localStorage.removeItem('perderVida');
        perderVida();
    }

    if (localStorage.getItem(`pista12`) === 'desbloqueada') {
        document.getElementById('timer').innerText = "Enhorabuena!";
    }else{
        document.getElementById('timer').innerText = formatTime(hours) + "h:" + formatTime(minutes) + "m:" + formatTime(seconds) + "s";
    }
}

// Función para formatear el tiempo
function formatTime(time) {
    return time < 10 ? "0" + time : time;
}

function perderVida() {
    vidas--;
    localStorage.setItem('vidas', vidas);
    actualizarVidas();
    if (vidas == 0) {
        document.body.classList.add('blackout');
        document.getElementById('gameOverMessage').style.display = 'flex';
        Swal.fire({
            icon: 'info',
            title: 'Has Perdido todas las vidas',
            text: 'Se acabó el juego.',
            confirmButtonText: 'NOO',
        });
        return;
    } else if (vidas > 0) {
        // Lista de pistas para cada contraseña
        const pistas = [
            'Pista para password1',
            'Lo cantamos juntos en Navidad',
            'En Madrid',
            '¿Gri-Gri?',
            'Pero si eras la mejor!',
            'Es un perro futbolista navideño',
            '¿Ilumina?',
            'A lo mejor en vez de 2, tienes que desplazar MUCHO más',
            'No puedes tener miedo a MELENDI',
            'No hay un orden especifico en los desplazamientos',
            'Joe empieza a contar JAJA, que te de pistas tu novio',
            'Canción'
        ];
        // Verificar las primeras 4 contraseñas y luego la caja1
        for (let i = 1; i <= 4; i++) {
            if (localStorage.getItem(`password${i}`) !== 'desbloqueada') {
                Swal.fire({
                    icon: 'success',
                    title: 'Pista Final Contraseña ' + i,
                    text: pistas[i - 1],
                    confirmButtonText: 'Vale',
                });
                iniciarTemporizador(24);
                return;  // Salir de la función si una contraseña no está desbloqueada
            }
        }

        if (localStorage.getItem('caja1') !== 'desbloqueada') {
            Swal.fire({
                icon: 'success',
                title: 'Pista Final Caja 1',
                text: '¿Pulsar muchas veces el 3?',
                confirmButtonText: 'Vale',
            });
            iniciarTemporizador(24);
            return;  // Salir de la función si la caja1 no está desbloqueada
        }

        // Verificar las siguientes 4 contraseñas y luego la caja2
        for (let i = 5; i <= 8; i++) {
            if (localStorage.getItem(`password${i}`) !== 'desbloqueada') {
                Swal.fire({
                    icon: 'success',
                    title: 'Pista Final ' + i,
                    text: pistas[i - 1],
                    confirmButtonText: 'Vale',
                });
                iniciarTemporizador(24);
                return;  // Salir de la función si una contraseña no está desbloqueada
            }
        }

        if (localStorage.getItem('caja2') !== 'desbloqueada') {
            Swal.fire({
                icon: 'success',
                title: 'Pista Final Caja 2',
                text: '¿sota?',
                confirmButtonText: 'Vale',
            });
            iniciarTemporizador(24);
            return;  // Salir de la función si la caja2 no está desbloqueada
        }

        // Verificar las últimas 4 contraseñas y luego la caja3
        for (let i = 9; i <= 12; i++) {
            if (localStorage.getItem(`password${i}`) !== 'desbloqueada') {
                Swal.fire({
                    icon: 'success',
                    title: 'Pista Final ' + i,
                    text: pistas[i - 1],
                    confirmButtonText: 'Vale',
                });
                iniciarTemporizador(24);
                return;  // Salir de la función si una contraseña no está desbloqueada
            }
        }

        if (localStorage.getItem('caja3') !== 'desbloqueada') {
            Swal.fire({
                icon: 'success',
                title: 'Pista Final Caja 2',
                text: 'La fecha de los regalos!',
                confirmButtonText: 'Vale',
            });
            iniciarTemporizador(24);
            return;  // Salir de la función si la caja3 no está desbloqueada
        }
    }
}

function actualizarVidas() {
    const vidasElements = document.querySelectorAll('#vidas .vida');
    vidasElements.forEach((vida, index) => {
        if (index < vidas) {
            vida.style.display = 'inline';
        } else {
            vida.style.display = 'none';
        }
    });
}

//Comprobar enter contraseña1
document.addEventListener("DOMContentLoaded", function () {
    const passwordInput = document.getElementById("password1");
    function handleEnterKey(event) {
        if (event.key === "Enter" || event.keyCode === 13) {
            event.preventDefault(); 
            checkPassword1();
        }
    }
    passwordInput.addEventListener("keydown", handleEnterKey);
});
//Comprobar enter contraseña2
document.addEventListener("DOMContentLoaded", function () {
    const passwordInput = document.getElementById("password2");
    passwordInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            checkPassword2();
        }
    });
});
//Comprobar enter contraseña3
document.addEventListener("DOMContentLoaded", function () {
    const passwordInput = document.getElementById("password3");
    passwordInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            checkPassword3();
        }
    });
});
//Comprobar enter contraseña4
document.addEventListener("DOMContentLoaded", function () {
    const passwordInput = document.getElementById("password4");
    passwordInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            checkPassword4();
        }
    });
});
//Comprobar enter contraseña5
document.addEventListener("DOMContentLoaded", function () {
    const passwordInput = document.getElementById("password5");
    passwordInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            checkPassword5();
        }
    });
});
//Comprobar enter contraseña6
document.addEventListener("DOMContentLoaded", function () {
    const passwordInput = document.getElementById("password6");
    passwordInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            checkPassword6();
        }
    });
});
//Comprobar enter contraseña7
document.addEventListener("DOMContentLoaded", function () {
    const passwordInput = document.getElementById("password7");
    passwordInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            checkPassword7();
        }
    });
});
//Comprobar enter contraseña8
document.addEventListener("DOMContentLoaded", function () {
    const passwordInput = document.getElementById("password8");
    passwordInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            checkPassword8();
        }
    });
});
//Comprobar enter contraseña9
document.addEventListener("DOMContentLoaded", function () {
    const passwordInput = document.getElementById("password9");
    passwordInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            checkPassword9();
        }
    });
});
//Comprobar enter contraseña10
document.addEventListener("DOMContentLoaded", function () {
    const passwordInput = document.getElementById("password10");
    passwordInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            checkPassword10();
        }
    });
});
//Comprobar enter contraseña11
document.addEventListener("DOMContentLoaded", function () {
    const passwordInput = document.getElementById("password11");
    passwordInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            checkPassword11();
        }
    });
});
//Comprobar enter contraseña12
document.addEventListener("DOMContentLoaded", function () {
    const passwordInput = document.getElementById("password12");
    passwordInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            checkPassword12();
        }
    });
});
//Comprobar enter caja2
document.addEventListener("DOMContentLoaded", function () {
    const passwordInput = document.getElementById("passwordcaja2");
    passwordInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            abrirCaja2();
        }
    });
});

// Función para verificar la contraseña1 (Hoja -> Desbloquea Pista-Imagen)
function checkPassword1() {
    var password1 = document.getElementById('password1').value.toLowerCase();

    // Verifica si las contraseña es correcta
    if (password1 === 'navidad') {
        Swal.fire({
            icon: 'success',
            title: 'Enhorabuena has acertado la primera contraseña',
            text: 'Se ha desbloqueado una pista, cuando le queden 6 horas al temporizador, se desbloqueara una imagen de la misma, tienes 12 horas para resolver el acertijo o perderás una vida!',
            confirmButtonText: 'Vale',
        });
        //Guardado contraseña
        password1.disabled = true;
        const input = document.getElementById(`password1`);
        const img = document.querySelector(`#pass1 img`);
        input.value = "";
        input.placeholder = "Desbloqueada";
        input.disabled = true;
        img.src = "img/candadoA.png";
        localStorage.setItem(`password1`, 'desbloqueada');

        //Nueva Pista
        document.querySelectorAll('#images p')[0].innerText = 'lnoiclaivc';
        document.querySelectorAll('#images button')[0].removeAttribute('hidden');
        localStorage.setItem(`pista1`, 'desbloqueada');

        // Iniciar nuevo temporizador de 12 horas
        iniciarTemporizador(12);

    } else if (localStorage.getItem(`pista1`) === 'desbloqueada') {
        Swal.fire({
            icon: 'success',
            title: 'Primera contraseña desbloqueada',
            text: 'Se desbloqueó una pista, cuando le queden 6 horas al temporizador, se desbloquea una imagen de la misma, tienes 12 horas para resolver el acertijo o perderás una vida!',
            confirmButtonText: 'Vale',
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Contraseña Incorrecta',
            text: 'Lee bien la pista',
            confirmButtonText: 'Jo',
        });
    }
}
// Función para verificar la contraseña2 (Anagrama1 -> Desbloquea Imagen-Pista)
function checkPassword2() {
    var password2 = document.getElementById('password2').value.toLowerCase();

    // Verifica si las contraseñas son correctas
    if (password2 === 'villancico') {
        Swal.fire({
            icon: 'success',
            title: 'Enhorabuena has acertado la segunda contraseña',
            text: 'Se ha desbloqueado una imagen, en 6 horas se desbloqueara una pista, tienes de nuevo 12 horas!',
            confirmButtonText: 'Vale',
        });
        //Guardado contraseña
        password2.disabled = true;
        const input = document.getElementById(`password2`);
        const img = document.querySelector(`#pass2 img`);

        input.value = "";
        input.placeholder = "Desbloqueada";
        input.disabled = true;
        img.src = "img/candadoA.png";
        localStorage.setItem(`password2`, 'desbloqueada');

        //Nueva Imagen
        document.querySelectorAll('#images img')[1].src = 'img/foto2.png';
        localStorage.setItem(`pista2`, 'desbloqueada');

        // Iniciar nuevo temporizador de 12 horas
        iniciarTemporizador(12)

    } else if (localStorage.getItem(`pista2`) === 'desbloqueada') {
        Swal.fire({
            icon: 'success',
            title: 'Segunda contraseña desbloqueada',
            text: 'Se desbloqueó una imagen, en 6 horas se desbloqueara una pista, tienes de nuevo 12 horas!',
            confirmButtonText: 'Vale',
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Contraseña Incorrecta',
            text: 'Revisa la pista bien',
            confirmButtonText: 'Jo',
        });
    }
}
// Función para verificar la contraseña3 (Codificado1 -> Desbloquea Pista+Imagen)
function checkPassword3() {
    var password3 = document.getElementById('password3').value.toLowerCase();

    // Verifica si las contraseñas son correctas
    if (password3 === 'luces') {
        Swal.fire({
            icon: 'success',
            title: 'Enhorabuena, has acertado la tercera contraseña!',
            text: 'Se ha desbloqueado una imagen y una pista',
            confirmButtonText: 'Vale',
        });
        //Guardado contraseña
        password3.disabled = true;
        const input = document.getElementById(`password3`);
        const img = document.querySelector(`#pass3 img`);

        input.value = "";
        input.placeholder = "Desbloqueada";
        input.disabled = true;
        img.src = "img/candadoA.png";
        localStorage.setItem(`password3`, 'desbloqueada');

        //Nueva Pista e Imagen
        document.querySelectorAll('#images p')[2].innerText = 'En un cuarto me hallo, sin moverme de lugar.';
        document.querySelectorAll('#images button')[2].removeAttribute('hidden');
        localStorage.setItem(`pista3`, 'desbloqueada');
        document.querySelectorAll('#images img')[2].src = 'img/foto3.png';

        // Iniciar nuevo temporizador de 12 horas
        iniciarTemporizador(12);

    } else if (localStorage.getItem(`pista3`) === 'desbloqueada') {
        Swal.fire({
            icon: 'success',
            title: 'Tercera contraseña desbloqueada!',
            text: 'Se desbloqueó una imagen y una pista',
            confirmButtonText: 'Vale',
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Contraseña Incorrecta',
            text: 'Fíjate bien',
            confirmButtonText: 'Jo',
        });
    }
}
// Función para verificar la contraseña4 (Adivinanza -> Desbloquea Pista de Caja1(Imagen-Pista))
function checkPassword4() {
    var password4 = document.getElementById('password4').value.toLowerCase();

    // Verifica si las contraseña es correcta
    if (password4 === 'grillo' || password4 === 'jack') {
        Swal.fire({
            icon: 'success',
            title: 'Enhorabuena has acertado la cuarta contraseña, es el turno de abrir la caja de bronce:',
            text: 'salup tser choum odaros le',
            confirmButtonText: 'Vale',
        });
        //Guardado contraseña
        password4.disabled = true;
        const input = document.getElementById(`password4`);
        const img = document.querySelector(`#pass4 img`);

        input.value = "";
        input.placeholder = "Desbloqueada";
        input.disabled = true;
        img.src = "img/candadoA.png";
        localStorage.setItem(`password4`, 'desbloqueada');
        document.querySelector('header').style.backgroundColor = '#865a0842';
        document.getElementById('cajas').style.backgroundColor = '#865a0842';
        document.querySelector('main').style.backgroundColor = '#865a0842';

        // Iniciar nuevo temporizador de 12 horas
        iniciarTemporizador(12);

    } else if (localStorage.getItem(`password4`) === 'desbloqueada' && localStorage.getItem(`caja1`) != 'desbloqueada') {
        Swal.fire({
            icon: 'success',
            title: 'Es el turno de abrir la caja de bronce:',
            text: 'salup tser choum odaros le',
            confirmButtonText: 'Vale',
        });
    } else if (localStorage.getItem(`pista4`) === 'desbloqueada' && localStorage.getItem(`caja1`) === 'desbloqueada') {
        Swal.fire({
            icon: 'success',
            title: 'Enhorabuena has desbloqueado la cuarta contraseña y abierto la caja de bronce!',
            text: 'Se ha desbloqueado una nueva imagen y más tarde una pista, suerte!',
            confirmButtonText: 'Vale',
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Contraseña Incorrecta',
            text: 'Piensalo bien',
            confirmButtonText: 'Jo',
        });
    }
}
// Función para verificar la contraseña5 (Imagenes -> Desbloquea Imagen-Pista)
function checkPassword5() {
    var password5 = document.getElementById('password5').value.toLowerCase();

    // Verifica si las contraseña es correcta
    if (password5 === 'misinaparda') {
        Swal.fire({
            icon: 'success',
            title: 'Quinta contraseña correcta!',
            text: 'Se ha desbloqueado una imagen y una pista más tarde!',
            confirmButtonText: 'Vale',
        });
        //Guardado contraseña
        password5.disabled = true;
        const input = document.getElementById(`password5`);
        const img = document.querySelector(`#pass5 img`);

        input.value = "";
        input.placeholder = "Desbloqueada";
        input.disabled = true;
        img.src = "img/candadoA.png";
        localStorage.setItem(`password5`, 'desbloqueada');

        //Nueva Imagen+Pista;
        const image = document.querySelectorAll('#images img')[4];
        // Crea un nuevo enlace
        const link = document.createElement('a');
        link.href = 'Rompecabezas/rompecabezas.html';
        // Clona la imagen y añade el nuevo src
        const clonedImage = image.cloneNode(true);
        clonedImage.src = 'img/foto5.png';
        link.appendChild(clonedImage);
        image.parentNode.replaceChild(link, image);
        localStorage.setItem(`pista5`, 'desbloqueada');

        // Iniciar nuevo temporizador de 12 horas
        iniciarTemporizador(12);

    } else if (localStorage.getItem(`pista5`) === 'desbloqueada') {
        Swal.fire({
            icon: 'success',
            title: 'Quinta contraseña correcta!',
            text: 'Se ha desbloqueado una imagen y una pista más tarde!',
            confirmButtonText: 'Vale',
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Contraseña Incorrecta',
            text: 'Te quiero amor, pero no',
            confirmButtonText: 'Jo',
        });
    }
}
// Función para verificar la contraseña6 (Rompecabezas -> Desbloquea Pista-Imagen)
function checkPassword6() {
    var password6 = document.getElementById('password6').value.toLowerCase();

    // Verifica si las contraseña es correcta
    if (password6 === 'ronaldonavideño') {
        Swal.fire({
            icon: 'success',
            title: 'Sexta contraseña correcta!',
            text: 'Se ha desbloqueado una pista y una imagen más tarde!',
            confirmButtonText: 'Vale',
        });
        //Guardado contraseña
        password6.disabled = true;
        const input = document.getElementById(`password6`);
        const img = document.querySelector(`#pass6 img`);

        input.value = "";
        input.placeholder = "Desbloqueada";
        input.disabled = true;
        img.src = "img/candadoA.png";
        localStorage.setItem(`password6`, 'desbloqueada');

        //Nueva Pista e Imagen
        document.querySelectorAll('#images p')[5].innerText = 'Soy guía y sin igual, ayudo a los sabios. En lo alto de dos cosas me puedes hallar, ¿qué soy, cada Navidad?';
        document.querySelectorAll('#images button')[5].removeAttribute('hidden');
        localStorage.setItem(`pista6`, 'desbloqueada');

        // Iniciar nuevo temporizador de 12 horas
        iniciarTemporizador(12);

    } else if (localStorage.getItem(`pista6`) === 'desbloqueada') {
        Swal.fire({
            icon: 'success',
            title: 'Sexta contraseña correcta!',
            text: 'Se desbloqueó una pista y una imagen más tarde!',
            confirmButtonText: 'Vale',
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Contraseña Incorrecta',
            text: 'Ten paciencia',
            confirmButtonText: 'Jo',
        });
    }
}
// Función para verificar la contraseña7 (Adivinanza -> Desbloquea Pista-Imagen)
function checkPassword7() {
    var password7 = document.getElementById('password7').value.toLowerCase();

    // Verifica si las contraseña es correcta
    if (password7 === 'estrella') {
        Swal.fire({
            icon: 'success',
            title: 'Septima contraseña correcta muy bien',
            text: 'Se ha desbloqueado una pista y una imagen después!',
            confirmButtonText: 'Vale',
        });
        //Guardado contraseña;
        password7.disabled = true;
        const input = document.getElementById(`password7`);
        const img = document.querySelector(`#pass7 img`);

        input.value = "";
        input.placeholder = "Desbloqueada";
        input.disabled = true;
        img.src = "img/candadoA.png";
        localStorage.setItem(`password7`, 'desbloqueada');

        //Nueva Pista e Imagen
        document.querySelectorAll('#images p')[6].innerText = 'LIBTEHLVHGTFHL';
        document.querySelectorAll('#images button')[6].removeAttribute('hidden');
        localStorage.setItem(`pista7`, 'desbloqueada');

        // Iniciar nuevo temporizador de 12 horas
        iniciarTemporizador(12);

    } else if (localStorage.getItem(`pista7`) === 'desbloqueada') {
        Swal.fire({
            icon: 'success',
            title: 'Septima contraseña correcta muy bien',
            text: 'Se ha desbloqueado una pista y una imagen después!',
            confirmButtonText: 'Vale',
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Contraseña Incorrecta',
            text: 'Es más dificil eh',
            confirmButtonText: 'Jo',
        });
    }
}
// Función para verificar la contraseña8 (Codificado2 -> Desbloquea Pista de Caja2(Imagen-Pista))
function checkPassword8() {
    var password8 = document.getElementById('password8').value.toLowerCase();

    // Verifica si las contraseña es correcta
    if (password8 === 'regalosconamor') {
        Swal.fire({
            icon: 'success',
            title: 'Octava contraseña correcta, es el turno de abrir la caja de plata:',
            text: '¿sota?',
            confirmButtonText: 'Vale',
        });
        //Guardado contraseña
        password8.disabled = true;
        const input = document.getElementById(`password8`);
        const img = document.querySelector(`#pass8 img`);

        input.value = "";
        input.placeholder = "Desbloqueada";
        input.disabled = true;
        img.src = "img/candadoA.png";
        localStorage.setItem(`password8`, 'desbloqueada');
        document.querySelector('header').style.backgroundColor = '#8181813d';
        document.getElementById('cajas').style.backgroundColor = '#8181813d';
        document.querySelector('main').style.backgroundColor = '#8181813d';

        // Iniciar nuevo temporizador de 12 horas
        iniciarTemporizador(12);

    } else if (localStorage.getItem(`password8`) === 'desbloqueada' && localStorage.getItem(`caja2`) != 'desbloqueada') {
        Swal.fire({
            icon: 'success',
            title: 'Es el turno de abrir la caja de plata:',
            text: '¿sota?',
            confirmButtonText: 'Vale',
        });
    } else if (localStorage.getItem(`pista8`) === 'desbloqueada' && localStorage.getItem(`caja2`) === 'desbloqueada') {
        Swal.fire({
            icon: 'success',
            title: 'Enhorabuena has desbloqueado la octava contraseña y abierto la caja de plata!',
            text: 'Se desbloqueó una nueva imagen y más tarde una pista, suerte!',
            confirmButtonText: 'Vale',
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Contraseña Incorrecta',
            text: 'JiJiJi',
            confirmButtonText: 'Jo',
        });
    }
}
// Función para verificar la contraseña9 (Demonio -> Desbloquea Pista-Imagen)
function checkPassword9() {
    var password9 = document.getElementById('password9').value.toLowerCase();

    // Verifica si las contraseña es correcta
    if (password9 === 'miedumiedu') {
        Swal.fire({
            icon: 'success',
            title: 'Novena contraseña correcta!',
            text: 'Se ha desbloqueado una pista y una imagen más tarde!',
            confirmButtonText: 'Vale',
        });
        //Guardado contraseña
        password9.disabled = true;
        const input = document.getElementById(`password9`);
        const img = document.querySelector(`#pass9 img`);

        input.value = "";
        input.placeholder = "Desbloqueada";
        input.disabled = true;
        img.src = "img/candadoA.png";
        localStorage.setItem(`password9`, 'desbloqueada');

        //Nueva Pista e Imagen
        document.querySelectorAll('#images p')[8].innerText = 'FMQHRWQYQWVDC';
        document.querySelectorAll('#images button')[8].removeAttribute('hidden');
        localStorage.setItem(`pista9`, 'desbloqueada');

        // Iniciar nuevo temporizador de 12 horas
        iniciarTemporizador(12);

    } else if (localStorage.getItem(`pista9`) === 'desbloqueada') {
        Swal.fire({
            icon: 'success',
            title: 'Novena contraseña correcta!',
            text: 'Se desbloqueó una pista y una imagen se desbloqueará más tarde!',
            confirmButtonText: 'Vale',
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Contraseña Incorrecta',
            text: 'Suerte huyendo de Melendi demoniaco',
            confirmButtonText: 'Jo',
        });
    }
}
// Función para verificar la contraseña10 (Codificado3 -> Desbloquea Pista+Imagen)
function checkPassword10() {
    var password10 = document.getElementById('password10').value.toLowerCase();

    // Verifica si las contraseña es correcta
    if (password10 === 'christmastree') {
        Swal.fire({
            icon: 'success',
            title: 'Décima contraseña correcta!',
            text: 'Se ha desbloqueado una pista y una imagen!',
            confirmButtonText: 'Vale',
        });
        //Guardado contraseña
        password10.disabled = true;
        const input = document.getElementById(`password10`);
        const img = document.querySelector(`#pass10 img`);

        input.value = "";
        input.placeholder = "Desbloqueada";
        input.disabled = true;
        img.src = "img/candadoA.png";
        localStorage.setItem(`password10`, 'desbloqueada');

        //Nueva Pista
        document.querySelectorAll('#images p')[9].innerText = '1.Suma todos los cepillos de tu casa y de la de Adrián. 2.Sumale también todos los cristales transparentes sin contar espejos, ni cuadros, ni fotos, ni aparatos de cocina de las dos casas. 3.Multiplica los dos resultados luego elevelo al cubo y restales todas las sillas/taburetes de las dos casas.';
        document.querySelectorAll('#images button')[9].removeAttribute('hidden');
        document.querySelectorAll('#images img')[9].src = 'img/foto10.png';
        localStorage.setItem(`pista10`, 'desbloqueada');

        // Iniciar nuevo temporizador de 12 horas
        iniciarTemporizador(12);

    } else if (localStorage.getItem(`pista10`) === 'desbloqueada') {
        Swal.fire({
            icon: 'success',
            title: 'Décima contraseña correcta!',
            text: 'Se desbloqueó una pista y una imagen!',
            confirmButtonText: 'Vale',
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Contraseña Incorrecta',
            text: 'Es raro, ¿verdad?',
            confirmButtonText: 'Jo',
        });
    }
}
// Función para verificar la contraseña11 (ClaveSecreta -> Desbloquea Pista+Imagen)
function checkPassword11() {
    var password11 = document.getElementById('password11').value.toLowerCase();

    // Verifica si las contraseña es correcta
    if (password11 === '262119') {
        Swal.fire({
            icon: 'success',
            title: 'Undécima contraseña correcta!',
            text: 'Se ha desbloqueado una pista y una imagen!',
            confirmButtonText: 'Vale',
        });
        //Guardado contraseña
        password11.disabled = true;
        const input = document.getElementById(`password11`);
        const img = document.querySelector(`#pass11 img`);

        input.value = "";
        input.placeholder = "Desbloqueada";
        input.disabled = true;
        img.src = "img/candadoA.png";
        localStorage.setItem(`password11`, 'desbloqueada');

        //Nueva Imagen
        document.querySelectorAll('#images p')[10].innerText = 'Paola es __________';
        document.querySelectorAll('#images button')[10].removeAttribute('hidden');
        const image = document.querySelectorAll('#images img')[10];
        // Crea un nuevo enlace
        const link = document.createElement('a');
        link.href = 'Pokemon/pokemon.html';
        // Clona la imagen y añade el nuevo src
        const clonedImage = image.cloneNode(true);
        clonedImage.src = 'img/foto11.png';
        link.appendChild(clonedImage);
        image.parentNode.replaceChild(link, image);
        localStorage.setItem(`pista11`, 'desbloqueada');

        // Iniciar nuevo temporizador de 12 horas
        iniciarTemporizador(12);

    } else if (localStorage.getItem(`pista11`) === 'desbloqueada') {
        Swal.fire({
            icon: 'success',
            title: 'Undécima contraseña correcta!',
            text: 'Se ha desbloqueado una pista y una imagen!',
            confirmButtonText: 'Vale',
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Contraseña Incorrecta',
            text: 'Que porro, no?',
            confirmButtonText: 'Jo',
        });
    }
}
// Función para verificar la contraseña12 (Pokemon -> Desbloquea Pista de Caja3(Pista+Imagen))
function checkPassword12() {
    var password12 = document.getElementById('password12').value.toLowerCase();

    // Verifica si las contraseña es correcta
    if (password12 === 'misolmiluz') {
        Swal.fire({
            icon: 'success',
            title: 'Duodécima contraseña correcta! La caja de oro te espera:',
            text: '¿Cuál es la fecha de hoy?',
            confirmButtonText: 'Vale',
        });
        //Guardado contraseña
        password12.disabled = true;
        const input = document.getElementById(`password12`);
        const img = document.querySelector(`#pass12 img`);

        input.value = "";
        input.placeholder = "Desbloqueada";
        input.disabled = true;
        img.src = "img/candadoA.png";
        localStorage.setItem(`password12`, 'desbloqueada');
        document.querySelector('header').style.backgroundColor = '#ebd45349';
        document.getElementById('cajas').style.backgroundColor = '#ebd45349';
        document.querySelector('main').style.backgroundColor = '#ebd45349'

        // Iniciar nuevo temporizador de 72 horas
        iniciarTemporizador(72);

    } else if (localStorage.getItem(`password12`) === 'desbloqueada' && localStorage.getItem(`caja3`) != 'desbloqueada') {
        Swal.fire({
            icon: 'success',
            title: 'Duodécima contraseña correcta! La caja de oro te espera:',
            text: 'Enhorabuena amor, puedes abrir los regalos si pones la fecha de hoy.',
            confirmButtonText: 'Vale',
        });
    } else if (localStorage.getItem(`pista12`) === 'desbloqueada' && localStorage.getItem(`caja3`) === 'desbloqueada') {
        Swal.fire({
            icon: 'success',
            title: 'Enhorabuena has desbloqueado todas las contraseñas, las tres cajas y los regalos!',
            text: 'Se desbloqueó la última pista e imagen.',
            confirmButtonText: 'Vale',
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Contraseña Incorrecta',
            text: 'Tú sabrás',
            confirmButtonText: 'Jo',
        });
    }
}

function incrementarContadorCaja1() {
    clickCount++;
    if (clickCount === 10 && localStorage.getItem(`caja1`) != 'desbloqueada' && localStorage.getItem(`pista3`) === 'desbloqueada') {
        abrirCaja1();
    }
}

function abrirCaja1() {
    document.getElementById('cajaImagen1').src = 'img/Caja1A.png';

    Swal.fire({
        icon: 'success',
        title: 'HAS ABIERTO LA CAJA DE BRONCE',
        text: 'Enhorabuena, se ha desbloqueado una imagen y más tarde una pista!',
        confirmButtonText: 'OLE',
    });
    localStorage.setItem(`caja1`, 'desbloqueada');
    document.querySelector('header').style.backgroundColor = '#f0f0f0';
    document.getElementById('cajas').style.backgroundColor = '#c446ff23';
    document.querySelector('main').style.backgroundColor = 'white';

    //Nueva Imagen para contraseña 5
    const image = document.querySelectorAll('#images img')[3];
        // Crea un nuevo enlace
        const link = document.createElement('a');
        link.href = 'BuscaMisina/buscar.html';
        // Clona la imagen y añade el nuevo src
        const clonedImage = image.cloneNode(true);
        clonedImage.src = 'img/foto4.png';
        link.appendChild(clonedImage);
        image.parentNode.replaceChild(link, image);
        localStorage.setItem(`pista4`, 'desbloqueada');

    // Iniciar nuevo temporizador de 12 horas
    iniciarTemporizador(12);
}

function abrirCaja2() {
    const palabra = document.getElementById("passwordcaja2").value.toLowerCase();
    if (palabra === "campeona") {
        const input = document.getElementById(`passwordcaja2`);
        const img = document.querySelector(`#caja2 img`);

        input.disabled = true;
        input.placeholder = "!!!Caja 2 abierta,  ya solo te queda una!!!";
        img.src = "img/Caja2A.png";

        Swal.fire({
            icon: 'success',
            title: 'HAS ABIERTO LA CAJA DE PLATA',
            text: 'Enhorabuena! Se ha desbloqueado una nueva imagen y más tarde una pista!',
            confirmButtonText: 'OLE',
        });
        localStorage.setItem(`caja2`, 'desbloqueada');
        document.querySelector('header').style.backgroundColor = '#f0f0f0';
        document.getElementById('cajas').style.backgroundColor = '#c446ff23';
        document.querySelector('main').style.backgroundColor = 'white';

        //Nueva Imagen para contraseña 9
        localStorage.setItem(`pista8`, 'desbloqueada');

        const image = document.querySelectorAll('#images img')[7];
        // Crea un nuevo enlace
        const link = document.createElement('a');
        link.href = 'Demonio/demonio.html';
        // Clona la imagen y añade el nuevo src
        const clonedImage = image.cloneNode(true);
        clonedImage.src = 'img/foto8.png';
        link.appendChild(clonedImage);
        image.parentNode.replaceChild(link, image);

        // Iniciar nuevo temporizador de 12 horas
        iniciarTemporizador(12);

    } else if (palabra === "sota") {
        Swal.fire({
            icon: 'success',
            title: 'Te va a tocar jugar a las cartas otra vez',
            text: 'Si ganas al demonio, te dirá la siguiente contraseña.',
            confirmButtonText: 'Ganaré',
            willClose: () => {
                window.location.href = 'Sota/index.html';
            }
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Contraseña incorrecta',
            text: 'La contraseña no es correcta',
            confirmButtonText: ':(',
        });
    }
}

// Función para girar la manecilla de la caja
function turnCaja(direction) {
    // Solo permitir modificar el siguiente dial después de presionar "Siguiente"
    if (Math.abs(dialPosition) === 1) {
        document.getElementById(`dial2`).innerText = (parseInt(document.getElementById(`dial2`).innerText) + direction + 100) % 100;
    } else if (Math.abs(dialPosition) === 2) {
        document.getElementById(`dial3`).innerText = (parseInt(document.getElementById(`dial3`).innerText) + direction + 100) % 100;
    } else if (Math.abs(dialPosition) === 3) {
        document.getElementById(`dial4`).innerText = (parseInt(document.getElementById(`dial4`).innerText) + direction + 100) % 100;
    } else if (Math.abs(dialPosition) === 4) {
        document.getElementById(`dial5`).innerText = (parseInt(document.getElementById(`dial5`).innerText) + direction + 100) % 100;
    } else if (Math.abs(dialPosition) === 5) {
        document.getElementById(`dial6`).innerText = (parseInt(document.getElementById(`dial6`).innerText) + direction + 100) % 100;
    } else {
        document.getElementById('dial1').classList.remove('incorrecto');
        document.getElementById('dial2').classList.remove('incorrecto');
        document.getElementById('dial3').classList.remove('incorrecto');
        document.getElementById('dial4').classList.remove('incorrecto');
        document.getElementById('dial5').classList.remove('incorrecto');
        document.getElementById('dial6').classList.remove('incorrecto');
        document.getElementById(`dial1`).innerText = (parseInt(document.getElementById(`dial1`).innerText) + direction + 100) % 100;
    }
}

function siguienteDial() {
    // Permitir pasar al siguiente dial solo después de modificar el dial actual
    if (Math.abs(dialPosition) === 0) {
        document.getElementById('dial1').classList.remove('incorrecto');
        document.getElementById('dial2').classList.remove('incorrecto');
        document.getElementById('dial3').classList.remove('incorrecto');
        document.getElementById('dial4').classList.remove('incorrecto');
        document.getElementById('dial5').classList.remove('incorrecto');
        document.getElementById('dial6').classList.remove('incorrecto');
        document.getElementById('dial1').classList.add('marcado');
        dialPosition = 1; // Mover al siguiente dial
    } else if (Math.abs(dialPosition) === 1) {
        document.getElementById('dial2').classList.add('marcado');
        dialPosition = 2; // Mover al siguiente dial
    } else if (Math.abs(dialPosition) === 2) {
        document.getElementById('dial3').classList.add('marcado');
        dialPosition = 3; // Mover al siguiente dial
    } else if (Math.abs(dialPosition) === 3) {
        ;
        document.getElementById('dial4').classList.add('marcado');
        dialPosition = 4; // Mover al siguiente dial
    } else if (Math.abs(dialPosition) === 4) {
        document.getElementById('dial5').classList.add('marcado');
        dialPosition = 5; // Mover al siguiente dial
    } else if (Math.abs(dialPosition) === 5) {
        document.getElementById('dial6').classList.add('marcado');
        verificarCodigoCaja3(); // Verificar código al llegar al sexto dial
    }
}

function verificarCodigoCaja3() {
    var now = new Date();
    const today = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;
    // Verificar si el código es correcto
    if (document.getElementById('dial1').innerText === '29' && document.getElementById('dial2').innerText === '12' && document.getElementById('dial3').innerText === '2' && document.getElementById('dial4').innerText === '0' && document.getElementById('dial5').innerText === '2' && document.getElementById('dial6').innerText === '4' && today === '29/12/2024') {
        // Cambios caja al abrirse.
        document.getElementById('dial1').classList.remove('marcado');
        document.getElementById('dial2').classList.remove('marcado');
        document.getElementById('dial3').classList.remove('marcado');
        document.getElementById('dial4').classList.remove('marcado');
        document.getElementById('dial5').classList.remove('marcado');
        document.getElementById('dial6').classList.remove('marcado');
        document.getElementById('dial1').classList.add('correcto');
        document.getElementById('dial2').classList.add('correcto');
        document.getElementById('dial3').classList.add('correcto');
        document.getElementById('dial4').classList.add('correcto');
        document.getElementById('dial5').classList.add('correcto');
        document.getElementById('dial6').classList.add('correcto');
        document.getElementById('botones-container').style.display = 'none';
        document.getElementById('cajaImagen3').src = 'img/Caja3A.png';

        Swal.fire({
            title: "HAS ABIERTO LA CAJA DE ORO!",
            confirmButtonText: 'OLE',
            width: 600,
            padding: "3em",
            background: "#716add url(img/Caja3A.png) no-repeat center center",
            backdrop: `
              rgba(0,0,123,0.4)
              url("img/cat.gif")
              left top
              no-repeat
            `
          });

        localStorage.setItem(`caja3`, 'desbloqueada');
        document.querySelector('header').style.backgroundColor = '#f0f0f0';
        document.getElementById('cajas').style.backgroundColor = '#c446ff23';
        document.querySelector('main').style.backgroundColor = 'white';

        //Nueva Imagen y Comentario Regalos
        document.querySelectorAll('#images p')[11].innerText = 'Enhorabuena, ya puedes recoger tus regalos!';
        document.querySelectorAll('#images button')[11].removeAttribute('hidden');
        document.querySelectorAll('#images img')[11].src = 'img/foto12.png';
        localStorage.setItem(`pista12`, 'desbloqueada');

        // Finalizar temporizador
        localStorage.removeItem('targetDate');

    } else {
        // Mostrar alerta de código incorrecto
        document.getElementById('dial1').classList.remove('marcado');
        document.getElementById('dial2').classList.remove('marcado');
        document.getElementById('dial3').classList.remove('marcado');
        document.getElementById('dial4').classList.remove('marcado');
        document.getElementById('dial5').classList.remove('marcado');
        document.getElementById('dial6').classList.remove('marcado');
        document.getElementById('dial1').classList.add('incorrecto');
        document.getElementById('dial2').classList.add('incorrecto');
        document.getElementById('dial3').classList.add('incorrecto');
        document.getElementById('dial4').classList.add('incorrecto');
        document.getElementById('dial5').classList.add('incorrecto');
        document.getElementById('dial6').classList.add('incorrecto');
        resetDiales();
    }
}

function resetDiales() {
    //Resetea los diales al errar la combinación.
    document.getElementById('dial1').innerText = '0';
    document.getElementById('dial2').innerText = '0';
    document.getElementById('dial3').innerText = '0';
    document.getElementById('dial4').innerText = '0';
    document.getElementById('dial5').innerText = '0';
    document.getElementById('dial6').innerText = '0';
    dialPosition = 0;
}

function mostrarPista(index) {
    //Muestra la pista de la imagen
    var mensaje = document.querySelectorAll('#images p')[index].innerText;
    Swal.fire({
        title: 'Pista:',
        text: mensaje,
        confirmButtonText: 'Entiendo',
    });
}

//Guardar avances
function cargarGuardado() {
    for (let i = 1; i <= 12; i++) {
        //Guardado contraseñas
        if (localStorage.getItem(`password${i}`) === 'desbloqueada') {
            const input = document.getElementById(`password${i}`);
            const img = document.querySelector(`#pass${i} img`);

            input.disabled = true;
            input.placeholder = "Desbloqueada";
            img.src = "img/candadoA.png";
        }
    }

    //Guardado pistas
    if (localStorage.getItem(`pista1`) === 'desbloqueada') {
        document.querySelectorAll('#images p')[0].innerText = 'lnoiclaivc';
        document.querySelectorAll('#images button')[0].removeAttribute('hidden');
    }
    if (localStorage.getItem(`pista2`) === 'desbloqueada') {
        document.querySelectorAll('#images img')[1].src = 'img/foto2.png';
    }
    if (localStorage.getItem(`pista3`) === 'desbloqueada') {
        document.querySelectorAll('#images p')[2].innerText = 'En un cuarto me hallo, sin moverme de lugar.';
        document.querySelectorAll('#images button')[2].removeAttribute('hidden');
        document.querySelectorAll('#images img')[2].src = 'img/foto3.png';
    }
    if (localStorage.getItem(`pista4`) === 'desbloqueada') {
        const image = document.querySelectorAll('#images img')[3];
        // Crea un nuevo enlace
        const link = document.createElement('a');
        link.href = 'BuscaMisina/buscar.html';
        // Clona la imagen y añade el nuevo src
        const clonedImage = image.cloneNode(true);
        clonedImage.src = 'img/foto4.png';
        link.appendChild(clonedImage);
        image.parentNode.replaceChild(link, image);
        localStorage.setItem(`pista4`, 'desbloqueada');
    }
    if (localStorage.getItem(`pista5`) === 'desbloqueada') {
        const image = document.querySelectorAll('#images img')[4];
        // Crea un nuevo enlace
        const link = document.createElement('a');
        link.href = 'Rompecabezas/rompecabezas.html';
        // Clona la imagen y añade el nuevo src
        const clonedImage = image.cloneNode(true);
        clonedImage.src = 'img/foto5.png';
        link.appendChild(clonedImage);
        image.parentNode.replaceChild(link, image);
    }
    if (localStorage.getItem(`pista6`) === 'desbloqueada') {
        document.querySelectorAll('#images p')[5].innerText = 'Soy guía y sin igual, ayudo a los sabios. En lo alto de dos cosas me puedes hallar, ¿qué soy, cada Navidad?';
        document.querySelectorAll('#images button')[5].removeAttribute('hidden');
    }
    if (localStorage.getItem(`pista7`) === 'desbloqueada') {
        document.querySelectorAll('#images p')[6].innerText = 'LIBTEHLVHGTFHL';
        document.querySelectorAll('#images button')[6].removeAttribute('hidden');
    }
    if (localStorage.getItem(`pista8`) === 'desbloqueada') {
        const image = document.querySelectorAll('#images img')[7];
        // Crea un nuevo enlace
        const link = document.createElement('a');
        link.href = 'Demonio/demonio.html';
        // Clona la imagen y añade el nuevo src
        const clonedImage = image.cloneNode(true);
        clonedImage.src = 'img/foto8.png';
        link.appendChild(clonedImage);
        image.parentNode.replaceChild(link, image);
    }
    if (localStorage.getItem(`pista9`) === 'desbloqueada') {
        document.querySelectorAll('#images p')[8].innerText = 'FMQHRWQYQWVDC';
        document.querySelectorAll('#images button')[8].removeAttribute('hidden');
    }
    if (localStorage.getItem(`pista10`) === 'desbloqueada') {
        document.querySelectorAll('#images p')[9].innerText = '1.Suma todos los cepillos de tu casa y de la de Adrián (No los de pelo) 2.Sumale también todos los cristales transparentes sin contar espejos, ni cuadros, ni fotos, ni aparatos de cocina de las dos casas 3.Multiplica los dos resultados luego elevelo al cubo y restales todas las sillas/taburetes de las dos casas.';
        document.querySelectorAll('#images button')[9].removeAttribute('hidden');
        document.querySelectorAll('#images img')[9].src = 'img/foto10.png';
    }
    if (localStorage.getItem(`pista11`) === 'desbloqueada') {
        document.querySelectorAll('#images p')[10].innerText = 'Paola es __________ ';
        document.querySelectorAll('#images button')[10].removeAttribute('hidden');
        const image = document.querySelectorAll('#images img')[10];
        // Crea un nuevo enlace
        const link = document.createElement('a');
        link.href = 'Pokemon/pokemon.html';
        // Clona la imagen y añade el nuevo src
        const clonedImage = image.cloneNode(true);
        clonedImage.src = 'img/foto11.png';
        link.appendChild(clonedImage);
        image.parentNode.replaceChild(link, image);
    }
    if (localStorage.getItem(`pista12`) === 'desbloqueada') {
        document.querySelectorAll('#images p')[11].innerText = 'Enhorabuena, ya puedes recoger tus regalos!';
        document.querySelectorAll('#images button')[11].removeAttribute('hidden');
        document.querySelectorAll('#images img')[11].src = 'img/foto12.png';
    }

    //Guardado cajas
    if (localStorage.getItem(`caja1`) === 'desbloqueada') {
        const img = document.querySelector(`#caja1 img`);
        img.src = "img/Caja1A.png";

        if (localStorage.getItem(`caja2`) === 'desbloqueada') {
            const input = document.getElementById(`passwordcaja2`);
            const img = document.querySelector(`#caja2 img`);

            input.disabled = true;
            input.placeholder = "!!!Caja 2 abierta,  ya solo te queda una!!!";
            img.src = "img/Caja2A.png";
            if (localStorage.getItem(`caja3`) === 'desbloqueada') {
                document.getElementById('dial1').classList.add('correcto');
                document.getElementById('dial2').classList.add('correcto');
                document.getElementById('dial3').classList.add('correcto');
                document.getElementById('dial4').classList.add('correcto');
                document.getElementById('dial5').classList.add('correcto');
                document.getElementById('dial6').classList.add('correcto');
                document.getElementById('botones-container').style.display = 'none';
                document.getElementById('cajaImagen3').src = 'img/Caja3A.png';
            }
        }
    }

    //Guardado vidas
    if (localStorage.getItem('vidas')) {
        vidas = parseInt(localStorage.getItem('vidas'), 10);
    } else {
        localStorage.setItem('vidas', vidas);
    }

    //Guardado temporizador
    if (localStorage.getItem('targetDate')) {
        targetDate = parseInt(localStorage.getItem('targetDate'), 10);
        timerId = setInterval(updateTimer, 1000);
    }

    //Temporizador la primera vez
    if (targetDate == null && vidas == 3 && localStorage.getItem(`pista12`) !== 'desbloqueada') {
        document.getElementById('timer').innerText = "¿Preparada?";
    } else if (localStorage.getItem(`pista12`) === 'desbloqueada') {
        document.getElementById('timer').innerText = "Enhorabuena!";
    }


    if (localStorage.getItem(`password4`) === 'desbloqueada' && localStorage.getItem(`caja1`) != 'desbloqueada') {
        document.querySelector('header').style.backgroundColor = '#865a0842';
        document.getElementById('cajas').style.backgroundColor = '#865a0842';
        document.querySelector('main').style.backgroundColor = '#865a0842';
    } else if (localStorage.getItem(`password8`) === 'desbloqueada' && localStorage.getItem(`caja2`) != 'desbloqueada') {
        document.querySelector('header').style.backgroundColor = '#8181813d';
        document.getElementById('cajas').style.backgroundColor = '#8181813d';
        document.querySelector('main').style.backgroundColor = '#8181813d';
    } else if (localStorage.getItem(`password12`) === 'desbloqueada' && localStorage.getItem(`caja3`) != 'desbloqueada') {
        document.querySelector('header').style.backgroundColor = '#ebd45349';
        document.getElementById('cajas').style.backgroundColor = '#ebd45349';
        document.querySelector('main').style.backgroundColor = '#ebd45349';
    } else {
        document.querySelector('header').style.backgroundColor = '#f0f0f0';
        document.getElementById('cajas').style.backgroundColor = '#c446ff23';
        document.querySelector('main').style.backgroundColor = 'white';
    }


}