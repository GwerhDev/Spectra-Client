// Sample data for Spectra

const PEOPLE = [
  { name: 'Ana Torres', role: 'host' },
  { name: 'Marco Vieri', role: 'member' },
  { name: 'Kenji Sato', role: 'member' },
  { name: 'Lu Reyes', role: 'member' },
  { name: 'Sasha Iqbal', role: 'member' },
  { name: 'Noor Aziz', role: 'member' },
  { name: 'Rio Lin', role: 'member' },
  { name: 'Paula Vidal', role: 'member' },
  { name: 'Dmitri Kovac', role: 'member' },
  { name: 'Julián Ortiz', role: 'member' },
  { name: 'Téa Moreno', role: 'member' },
  { name: 'Ivo Pérez', role: 'member' },
];

const COMMUNITIES = [
  { id: 'cine', name: 'Cineclub Medianoche', members: 1284, color: 85, glyph: '◐' },
  { id: 'syn', name: 'Synthwave Lounge', members: 642, color: 320, glyph: '◑' },
  { id: 'arq', name: 'Arquitectura & Docs', members: 389, color: 190, glyph: '◒' },
  { id: 'fut', name: 'Futurismo Semanal', members: 921, color: 25, glyph: '◓' },
  { id: 'co-w', name: 'Co-work Silent', members: 248, color: 155, glyph: '○' },
];

const ACTIVE_ROOMS = [
  {
    id: 'r1', community: 'cine', title: 'Blade Runner 2049 — revisión',
    mode: 'film', content: 'Blade Runner 2049', elapsed: '01:12:48', duration: '02:43:11',
    host: 'Ana Torres',
    participants: 8, peak: 14,
    tags: ['ES/EN', 'Spoilers OK'],
    sync: true, cover: 'Film still · cityscape',
  },
  {
    id: 'r2', community: 'syn', title: 'Focus beats + vinyl night',
    mode: 'music', content: 'Playlist · 42 tracks',
    host: 'Marco Vieri',
    participants: 23, peak: 41,
    tags: ['Lofi', 'Sin spoilers'],
    sync: true, cover: 'Album art · vaporwave',
  },
  {
    id: 'r3', community: 'arq', title: 'Pritzker 2026 — pantalla compartida',
    mode: 'screen', content: 'Ana compartiendo',
    host: 'Ana Torres',
    participants: 5, peak: 5,
    tags: ['Privada'],
    sync: false, cover: 'Screen share · slide deck',
    locked: true,
  },
  {
    id: 'r4', community: 'fut', title: 'Dune: Part Two · watch party',
    mode: 'film', content: 'Dune: Part Two', elapsed: '00:34:20', duration: '02:46:00',
    host: 'Kenji Sato',
    participants: 47, peak: 62,
    tags: ['ES', 'Subs CC'],
    sync: true, cover: 'Film still · desert',
  },
];

const CATALOG = [
  { title: 'Arrival', year: 2016, runtime: '1h 56m', kind: 'Film', hue: 190 },
  { title: 'Perfect Days', year: 2023, runtime: '2h 03m', kind: 'Film', hue: 85 },
  { title: 'The Zone of Interest', year: 2023, runtime: '1h 45m', kind: 'Film', hue: 25 },
  { title: 'Severance · S2', year: 2025, runtime: '10 ep', kind: 'Series', hue: 250 },
  { title: 'Past Lives', year: 2023, runtime: '1h 46m', kind: 'Film', hue: 320 },
  { title: 'Andor · S2', year: 2025, runtime: '12 ep', kind: 'Series', hue: 155 },
  { title: 'Poor Things', year: 2023, runtime: '2h 21m', kind: 'Film', hue: 85 },
  { title: 'Chernobyl', year: 2019, runtime: '5 ep', kind: 'Series', hue: 60 },
];

const CHAT_MESSAGES = [
  { who: 'Kenji Sato', at: '01:11:02', text: 'Este plano secuencia siempre me rompe la cabeza.' },
  { who: 'Lu Reyes', at: '01:11:18', text: 'el score de Zimmer acá es todo.', reactions: ['🔥', '✨'] },
  { who: 'Ana Torres', at: '01:11:40', text: 'pausamos en 2min para comentar?', highlight: true },
  { who: 'Marco Vieri', at: '01:12:05', text: '+1' },
  { who: 'Sasha Iqbal', at: '01:12:30', text: 'qué copa estás tomando ahí Ana 👀' },
];

Object.assign(window, { PEOPLE, COMMUNITIES, ACTIVE_ROOMS, CATALOG, CHAT_MESSAGES });
