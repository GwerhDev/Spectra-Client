interface WaveformProps {
  active?: boolean;
  bars?: number;
  color?: string;
  size?: number;
}

export function Waveform({ active = true, bars = 4, color = 'var(--accent)', size = 10 }: WaveformProps) {
  return (
    <div style={{ display: 'inline-flex', gap: 2, alignItems: 'center', height: size + 4 }}>
      {Array.from({ length: bars }).map((_, i) => (
        <span key={i} style={{
          width: 2,
          background: color,
          borderRadius: 1,
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
}
