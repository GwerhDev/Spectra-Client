// Editorial shell — NHEXA-inspired: minimal horizontal top nav, content is king

const EditorialShell = ({ children, activeScreen, onScreen, hero }) => {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      height: '100%',
      background: 'var(--bg)',
      color: 'var(--fg)',
      overflow: 'hidden',
      position: 'relative',
    }}>
      <EditorialNav activeScreen={activeScreen} onScreen={onScreen}/>
      <div style={{ flex: 1, overflow: 'auto', position: 'relative' }}>
        {children}
      </div>
    </div>
  );
};

const EditorialNav = ({ activeScreen, onScreen }) => {
  const items = [
    { id: 'home', label: 'Inicio' },
    { id: 'live', label: 'En vivo' },
    { id: 'catalog', label: 'Catálogo' },
    { id: 'agenda', label: 'Agenda' },
    { id: 'colaborar', label: 'Colaborar' },
  ];
  return (
    <nav style={{
      display: 'flex', alignItems: 'center', gap: 0,
      padding: '18px 32px',
      position: 'relative',
      zIndex: 10,
    }}>
      {/* Wordmark */}
      <button onClick={() => onScreen('home')} style={{
        display: 'flex', alignItems: 'center', gap: 10,
        marginRight: 40,
      }}>
        <img src="assets/logo.png" alt="" style={{
          width: 22, height: 22,
          filter: 'brightness(0) saturate(100%) invert(15%) sepia(94%) saturate(5640%) hue-rotate(330deg) brightness(91%) contrast(101%)',
        }}/>
        <span style={{
          fontSize: 15, fontWeight: 700,
          letterSpacing: '0.14em',
          color: 'var(--accent)',
        }}>SPECTRA</span>
      </button>

      {/* Nav items */}
      <div style={{ display: 'flex', gap: 4 }}>
        {items.map(it => (
          <button key={it.id} onClick={() => onScreen(it.id)} style={{
            padding: '8px 12px',
            fontSize: 11, fontWeight: 600,
            letterSpacing: '0.14em', textTransform: 'uppercase',
            color: activeScreen === it.id ? 'var(--fg)' : 'var(--fg-mute)',
            position: 'relative',
          }}
          onMouseEnter={e => { if (activeScreen !== it.id) e.currentTarget.style.color = 'var(--fg-dim)'; }}
          onMouseLeave={e => { if (activeScreen !== it.id) e.currentTarget.style.color = 'var(--fg-mute)'; }}
          >
            {it.label}
            {activeScreen === it.id && <span style={{
              position: 'absolute', bottom: 2, left: '50%', transform: 'translateX(-50%)',
              width: 4, height: 4, borderRadius: 2,
              background: 'var(--accent)',
            }}/>}
          </button>
        ))}
      </div>

      <div style={{ flex: 1 }}/>

      {/* Right actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <button style={{ padding: 8, color: 'var(--fg-mute)' }}>
          <Icon name="search" size={15}/>
        </button>
        <button style={{
          padding: '6px 10px',
          display: 'flex', alignItems: 'center', gap: 6,
          color: 'var(--fg-mute)', fontSize: 11,
          fontFamily: 'var(--font-mono)', letterSpacing: '0.04em',
        }}>
          <span className="live-dot"/>
          <span>EN SALA</span>
        </button>
        <button style={{ padding: 4, marginLeft: 4 }}>
          <Avatar name="Lucía Méndez" size={26}/>
        </button>
      </div>
    </nav>
  );
};

Object.assign(window, { EditorialShell });
