import { Icon } from './Icon';
import type { IconName } from './Icon';

// Re-export so callers don't need a separate import
export type { IconName };

type Variant = 'primary' | 'solid' | 'ghost' | 'outline' | 'danger';
type Size = 'sm' | 'md' | 'lg';

interface BtnProps {
  children?: React.ReactNode;
  variant?: Variant;
  size?: Size;
  onClick?: () => void;
  active?: boolean;
  icon?: IconName;
  style?: React.CSSProperties;
  title?: string;
}

const SIZES = {
  sm: { h: 28, px: 10, fs: 12, r: 8  },
  md: { h: 34, px: 14, fs: 13, r: 12 },
  lg: { h: 42, px: 20, fs: 14, r: 16 },
};

const VARIANTS: Record<Variant, { bg: string; color: string; border: string }> = {
  primary: { bg: 'var(--accent)',      color: 'oklch(0.15 0 0)', border: 'transparent' },
  solid:   { bg: 'var(--bg-elev-2)',   color: 'var(--fg)',        border: 'var(--line)' },
  ghost:   { bg: 'transparent',        color: 'var(--fg-dim)',    border: 'transparent' },
  outline: { bg: 'transparent',        color: 'var(--fg)',        border: 'var(--line)' },
  danger:  { bg: 'var(--live)',        color: 'oklch(0.12 0 0)', border: 'transparent' },
};

export function Btn({ children, variant = 'ghost', size = 'md', onClick, active, icon, style = {}, title }: BtnProps) {
  const s = SIZES[size];
  const v = VARIANTS[variant];

  return (
    <button
      onClick={onClick}
      title={title}
      onMouseEnter={e => {
        if (variant === 'ghost' && !active)
          (e.currentTarget as HTMLButtonElement).style.background = 'var(--bg-elev)';
      }}
      onMouseLeave={e => {
        if (variant === 'ghost' && !active)
          (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
      }}
      style={{
        height: s.h, padding: `0 ${s.px}px`, fontSize: s.fs,
        background: active ? 'var(--bg-elev-2)' : v.bg,
        color: active ? 'var(--fg)' : v.color,
        border: `1px solid ${v.border}`,
        borderRadius: s.r,
        display: 'inline-flex', alignItems: 'center', gap: 8,
        fontWeight: 500, letterSpacing: '-0.005em',
        transition: 'background 120ms, color 120ms, border-color 120ms',
        ...style,
      }}
    >
      {icon && <Icon name={icon} size={s.fs + 2}/>}
      {children}
    </button>
  );
}
