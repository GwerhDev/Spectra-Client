export type IconName =
  | 'home' | 'search' | 'play' | 'pause' | 'mic' | 'micOff'
  | 'video' | 'videoOff' | 'screen' | 'chat' | 'users' | 'settings'
  | 'plus' | 'chevR' | 'chevD' | 'hash' | 'lock' | 'volume'
  | 'fullscreen' | 'close' | 'send' | 'film' | 'music' | 'sync'
  | 'sparkle' | 'signal' | 'dot';

interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function Icon({ name, size = 16, className = '', style }: IconProps) {
  const common = {
    width: size, height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className,
    style,
  };

  const paths: Record<IconName, React.ReactNode> = {
    home:       <><path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1v-9z"/></>,
    search:     <><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></>,
    play:       <><path d="M7 5v14l12-7L7 5z" fill="currentColor"/></>,
    pause:      <><rect x="6" y="5" width="4" height="14" fill="currentColor"/><rect x="14" y="5" width="4" height="14" fill="currentColor"/></>,
    mic:        <><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></>,
    micOff:     <><path d="m3 3 18 18"/><path d="M9 9v2a3 3 0 0 0 4.9 2.3M15 11V6a3 3 0 0 0-6 0"/><path d="M5 11a7 7 0 0 0 11.4 5.4M19 11a7 7 0 0 1-1 3.6M12 18v3"/></>,
    video:      <><rect x="3" y="6" width="13" height="12" rx="1"/><path d="m16 10 5-3v10l-5-3z"/></>,
    videoOff:   <><path d="m3 3 18 18"/><path d="M10 6h4a2 2 0 0 1 2 2v2l5-3v10l-5-3v-1M3 8v8a2 2 0 0 0 2 2h6"/></>,
    screen:     <><rect x="2" y="4" width="20" height="13" rx="1"/><path d="M8 21h8M12 17v4"/></>,
    chat:       <><path d="M4 5h16v11H9l-5 4V5z"/></>,
    users:      <><circle cx="9" cy="8" r="3"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><circle cx="17" cy="7" r="2.5"/><path d="M15 14c3 0 5 2 5 5"/></>,
    settings:   <><circle cx="12" cy="12" r="3"/><path d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.3-7.3-1.4 1.4M7.1 16.9l-1.4 1.4m12.6 0-1.4-1.4M7.1 7.1 5.7 5.7"/></>,
    plus:       <><path d="M12 5v14M5 12h14"/></>,
    chevR:      <><path d="m9 6 6 6-6 6"/></>,
    chevD:      <><path d="m6 9 6 6 6-6"/></>,
    hash:       <><path d="M4 9h16M4 15h16M10 3 8 21M16 3l-2 18"/></>,
    lock:       <><rect x="5" y="11" width="14" height="10" rx="1"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></>,
    volume:     <><path d="M11 5 6 9H2v6h4l5 4V5z"/><path d="M15 9a3 3 0 0 1 0 6M18 6a7 7 0 0 1 0 12"/></>,
    fullscreen: <><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></>,
    close:      <><path d="M6 6l12 12M18 6 6 18"/></>,
    send:       <><path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z"/></>,
    film:       <><rect x="3" y="4" width="18" height="16" rx="1"/><path d="M7 4v16M17 4v16M3 8h4M17 8h4M3 12h4M17 12h4M3 16h4M17 16h4"/></>,
    music:      <><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></>,
    sync:       <><path d="M21 12a9 9 0 0 1-15 6.7L3 16M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M21 3v5h-5M3 21v-5h5"/></>,
    sparkle:    <><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8"/></>,
    signal:     <><path d="M3 18h2v-4H3zM8 18h2V9H8zM13 18h2V4h-2zM18 18h2v-8h-2z" fill="currentColor" stroke="none"/></>,
    dot:        <><circle cx="12" cy="12" r="3" fill="currentColor"/></>,
  };

  return <svg {...common}>{paths[name]}</svg>;
}
