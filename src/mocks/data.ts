import type { Person, Community, Room, CatalogItem, ChatMsg } from '@/interfaces';

export const PEOPLE: Person[] = [
  { name: 'Aria Voss',    role: 'host' },
  { name: 'Luca Ren',     role: 'member' },
  { name: 'Mira Callum',  role: 'member' },
  { name: 'Soren Dale',   role: 'member' },
  { name: 'Eli Nakash',   role: 'member' },
  { name: 'Nora Tane',    role: 'member' },
  { name: 'Cas Wren',     role: 'member' },
  { name: 'Pax Illum',    role: 'member' },
  { name: 'Ivy Solm',     role: 'member' },
  { name: 'Theo Orb',     role: 'member' },
  { name: 'Rael Finn',    role: 'member' },
  { name: 'Zoe Calder',   role: 'member' },
];

export const COMMUNITIES: Community[] = [
  { id: 'cine', name: 'Midnight Cineclub',   members: 1284, color: 85,  glyph: '◐' },
  { id: 'syn',  name: 'Synthwave Lounge',    members: 642,  color: 320, glyph: '◑' },
  { id: 'arq',  name: 'Architecture & Docs', members: 389,  color: 190, glyph: '◒' },
  { id: 'fut',  name: 'Future Weekly',       members: 921,  color: 25,  glyph: '◓' },
  { id: 'co-w', name: 'Co-work Silent',      members: 248,  color: 155, glyph: '○' },
];

export const ACTIVE_ROOMS: Room[] = [
  {
    id: 'r1', community: 'cine',
    title: 'Veridian Nocturne — revisit',
    mode: 'film', content: 'Veridian Nocturne',
    elapsed: '01:12:48', duration: '02:43:11',
    host: 'Aria Voss', participants: 8, peak: 14,
    tags: ['EN', 'Spoilers OK'],
    sync: true, cover: 'Film still · cityscape',
  },
  {
    id: 'r2', community: 'syn',
    title: 'Focus beats + vinyl night',
    mode: 'music', content: 'Playlist · 42 tracks',
    host: 'Luca Ren', participants: 23, peak: 41,
    tags: ['Lofi', 'No spoilers'],
    sync: true, cover: 'Album art · vaporwave',
  },
  {
    id: 'r3', community: 'arq',
    title: 'Prix 2026 — screen share session',
    mode: 'screen', content: 'Aria sharing',
    host: 'Aria Voss', participants: 5, peak: 5,
    tags: ['Private'],
    sync: false, cover: 'Screen share · slide deck',
    locked: true,
  },
  {
    id: 'r4', community: 'fut',
    title: 'Pale Horizon · watch party',
    mode: 'film', content: 'Pale Horizon',
    elapsed: '00:34:20', duration: '02:46:00',
    host: 'Mira Callum', participants: 47, peak: 62,
    tags: ['EN', 'Subs CC'],
    sync: true, cover: 'Film still · desert',
  },
];

export const CATALOG: CatalogItem[] = [
  { title: 'The Quiet Signal',    year: 2024, runtime: '1h 56m', kind: 'Film',   hue: 190 },
  { title: 'Pale Horizon',        year: 2023, runtime: '2h 03m', kind: 'Film',   hue: 85  },
  { title: 'Veridian Nocturne',   year: 2023, runtime: '1h 45m', kind: 'Film',   hue: 25  },
  { title: 'Fracture · S2',       year: 2025, runtime: '10 ep',  kind: 'Series', hue: 250 },
  { title: 'Between Lines',       year: 2023, runtime: '1h 46m', kind: 'Film',   hue: 320 },
  { title: 'Meridian · S2',       year: 2025, runtime: '12 ep',  kind: 'Series', hue: 155 },
  { title: 'Glass Menagerie',     year: 2023, runtime: '2h 21m', kind: 'Film',   hue: 85  },
  { title: 'Threshold',           year: 2022, runtime: '5 ep',   kind: 'Series', hue: 60  },
];

export const CHAT_MESSAGES: ChatMsg[] = [
  { who: 'Mira Callum', at: '01:11:02', text: 'This tracking shot always gets me.' },
  { who: 'Soren Dale',  at: '01:11:18', text: 'the score here is everything.', reactions: ['🔥', '✨'] },
  { who: 'Aria Voss',   at: '01:11:40', text: 'pause in 2min to discuss?', highlight: true },
  { who: 'Luca Ren',    at: '01:12:05', text: '+1' },
  { who: 'Eli Nakash',  at: '01:12:30', text: 'what are you drinking there Aria 👀' },
];

export const AVATAR_COLORS = [
  'oklch(0.65 0.14 25)',
  'oklch(0.70 0.12 155)',
  'oklch(0.68 0.13 250)',
  'oklch(0.72 0.13 85)',
  'oklch(0.64 0.15 320)',
  'oklch(0.68 0.13 190)',
];
