// ============================================
// MODO - LUCHO RKLE
// Adivina la canción con niveles (1s, 3s, 5s)
// Sin timer. El jugador decide cuándo responder o pasar de nivel.
// ============================================

import { catalogo } from '../data/catalogo.js';
import {
    precargarCanciones,
    reproducirAudioPrecargado,
    pararAudio,
    desbloquearAudioIOS
} from '../core/audio.js';
import { cogerAleatorios } from '../core/utils.js';
import { desbloquear, registrarPartida } from '../core/rklex.js';
import { crearBuscador } from '../ui/buscador.js';

// ============================================
// CONFIGURACIÓN
// ============================================
const CONFIG = {
    totalRondas: 10,
    tamanoLotePrecarga: 3,

    // Niveles de audio (segundos) y puntos por acertar
    niveles: [
        { duracion: 1, puntos: 10 },
        { duracion: 3, puntos: 5 },
        { duracion: 5, puntos: 2 }
    ]
};

// ============================================
// ESTADO DEL JUEGO
// ============================================
const estado = {
    rondaActual: 0,
    puntuacion: 0,
    puntosPartida: 0,
    preguntas: [],
    audios: {},
    respondiendo: false,
    buscador: null,
    nivelActual: 0
};

// ============================================
// GENERAR PREGUNTAS
// ============================================
function generarPreguntas() {
    const canciones = catalogo.canciones;
    if (canciones.length === 0) return [];
    return cogerAleatorios(canciones, Math.min(CONFIG.totalRondas, canciones.length))
        .map(cancion => ({ correcta: cancion }));
}

// ============================================
// MONTAR EL JUEGO
// ============================================
export function montarRkle(contenedor, onVolver) {
    estado.rondaActual = 0;
    estado.puntuacion = 0;
    estado.puntosPartida = 0;
    estado.preguntas = generarPreguntas();
    estado.audios = {};

    contenedor.innerHTML = `
        <div class="rkle">
            <header class="juego-header">
                <button class="juego-btn-volver" id="btnVolver">← Volver</button>
                <div class="juego-titulo-header">Lucho RKle</div>
                <div class="juego-espacio"></div>
            </header>

            <div class="rkle-inicio">
                <div class="rkle-inicio-icono">🎤</div>
                <h1 class="rkle-inicio-titulo">Lucho RKle</h1>
                <p class="rkle-inicio-descripcion">
                    Escucharás un fragmento de una canción aleatoria de Lucho RK.<br>
                    Empiezas con 1 segundo, y puedes llegar hasta 5. Cuanto antes aciertes, más puntos.
                </p>
                <div class="rkle-inicio-info">
                    <div class="rkle-inicio-info-item">
                        <span class="rkle-inicio-info-valor">10</span>
                        <span class="rkle-inicio-info-label">Rondas</span>
                    </div>
                    <div class="rkle-inicio-info-item">
                        <span class="rkle-inicio-info-valor">1-5s</span>
                        <span class="rkle-inicio-info-label">De audio</span>
                    </div>
                    <div class="rkle-inicio-info-item">
                        <span class="rkle-inicio-info-valor">10/5/2</span>
                        <span class="rkle-inicio-info-label">Puntos</span>
                    </div>
                </div>
                <button class="rkle-btn-empezar" id="btnEmpezar">Empezar partida</button>
            </div>
        </div>
    `;

    document.getElementById('btnVolver').addEventListener('click', () => {
        pararAudio();
        onVolver();
    });

    document.getElementById('btnEmpezar').addEventListener('click', () => {
        desbloquearAudioIOS();
        precargarYEmpezar(contenedor, onVolver);
    });
}

// ============================================
// PRECARGAR CANCIONES Y EMPEZAR PARTIDA
// ============================================
async function precargarYEmpezar(contenedor, onVolver) {
    const idsUnicos = [...new Set(estado.preguntas.map(p => p.correcta.id))];
    const cancionesAUsar = idsUnicos.map(id => catalogo.canciones.find(c => c.id === id));

    contenedor.innerHTML = `
        <div class="rkle">
            <header class="juego-header">
                <button class="juego-btn-volver" id="btnVolver">← Volver</button>
                <div class="juego-titulo-header">Lucho RKle</div>
                <div class="juego-espacio"></div>
            </header>

            <div class="rkle-preparando">
                <div class="rkle-preparando-icono">🎤</div>
                <h2 class="rkle-preparando-titulo">Preparando canciones</h2>
                <p class="rkle-preparando-descripcion">Un momento...</p>

                <div class="rkle-preparando-barra">
                    <div class="rkle-preparando-relleno" id="prepRelleno"></div>
                </div>

                <div class="rkle-preparando-contador" id="prepContador">0 / ${cancionesAUsar.length}</div>
            </div>
        </div>
    `;

    document.getElementById('btnVolver').addEventListener('click', () => {
        pararAudio();
        onVolver();
    });

    const relleno = document.getElementById('prepRelleno');
    const contador = document.getElementById('prepContador');

    const resultados = await precargarCanciones(
        cancionesAUsar,
        CONFIG.tamanoLotePrecarga,
        (cargadas, total) => {
            const pct = total > 0 ? (cargadas / total) * 100 : 0;
            if (relleno) relleno.style.width = pct + '%';
            if (contador) contador.textContent = `${cargadas} / ${total}`;
        }
    );

    estado.audios = {};
    for (const { cancion, audio } of resultados) {
        estado.audios[cancion.id] = audio;
    }

    if (resultados.length === 0) {
        console.error('No se pudo precargar ninguna canción');
        onVolver();
        return;
    }

    empezarPartida(contenedor, onVolver);
}

// ============================================
// EMPEZAR PARTIDA
// ============================================
function empezarPartida(contenedor, onVolver) {
    estado.rondaActual = 0;
    estado.puntuacion = 0;
    estado.puntosPartida = 0;
    mostrarRonda(contenedor, onVolver);
}

// ============================================
// MOSTRAR RONDA
// ============================================
function mostrarRonda(contenedor, onVolver) {
    const pregunta = estado.preguntas[estado.rondaActual];

    if (!pregunta) {
        mostrarFinal(contenedor, onVolver);
        return;
    }

    estado.respondiendo = false;
    estado.nivelActual = 0;

    const nivelesHTML = CONFIG.niveles.map((n, i) => `
        <div class="rkle-nivel ${i === 0 ? 'activo' : ''}" data-nivel="${i}">${n.duracion}s</div>
    `).join('');

    contenedor.innerHTML = `
        <div class="rkle">
            <header class="juego-header">
                <button class="juego-btn-volver" id="btnVolver">← Volver</button>
                <div class="juego-titulo-header">Ronda ${estado.rondaActual + 1} / ${CONFIG.totalRondas}</div>
                <div class="juego-espacio">
                    <span class="rkle-puntuacion">${estado.puntosPartida} pts</span>
                </div>
            </header>

            <div class="rkle-ronda">
                <div class="rkle-audio-indicador" id="audioIndicador">
                    <span class="rkle-audio-icono">🔊</span>
                    <span class="rkle-audio-texto">Nivel 1: 1 segundo</span>
                </div>

                <div class="rkle-niveles" id="niveles">
                    ${nivelesHTML}
                </div>

                <h2 class="rkle-pregunta">¿Qué canción es?</h2>

                <div class="rkle-buscador-contenedor" id="buscadorContenedor"></div>

                <button class="rkle-btn-skip" id="btnSkip">Pasar al siguiente nivel →</button>
                <button class="rkle-btn-rendirse oculto" id="btnRendirse">No me la sé</button>
            </div>
        </div>
    `;

    document.getElementById('btnVolver').addEventListener('click', () => {
        pararAudio();
        onVolver();
    });

    document.getElementById('btnSkip').addEventListener('click', () => {
        if (estado.respondiendo) return;
        estado.respondiendo = true;
        pararAudio();
        if (estado.buscador) estado.buscador.limpiar();
        irAlSiguienteNivel(contenedor, onVolver);
    });

    document.getElementById('btnRendirse').addEventListener('click', () => {
        if (estado.respondiendo) return;
        estado.respondiendo = true;
        pararAudio();
        if (estado.buscador) estado.buscador.deshabilitar();
        rendirse(contenedor, onVolver);
    });

    // Crear buscador
    const buscadorContenedor = document.getElementById('buscadorContenedor');
    estado.buscador = crearBuscador(
        buscadorContenedor,
        catalogo.canciones,
        (cancion) => {
            if (estado.respondiendo) return;
            responder(cancion.id, contenedor, onVolver);
        },
        'Busca una canción...'
    );

    setTimeout(() => estado.buscador.enfocar(), 100);

    // Reproducir primer nivel
    reproducirNivel(0);
}

// ============================================
// REPRODUCIR NIVEL
// ============================================
function reproducirNivel(nivel) {
    const pregunta = estado.preguntas[estado.rondaActual];
    if (!pregunta) return;

    const audio = estado.audios[pregunta.correcta.id];
    if (!audio) return;

    const duracion = CONFIG.niveles[nivel].duracion;

    // Actualizar indicador
    const indicador = document.getElementById('audioIndicador');
    if (indicador) {
        indicador.innerHTML = `<span class="rkle-audio-icono">🔊</span><span class="rkle-audio-texto">Nivel ${nivel + 1}: ${duracion} segundo${duracion > 1 ? 's' : ''}</span>`;
        indicador.classList.remove('acierto', 'fallo');
    }

    // Actualizar niveles visualmente
    document.querySelectorAll('.rkle-nivel').forEach((el, i) => {
        el.classList.toggle('activo', i === nivel);
    });

    // Reproducir
    reproducirAudioPrecargado(audio, duracion)
        .then(() => {
            const ind = document.getElementById('audioIndicador');
            if (ind && !estado.respondiendo) {
                ind.innerHTML = `<span class="rkle-audio-icono">🔇</span><span class="rkle-audio-texto">Puedes responder o pasar al siguiente nivel</span>`;
            }
        })
        .catch((err) => {
            console.error('Error al reproducir:', err);
        });

    // Habilitar/deshabilitar botón skip y rendirse según el nivel
    const btnSkip = document.getElementById('btnSkip');
    const btnRendirse = document.getElementById('btnRendirse');

    if (btnSkip && btnRendirse) {
        if (nivel >= CONFIG.niveles.length - 1) {
            // Último nivel: skip oculto, rendirse visible
            btnSkip.classList.add('oculto');
            btnRendirse.classList.remove('oculto');
        } else {
            // Niveles anteriores: skip visible, rendirse oculto
            btnSkip.classList.remove('oculto');
            btnRendirse.classList.add('oculto');
        }
    }
}

// ============================================
// IR AL SIGUIENTE NIVEL (manual o por fallo)
// ============================================
function irAlSiguienteNivel(contenedor, onVolver) {
    const siguienteNivel = estado.nivelActual + 1;

    if (siguienteNivel >= CONFIG.niveles.length) {
        // No hay más niveles → fallo total, siguiente ronda
        const pregunta = estado.preguntas[estado.rondaActual];
        const indicador = document.getElementById('audioIndicador');

        if (indicador) {
            indicador.innerHTML = `<span class="rkle-audio-icono">❌</span><span class="rkle-audio-texto">Incorrecto. Era: ${pregunta.correcta.titulo}</span>`;
            indicador.classList.add('fallo');
        }

        setTimeout(() => {
            estado.rondaActual++;
            mostrarRonda(contenedor, onVolver);
        }, 2000);
        return;
    }

    estado.nivelActual = siguienteNivel;
    estado.respondiendo = false;

    // Limpiar buscador (sigue habilitado, pero vacío)
    if (estado.buscador) estado.buscador.limpiar();

    // Reproducir siguiente nivel
    reproducirNivel(siguienteNivel);
}

// ============================================
// RESPONDER
// ============================================
function responder(idElegido, contenedor, onVolver) {
    if (estado.respondiendo) return;
    estado.respondiendo = true;

    pararAudio();

    const pregunta = estado.preguntas[estado.rondaActual];
    const idCorrecto = pregunta.correcta.id;
    const acierto = idElegido === idCorrecto;

    const indicador = document.getElementById('audioIndicador');

    if (acierto) {
        // Puntos según nivel
        const puntos = CONFIG.niveles[estado.nivelActual].puntos;
        estado.puntosPartida += puntos;
        estado.puntuacion++;

        desbloquear(idCorrecto);

        if (indicador) {
            indicador.innerHTML = `<span class="rkle-audio-icono">✅</span><span class="rkle-audio-texto">¡Correcto! +${puntos} pts</span>`;
            indicador.classList.add('acierto');
        }

        setTimeout(() => {
            estado.rondaActual++;
            mostrarRonda(contenedor, onVolver);
        }, 2000);
    } else {
        // Fallo: si no es el último nivel, pasar al siguiente
        // Si es el último, fallo total
        if (estado.nivelActual < CONFIG.niveles.length - 1) {
            if (indicador) {
                indicador.innerHTML = `<span class="rkle-audio-icono">❌</span><span class="rkle-audio-texto">No era. Pasando al nivel ${estado.nivelActual + 2}...</span>`;
                indicador.classList.add('fallo');
            }

            estado.respondiendo = false;

            // Limpiar el buscador para que el usuario pueda buscar en el siguiente nivel
            if (estado.buscador) estado.buscador.limpiar();

            setTimeout(() => {
                estado.nivelActual++;
                reproducirNivel(estado.nivelActual);
            }, 1500);
        } else {
            if (indicador) {
                indicador.innerHTML = `<span class="rkle-audio-icono">❌</span><span class="rkle-audio-texto">Incorrecto. Era: ${pregunta.correcta.titulo}</span>`;
                indicador.classList.add('fallo');
            }

            setTimeout(() => {
                estado.rondaActual++;
                mostrarRonda(contenedor, onVolver);
            }, 2000);
        }
    }
}

// ============================================
// RENDIRSE (solo en el último nivel)
// ============================================
function rendirse(contenedor, onVolver) {
    const pregunta = estado.preguntas[estado.rondaActual];
    const indicador = document.getElementById('audioIndicador');

    if (indicador) {
        indicador.innerHTML = `<span class="rkle-audio-icono">🥀</span><span class="rkle-audio-texto">Te rendiste. Era: ${pregunta.correcta.titulo}</span>`;
        indicador.classList.add('fallo');
    }

    setTimeout(() => {
        estado.rondaActual++;
        mostrarRonda(contenedor, onVolver);
    }, 2000);
}

// ============================================
// PANTALLA FINAL
// ============================================
function mostrarFinal(contenedor, onVolver) {
    const puntuacion = estado.puntuacion;
    const puntos = estado.puntosPartida;
    const total = CONFIG.totalRondas;

    registrarPartida(puntuacion, puntos);

    let mensaje, emoji;
    if (puntuacion === total) {
        mensaje = 'Eres el puto amo';
        emoji = '🏆';
    } else if (puntuacion >= 8) {
        mensaje = 'Eres fan de Lucho RK';
        emoji = '🔥';
    } else if (puntuacion >= 5) {
        mensaje = 'Nada mal. Se nota que lo escuchas';
        emoji = '👍';
    } else if (puntuacion >= 3) {
        mensaje = 'Eres un fakefan';
        emoji = '🤡';
    } else {
        mensaje = '¿Qué haces jugando a esto?';
        emoji = '🥀';
    }

    contenedor.innerHTML = `
        <div class="rkle">
            <div class="rkle-final">
                <div class="rkle-final-emoji">${emoji}</div>
                <div class="rkle-final-puntuacion">
                    <span class="rkle-final-numero">${puntos}</span>
                    <span class="rkle-final-total">pts</span>
                </div>
                <p class="rkle-final-mensaje">${mensaje}</p>

                <div class="rkle-final-acciones">
                    <button class="rkle-btn-empezar" id="btnJugarDeNuevo">Jugar de nuevo</button>
                    <button class="rkle-btn-secundario" id="btnVolverInicio">Volver al inicio</button>
                </div>
            </div>
        </div>
    `;

    document.getElementById('btnJugarDeNuevo').addEventListener('click', () => {
        desbloquearAudioIOS();
        estado.preguntas = generarPreguntas();
        estado.audios = {};
        precargarYEmpezar(contenedor, onVolver);
    });

    document.getElementById('btnVolverInicio').addEventListener('click', () => {
        onVolver();
    });
}