// Editorial Home — NHEXA-inspired: hero + rail of rooms, type-led

const EditorialHome = ({ onEnterRoom, onCreateRoom }) => {
  return (
    <div>
      <EditorialHero onEnterRoom={onEnterRoom}/>
      <EditorialRail onEnterRoom={onEnterRoom}/>
      <EditorialProgramme/>
      <EditorialFooter onCreateRoom={onCreateRoom}/>
    </div>
  );
};

const EditorialHero = ({ onEnterRoom }) => {
  const room = ACTIVE_ROOMS[0];
  return (
    <div style={{
      position: 'relative',
      minHeight: 540,
      padding: '48px 64px 64px',
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      borderBottom: '1px solid var(--line-soft)',
      overflow: 'hidden',
    }}>
      {/* Backdrop */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `
          radial-gradient(ellipse 80% 60% at 70% 40%, oklch(0.22 0.05 358 / 0.35), transparent 70%),
          radial-gradient(ellipse 60% 40% at 20% 80%, oklch(0.20 0.06 280 / 0.25), transparent 70%),
          oklch(0.12 0.003 0)
        `,
      }}/>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'repeating-linear-gradient(0deg, transparent 0 3px, oklch(0 0 0 / 0.35) 3px 4px)',
        opacity: 0.3,
        pointerEvents: 'none',
      }}/>

      {/* Content */}
      <div style={{ position: 'relative', maxWidth: 720 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
          <span style={{
            padding: '4px 10px',
            background: 'var(--accent)',
            color: 'oklch(0.10 0 0)',
            fontFamily: 'var(--font-mono)', fontSize: 10,
            fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
          }}>● AHORA EN VIVO</span>
          <span className="mono" style={{ fontSize: 11, color: 'var(--fg-dim)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Cineclub Medianoche · anfitriona Ana Torres
          </span>
        </div>

        <h1 style={{
          fontSize: 76, fontWeight: 600,
          letterSpacing: '-0.045em', lineHeight: 0.95,
          margin: 0, textWrap: 'balance',
        }}>
          Blade Runner<br/>
          <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--fg-dim)' }}>2049</span>
          <span style={{ color: 'var(--accent)' }}>.</span>
        </h1>

        <p className="mono" style={{
          marginTop: 28, fontSize: 13, lineHeight: 1.7, color: 'var(--fg-dim)',
          maxWidth: 480, letterSpacing: '0.01em',
        }}>
          Revisión con 8 personas en la sala. Sincronización perfecta,<br/>
          chat en caliente y pausa colectiva cada acto.
        </p>
      </div>

      {/* Bottom row */}
      <div style={{
        position: 'relative',
        display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
        marginTop: 48,
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {/* Progress */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontFamily: 'var(--font-mono)', fontSize: 11 }}>
            <span style={{ color: 'var(--accent)' }}>01:12:48</span>
            <div style={{
              width: 220, height: 2,
              background: 'oklch(1 0 0 / 0.1)',
              position: 'relative',
            }}>
              <div style={{
                position: 'absolute', left: 0, top: 0, bottom: 0, width: '45%',
                background: 'var(--accent)',
              }}/>
            </div>
            <span className="mute">02:43:11</span>
          </div>

          {/* Participants */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ display: 'flex' }}>
              {PEOPLE.slice(0, 5).map((p, i) => (
                <div key={i} style={{ marginLeft: i === 0 ? 0 : -8 }}>
                  <Avatar name={p.name} size={28} border="0 0 0 2px oklch(0.12 0 0)"/>
                </div>
              ))}
            </div>
            <span className="mono" style={{ fontSize: 11, color: 'var(--fg-dim)' }}>
              + 3 escuchando
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={onEnterRoom} style={{
            padding: '14px 24px',
            background: 'var(--accent)', color: 'oklch(0.10 0 0)',
            fontSize: 12, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase',
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <span className="live-dot" style={{ background: 'oklch(0.10 0 0)' }}/>
            Unirme a la sala
          </button>
          <button style={{
            padding: '14px 20px',
            background: 'transparent',
            border: '1px solid var(--line)',
            color: 'var(--fg)',
            fontSize: 12, fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase',
          }}>
            Ver detalles
          </button>
        </div>
      </div>
    </div>
  );
};

const EditorialRail = ({ onEnterRoom }) => {
  return (
    <div style={{ padding: '48px 64px 32px' }}>
      <EditorialSectionHead
        kicker="/01"
        label="Salas activas"
        caption="4 simultáneas en tu comunidad · sincronización perfecta entre participantes"
      />
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 0,
        marginTop: 32,
      }}>
        {ACTIVE_ROOMS.slice(1).map((r, i) => <EditorialRoomCard key={r.id} room={r} i={i} onClick={onEnterRoom}/>)}
      </div>
    </div>
  );
};

const EditorialRoomCard = ({ room, i, onClick }) => {
  const community = COMMUNITIES.find(c => c.id === room.community);
  return (
    <button onClick={onClick} style={{
      textAlign: 'left',
      padding: '24px 24px 28px',
      display: 'flex', flexDirection: 'column', gap: 18,
      borderLeft: i === 0 ? 'none' : '1px solid var(--line-soft)',
      borderRight: i === 2 ? 'none' : 'none',
      background: 'transparent',
      position: 'relative',
      transition: 'background 150ms',
    }}
    onMouseEnter={e => { e.currentTarget.style.background = 'oklch(0.18 0.003 0 / 0.5)'; }}
    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
    >
      {/* Visual */}
      <div style={{ position: 'relative', aspectRatio: '16/10', overflow: 'hidden' }}>
        <Thumb label={room.cover} hue={community.color} ratio="16/10"/>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, oklch(0.10 0 0 / 0.7), transparent 50%)',
        }}/>
        <div style={{
          position: 'absolute', top: 10, left: 10,
          display: 'flex', gap: 6,
        }}>
          <span style={{
            padding: '3px 7px',
            background: room.locked ? 'var(--bg-elev-2)' : 'var(--accent)',
            color: room.locked ? 'var(--fg)' : 'oklch(0.10 0 0)',
            fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 700,
            letterSpacing: '0.12em', textTransform: 'uppercase',
          }}>
            {room.locked ? '● Privada' : '● Live'}
          </span>
          {room.sync && (
            <span style={{
              padding: '3px 7px',
              background: 'oklch(0.10 0 0 / 0.6)',
              backdropFilter: 'blur(6px)',
              color: 'var(--fg-dim)',
              fontFamily: 'var(--font-mono)', fontSize: 9,
              letterSpacing: '0.12em', textTransform: 'uppercase',
            }}>Sync</span>
          )}
        </div>
      </div>

      {/* Text */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className="mono" style={{ fontSize: 10, color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            /{String(i + 2).padStart(2, '0')}
          </span>
          <span className="mono mute" style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            {community.name}
          </span>
        </div>
        <h3 style={{
          fontSize: 22, fontWeight: 500, margin: 0,
          letterSpacing: '-0.02em', lineHeight: 1.15,
        }}>
          {room.title}
        </h3>
        <div className="mono mute" style={{ fontSize: 11, marginTop: 4, letterSpacing: '0.02em' }}>
          {room.elapsed ? `${room.elapsed} / ${room.duration}` : room.content}
        </div>
      </div>

      {/* Footer */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        paddingTop: 14,
        borderTop: '1px solid var(--line-soft)',
        marginTop: 'auto',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Icon name="users" size={12} className="mute"/>
          <span className="mono" style={{ fontSize: 11 }}>{room.participants}</span>
          <span className="mono mute" style={{ fontSize: 11 }}>/ {room.peak}</span>
        </div>
        <span className="mono" style={{
          fontSize: 10, color: 'var(--fg-dim)', letterSpacing: '0.1em', textTransform: 'uppercase',
          display: 'flex', alignItems: 'center', gap: 6,
        }}>
          Entrar <Icon name="chevR" size={10}/>
        </span>
      </div>
    </button>
  );
};

const EditorialSectionHead = ({ kicker, label, caption }) => (
  <div style={{
    display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
    gap: 40,
    paddingBottom: 20,
    borderBottom: '1px solid var(--line-soft)',
  }}>
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 20 }}>
      <span className="mono" style={{
        fontSize: 12, color: 'var(--accent)',
        letterSpacing: '0.08em', fontWeight: 600,
      }}>{kicker}</span>
      <h2 style={{
        fontSize: 32, fontWeight: 500, margin: 0,
        letterSpacing: '-0.025em',
      }}>{label}</h2>
    </div>
    <p className="mono mute" style={{
      fontSize: 11, margin: 0, maxWidth: 400, textAlign: 'right',
      lineHeight: 1.5, letterSpacing: '0.015em',
    }}>{caption}</p>
  </div>
);

const EditorialProgramme = () => {
  const events = [
    { day: 'DOM', date: '26', time: '21:00', title: 'La Grande Bellezza', director: 'Sorrentino, 2013', host: 'Ana Torres', attending: 34 },
    { day: 'LUN', date: '27', time: '22:30', title: 'Twin Peaks — S3 E8', director: 'Lynch, 2017', host: 'Kenji Sato', attending: 28 },
    { day: 'MAR', date: '28', time: '20:00', title: 'Jeanne Dielman', director: 'Akerman, 1975', host: 'Lu Reyes', attending: 12 },
    { day: 'JUE', date: '30', time: '21:30', title: 'Stalker', director: 'Tarkovsky, 1979', host: 'Marco Vieri', attending: 41 },
  ];
  return (
    <div style={{ padding: '64px 64px 32px' }}>
      <EditorialSectionHead
        kicker="/02"
        label="Programación"
        caption="Watch parties agendadas para esta semana. Reserva con un clic."
      />

      <div style={{ marginTop: 24 }}>
        {events.map((e, i) => (
          <button key={i} style={{
            display: 'grid',
            gridTemplateColumns: '80px 1fr 180px 80px 120px',
            gap: 24,
            alignItems: 'center',
            width: '100%',
            padding: '22px 0',
            borderBottom: '1px solid var(--line-soft)',
            textAlign: 'left',
            transition: 'background 150ms, padding 150ms',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'oklch(0.18 0.003 0 / 0.3)'; e.currentTarget.style.padding = '22px 12px'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.padding = '22px 0'; }}
          >
            <div>
              <div className="mono" style={{ fontSize: 11, color: 'var(--accent)', letterSpacing: '0.12em' }}>{e.day}</div>
              <div style={{ fontSize: 36, fontWeight: 500, letterSpacing: '-0.03em', lineHeight: 1 }}>{e.date}</div>
            </div>
            <div>
              <div style={{ fontSize: 20, fontWeight: 500, letterSpacing: '-0.015em' }}>{e.title}</div>
              <div className="mono mute" style={{ fontSize: 11, marginTop: 4, letterSpacing: '0.02em' }}>
                {e.director}
              </div>
            </div>
            <div className="mono" style={{ fontSize: 11, color: 'var(--fg-dim)' }}>
              anfitrión<br/>
              <span style={{ color: 'var(--fg)', marginTop: 2, display: 'inline-block' }}>{e.host}</span>
            </div>
            <div className="mono" style={{ fontSize: 11, color: 'var(--fg-dim)' }}>
              {e.time}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 8 }}>
              <span className="mono" style={{ fontSize: 11, color: 'var(--accent)' }}>{e.attending} van</span>
              <Icon name="chevR" size={12} className="mute"/>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

const EditorialFooter = ({ onCreateRoom }) => (
  <div style={{
    padding: '64px',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    borderTop: '1px solid var(--line-soft)',
    background: 'oklch(0.10 0.003 0)',
  }}>
    <div>
      <div className="mono" style={{ fontSize: 11, color: 'var(--accent)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 14 }}>
        /03 — Abrir una sala
      </div>
      <h2 style={{
        fontSize: 48, fontWeight: 500, margin: 0,
        letterSpacing: '-0.035em', lineHeight: 1.02,
        maxWidth: 680,
      }}>
        Elige un título, invita a quien quieras, y deja que Spectra sincronice el resto.
      </h2>
    </div>
    <button onClick={onCreateRoom} style={{
      padding: '18px 28px',
      background: 'var(--accent)', color: 'oklch(0.10 0 0)',
      fontSize: 13, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase',
      display: 'flex', alignItems: 'center', gap: 12,
      flexShrink: 0,
    }}>
      Crear sala <Icon name="chevR" size={14}/>
    </button>
  </div>
);

Object.assign(window, { EditorialHome });
