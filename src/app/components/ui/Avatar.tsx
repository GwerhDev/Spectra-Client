import { AVATAR_COLORS } from '@/mocks/data';
import { Icon } from './Icon';

interface AvatarProps {
  name: string;
  size?: number;
  speaking?: boolean;
  muted?: boolean;
  border?: string;
}

export function Avatar({ name, size = 32, speaking = false, muted = false, border }: AvatarProps) {
  const initials = name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
  const hash = [...name].reduce((a, c) => a + c.charCodeAt(0), 0);
  const bg = AVATAR_COLORS[hash % AVATAR_COLORS.length];

  return (
    <div style={{
      width: size, height: size,
      borderRadius: size * 0.3,
      background: bg,
      color: 'oklch(0.18 0.005 60)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.38, fontWeight: 600,
      flexShrink: 0,
      position: 'relative',
      boxShadow: speaking ? '0 0 0 2px var(--accent)' : (border ?? 'none'),
      transition: 'box-shadow 150ms',
    }}>
      {initials}
      {muted && (
        <div style={{
          position: 'absolute', bottom: -2, right: -2,
          width: size * 0.4, height: size * 0.4,
          background: 'var(--bg)', borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--live)',
        }}>
          <Icon name="micOff" size={size * 0.25}/>
        </div>
      )}
    </div>
  );
}
