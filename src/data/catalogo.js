// ============================================
// CATÁLOGO COMPLETO DE LUCHO RK
//
// Estructura de cada canción:
//   id:            string único (ej: 'lr-01')
//   album:         string con clave del álbum ('album', 'tafacil', 'quien', 'single')
//   titulo:        string en MAYÚSCULAS
//   feat:          array de artistas o null
//   portada:       ruta a la portada de la canción
//   audioArchivo:  ruta al fragmento de 7s en .m4a
// ============================================

export const catalogo = {
    artista: 'Lucho RK',

    canciones: [
        // ============================================
        // SORDO DE UN PIE (2026) - 16 canciones
        // ============================================
        {
            id: 'lr-01',
            album: 'album',
            titulo: 'CONTIGO',
            feat: null,
            portada: 'assets/portadas/sordo.jpg',
            audioArchivo: 'assets/audio-fragmentos/lr-01-contigo.m4a'
        },
        {
            id: 'lr-02',
            album: 'album',
            titulo: 'SUMISA',
            feat: null,
            portada: 'assets/portadas/sordo.jpg',
            audioArchivo: 'assets/audio-fragmentos/lr-02-sumisa.m4a'
        },
        {
            id: 'lr-03',
            album: 'album',
            titulo: 'RETRICA',
            feat: null,
            portada: 'assets/portadas/sordo.jpg',
            audioArchivo: 'assets/audio-fragmentos/lr-03-retrica.m4a'
        },
        {
            id: 'lr-04',
            album: 'album',
            titulo: 'TOCO TOCA',
            feat: null,
            portada: 'assets/portadas/sordo.jpg',
            audioArchivo: 'assets/audio-fragmentos/lr-04-toco-toca.m4a'
        },
        {
            id: 'lr-05',
            album: 'album',
            titulo: 'RIGHT NOW',
            feat: null,
            portada: 'assets/portadas/sordo.jpg',
            audioArchivo: 'assets/audio-fragmentos/lr-05-right-now.m4a'
        },
        {
            id: 'lr-06',
            album: 'album',
            titulo: 'LOLA',
            feat: null,
            portada: 'assets/portadas/sordo.jpg',
            audioArchivo: 'assets/audio-fragmentos/lr-06-lola.m4a'
        },
        {
            id: 'lr-07',
            album: 'album',
            titulo: 'AHORA NO',
            feat: null,
            portada: 'assets/portadas/sordo.jpg',
            audioArchivo: 'assets/audio-fragmentos/lr-07-ahora-no.m4a'
        },
        {
            id: 'lr-08',
            album: 'album',
            titulo: 'SORDO DE UN PIE',
            feat: null,
            portada: 'assets/portadas/sordo.jpg',
            audioArchivo: 'assets/audio-fragmentos/lr-08-sordo-de-un-pie.m4a'
        },
        {
            id: 'lr-09',
            album: 'album',
            titulo: 'RESACA EMOCIONAL',
            feat: ['Daniela Garsal'],
            portada: 'assets/portadas/sordo.jpg',
            audioArchivo: 'assets/audio-fragmentos/lr-09-resaca-emocional.m4a'
        },
        {
            id: 'lr-10',
            album: 'album',
            titulo: 'FACE ID',
            feat: null,
            portada: 'assets/portadas/sordo.jpg',
            audioArchivo: 'assets/audio-fragmentos/lr-10-face-id.m4a'
        },
        {
            id: 'lr-11',
            album: 'album',
            titulo: 'SENTADILLA',
            feat: ['Sech'],
            portada: 'assets/portadas/sordo.jpg',
            audioArchivo: 'assets/audio-fragmentos/lr-11-sentadilla.m4a'
        },
        {
            id: 'lr-12',
            album: 'album',
            titulo: 'AIRE',
            feat: null,
            portada: 'assets/portadas/sordo.jpg',
            audioArchivo: 'assets/audio-fragmentos/lr-12-aire.m4a'
        },
        {
            id: 'lr-13',
            album: 'album',
            titulo: 'VAMOS PALLÁ',
            feat: ['Alleh'],
            portada: 'assets/portadas/sordo.jpg',
            audioArchivo: 'assets/audio-fragmentos/lr-13-vamos-palla.m4a'
        },
        {
            id: 'lr-14',
            album: 'album',
            titulo: 'SINTIGO',
            feat: null,
            portada: 'assets/portadas/sordo.jpg',
            audioArchivo: 'assets/audio-fragmentos/lr-14-sintigo.m4a'
        },
        {
            id: 'lr-15',
            album: 'album',
            titulo: 'QUERIDO TIEMPO',
            feat: null,
            portada: 'assets/portadas/sordo.jpg',
            audioArchivo: 'assets/audio-fragmentos/lr-15-querido-tiempo.m4a'
        },
        {
            id: 'lr-16',
            album: 'album',
            titulo: 'X SI MUERO JOVEN',
            feat: null,
            portada: 'assets/portadas/sordo.jpg',
            audioArchivo: 'assets/audio-fragmentos/lr-16-x-si-muero-joven.m4a'
        },

        // ============================================
        // TA FACIL - 7 canciones
        // ============================================
        {
            id: 'lr-17',
            album: 'tafacil',
            titulo: 'BANE',
            feat: ['La Pantera'],
            portada: 'assets/portadas/tafacil.jpg',
            audioArchivo: 'assets/audio-fragmentos/lr-17-bane.m4a'
        },
        {
            id: 'lr-18',
            album: 'tafacil',
            titulo: 'SOÑASTE CON UN DRACO',
            feat: ['La Pantera'],
            portada: 'assets/portadas/tafacil.jpg',
            audioArchivo: 'assets/audio-fragmentos/lr-18-sonaste-con-un-draco.m4a'
        },
        {
            id: 'lr-19',
            album: 'tafacil',
            titulo: 'LIP SYNC',
            feat: ['La Pantera'],
            portada: 'assets/portadas/tafacil.jpg',
            audioArchivo: 'assets/audio-fragmentos/lr-19-lip-sync.m4a'
        },
        {
            id: 'lr-20',
            album: 'tafacil',
            titulo: 'TU CANCION',
            feat: ['La Pantera'],
            portada: 'assets/portadas/tafacil.jpg',
            audioArchivo: 'assets/audio-fragmentos/lr-20-tu-cancion.m4a'
        },
        {
            id: 'lr-21',
            album: 'tafacil',
            titulo: 'TOCATE SOLA',
            feat: ['La Pantera'],
            portada: 'assets/portadas/tafacil.jpg',
            audioArchivo: 'assets/audio-fragmentos/lr-21-tocate-sola.m4a'
        },
        {
            id: 'lr-22',
            album: 'tafacil',
            titulo: 'PINKY PROMISE 2',
            feat: ['La Pantera'],
            portada: 'assets/portadas/tafacil.jpg',
            audioArchivo: 'assets/audio-fragmentos/lr-22-pinky-promise-2.m4a'
        },
        {
            id: 'lr-23',
            album: 'tafacil',
            titulo: 'INESTABLE',
            feat: ['La Pantera'],
            portada: 'assets/portadas/tafacil.jpg',
            audioArchivo: 'assets/audio-fragmentos/lr-23-inestable.m4a'
        },

        // ============================================
        // QUIÉN ESTÁ AQUÍ? - 9 canciones
        // ============================================
        {
            id: 'lr-24',
            album: 'quien',
            titulo: 'BIG CHECKS',
            feat: null,
            portada: 'assets/portadas/quien.jpg',
            audioArchivo: 'assets/audio-fragmentos/lr-24-big-checks.m4a'
        },
        {
            id: 'lr-25',
            album: 'quien',
            titulo: 'LA OTRA DE JUACKO',
            feat: null,
            portada: 'assets/portadas/quien.jpg',
            audioArchivo: 'assets/audio-fragmentos/lr-25-la-otra-de-juacko.m4a'
        },
        {
            id: 'lr-26',
            album: 'quien',
            titulo: 'AIAIAI',
            feat: null,
            portada: 'assets/portadas/quien.jpg',
            audioArchivo: 'assets/audio-fragmentos/lr-26-aiaiai.m4a'
        },
        {
            id: 'lr-27',
            album: 'quien',
            titulo: 'CARAMELO',
            feat: null,
            portada: 'assets/portadas/quien.jpg',
            audioArchivo: 'assets/audio-fragmentos/lr-27-caramelo.m4a'
        },
        {
            id: 'lr-28',
            album: 'quien',
            titulo: 'COSQUILLEO',
            feat: null,
            portada: 'assets/portadas/quien.jpg',
            audioArchivo: 'assets/audio-fragmentos/lr-28-cosquilleo.m4a'
        },
        {
            id: 'lr-29',
            album: 'quien',
            titulo: 'UN AÑITO MÁS',
            feat: null,
            portada: 'assets/portadas/quien.jpg',
            audioArchivo: 'assets/audio-fragmentos/lr-29-un-anito-mas.m4a'
        },
        {
            id: 'lr-30',
            album: 'quien',
            titulo: 'MANLEY',
            feat: null,
            portada: 'assets/portadas/quien.jpg',
            audioArchivo: 'assets/audio-fragmentos/lr-30-manley.m4a'
        },
        {
            id: 'lr-31',
            album: 'quien',
            titulo: 'ESOS OJITOS',
            feat: null,
            portada: 'assets/portadas/quien.jpg',
            audioArchivo: 'assets/audio-fragmentos/lr-31-esos-ojitos.m4a'
        },
        {
            id: 'lr-32',
            album: 'quien',
            titulo: 'AQUÍ ESTOY',
            feat: null,
            portada: 'assets/portadas/quien.jpg',
            audioArchivo: 'assets/audio-fragmentos/lr-32-aqui-estoy.m4a'
        },

        // ============================================
        // SINGLES Y COLABORACIONES - 18 canciones
        // ============================================
        {
            id: 'lr-33',
            album: 'single',
            titulo: 'ALGO VA A PASAR',
            feat: ['Quevedo', 'La Pantera', 'Juseph'],
            portada: 'assets/portadas/lr-33-algo-va-a-pasar.jpg',
            audioArchivo: 'assets/audio-fragmentos/lr-33-algo-va-a-pasar.m4a'
        },
        {
            id: 'lr-34',
            album: 'single',
            titulo: 'ACELERAAÁ',
            feat: ['Alvaro Diaz', 'Kidd Voodoo'],
            portada: 'assets/portadas/lr-34-aceleraa.jpg',
            audioArchivo: 'assets/audio-fragmentos/lr-34-aceleraa.m4a'
        },
        {
            id: 'lr-35',
            album: 'single',
            titulo: 'CUPIDOXX',
            feat: ['La Pantera', 'Juseph'],
            portada: 'assets/portadas/lr-35-cupidoxx.jpg',
            audioArchivo: 'assets/audio-fragmentos/lr-35-cupidoxx.m4a'
        },
        {
            id: 'lr-36',
            album: 'single',
            titulo: 'PREÑÁ',
            feat: null,
            portada: 'assets/portadas/rk.jpg',
            audioArchivo: 'assets/audio-fragmentos/lr-36-prena.m4a'
        },
        {
            id: 'lr-37',
            album: 'single',
            titulo: 'MATRÍCULA',
            feat: null,
            portada: 'assets/portadas/lr-37-matricula.jpg',
            audioArchivo: 'assets/audio-fragmentos/lr-37-matricula.m4a'
        },
        {
            id: 'lr-38',
            album: 'single',
            titulo: 'GUAYA',
            feat: ['Quevedo'],
            portada: 'assets/portadas/lr-38-guaya.jpg',
            audioArchivo: 'assets/audio-fragmentos/lr-38-guaya.m4a'
        },
        {
            id: 'lr-39',
            album: 'single',
            titulo: 'KTM',
            feat: ['Aissa'],
            portada: 'assets/portadas/lr-39-ktm.jpg',
            audioArchivo: 'assets/audio-fragmentos/lr-39-ktm.m4a'
        },
        {
            id: 'lr-40',
            album: 'single',
            titulo: 'ACELERÁ',
            feat: null,
            portada: 'assets/portadas/rk.jpg',
            audioArchivo: 'assets/audio-fragmentos/lr-40-acelera.m4a'
        },
        {
            id: 'lr-41',
            album: 'single',
            titulo: 'TUMBAO',
            feat: null,
            portada: 'assets/portadas/lr-41-tumbao.jpg',
            audioArchivo: 'assets/audio-fragmentos/lr-41-tumbao.m4a'
        },
        {
            id: 'lr-42',
            album: 'single',
            titulo: 'LUCY',
            feat: ['La Pantera'],
            portada: 'assets/portadas/lr-42-lucy.jpg',
            audioArchivo: 'assets/audio-fragmentos/lr-42-lucy.m4a'
        },
        {
            id: 'lr-43',
            album: 'single',
            titulo: 'F4F',
            feat: null,
            portada: 'assets/portadas/lr-43-f4f.jpg',
            audioArchivo: 'assets/audio-fragmentos/lr-43-f4f.m4a'
        },
        {
            id: 'lr-44',
            album: 'single',
            titulo: 'LULUNA',
            feat: null,
            portada: 'assets/portadas/lr-44-luluna.jpg',
            audioArchivo: 'assets/audio-fragmentos/lr-44-luluna.m4a'
        },
        {
            id: 'lr-45',
            album: 'single',
            titulo: '1STEP',
            feat: null,
            portada: 'assets/portadas/lr-45-1step.jpg',
            audioArchivo: 'assets/audio-fragmentos/lr-45-1step.m4a'
        },
        {
            id: 'lr-46',
            album: 'single',
            titulo: 'GLOSS (DIDARIE)',
            feat: null,
            portada: 'assets/portadas/lr-46-gloss-didarie.jpg',
            audioArchivo: 'assets/audio-fragmentos/lr-46-gloss-didarie.m4a'
        },
        {
            id: 'lr-47',
            album: 'single',
            titulo: 'OTRA MIRADA',
            feat: ['Linton'],
            portada: 'assets/portadas/lr-47-otra-mirada.jpg',
            audioArchivo: 'assets/audio-fragmentos/lr-47-otra-mirada.m4a'
        },
        {
            id: 'lr-48',
            album: 'single',
            titulo: 'QUESESIENTE',
            feat: null,
            portada: 'assets/portadas/lr-48-quesesiente.jpg',
            audioArchivo: 'assets/audio-fragmentos/lr-48-quesesiente.m4a'
        },
        {
            id: 'lr-49',
            album: 'single',
            titulo: 'DESCARÁ',
            feat: ['La Pantera'],
            portada: 'assets/portadas/lr-49-descara.jpg',
            audioArchivo: 'assets/audio-fragmentos/lr-49-descara.m4a'
        },
        {
            id: 'lr-50',
            album: 'single',
            titulo: 'UNA CARTA',
            feat: null,
            portada: 'assets/portadas/lr-50-una-carta.jpg',
            audioArchivo: 'assets/audio-fragmentos/lr-50-una-carta.m4a'
        }
    ]
};