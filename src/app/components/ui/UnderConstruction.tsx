interface UnderConstructionProps {
  label?: string;
}

export function UnderConstruction({ label }: UnderConstructionProps) {
  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 20,
      padding: '64px',
    }}>
      <div style={{
        width: 1,
        height: 64,
        background: 'linear-gradient(to bottom, transparent, var(--line-soft))',
      }}/>
      <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <span className="mono" style={{
          fontSize: 10,
          color: 'var(--accent)',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
        }}>
          Under construction
        </span>
        {label && (
          <h2 style={{
            fontSize: 28,
            fontWeight: 500,
            letterSpacing: '-0.025em',
            margin: 0,
            color: 'var(--fg)',
          }}>
            {label}
          </h2>
        )}
        <p className="mono" style={{
          fontSize: 12,
          color: 'var(--fg-mute)',
          margin: 0,
          letterSpacing: '0.02em',
          lineHeight: 1.6,
        }}>
          This section is on its way.
        </p>
      </div>
      <div style={{
        width: 1,
        height: 64,
        background: 'linear-gradient(to top, transparent, var(--line-soft))',
      }}/>
    </div>
  );
}
