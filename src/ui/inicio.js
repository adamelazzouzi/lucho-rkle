// ============================================
// UI - PANTALLA DE INICIO
// ============================================

import { montarRkle } from '../modos/rkle.js';
import { montarRklex } from './rklex.js';
import { catalogo } from '../data/catalogo.js';
import { albumes } from '../data/albumes.js';
import { totalDesbloqueadas, hayDesbloqueosNuevos, numeroDesbloqueosNuevos } from '../core/rklex.js';

// ============================================
// CONFIGURACIÓN DEL CARRUSEL
// ============================================
const CARRUSEL_INTERVALO = 3000;

// ============================================
// MONTAR INICIO
// ============================================
export function montarInicio(contenedor) {
    const totalCanciones = catalogo.canciones.length;
    const desbloqueadas = totalDesbloqueadas();
    const hayNuevos = hayDesbloqueosNuevos();
    const numNuevos = numeroDesbloqueosNuevos();

    contenedor.innerHTML = `
        <header class="inicio-header">
            <div class="inicio-portada">
                <div class="inicio-carrusel" id="carrusel">
                    <img src="assets/carrusel/rk.jpg" alt="Lucho RK" class="activa">
                    <img src="assets/carrusel/sordo.jpg" alt="Portada SORDO DE UN PIE">
                    <img src="assets/carrusel/tafacil.jpg" alt="Portada TA FACIL">
                </div>
            </div>
            <h1 class="inicio-titulo">Lucho RKle</h1>
            <p class="inicio-artista">Lucho RK</p>
            <p class="inicio-subtitulo">${totalCanciones} canciones. 10 rondas. Sin registro.</p>
        </header>

        <main class="inicio-modos">
            <button class="modo-card" data-modo="rkle">
                <div class="modo-card-icono">🎤</div>
                <div class="modo-card-info">
                    <h2 class="modo-card-titulo">Jugar a Lucho RKle</h2>
                    <p class="modo-card-descripcion">Adivina cuántas canciones puedes reconocer</p>
                </div>
                <div class="modo-card-flecha">→</div>
            </button>

            <button class="modo-card modo-card-rklex" data-modo="rklex">
                <div class="modo-card-icono">📖</div>
                <div class="modo-card-info">
                    <h2 class="modo-card-titulo">
                        Lucho RKlex
                        ${hayNuevos ? `<span class="rklex-badge-nuevo">+${numNuevos}</span>` : ''}
                    </h2>
                    <p class="modo-card-descripcion">Tu colección: ${desbloqueadas} / ${totalCanciones}</p>
                </div>
                <div class="modo-card-flecha">→</div>
            </button>
        </main>

        <footer class="inicio-footer">
            <p>Proyecto personal sin ánimo de lucro. Las canciones son propiedad de Lucho RK y su sello.</p>
        </footer>
    `;

    iniciarCarrusel();

    contenedor.querySelectorAll('[data-modo]').forEach(btn => {
        btn.addEventListener('click', () => {
            const modo = btn.getAttribute('data-modo');

            if (modo === 'rkle') {
                montarRkle(contenedor, () => montarInicio(contenedor));
            } else if (modo === 'rklex') {
                montarRklex(contenedor, () => montarInicio(contenedor));
            }
        });
    });
}

// ============================================
// CARRUSEL DE PORTADAS
// ============================================
let carruselInterval = null;

function iniciarCarrusel() {
    if (carruselInterval) {
        clearInterval(carruselInterval);
        carruselInterval = null;
    }

    const imagenes = document.querySelectorAll('#carrusel img');
    if (imagenes.length === 0) return;

    let indiceActual = 0;

    carruselInterval = setInterval(() => {
        imagenes[indiceActual].classList.remove('activa');
        indiceActual = (indiceActual + 1) % imagenes.length;
        imagenes[indiceActual].classList.add('activa');
    }, CARRUSEL_INTERVALO);
}

// ============================================
// PARAR CARRUSEL
// ============================================
export function pararCarrusel() {
    if (carruselInterval) {
        clearInterval(carruselInterval);
        carruselInterval = null;
    }
}