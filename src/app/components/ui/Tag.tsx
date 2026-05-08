import { Icon } from './Icon';
import type { IconName } from './Icon';

type Tone = 'default' | 'live' | 'accent' | 'sync';

interface TagProps {
  children: React.ReactNode;
  tone?: Tone;
  icon?: IconName;
}

const TONES: Record<Tone, { bg: string; fg: string; bd: string }> = {
  default: { bg: 'var(--bg-elev-2)',          fg: 'var(--fg-dim)',           bd: 'var(--line)' },
  live:    { bg: 'oklch(0.25 0.08 25)',        fg: 'oklch(0.85 0.14 25)',     bd: 'oklch(0.45 0.12 25)' },
  accent:  { bg: 'oklch(0.28 0.06 85)',        fg: 'var(--accent)',           bd: 'oklch(0.45 0.08 85)' },
  sync:    { bg: 'oklch(0.25 0.05 155)',       fg: 'var(--ok)',               bd: 'oklch(0.42 0.08 155)' },
};

export function Tag({ children, tone = 'default', icon }: TagProps) {
  const t = TONES[tone];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      height: 22, padding: '0 8px',
      fontSize: 11, fontFamily: 'var(--font-mono)',
      letterSpacing: '0.04em', textTransform: 'uppercase',
      background: t.bg, color: t.fg,
      border: `1px solid ${t.bd}`,
      borderRadius: 6,
    }}>
      {tone === 'live' && <span className="live-dot"/>}
      {icon && <Icon name={icon} size={11}/>}
      {children}
    </span>
  );
}
