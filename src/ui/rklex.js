// ============================================
// UI - PANTALLA RKLEX
// Colección de canciones desbloqueadas
// ============================================

import { catalogo } from '../data/catalogo.js';
import { albumes } from '../data/albumes.js';
import {
    leerRklex,
    marcarComoVisto,
    totalDesbloqueadas
} from '../core/rklex.js';

const ORDEN_ALBUMES = ['album', 'tafacil', 'quien', 'single'];

export function montarRklex(contenedor, onVolver) {
    marcarComoVisto();

    const estado = leerRklex();
    const desbloqueadas = estado.desbloqueadas;
    const total = catalogo.canciones.length;
    const desbloqueadasTotal = totalDesbloqueadas();

    contenedor.innerHTML = `
        <div class="rklex">
            <header class="juego-header">
                <button class="juego-btn-volver" id="btnVolver">← Volver</button>
                <div class="juego-titulo-header">Lucho RKlex</div>
                <div class="juego-espacio"></div>
            </header>

            <div class="rklex-progreso">
                <div class="rklex-progreso-header">
                    <span class="rklex-progreso-texto">Tu colección</span>
                    <span class="rklex-progreso-numero">${desbloqueadasTotal} / ${total}</span>
                </div>
                <div class="rklex-progreso-barra">
                    <div class="rklex-progreso-relleno" style="width: ${total > 0 ? (desbloqueadasTotal / total) * 100 : 0}%"></div>
                </div>
            </div>

            <div class="rklex-filtros">
                <button class="rklex-filtro activo" data-filtro="todas">Todas</button>
                <button class="rklex-filtro" data-filtro="desbloqueadas">Desbloqueadas</button>
                <button class="rklex-filtro" data-filtro="bloqueadas">Bloqueadas</button>
            </div>

            <div class="rklex-albumes" id="rklexAlbumes">
                ${renderizarAlbumes(desbloqueadas)}
            </div>
        </div>
    `;

    document.getElementById('btnVolver').addEventListener('click', () => {
        onVolver();
    });

    contenedor.querySelectorAll('.rklex-filtro').forEach(btn => {
        btn.addEventListener('click', () => {
            contenedor.querySelectorAll('.rklex-filtro').forEach(b => b.classList.remove('activo'));
            btn.classList.add('activo');
            const filtro = btn.getAttribute('data-filtro');
            aplicarFiltro(filtro);
        });
    });
}

function renderizarAlbumes(desbloqueadas) {
    return ORDEN_ALBUMES.map(albumId => {
        const album = albumes[albumId];
        if (!album) return '';

        const cancionesDelAlbum = catalogo.canciones.filter(c => c.album === albumId);
        const desbloqueadasDelAlbum = cancionesDelAlbum.filter(c => desbloqueadas.includes(c.id)).length;
        const totalDelAlbum = cancionesDelAlbum.length;

        if (totalDelAlbum === 0) return '';

        const cancionesHTML = cancionesDelAlbum.map(cancion => {
            const desbloqueada = desbloqueadas.includes(cancion.id);
            return renderizarCancion(cancion, desbloqueada);
        }).join('');

        return `
            <div class="rklex-album" data-album="${albumId}">
                <div class="rklex-album-header">
                    <h2 class="rklex-album-titulo">${album.titulo}</h2>
                    <span class="rklex-album-contador">${desbloqueadasDelAlbum} / ${totalDelAlbum}</span>
                </div>
                <div class="rklex-grid">
                    ${cancionesHTML}
                </div>
            </div>
        `;
    }).join('');
}

function renderizarCancion(cancion, desbloqueada) {
    if (desbloqueada) {
        const portadaHTML = cancion.portada
            ? `<img src="${cancion.portada}" alt="${cancion.titulo}">`
            : `<span class="rklex-cancion-icono">🎤</span>`;

        return `
            <div class="rklex-cancion desbloqueada" data-id="${cancion.id}">
                <div class="rklex-cancion-imagen">
                    ${portadaHTML}
                </div>
                <div class="rklex-cancion-nombre">${cancion.titulo}</div>
            </div>
        `;
    } else {
        return `
            <div class="rklex-cancion bloqueada" data-id="${cancion.id}">
                <div class="rklex-cancion-imagen">
                    <span class="rklex-cancion-interrogacion">?</span>
                </div>
                <div class="rklex-cancion-nombre">???</div>
            </div>
        `;
    }
}

function aplicarFiltro(filtro) {
    const canciones = document.querySelectorAll('.rklex-cancion');

    canciones.forEach(cancion => {
        const estaDesbloqueada = cancion.classList.contains('desbloqueada');

        if (filtro === 'todas') {
            cancion.style.display = '';
        } else if (filtro === 'desbloqueadas') {
            cancion.style.display = estaDesbloqueada ? '' : 'none';
        } else if (filtro === 'bloqueadas') {
            cancion.style.display = estaDesbloqueada ? 'none' : '';
        }
    });
}