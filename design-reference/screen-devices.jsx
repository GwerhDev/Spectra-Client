// Mobile and TV companion views

const MobileView = () => {
  const [tab, setTab] = useState('room');
  return (
    <div style={{
      width: '100%', height: '100%',
      background: 'oklch(0.11 0.005 60)',
      display: 'flex', flexDirection: 'column',
      overflow: 'hidden',
    }}>
      {/* Video area */}
      <div style={{ position: 'relative', height: 220, background: 'oklch(0.14 0.01 190)' }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: `radial-gradient(ellipse at center, oklch(0.24 0.05 190) 0%, oklch(0.10 0.01 190) 70%)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div className="mono mute" style={{ fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase' }}>
            Blade Runner 2049
          </div>
        </div>
        <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', gap: 6 }}>
          <Tag tone="live">LIVE</Tag>
        </div>
        <div style={{ position: 'absolute', top: 12, right: 12 }}>
          <button style={{
            width: 32, height: 32, borderRadius: 16,
            background: 'oklch(0.12 0 0 / 0.6)', backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon name="fullscreen" size={14}/>
          </button>
        </div>
        {/* Progress */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: 'var(--line-soft)' }}>
          <div style={{ width: '45%', height: '100%', background: 'var(--accent)' }}/>
        </div>
      </div>

      {/* Participants strip */}
      <div style={{
        padding: '10px 14px',
        borderBottom: '1px solid var(--line-soft)',
        display: 'flex', alignItems: 'center', gap: 8,
        overflowX: 'auto',
      }}>
        {PEOPLE.slice(0, 5).map((p, i) => (
          <div key={i} style={{ position: 'relative', flexShrink: 0 }}>
            <Avatar name={p.name} size={36} speaking={i === 0}/>
            {i === 0 && <div style={{
              position: 'absolute', bottom: -2, left: '50%', transform: 'translateX(-50%)',
            }}><Waveform size={6} bars={3}/></div>}
          </div>
        ))}
        <div className="mono mute" style={{ fontSize: 10, marginLeft: 4, whiteSpace: 'nowrap' }}>+3</div>
        <div style={{ flex: 1 }}/>
        <button style={{
          width: 36, height: 36, borderRadius: 18,
          background: 'var(--accent)', color: 'oklch(0.15 0 0)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon name="mic" size={14}/>
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', padding: '0 14px', borderBottom: '1px solid var(--line-soft)', gap: 18 }}>
        {[['chat', 'Chat'], ['room', 'Sala'], ['people', 'Gente']].map(([k, l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            padding: '12px 0', fontSize: 12,
            color: tab === k ? 'var(--fg)' : 'var(--fg-mute)',
            borderBottom: `1.5px solid ${tab === k ? 'var(--accent)' : 'transparent'}`,
            marginBottom: -1,
          }}>{l}</button>
        ))}
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: 'auto', padding: 14, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {CHAT_MESSAGES.slice(0, 4).map((m, i) => <ChatMessage key={i} msg={m}/>)}
      </div>

      {/* Input */}
      <div style={{ padding: '10px 14px 14px', display: 'flex', gap: 6, borderTop: '1px solid var(--line-soft)' }}>
        <div style={{
          flex: 1, padding: '8px 12px',
          background: 'var(--bg-elev)', border: '1px solid var(--line-soft)', borderRadius: 20,
          fontSize: 13, color: 'var(--fg-mute)',
        }}>Mensaje...</div>
        <button style={{
          width: 36, height: 36, borderRadius: 18,
          background: 'var(--accent)', color: 'oklch(0.15 0 0)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon name="send" size={14}/>
        </button>
      </div>
    </div>
  );
};

const TVView = () => {
  return (
    <div style={{
      width: '100%', height: '100%',
      background: '#000',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Full-bleed stream */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `
          radial-gradient(ellipse at center, oklch(0.22 0.05 190) 0%, oklch(0.06 0.005 190) 75%),
          repeating-linear-gradient(135deg, oklch(0.12 0.01 190) 0 2px, oklch(0.08 0.005 190) 2px 18px)
        `,
      }}/>

      {/* Top bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        padding: '28px 48px',
        background: 'linear-gradient(oklch(0 0 0 / 0.7), transparent)',
        display: 'flex', alignItems: 'center', gap: 14,
      }}>
        <Tag tone="live">LIVE</Tag>
        <Tag tone="sync" icon="sync">SYNC</Tag>
        <div>
          <div style={{ fontSize: 18, fontWeight: 500, letterSpacing: '-0.015em' }}>Blade Runner 2049 — revisión</div>
          <div className="mono mute" style={{ fontSize: 12, marginTop: 4 }}>Cineclub Medianoche · 8 personas en la sala</div>
        </div>
      </div>

      {/* Participants as overlay (bottom-right) */}
      <div style={{
        position: 'absolute', bottom: 48, right: 48,
        display: 'flex', gap: 10,
      }}>
        {PEOPLE.slice(0, 4).map((p, i) => (
          <div key={i} style={{
            width: 140, aspectRatio: '16/10',
            borderRadius: 6,
            background: `repeating-linear-gradient(45deg,
              oklch(0.26 0.04 ${(p.name.charCodeAt(0) * 3) % 360}) 0 2px,
              oklch(0.20 0.03 ${(p.name.charCodeAt(0) * 3) % 360}) 2px 14px)`,
            border: i === 0 ? '1.5px solid var(--accent)' : '1px solid var(--line-soft)',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', bottom: 6, left: 8, right: 8,
              display: 'flex', alignItems: 'center', gap: 4,
            }}>
              {i === 0 && <span style={{ color: 'var(--accent)', fontSize: 10 }}>★</span>}
              <span style={{ fontSize: 11, fontWeight: 500 }}>{p.name.split(' ')[0]}</span>
              {i === 0 && <div style={{ marginLeft: 'auto' }}><Waveform size={7} bars={3}/></div>}
            </div>
          </div>
        ))}
      </div>

      {/* Progress */}
      <div style={{
        position: 'absolute', bottom: 24, left: 48, right: 48,
        height: 3, background: 'oklch(1 0 0 / 0.2)', borderRadius: 2,
      }}>
        <div style={{ width: '45%', height: '100%', background: 'var(--accent)', borderRadius: 2 }}/>
      </div>

      {/* Hint */}
      <div style={{
        position: 'absolute', bottom: 250, left: 48,
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '10px 16px',
        background: 'oklch(0.12 0 0 / 0.6)', backdropFilter: 'blur(10px)',
        border: '1px solid var(--line-soft)', borderRadius: 6,
      }}>
        <div className="mono" style={{
          padding: '2px 6px', background: 'var(--bg-elev-2)',
          border: '1px solid var(--line)', borderRadius: 3,
          fontSize: 11,
        }}>⏎</div>
        <span style={{ fontSize: 13 }}>Abre chat y controles desde tu móvil</span>
      </div>
    </div>
  );
};

Object.assign(window, { MobileView, TVView });
