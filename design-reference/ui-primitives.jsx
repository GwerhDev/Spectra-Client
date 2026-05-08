// Shared UI primitives for Spectra
const { useState, useEffect, useRef, useMemo } = React;

// --- Iconography (minimal line icons, 1.5 stroke) ---
const Icon = ({ name, size = 16, className = '' }) => {
  const s = size;
  const common = { width: s, height: s, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round', className };
  const paths = {
    home: <><path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1v-9z"/></>,
    search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></>,
    play: <><path d="M7 5v14l12-7L7 5z" fill="currentColor"/></>,
    pause: <><rect x="6" y="5" width="4" height="14" fill="currentColor"/><rect x="14" y="5" width="4" height="14" fill="currentColor"/></>,
    mic: <><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></>,
    micOff: <><path d="m3 3 18 18"/><path d="M9 9v2a3 3 0 0 0 4.9 2.3M15 11V6a3 3 0 0 0-6 0"/><path d="M5 11a7 7 0 0 0 11.4 5.4M19 11a7 7 0 0 1-1 3.6M12 18v3"/></>,
    video: <><rect x="3" y="6" width="13" height="12" rx="1"/><path d="m16 10 5-3v10l-5-3z"/></>,
    videoOff: <><path d="m3 3 18 18"/><path d="M10 6h4a2 2 0 0 1 2 2v2l5-3v10l-5-3v-1M3 8v8a2 2 0 0 0 2 2h6"/></>,
    screen: <><rect x="2" y="4" width="20" height="13" rx="1"/><path d="M8 21h8M12 17v4"/></>,
    chat: <><path d="M4 5h16v11H9l-5 4V5z"/></>,
    users: <><circle cx="9" cy="8" r="3"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><circle cx="17" cy="7" r="2.5"/><path d="M15 14c3 0 5 2 5 5"/></>,
    settings: <><circle cx="12" cy="12" r="3"/><path d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.3-7.3-1.4 1.4M7.1 16.9l-1.4 1.4m12.6 0-1.4-1.4M7.1 7.1 5.7 5.7"/></>,
    plus: <><path d="M12 5v14M5 12h14"/></>,
    chevR: <><path d="m9 6 6 6-6 6"/></>,
    chevD: <><path d="m6 9 6 6 6-6"/></>,
    hash: <><path d="M4 9h16M4 15h16M10 3 8 21M16 3l-2 18"/></>,
    lock: <><rect x="5" y="11" width="14" height="10" rx="1"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></>,
    volume: <><path d="M11 5 6 9H2v6h4l5 4V5z"/><path d="M15 9a3 3 0 0 1 0 6M18 6a7 7 0 0 1 0 12"/></>,
    fullscreen: <><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></>,
    close: <><path d="M6 6l12 12M18 6 6 18"/></>,
    send: <><path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z"/></>,
    film: <><rect x="3" y="4" width="18" height="16" rx="1"/><path d="M7 4v16M17 4v16M3 8h4M17 8h4M3 12h4M17 12h4M3 16h4M17 16h4"/></>,
    music: <><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></>,
    sync: <><path d="M21 12a9 9 0 0 1-15 6.7L3 16M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M21 3v5h-5M3 21v-5h5"/></>,
    sparkle: <><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8"/></>,
    signal: <><path d="M3 18h2v-4H3zM8 18h2V9H8zM13 18h2V4h-2zM18 18h2v-8h-2z" fill="currentColor" stroke="none"/></>,
    dot: <><circle cx="12" cy="12" r="3" fill="currentColor"/></>,
  };
  return <svg {...common}>{paths[name]}</svg>;
};

// --- Avatar (initials-based, no images) ---
const AVATAR_COLORS = [
  'oklch(0.65 0.14 25)',
  'oklch(0.70 0.12 155)',
  'oklch(0.68 0.13 250)',
  'oklch(0.72 0.13 85)',
  'oklch(0.64 0.15 320)',
  'oklch(0.68 0.13 190)',
];
const Avatar = ({ name, size = 32, speaking = false, muted = false, border = null }) => {
  const initials = name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
  const hash = [...name].reduce((a, c) => a + c.charCodeAt(0), 0);
  const bg = AVATAR_COLORS[hash % AVATAR_COLORS.length];
  return (
    <div style={{
      width: size, height: size, borderRadius: size * 0.3,
      background: bg,
      color: 'oklch(0.18 0.005 60)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.38, fontWeight: 600,
      flexShrink: 0,
      position: 'relative',
      boxShadow: speaking ? `0 0 0 2px var(--accent)` : border || 'none',
      transition: 'box-shadow 150ms',
    }}>
      {initials}
      {muted && (
        <div style={{
          position: 'absolute', bottom: -2, right: -2,
          width: size * 0.4, height: size * 0.4,
          background: 'var(--bg)',
          borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--live)',
        }}>
          <Icon name="micOff" size={size * 0.25} />
        </div>
      )}
    </div>
  );
};

// --- Button ---
const Btn = ({ children, variant = 'ghost', size = 'md', onClick, active, icon, style = {}, title }) => {
  const sizes = {
    sm: { h: 28, px: 10, fs: 12 },
    md: { h: 34, px: 14, fs: 13 },
    lg: { h: 42, px: 20, fs: 14 },
  };
  const variants = {
    primary: { bg: 'var(--accent)', color: 'oklch(0.15 0 0)', border: 'transparent' },
    solid: { bg: 'var(--bg-elev-2)', color: 'var(--fg)', border: 'var(--line)' },
    ghost: { bg: 'transparent', color: 'var(--fg-dim)', border: 'transparent' },
    outline: { bg: 'transparent', color: 'var(--fg)', border: 'var(--line)' },
    danger: { bg: 'var(--live)', color: 'oklch(0.12 0 0)', border: 'transparent' },
  };
  const s = sizes[size]; const v = variants[variant];
  return (
    <button onClick={onClick} title={title} style={{
      height: s.h, padding: `0 ${s.px}px`, fontSize: s.fs,
      background: active ? 'var(--bg-elev-2)' : v.bg,
      color: active ? 'var(--fg)' : v.color,
      border: `1px solid ${v.border}`,
      borderRadius: 8,
      display: 'inline-flex', alignItems: 'center', gap: 8,
      fontWeight: 500, letterSpacing: '-0.005em',
      transition: 'background 120ms, color 120ms, border-color 120ms',
      ...style,
    }}
    onMouseEnter={e => { if (variant === 'ghost' && !active) e.currentTarget.style.background = 'var(--bg-elev)'; }}
    onMouseLeave={e => { if (variant === 'ghost' && !active) e.currentTarget.style.background = 'transparent'; }}
    >
      {icon && <Icon name={icon} size={s.fs + 2} />}
      {children}
    </button>
  );
};

// --- Waveform (for speaking indicator / audio) ---
const Waveform = ({ active = true, bars = 4, color = 'var(--accent)', size = 10 }) => (
  <div style={{ display: 'inline-flex', gap: 2, alignItems: 'center', height: size + 4 }}>
    {Array.from({ length: bars }).map((_, i) => (
      <span key={i} style={{
        width: 2, background: color, borderRadius: 1,
        height: active ? `${size}px` : '2px',
        animation: active ? `wave${i % 3} 0.${6 + i}s ease-in-out infinite alternate` : 'none',
      }}/>
    ))}
    <style>{`
      @keyframes wave0 { from { height: 30% } to { height: 100% } }
      @keyframes wave1 { from { height: 60% } to { height: 40% } }
      @keyframes wave2 { from { height: 100% } to { height: 30% } }
    `}</style>
  </div>
);

// --- Placeholder art (striped + label) ---
const Thumb = ({ label, ratio = '16/9', hue = 60, height }) => (
  <div style={{
    aspectRatio: height ? undefined : ratio,
    height,
    width: '100%',
    background: `repeating-linear-gradient(135deg, oklch(0.30 0.02 ${hue}) 0 2px, oklch(0.24 0.015 ${hue}) 2px 14px)`,
    position: 'relative',
    borderRadius: 4,
    overflow: 'hidden',
  }}>
    <div style={{
      position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase',
      color: 'oklch(0.85 0.01 60)', textShadow: '0 1px 2px oklch(0 0 0 / 0.5)',
    }}>{label}</div>
  </div>
);

// --- Tag / Pill ---
const Tag = ({ children, tone = 'default', icon }) => {
  const tones = {
    default: { bg: 'var(--bg-elev-2)', fg: 'var(--fg-dim)', bd: 'var(--line)' },
    live: { bg: 'oklch(0.25 0.08 25)', fg: 'oklch(0.85 0.14 25)', bd: 'oklch(0.45 0.12 25)' },
    accent: { bg: 'oklch(0.28 0.06 85)', fg: 'var(--accent)', bd: 'oklch(0.45 0.08 85)' },
    sync: { bg: 'oklch(0.25 0.05 155)', fg: 'var(--ok)', bd: 'oklch(0.42 0.08 155)' },
  };
  const t = tones[tone];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      height: 22, padding: '0 8px',
      fontSize: 11, fontFamily: 'var(--font-mono)',
      letterSpacing: '0.04em', textTransform: 'uppercase',
      background: t.bg, color: t.fg,
      border: `1px solid ${t.bd}`,
      borderRadius: 4,
    }}>
      {tone === 'live' && <span className="live-dot"/>}
      {icon && <Icon name={icon} size={11}/>}
      {children}
    </span>
  );
};

// Export
Object.assign(window, { Icon, Avatar, Btn, Waveform, Thumb, Tag, AVATAR_COLORS });
