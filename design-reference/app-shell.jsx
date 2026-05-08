// App shell — Streamby-inspired: sidebar with UPPERCASE section headers, breadcrumbs, flat cyan accents
const { useState: useStateShell } = React;

const AppShell = ({ children, activeScreen, onScreen, activeCommunity, onCommunity, breadcrumb }) => {
  const activeCom = COMMUNITIES.find(c => c.id === activeCommunity);
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '56px 232px 1fr',
      height: '100%',
      background: 'var(--bg)',
      color: 'var(--fg)',
      overflow: 'hidden',
    }}>
      {/* Community rail */}
      <div style={{
        borderRight: '1px solid var(--line-soft)',
        display: 'flex', flexDirection: 'column',
        padding: '12px 0',
        gap: 4,
        alignItems: 'center',
        background: 'var(--bg-inset)',
      }}>
        <Logomark/>
        <Divider/>
        {COMMUNITIES.map(c => (
          <CommunityPip key={c.id} community={c} active={activeCommunity === c.id} onClick={() => onCommunity(c.id)}/>
        ))}
        <button title="Crear comunidad" onClick={() => onScreen('create')} style={{
          width: 36, height: 36, borderRadius: 6,
          background: 'transparent',
          border: '1px dashed var(--line)',
          color: 'var(--fg-dim)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginTop: 4,
        }}>
          <Icon name="plus" size={14}/>
        </button>
        <div style={{ flex: 1 }}/>
        <Avatar name="Gerardo Guarda" size={32}/>
        <div className="mono" style={{ fontSize: 8, color: 'var(--fg-mute)', marginTop: 6 }}>v0.0.0</div>
      </div>

      {/* Context sidebar */}
      <div style={{
        borderRight: '1px solid var(--line-soft)',
        display: 'flex', flexDirection: 'column',
        background: 'var(--bg-inset)',
      }}>
        {/* Community header */}
        <button style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '14px 16px',
          borderBottom: '1px solid var(--line-soft)',
          width: '100%', textAlign: 'left',
        }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <div style={{
              fontSize: 15, fontWeight: 700,
              letterSpacing: '0.08em',
              color: 'var(--accent)',
              fontFamily: 'var(--font-sans)',
            }}>
              SPECTRA
            </div>
            <div className="mono mute" style={{ fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
              NHEXA ENTERTAINMENT
            </div>
          </div>
          <Icon name="chevD" size={12} className="mute"/>
        </button>

        {/* Community context */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '10px 16px',
          borderBottom: '1px solid var(--line-soft)',
        }}>
          <div style={{
            width: 20, height: 20, borderRadius: 4,
            background: `oklch(0.30 0.04 ${activeCom.color})`,
            color: `oklch(0.92 0.05 ${activeCom.color})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 11,
          }}>{activeCom.glyph}</div>
          <span style={{ flex: 1, fontSize: 12, color: 'var(--fg-dim)', letterSpacing: '-0.005em' }}>
            {activeCom.name}
          </span>
          <span className="mono mute" style={{ fontSize: 9 }}>{activeCom.members.toLocaleString()}</span>
        </div>

        <NavSection label="Main Menu">
          <NavItem icon="home" label="Inicio" active={activeScreen === 'home'} onClick={() => onScreen('home')}/>
        </NavSection>

        <NavSection label="Salas">
          <NavItem icon="signal" label="En vivo" active={activeScreen === 'live'} onClick={() => onScreen('live')} badge="12"/>
          <NavItem icon="users" label="Participantes" active={activeScreen === 'people'} onClick={() => onScreen('people')}/>
          <NavSubTree>
            {ACTIVE_ROOMS.slice(0, 3).map(r => (
              <NavSubItem key={r.id} label={r.title} participants={r.participants} active={activeScreen === 'room' && r.id === 'r1'} onClick={() => onScreen('room')}/>
            ))}
          </NavSubTree>
        </NavSection>

        <NavSection label="Contenido">
          <NavItem icon="film" label="Catálogo" active={activeScreen === 'catalog'} onClick={() => onScreen('catalog')}/>
          <NavItem icon="music" label="Audio"/>
          <NavItem icon="screen" label="Pantallas"/>
        </NavSection>

        <NavSection label="Comunidad">
          <NavItem icon="hash" label="general"/>
          <NavItem icon="hash" label="recomendaciones"/>
          <NavItem icon="hash" label="agenda-semanal" unread={3}/>
          <NavItem icon="lock" label="staff-only"/>
        </NavSection>

        <NavSection label="Settings">
          <NavItem icon="settings" label="Preferencias"/>
          <NavItem icon="users" label="Permisos"/>
        </NavSection>

        <div style={{ flex: 1 }}/>
        <VoiceStatusCard/>
      </div>

      {/* Main content */}
      <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <TopBar breadcrumb={breadcrumb}/>
        <div style={{ flex: 1, overflow: 'auto', position: 'relative' }}>
          {children}
        </div>
      </div>
    </div>
  );
};

const TopBar = ({ breadcrumb = ['dashboard', 'overview'] }) => (
  <div style={{
    display: 'flex', alignItems: 'center', gap: 10,
    padding: '10px 20px',
    borderBottom: '1px solid var(--line-soft)',
    background: 'var(--bg)',
    minHeight: 42,
  }}>
    <Icon name="home" size={13} className="mute"/>
    {breadcrumb.map((b, i) => (
      <React.Fragment key={i}>
        {i > 0 && <span className="mute" style={{ fontSize: 11 }}>/</span>}
        <span className="mono" style={{
          fontSize: 11, letterSpacing: '0.02em',
          color: i === breadcrumb.length - 1 ? 'var(--fg)' : 'var(--fg-dim)',
        }}>{b}</span>
      </React.Fragment>
    ))}
    <div style={{ flex: 1 }}/>
    <button style={{
      padding: '4px 8px',
      background: 'var(--bg-elev)', border: '1px solid var(--line-soft)', borderRadius: 4,
      display: 'flex', alignItems: 'center', gap: 6,
      color: 'var(--fg-mute)', fontSize: 11,
    }}>
      <Icon name="search" size={12}/>
      <span style={{ fontFamily: 'var(--font-mono)' }}>Buscar...</span>
      <span className="mono" style={{
        padding: '1px 5px', fontSize: 9,
        background: 'var(--bg-elev-2)', border: '1px solid var(--line-soft)', borderRadius: 2,
        marginLeft: 16,
      }}>⌘K</span>
    </button>
    <button style={{ color: 'var(--fg-mute)', padding: 4 }}><Icon name="sparkle" size={14}/></button>
    <Avatar name="Gerardo Guarda" size={24}/>
  </div>
);

const Logomark = () => (
  <div style={{
    width: 36, height: 36, borderRadius: 6,
    background: 'oklch(0.10 0 0)',
    border: '1px solid var(--accent-dim)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    marginBottom: 4,
    overflow: 'hidden',
  }}>
    <img src="assets/logo.png" alt="Spectra" style={{
      width: 26, height: 26,
      filter: 'brightness(0) saturate(100%) invert(15%) sepia(94%) saturate(5640%) hue-rotate(330deg) brightness(91%) contrast(101%)',
    }}/>
  </div>
);

const CommunityPip = ({ community, active, onClick }) => (
  <button onClick={onClick} title={community.name} style={{
    width: 36, height: 36,
    borderRadius: active ? 6 : 18,
    background: active ? 'var(--bg-elev-2)' : `oklch(0.30 0.04 ${community.color})`,
    color: active ? 'var(--accent)' : `oklch(0.92 0.05 ${community.color})`,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    border: active ? '1px solid var(--accent-dim)' : '1px solid transparent',
    fontSize: 16,
    transition: 'border-radius 180ms cubic-bezier(.4,2,.6,1), background 150ms',
    position: 'relative',
  }}>
    {community.glyph}
    {active && <span style={{
      position: 'absolute', left: -12, top: '50%', transform: 'translateY(-50%)',
      width: 2, height: 16, background: 'var(--accent)', borderRadius: 1,
    }}/>}
  </button>
);

const Divider = ({ horizontal }) => horizontal
  ? <div style={{ height: 1, background: 'var(--line-soft)' }}/>
  : <div style={{ width: 20, height: 1, background: 'var(--line-soft)', margin: '4px 0' }}/>;

const NavSection = ({ label, children }) => (
  <div style={{ padding: '12px 10px 2px' }}>
    <div className="mono" style={{
      fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase',
      color: 'var(--fg-mute)', padding: '4px 8px 8px',
      fontWeight: 500,
    }}>{label}</div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>{children}</div>
  </div>
);

const NavItem = ({ icon, label, active, badge, unread, onClick }) => (
  <button onClick={onClick} style={{
    display: 'flex', alignItems: 'center', gap: 10,
    height: 28, padding: '0 8px',
    background: active ? 'var(--bg-elev-2)' : 'transparent',
    color: active ? 'var(--accent)' : 'var(--fg-dim)',
    borderLeft: active ? '2px solid var(--accent)' : '2px solid transparent',
    borderRadius: 3,
    fontSize: 12,
    letterSpacing: '-0.005em',
    width: '100%', textAlign: 'left',
  }}
  onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'var(--bg-elev)'; }}
  onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}
  >
    <Icon name={icon} size={13}/>
    <span style={{ flex: 1 }}>{label}</span>
    {badge && <span className="mono" style={{ fontSize: 9, color: 'var(--fg-mute)' }}>{badge}</span>}
    {unread && <span style={{
      minWidth: 14, height: 14, borderRadius: 7, padding: '0 4px',
      background: 'var(--accent)', color: 'oklch(0.12 0 0)',
      fontSize: 9, fontWeight: 600,
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    }}>{unread}</span>}
  </button>
);

const NavSubTree = ({ children }) => (
  <div style={{ paddingLeft: 18, borderLeft: '1px dashed var(--line-soft)', marginLeft: 14, marginTop: 2 }}>
    {children}
  </div>
);

const NavSubItem = ({ label, participants, active, onClick }) => (
  <button onClick={onClick} style={{
    display: 'flex', alignItems: 'center', gap: 8,
    height: 24, padding: '0 8px',
    background: active ? 'var(--bg-elev-2)' : 'transparent',
    color: active ? 'var(--fg)' : 'var(--fg-dim)',
    borderRadius: 3,
    fontSize: 11,
    width: '100%', textAlign: 'left',
  }}
  onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'var(--bg-elev)'; }}
  onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}
  >
    <span className="live-dot" style={{ width: 5, height: 5 }}/>
    <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{label}</span>
    <span className="mono mute" style={{ fontSize: 9 }}>{participants}</span>
  </button>
);

const VoiceStatusCard = () => (
  <div style={{
    margin: 10,
    padding: '10px 12px',
    background: 'var(--bg-elev)',
    border: '1px solid var(--line-soft)',
    borderRadius: 4,
    borderLeft: '2px solid var(--live)',
    display: 'flex', flexDirection: 'column', gap: 8,
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <span className="live-dot"/>
      <span className="mono" style={{ fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--live)' }}>
        Conectado
      </span>
    </div>
    <div style={{ fontSize: 11, color: 'var(--fg)', letterSpacing: '-0.005em' }}>Blade Runner 2049</div>
    <div style={{ display: 'flex', gap: 3 }}>
      <Btn size="sm" variant="ghost" icon="mic" style={{ flex: 1, justifyContent: 'center', height: 26 }}/>
      <Btn size="sm" variant="ghost" icon="video" style={{ flex: 1, justifyContent: 'center', height: 26 }}/>
      <Btn size="sm" variant="ghost" icon="screen" style={{ flex: 1, justifyContent: 'center', height: 26 }}/>
      <Btn size="sm" variant="ghost" icon="close" style={{ color: 'var(--live)', height: 26 }}/>
    </div>
  </div>
);

Object.assign(window, { AppShell });
