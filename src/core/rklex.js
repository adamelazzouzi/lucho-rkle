// ============================================
// CORE - RKLEX
// Persistencia del progreso del usuario
// ============================================

const CLAVE = 'lucho-rkle-rklex';

function estadoInicial() {
    return {
        desbloqueadas: [],
        desbloqueosNuevos: 0,
        partidasJugadas: 0,
        mejorPuntuacion: 0,
        puntosTotales: 0
    };
}

export function leerRklex() {
    try {
        const raw = localStorage.getItem(CLAVE);
        if (!raw) return estadoInicial();

        const estado = JSON.parse(raw);

        return {
            desbloqueadas: Array.isArray(estado.desbloqueadas) ? estado.desbloqueadas : [],
            desbloqueosNuevos: typeof estado.desbloqueosNuevos === 'number' ? estado.desbloqueosNuevos : 0,
            partidasJugadas: typeof estado.partidasJugadas === 'number' ? estado.partidasJugadas : 0,
            mejorPuntuacion: typeof estado.mejorPuntuacion === 'number' ? estado.mejorPuntuacion : 0,
            puntosTotales: typeof estado.puntosTotales === 'number' ? estado.puntosTotales : 0
        };
    } catch (e) {
        console.warn('Error al leer Rklex:', e);
        return estadoInicial();
    }
}

export function guardarRklex(estado) {
    try {
        localStorage.setItem(CLAVE, JSON.stringify(estado));
    } catch (e) {
        console.warn('Error al guardar Rklex:', e);
    }
}

export function estaDesbloqueada(id) {
    const estado = leerRklex();
    return estado.desbloqueadas.includes(id);
}

export function desbloquear(id) {
    const estado = leerRklex();

    if (estado.desbloqueadas.includes(id)) {
        return false;
    }

    estado.desbloqueadas.push(id);
    estado.desbloqueosNuevos++;
    guardarRklex(estado);
    return true;
}

export function totalDesbloqueadas() {
    const estado = leerRklex();
    return estado.desbloqueadas.length;
}

export function desbloqueadasPorAlbum(albumId, catalogo) {
    const estado = leerRklex();
    const idsDelAlbum = catalogo.canciones
        .filter(c => c.album === albumId)
        .map(c => c.id);

    return estado.desbloqueadas.filter(id => idsDelAlbum.includes(id)).length;
}

export function hayDesbloqueosNuevos() {
    const estado = leerRklex();
    return estado.desbloqueosNuevos > 0;
}

export function numeroDesbloqueosNuevos() {
    const estado = leerRklex();
    return estado.desbloqueosNuevos;
}

export function marcarComoVisto() {
    const estado = leerRklex();
    estado.desbloqueosNuevos = 0;
    guardarRklex(estado);
}

export function registrarPartida(puntuacion, puntos) {
    const estado = leerRklex();
    estado.partidasJugadas++;
    if (puntuacion > estado.mejorPuntuacion) {
        estado.mejorPuntuacion = puntuacion;
    }
    if (puntos) {
        estado.puntosTotales += puntos;
    }
    guardarRklex(estado);
}

export function resetearRklex() {
    try {
        localStorage.removeItem(CLAVE);
    } catch (e) {
        console.warn('Error al resetear Rklex:', e);
    }
}