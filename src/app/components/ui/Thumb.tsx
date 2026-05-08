interface ThumbProps {
  label?: string;
  ratio?: string;
  hue?: number;
  height?: number | string;
}

export function Thumb({ label, ratio = '16/9', hue = 60, height }: ThumbProps) {
  return (
    <div style={{
      aspectRatio: height ? undefined : ratio,
      height,
      width: '100%',
      background: `repeating-linear-gradient(135deg,
        oklch(0.30 0.02 ${hue}) 0 2px,
        oklch(0.24 0.015 ${hue}) 2px 14px)`,
      position: 'relative',
      borderRadius: 4,
      overflow: 'hidden',
    }}>
      {label && (
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-mono)', fontSize: 10,
          letterSpacing: '0.08em', textTransform: 'uppercase',
          color: 'oklch(0.85 0.01 60)',
          textShadow: '0 1px 2px oklch(0 0 0 / 0.5)',
        }}>{label}</div>
      )}
    </div>
  );
}
