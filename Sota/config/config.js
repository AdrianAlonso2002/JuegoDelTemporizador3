document.addEventListener('DOMContentLoaded', function () {

    // Obtener los nombres de los jugadores desde localStorage
    const j1 = localStorage.getItem('j1');
    const j2 = localStorage.getItem('modej2');

    if (!j1 && !j2) {
        window.location.href = 'index.html';
        return;
    }

    // Mostrar los nombres de los jugadores
    document.getElementById('j1-name').innerText = j1;
    document.getElementById('j2-name').innerText = j2;

    // Obtener las cartas simuladas
    var { cartasj1, cartasj2 } = repartirCartas();

    // Mostrar el número de cartas de cada jugador
    document.getElementById('numcartasj1').innerText = numCartasJ(cartasj1);
    document.getElementById('numcartasj2').innerText = numCartasJ(cartasj2);

    // Mostrar de quién es el turno
    document.getElementById('turnode').innerText = turnoDe(j1);

    //Teclas
    var barajaenjuego = [];
    var turno = 1;
    var turnosObligatoriosj1 = 0;
    var turnosObligatoriosj2 = 0;
    var contCaballo = 0;
    var contRey = 0;
    var juegoBloqueado = false;
    var temporizador = "";
    var juegoFin;

    document.addEventListener('keydown', function (event) {
        if (juegoBloqueado == true) {
        } else {
            //turno del j1 sin obligación
            if (turno == 1) {
                if (event.key == 'z' && cartasj1.length > 0) {
                    if (turno == 1 && turnosObligatoriosj1 == 0) {
                        if (juegoBloqueado) return;
                        var cartaenjuego = document.getElementById('cartaenjuego');
                        cartaenjuego.src = 'img/cartas/' + cartasj1[0] + '.PNG';
                        document.getElementById("flecha2").classList.add("flecha");
                        document.getElementById("flecha1").classList.remove("flecha");

                        barajaenjuego.push(cartasj1[0]);
                        cartasj1.splice(0, 1);

                        mostrarnumcartasj();

                        var cartaActual = barajaenjuego[barajaenjuego.length - 1];
                        if (cartaActual.charAt(0) === 'S') {
                            turnosObligatoriosj2 = 1;
                            turnosObligatoriosj1 = 0;
                        } else if (cartaActual.charAt(0) === 'C') {
                            turnosObligatoriosj2 = 2;
                            turnosObligatoriosj1 = 0;
                        } else if (cartaActual.charAt(0) === 'R') {
                            turnosObligatoriosj2 = 3;
                            turnosObligatoriosj1 = 0;
                        }

                        turno = 2;
                    }
                    //turno j1 en sota de j2
                    if (turno == 1 && turnosObligatoriosj1 == 1) {
                        turnosObligatoriosj2 = 0;

                        if (cartasj1.length === 0) return;
                        var cartaenjuego = document.getElementById('cartaenjuego');
                        cartaenjuego.src = 'img/cartas/' + cartasj1[0] + '.PNG';
                        document.getElementById("flecha2").classList.add("flecha");
                        document.getElementById("flecha1").classList.remove("flecha");

                        barajaenjuego.push(cartasj1[0]);
                        cartasj1.splice(0, 1);

                        mostrarnumcartasj();

                        var cartaActual = barajaenjuego[barajaenjuego.length - 1];
                        if (cartaActual.charAt(0) === 'S') {
                            turnosObligatoriosj2 = 1;
                            turno = 2;
                            return;
                        } else if (cartaActual.charAt(0) === 'C') {
                            turnosObligatoriosj2 = 2;
                            turno = 2;
                            return;
                        } else if (cartaActual.charAt(0) === 'R') {
                            turnosObligatoriosj2 = 3;
                            turno = 2;
                            return;
                        }
                        if (turnosObligatoriosj2 == 0) {
                            turno = 0;
                            turnosObligatoriosj1 = 0;
                            temporizador = setTimeout(function () {
                                cartasj2 = cartasj2.concat(barajaenjuego);
                                var cartaenjuego = document.getElementById('cartaenjuego');

                                document.getElementById("flecha2").classList.add("flecha");
                                document.getElementById("flecha1").classList.add("flecha");

                                mostrarnumcartasj();

                                juegoBloqueado = true; // Bloquea el juego

                                barajaenjuego = [];
                                cartarev();
                                turno = 2;
                            }, 2000);
                        }
                    }
                    //turno j1 en caballo de j2
                    if (turno == 1 && turnosObligatoriosj1 == 2) {
                        turnosObligatoriosj2 = 0;

                        if (cartasj1.length === 0) return;
                        var cartaenjuego = document.getElementById('cartaenjuego');
                        cartaenjuego.src = 'img/cartas/' + cartasj1[0] + '.PNG';
                        document.getElementById("flecha2").classList.add("flecha");
                        document.getElementById("flecha1").classList.remove("flecha");

                        barajaenjuego.push(cartasj1[0]);
                        cartasj1.splice(0, 1);

                        mostrarnumcartasj();

                        var cartaActual = barajaenjuego[barajaenjuego.length - 1];
                        if (cartaActual.charAt(0) === 'S') {
                            turnosObligatoriosj2 = 1;
                            turno = 2;
                            contCaballo = 0;
                            return;
                        } else if (cartaActual.charAt(0) === 'C') {
                            turnosObligatoriosj2 = 2;
                            turno = 2;
                            contCaballo = 0;
                            return;
                        } else if (cartaActual.charAt(0) === 'R') {
                            turnosObligatoriosj2 = 3;
                            turno = 2;
                            contCaballo = 0;
                            return;
                        }
                        contCaballo++;
                        if (contCaballo == 2) {
                            turno = 0;
                            turnosObligatoriosj1 = 0;
                            contCaballo = 0;
                            temporizador = setTimeout(function () {
                                cartasj2 = cartasj2.concat(barajaenjuego);
                                var cartaenjuego = document.getElementById('cartaenjuego');

                                document.getElementById("flecha2").classList.add("flecha");
                                document.getElementById("flecha1").classList.add("flecha");

                                mostrarnumcartasj();

                                juegoBloqueado = true; // Bloquea el juego

                                barajaenjuego = [];
                                cartarev();
                                turno = 2;
                            }, 2000);
                        }
                    }
                    //turno j1 en rey de j2
                    if (turno == 1 && turnosObligatoriosj1 == 3) {
                        turnosObligatoriosj2 = 0;

                        if (cartasj1.length === 0) return;
                        var cartaenjuego = document.getElementById('cartaenjuego');
                        cartaenjuego.src = 'img/cartas/' + cartasj1[0] + '.PNG';
                        document.getElementById("flecha2").classList.add("flecha");
                        document.getElementById("flecha1").classList.remove("flecha");

                        barajaenjuego.push(cartasj1[0]);
                        cartasj1.splice(0, 1);

                        mostrarnumcartasj();

                        var cartaActual = barajaenjuego[barajaenjuego.length - 1];
                        if (cartaActual.charAt(0) === 'S') {
                            turnosObligatoriosj2 = 1;
                            turno = 2;
                            contRey = 0;
                            return;
                        } else if (cartaActual.charAt(0) === 'C') {
                            turnosObligatoriosj2 = 2;
                            turno = 2;
                            contRey = 0;
                            return;
                        } else if (cartaActual.charAt(0) === 'R') {
                            turnosObligatoriosj2 = 3;
                            turno = 2;
                            contRey = 0;
                            return;
                        }
                        contRey++;
                        if (turnosObligatoriosj2 == 0 && contRey == 3) {
                            turno = 0;
                            turnosObligatoriosj1 = 0;
                            contRey = 0;
                            temporizador = setTimeout(function () {
                                cartasj2 = cartasj2.concat(barajaenjuego);
                                var cartaenjuego = document.getElementById('cartaenjuego');

                                document.getElementById("flecha2").classList.add("flecha");
                                document.getElementById("flecha1").classList.add("flecha");

                                mostrarnumcartasj();

                                juegoBloqueado = true; // Bloquea el juego;
                                barajaenjuego = [];
                                cartarev();
                                turno = 2;
                            }, 2000);
                        }
                    }
                }
            }
            //J1 se lleva las cartas si son dobles dandole a lespacio
            if (event.key == ' ') {
                if (barajaenjuego.length >= 2) {
                    var ultimaCarta = barajaenjuego[barajaenjuego.length - 1];
                    var penultimaCarta = barajaenjuego[barajaenjuego.length - 2];

                    if (ultimaCarta.charAt(0) == penultimaCarta.charAt(0)) {
                        cancelarTemporizador();
                        Swal.fire({
                            icon: 'success',
                            title: '¡Bien!',
                            text: 'El jugador ' + j1 + ' se lleva las cartas.',
                            confirmButtonText: 'Bien',
                        });
                        cartasj1 = cartasj1.concat(barajaenjuego);
                        turno = 1;
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: '¡Mal!',
                            text: 'El Demonio se lleva las cartas.',
                            confirmButtonText: 'NO',
                        });
                        cartasj2 = cartasj2.concat(barajaenjuego);
                        turno = 2;
                    }

                    var cartaenjuego = document.getElementById('cartaenjuego');
                    cartaenjuego.src = 'img/rev.png';
                    // Limpiar el array barajaenjuego
                    barajaenjuego = [];
                    document.getElementById("flecha2").classList.add("flecha");
                    document.getElementById("flecha1").classList.add("flecha");

                    mostrarnumcartasj();

                    turnosObligatoriosj1 = 0;
                    turnosObligatoriosj2 = 0;

                }
            }
        }
    });

    if (juegoBloqueado == true) {
    } else {
        //J1 se lleva las cartas si son dobles tocando la carta
        document.querySelectorAll('.carj').forEach(function (element) {
            element.addEventListener('click', function () {
                if (barajaenjuego.length >= 2) {
                    var ultimaCarta = barajaenjuego[barajaenjuego.length - 1];
                    var penultimaCarta = barajaenjuego[barajaenjuego.length - 2];

                    if (ultimaCarta.charAt(0) == penultimaCarta.charAt(0)) {
                        cancelarTemporizador();
                        Swal.fire({
                            icon: 'success',
                            title: '¡Bien!',
                            text: 'El jugador ' + j1 + ' se lleva las cartas.',
                            confirmButtonText: 'Bien',
                        });
                        cartasj1 = cartasj1.concat(barajaenjuego);
                        turno = 1;
                    } else {
                        cancelarTemporizador();
                        Swal.fire({
                            icon: 'error',
                            title: '¡Mal!',
                            text: 'El Demonio se lleva las cartas.',
                            confirmButtonText: 'NO',
                        });
                        cartasj2 = cartasj2.concat(barajaenjuego);
                        turno = 2;
                    }

                    var cartaenjuego = document.getElementById('cartaenjuego');
                    cartaenjuego.src = 'img/rev.png';
                    // Limpiar el array barajaenjuego
                    barajaenjuego = [];
                    document.getElementById("flecha2").classList.add("flecha");
                    document.getElementById("flecha1").classList.add("flecha");

                    mostrarnumcartasj();

                    turnosObligatoriosj1 = 0;
                    turnosObligatoriosj2 = 0;

                }
            });
        });

        //J1 saca carta haciendo click
        document.querySelectorAll('.carj1').forEach(function (element) {
            element.addEventListener('click', function () {
                if (turno == 1) {
                    if (cartasj1.length > 0) {
                        if (turno == 1 && turnosObligatoriosj1 == 0) {
                            if (juegoBloqueado) return;
                            var cartaenjuego = document.getElementById('cartaenjuego');
                            cartaenjuego.src = 'img/cartas/' + cartasj1[0] + '.PNG';
                            document.getElementById("flecha2").classList.add("flecha");
                            document.getElementById("flecha1").classList.remove("flecha");

                            barajaenjuego.push(cartasj1[0]);
                            cartasj1.splice(0, 1);

                            mostrarnumcartasj();

                            var cartaActual = barajaenjuego[barajaenjuego.length - 1];
                            if (cartaActual.charAt(0) === 'S') {
                                turnosObligatoriosj2 = 1;
                                turnosObligatoriosj1 = 0;
                            } else if (cartaActual.charAt(0) === 'C') {
                                turnosObligatoriosj2 = 2;
                                turnosObligatoriosj1 = 0;
                            } else if (cartaActual.charAt(0) === 'R') {
                                turnosObligatoriosj2 = 3;
                                turnosObligatoriosj1 = 0;
                            }

                            turno = 2;
                        }
                        //turno j1 en sota de j2
                        if (turno == 1 && turnosObligatoriosj1 == 1) {
                            turnosObligatoriosj2 = 0;

                            if (cartasj1.length === 0) return;
                            var cartaenjuego = document.getElementById('cartaenjuego');
                            cartaenjuego.src = 'img/cartas/' + cartasj1[0] + '.PNG';
                            document.getElementById("flecha2").classList.add("flecha");
                            document.getElementById("flecha1").classList.remove("flecha");

                            barajaenjuego.push(cartasj1[0]);
                            cartasj1.splice(0, 1);

                            mostrarnumcartasj();

                            var cartaActual = barajaenjuego[barajaenjuego.length - 1];
                            if (cartaActual.charAt(0) === 'S') {
                                turnosObligatoriosj2 = 1;
                                turno = 2;
                                return;
                            } else if (cartaActual.charAt(0) === 'C') {
                                turnosObligatoriosj2 = 2;
                                turno = 2;
                                return;
                            } else if (cartaActual.charAt(0) === 'R') {
                                turnosObligatoriosj2 = 3;
                                turno = 2;
                                return;
                            }
                            if (turnosObligatoriosj2 == 0) {
                                turno = 0;
                                turnosObligatoriosj1 = 0;
                                temporizador = setTimeout(function () {
                                    cartasj2 = cartasj2.concat(barajaenjuego);
                                    var cartaenjuego = document.getElementById('cartaenjuego');

                                    document.getElementById("flecha2").classList.add("flecha");
                                    document.getElementById("flecha1").classList.add("flecha");

                                    mostrarnumcartasj();

                                    juegoBloqueado = true; // Bloquea el juego

                                    barajaenjuego = [];
                                    cartarev();
                                    turno = 2;
                                }, 2000);
                            }
                        }
                        //turno j1 en caballo de j2
                        if (turno == 1 && turnosObligatoriosj1 == 2) {
                            turnosObligatoriosj2 = 0;

                            if (cartasj2.length === 0) return;
                            var cartaenjuego = document.getElementById('cartaenjuego');
                            cartaenjuego.src = 'img/cartas/' + cartasj1[0] + '.PNG';
                            document.getElementById("flecha2").classList.add("flecha");
                            document.getElementById("flecha1").classList.remove("flecha");

                            barajaenjuego.push(cartasj1[0]);
                            cartasj1.splice(0, 1);

                            mostrarnumcartasj();

                            var cartaActual = barajaenjuego[barajaenjuego.length - 1];
                            if (cartaActual.charAt(0) === 'S') {
                                turnosObligatoriosj2 = 1;
                                turno = 2;
                                contCaballo = 0;
                                return;
                            } else if (cartaActual.charAt(0) === 'C') {
                                turnosObligatoriosj2 = 2;
                                turno = 2;
                                contCaballo = 0;
                                return;
                            } else if (cartaActual.charAt(0) === 'R') {
                                turnosObligatoriosj2 = 3;
                                turno = 2;
                                contCaballo = 0;
                                return;
                            }
                            contCaballo++;
                            if (contCaballo == 2) {
                                turno = 0;
                                turnosObligatoriosj1 = 0;
                                contCaballo = 0;
                                temporizador = setTimeout(function () {
                                    cartasj2 = cartasj2.concat(barajaenjuego);
                                    var cartaenjuego = document.getElementById('cartaenjuego');

                                    document.getElementById("flecha2").classList.add("flecha");
                                    document.getElementById("flecha1").classList.add("flecha");

                                    mostrarnumcartasj();

                                    juegoBloqueado = true; // Bloquea el juego

                                    barajaenjuego = [];
                                    cartarev();
                                    turno = 2;
                                }, 2000);
                            }
                        }
                        //turno j1 en rey de j2
                        if (turno == 1 && turnosObligatoriosj1 == 3) {
                            turnosObligatoriosj2 = 0;

                            if (cartasj1.length === 0) return;
                            var cartaenjuego = document.getElementById('cartaenjuego');
                            cartaenjuego.src = 'img/cartas/' + cartasj1[0] + '.PNG';
                            document.getElementById("flecha2").classList.add("flecha");
                            document.getElementById("flecha1").classList.remove("flecha");

                            barajaenjuego.push(cartasj1[0]);
                            cartasj1.splice(0, 1);

                            mostrarnumcartasj();

                            var cartaActual = barajaenjuego[barajaenjuego.length - 1];
                            if (cartaActual.charAt(0) === 'S') {
                                turnosObligatoriosj2 = 1;
                                turno = 2;
                                contRey = 0;
                                return;
                            } else if (cartaActual.charAt(0) === 'C') {
                                turnosObligatoriosj2 = 2;
                                turno = 2;
                                contRey = 0;
                                return;
                            } else if (cartaActual.charAt(0) === 'R') {
                                turnosObligatoriosj2 = 3;
                                turno = 2;
                                contRey = 0;
                                return;
                            }
                            contRey++;
                            if (turnosObligatoriosj2 == 0 && contRey == 3) {
                                turno = 0;
                                turnosObligatoriosj1 = 0;
                                contRey = 0;
                                temporizador = setTimeout(function () {
                                    cartasj2 = cartasj2.concat(barajaenjuego);
                                    var cartaenjuego = document.getElementById('cartaenjuego');

                                    document.getElementById("flecha2").classList.add("flecha");
                                    document.getElementById("flecha1").classList.add("flecha");

                                    mostrarnumcartasj();

                                    juegoBloqueado = true; // Bloquea el juego;
                                    barajaenjuego = [];
                                    cartarev();
                                    turno = 2;
                                }, 2000);
                            }
                        }
                    }
                }
            });
        });
    }

    document.getElementById("flecha1").classList.add("flecha");
    document.getElementById("flecha2").classList.add("flecha");

    //Bot demonio
    function funcionDemonio() {
        if (juegoBloqueado == true) {
        } else {

            verificarCartas(cartasj1, cartasj2);
            if (barajaenjuego[0] == null) {
                var cartaenjuego = document.getElementById('cartaenjuego');
                cartaenjuego.src = 'img/rev.png';
            }
            if (barajaenjuego.length >= 2) {
                var aleatorio = Math.ceil(Math.random() * 100);
                var umbral = 90;
                if (aleatorio < umbral) {
                    var ultimaCarta = barajaenjuego[barajaenjuego.length - 1];
                    var penultimaCarta = barajaenjuego[barajaenjuego.length - 2];

                    if (ultimaCarta.charAt(0) === penultimaCarta.charAt(0)) {
                        cancelarTemporizador();
                        Swal.fire({
                            icon: 'error',
                            title: '¡Mal!',
                            text: 'El Demonio se lleva las cartas.',
                            confirmButtonText: 'NO',
                        });
                        cartasj2 = cartasj2.concat(barajaenjuego);
                        turno = 2;

                        var cartaenjuego = document.getElementById('cartaenjuego');
                        cartaenjuego.src = 'img/rev.png';
                        // Limpiar el array barajaenjuego
                        barajaenjuego = [];
                        document.getElementById("flecha2").classList.add("flecha");
                        document.getElementById("flecha1").classList.add("flecha");

                        mostrarnumcartasj();

                        turnosObligatoriosj1 = 0;
                        turnosObligatoriosj2 = 0;
                    }

                }
            }
            if (turno == 2) {
                if (juegoBloqueado) return;
                //turno del demonio sin obligación
                if (turno == 2 && turnosObligatoriosj2 == 0) {
                    var cartaenjuego = document.getElementById('cartaenjuego');
                    cartaenjuego.src = 'img/cartas/' + cartasj2[0] + '.PNG';
                    document.getElementById("flecha1").classList.add("flecha");
                    document.getElementById("flecha2").classList.remove("flecha");

                    barajaenjuego.push(cartasj2[0]);
                    cartasj2.splice(0, 1);

                    mostrarnumcartasj();

                    var cartaActual = barajaenjuego[barajaenjuego.length - 1];
                    if (cartaActual.charAt(0) === 'S') {
                        turnosObligatoriosj1 = 1;
                    } else if (cartaActual.charAt(0) === 'C') {
                        turnosObligatoriosj1 = 2;
                    } else if (cartaActual.charAt(0) === 'R') {
                        turnosObligatoriosj1 = 3;
                    }

                    turno = 1;
                }
                //turno demonio en sota de j1
                if (turno == 2 && turnosObligatoriosj2 == 1) {
                    turnosObligatoriosj1 = 0;

                    if (cartasj2.length === 0) return;
                    var cartaenjuego = document.getElementById('cartaenjuego');
                    cartaenjuego.src = 'img/cartas/' + cartasj2[0] + '.PNG';
                    document.getElementById("flecha1").classList.add("flecha");
                    document.getElementById("flecha2").classList.remove("flecha");

                    barajaenjuego.push(cartasj2[0]);
                    cartasj2.splice(0, 1);

                    mostrarnumcartasj();

                    var cartaActual = barajaenjuego[barajaenjuego.length - 1];
                    if (cartaActual.charAt(0) === 'S') {
                        turnosObligatoriosj1 = 1;
                        turno = 1;
                        return;
                    } else if (cartaActual.charAt(0) === 'C') {
                        turnosObligatoriosj1 = 2;
                        turno = 1;
                        return;
                    } else if (cartaActual.charAt(0) === 'R') {
                        turnosObligatoriosj1 = 3;
                        turno = 1;
                        return;
                    }
                    if (turnosObligatoriosj1 == 0) {
                        turno = 0;
                        turnosObligatoriosj2 = 0;
                        temporizador = setTimeout(function () {
                            cartasj1 = cartasj1.concat(barajaenjuego);
                            var cartaenjuego = document.getElementById('cartaenjuego');

                            document.getElementById("flecha2").classList.add("flecha");
                            document.getElementById("flecha1").classList.add("flecha");

                            mostrarnumcartasj();

                            juegoBloqueado = true; // Bloquea el juego

                            barajaenjuego = [];
                            cartarev();
                            turno = 1;
                        }, 2000);
                    }
                }
                //turno demonio en caballo de j1
                if (turno == 2 && turnosObligatoriosj2 == 2) {
                    turnosObligatoriosj1 = 0;

                    if (cartasj2.length === 0) return;
                    var cartaenjuego = document.getElementById('cartaenjuego');
                    cartaenjuego.src = 'img/cartas/' + cartasj2[0] + '.PNG';
                    document.getElementById("flecha1").classList.add("flecha");
                    document.getElementById("flecha2").classList.remove("flecha");

                    barajaenjuego.push(cartasj2[0]);
                    cartasj2.splice(0, 1);

                    mostrarnumcartasj();

                    var cartaActual = barajaenjuego[barajaenjuego.length - 1];
                    if (cartaActual.charAt(0) === 'S') {
                        turnosObligatoriosj1 = 1;
                        turno = 1;
                        contCaballo = 0;
                        return;
                    } else if (cartaActual.charAt(0) === 'C') {
                        turnosObligatoriosj1 = 2;
                        turno = 1;
                        contCaballo = 0;
                        return;
                    } else if (cartaActual.charAt(0) === 'R') {
                        turnosObligatoriosj1 = 3;
                        turno = 1;
                        contCaballo = 0;
                        return;
                    }
                    contCaballo++;
                    if (turnosObligatoriosj1 == 0 && contCaballo == 2) {
                        turno = 0;
                        turnosObligatoriosj2 = 0;
                        contCaballo = 0;
                        temporizador = setTimeout(function () {
                            cartasj1 = cartasj1.concat(barajaenjuego);
                            var cartaenjuego = document.getElementById('cartaenjuego');

                            document.getElementById("flecha2").classList.add("flecha");
                            document.getElementById("flecha1").classList.add("flecha");

                            mostrarnumcartasj();

                            juegoBloqueado = true; // Bloquea el juego

                            barajaenjuego = [];
                            cartarev();
                            turno = 1;
                        }, 2000);
                    }
                }
                //turno demonio en rey de j1
                if (turno == 2 && turnosObligatoriosj2 == 3) {
                    turnosObligatoriosj1 = 0;

                    if (cartasj2.length === 0) return;
                    var cartaenjuego = document.getElementById('cartaenjuego');
                    cartaenjuego.src = 'img/cartas/' + cartasj2[0] + '.PNG';
                    document.getElementById("flecha1").classList.add("flecha");
                    document.getElementById("flecha2").classList.remove("flecha");

                    barajaenjuego.push(cartasj2[0]);
                    cartasj2.splice(0, 1);

                    mostrarnumcartasj();

                    var cartaActual = barajaenjuego[barajaenjuego.length - 1];
                    if (cartaActual.charAt(0) === 'S') {
                        turnosObligatoriosj1 = 1;
                        turno = 1;
                        contRey = 0;
                        return;
                    } else if (cartaActual.charAt(0) === 'C') {
                        turnosObligatoriosj1 = 2;
                        turno = 1;
                        contRey = 0;
                        return;
                    } else if (cartaActual.charAt(0) === 'R') {
                        turnosObligatoriosj1 = 3;
                        turno = 1;
                        contRey = 0;
                        return;
                    }
                    contRey++;
                    if (turnosObligatoriosj1 == 0 && contRey == 3) {
                        turno = 0;
                        turnosObligatoriosj2 = 0;
                        contRey = 0;
                        temporizador = setTimeout(function () {
                            cartasj1 = cartasj1.concat(barajaenjuego);
                            var cartaenjuego = document.getElementById('cartaenjuego');

                            document.getElementById("flecha2").classList.add("flecha");
                            document.getElementById("flecha1").classList.add("flecha");

                            mostrarnumcartasj();

                            juegoBloqueado = true; // Bloquea el juego

                            barajaenjuego = [];
                            cartarev();
                            turno = 1;
                        }, 2000);
                    }
                }
            }
        }
    }

    if (j2 == "Demonio") {
        var tiempoEspera = Math.floor(Math.random() * 1) + 1;
        var tiempoEsperaMs = tiempoEspera * 600;

        document.addEventListener("click", () => {
            const body = document.body;
            const audio = document.getElementById("demonioMusic");
            audio.play();
        });

        setInterval(funcionDemonio, tiempoEsperaMs);
    }

    //Bot practica
    function funcionPractica() {
        if (juegoBloqueado == true) {
        } else {
            verificarCartas(cartasj1, cartasj2);
            if (barajaenjuego[0] == null) {
                var cartaenjuego = document.getElementById('cartaenjuego');
                cartaenjuego.src = 'img/rev.png';
            }
            if (barajaenjuego.length >= 2) {
                var aleatorio = Math.ceil(Math.random() * 100);
                var umbral = 50;
                if (aleatorio < umbral) {
                    var ultimaCarta = barajaenjuego[barajaenjuego.length - 1];
                    var penultimaCarta = barajaenjuego[barajaenjuego.length - 2];

                    if (ultimaCarta.charAt(0) === penultimaCarta.charAt(0)) {
                        cancelarTemporizador();
                        Swal.fire({
                            icon: 'error',
                            title: '¡Mal!',
                            text: 'El Bot de Practica se lleva las cartas.',
                            confirmButtonText: 'Que mala soy',
                        });
                        cartasj2 = cartasj2.concat(barajaenjuego);;
                        turno = 2;

                        var cartaenjuego = document.getElementById('cartaenjuego');
                        cartaenjuego.src = 'img/rev.png';
                        // Limpiar el array barajaenjuego
                        barajaenjuego = [];
                        document.getElementById("flecha2").classList.add("flecha");
                        document.getElementById("flecha1").classList.add("flecha");

                        mostrarnumcartasj();

                        turnosObligatoriosj1 = 0;
                        turnosObligatoriosj2 = 0;
                    }

                }
            }
            if (turno == 2) {
                if (juegoBloqueado) return;
                //turno del practica sin obligación
                if (turno == 2 && turnosObligatoriosj2 == 0) {
                    var cartaenjuego = document.getElementById('cartaenjuego');
                    cartaenjuego.src = 'img/cartas/' + cartasj2[0] + '.PNG';
                    document.getElementById("flecha1").classList.add("flecha");
                    document.getElementById("flecha2").classList.remove("flecha");

                    barajaenjuego.push(cartasj2[0]);
                    cartasj2.splice(0, 1);

                    mostrarnumcartasj();

                    var cartaActual = barajaenjuego[barajaenjuego.length - 1];
                    if (cartaActual.charAt(0) === 'S') {
                        turnosObligatoriosj1 = 1;
                    } else if (cartaActual.charAt(0) === 'C') {
                        turnosObligatoriosj1 = 2;
                    } else if (cartaActual.charAt(0) === 'R') {
                        turnosObligatoriosj1 = 3;
                    }

                    turno = 1;
                }
                //turno practica en sota de j1
                if (turno == 2 && turnosObligatoriosj2 == 1) {
                    turnosObligatoriosj1 = 0;

                    if (cartasj2.length === 0) return;
                    var cartaenjuego = document.getElementById('cartaenjuego');
                    cartaenjuego.src = 'img/cartas/' + cartasj2[0] + '.PNG';
                    document.getElementById("flecha1").classList.add("flecha");
                    document.getElementById("flecha2").classList.remove("flecha");

                    barajaenjuego.push(cartasj2[0]);
                    cartasj2.splice(0, 1);

                    mostrarnumcartasj();

                    var cartaActual = barajaenjuego[barajaenjuego.length - 1];
                    if (cartaActual.charAt(0) === 'S') {
                        turnosObligatoriosj1 = 1;
                        turno = 1;
                        return;
                    } else if (cartaActual.charAt(0) === 'C') {
                        turnosObligatoriosj1 = 2;
                        turno = 1;
                        return;
                    } else if (cartaActual.charAt(0) === 'R') {
                        turnosObligatoriosj1 = 3;
                        turno = 1;
                        return;
                    }

                    if (turnosObligatoriosj1 == 0) {
                        turno = 0;
                        turnosObligatoriosj2 = 0;
                        temporizador = setTimeout(function () {
                            cartasj1 = cartasj1.concat(barajaenjuego);
                            var cartaenjuego = document.getElementById('cartaenjuego');

                            document.getElementById("flecha2").classList.add("flecha");
                            document.getElementById("flecha1").classList.add("flecha");

                            mostrarnumcartasj();

                            juegoBloqueado = true; // Bloquea el juego

                            barajaenjuego = [];
                            cartarev();
                            turno = 1;
                        }, 2000);

                    }
                }
                //turno practica en caballo de j1
                if (turno == 2 && turnosObligatoriosj2 == 2) {
                    turnosObligatoriosj1 = 0;

                    if (cartasj2.length === 0) return;
                    var cartaenjuego = document.getElementById('cartaenjuego');
                    cartaenjuego.src = 'img/cartas/' + cartasj2[0] + '.PNG';
                    document.getElementById("flecha1").classList.add("flecha");
                    document.getElementById("flecha2").classList.remove("flecha");

                    barajaenjuego.push(cartasj2[0]);
                    cartasj2.splice(0, 1);

                    mostrarnumcartasj();

                    var cartaActual = barajaenjuego[barajaenjuego.length - 1];
                    if (cartaActual.charAt(0) === 'S') {
                        turnosObligatoriosj1 = 1;
                        turno = 1;
                        contCaballo = 0;
                        return;
                    } else if (cartaActual.charAt(0) === 'C') {
                        turnosObligatoriosj1 = 2;
                        turno = 1;
                        contCaballo = 0;
                        return;
                    } else if (cartaActual.charAt(0) === 'R') {
                        turnosObligatoriosj1 = 3;
                        turno = 1;
                        contCaballo = 0;
                        return;
                    }
                    contCaballo++;
                    if (contCaballo == 2) {
                        turno = 0;
                        turnosObligatoriosj2 = 0;
                        contCaballo = 0;
                        temporizador = setTimeout(function () {
                            cartasj1 = cartasj1.concat(barajaenjuego);
                            var cartaenjuego = document.getElementById('cartaenjuego');

                            document.getElementById("flecha2").classList.add("flecha");
                            document.getElementById("flecha1").classList.add("flecha");

                            mostrarnumcartasj();

                            juegoBloqueado = true; // Bloquea el juego

                            barajaenjuego = [];
                            cartarev();
                            turno = 1;
                        }, 2000);
                    }
                }
                //turno practica en rey de j1
                if (turno == 2 && turnosObligatoriosj2 == 3) {
                    turnosObligatoriosj1 = 0;

                    if (cartasj2.length === 0) return;
                    var cartaenjuego = document.getElementById('cartaenjuego');
                    cartaenjuego.src = 'img/cartas/' + cartasj2[0] + '.PNG';
                    document.getElementById("flecha1").classList.add("flecha");
                    document.getElementById("flecha2").classList.remove("flecha");

                    barajaenjuego.push(cartasj2[0]);
                    cartasj2.splice(0, 1);

                    mostrarnumcartasj();

                    var cartaActual = barajaenjuego[barajaenjuego.length - 1];
                    if (cartaActual.charAt(0) === 'S') {
                        turnosObligatoriosj1 = 1;
                        turno = 1;
                        contRey = 0;
                        return;
                    } else if (cartaActual.charAt(0) === 'C') {
                        turnosObligatoriosj1 = 2;
                        turno = 1;
                        contRey = 0;
                        return;
                    } else if (cartaActual.charAt(0) === 'R') {
                        turnosObligatoriosj1 = 3;
                        turno = 1;
                        contRey = 0;
                        return;
                    }
                    contRey++;
                    if (turnosObligatoriosj1 == 0 && contRey == 3) {
                        turno = 0;
                        turnosObligatoriosj2 = 0;
                        contRey = 0;
                        temporizador = setTimeout(function () {
                            cartasj1 = cartasj1.concat(barajaenjuego);
                            var cartaenjuego = document.getElementById('cartaenjuego');

                            document.getElementById("flecha2").classList.add("flecha");
                            document.getElementById("flecha1").classList.add("flecha");

                            mostrarnumcartasj();

                            juegoBloqueado = true; // Bloquea el juego

                            barajaenjuego = [];
                            cartarev();
                            turno = 1;
                        }, 2000);
                    }
                }
            }
        }
    }

    if (j2 == "Práctica") {
        var tiempoEspera = Math.floor(Math.random() * 4) + 2;
        var tiempoEsperaMs = tiempoEspera * 1000;

        setInterval(funcionPractica, tiempoEsperaMs);
    }

    function config() {
        verificarCartas(cartasj1, cartasj2);
        turnoDe(j1);
    }

    juegoFin = setInterval(config, 10);

    function verificarCartas(cartasj1, cartasj2) {
        if (cartasj1.length === 0 && j2 == "Demonio") {
            clearInterval(juegoFin);
            Swal.fire({
                icon: 'error',
                title: '¡JAJAJA!',
                text: 'Ha ganado el demonio.',
                confirmButtonText: 'JOPE',
            });
            return;
        } else if (cartasj2.length === 0 && j2 == "Demonio") {
            clearInterval(juegoFin);
            Swal.fire({
                icon: 'success',
                title: '¡Has ganado!',
                text: 'La contraseña es: campeona',
                confirmButtonText: 'OLE',
            });
            return;
        } else if (cartasj2.length === 0 && j2 == "Práctica") {
            clearInterval(juegoFin);
            Swal.fire({
                icon: 'success',
                title: '¡Has ganado!',
                text: 'Ahora a por el demonio!',
                confirmButtonText: 'OLE',
            });
            return;
        } else if (cartasj1.length === 0 && j2 == "Práctica") {
            clearInterval(juegoFin);
            Swal.fire({
                icon: 'error',
                title: '¡JAJAJA!',
                text: 'Has perdido contra el bot de práctica.',
                confirmButtonText: 'Que mala soy por dios',
            });
            return;
        } else {

        }
    }

    function turnoDe(j1) {
        if (turno == 1) {
            var turnode = document.getElementById('turnode');
            textoturno = "Turno de " + j1;
            turnode.textContent = textoturno;
        } else {
            if (turno == 2 && j2 == "Demonio") {
                var turnode = document.getElementById('turnode');
                textoturno = "Turno del Demonio";
                turnode.textContent = textoturno;
            }
            if (turno == 2 && j2 == "Práctica") {
                var turnode = document.getElementById('turnode');
                textoturno = "Turno del Bot de Práctica";
                turnode.textContent = textoturno;
            }
        }
    }

    function mostrarnumcartasj() {
        var cartasnumj1 = document.getElementById('numcartasj1');
        var numcartasj1 = numcartasj(cartasj1);
        cartasnumj1.textContent = numcartasj1;
        var cartasnumj2 = document.getElementById('numcartasj2');
        var numcartasj2 = numcartasj(cartasj2);
        cartasnumj2.textContent = numcartasj2;

        function numcartasj(cartasj) {
            var numcartasj = cartasj.length;
            return numcartasj;
        }
    }

    function cartarev() {
        if (barajaenjuego[0] == null) {
            Swal.fire({
                icon: 'success',
                title: 'Se recogen las cartas',
                confirmButtonText: 'Vale',
            }).then((result) => {
                if (result.isConfirmed) {
                    var cartaenjuego = document.getElementById('cartaenjuego');
                    cartaenjuego.src = 'img/rev.png';
                    juegoBloqueado = false; // Desbloquea el juego
                } else {
                    var cartaenjuego = document.getElementById('cartaenjuego');
                    cartaenjuego.src = 'img/rev.png';
                    juegoBloqueado = false; // Desbloquea el juego
                }
            });
        }
    }

    function repartirCartas() {
        // Número máximo de cartas
        const maxCartas = 40;

        // Array con el nombre de las imágenes de cada carta
        const cartas = [
            "1B", "1C", "1E", "1O", "2B", "2C", "2E", "2O",
            "3B", "3C", "3E", "3O", "4B", "4C", "4E", "4O",
            "5B", "5C", "5E", "5O", "6B", "6C", "6E", "6O",
            "7B", "7C", "7E", "7O", "CB", "CC", "CE", "CO",
            "RB", "RC", "RE", "RO", "SB", "SC", "SE", "SO"
        ];

        // Función para barajar las cartas
        function shuffle(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }

        // Repartir las cartas
        const contCartasJ1 = 20;
        const contCartasJ2 = 20;
        let cartasj1 = [];
        let cartasj2 = [];

        // Barajar el mazo
        const mazoBarajado = shuffle(cartas.slice());

        // Dividir las cartas entre los dos jugadores
        cartasj1 = mazoBarajado.slice(0, contCartasJ1);
        cartasj2 = mazoBarajado.slice(contCartasJ1, contCartasJ1 + contCartasJ2);;

        // Devolver las cartas repartidas
        return { cartasj1, cartasj2 };
    }

    function numCartasJ(cartasj) {
        var $numcartasj = cartasj.length;
        return $numcartasj;
    }

    function cancelarTemporizador() {
        clearTimeout(temporizador);
    }

});



