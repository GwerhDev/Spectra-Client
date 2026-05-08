// Screen: Home — active rooms + catalog highlights

const HomeScreen = ({ onEnterRoom, onCreateRoom }) => {
  return (
    <div style={{ padding: '28px 36px 60px', maxWidth: 1400 }}>
      <HomeHeader onCreateRoom={onCreateRoom}/>
      <SectionHeader
        label="En vivo ahora"
        caption="12 salas activas en Cineclub Medianoche"
        action="Ver todas"
      />
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
        gap: 14,
        marginTop: 16,
      }}>
        {ACTIVE_ROOMS.map(r => <RoomCard key={r.id} room={r} onClick={() => onEnterRoom(r)}/>)}
      </div>

      <div style={{ height: 44 }}/>

      <SectionHeader label="Programado esta semana" caption="Watch parties agendadas" action="Calendario"/>
      <ScheduleStrip/>

      <div style={{ height: 44 }}/>

      <SectionHeader label="Catálogo · destacados" caption="Compartible con sincronización de reproducción" action="Explorar catálogo"/>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 12,
        marginTop: 16,
      }}>
        {CATALOG.slice(0, 4).map((m, i) => <CatalogCard key={i} movie={m}/>)}
      </div>
    </div>
  );
};

const HomeHeader = ({ onCreateRoom }) => (
  <div style={{
    display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
    marginBottom: 28,
    paddingBottom: 24,
    borderBottom: '1px solid var(--line-soft)',
  }}>
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
        <span className="mono" style={{
          fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase',
          color: 'var(--accent)', fontWeight: 600,
        }}>
          ● EN VIVO
        </span>
        <span className="mono mute" style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
          Sábado 23:14 · Cineclub Medianoche
        </span>
      </div>
      <h1 style={{
        fontSize: 48, fontWeight: 600, margin: 0,
        letterSpacing: '-0.04em', lineHeight: 1,
      }}>
        Buenas noches,<br/>
        <span style={{ color: 'var(--accent)' }}>Lucía.</span>
      </h1>
      <p className="mono mute" style={{ fontSize: 12, marginTop: 14, letterSpacing: '0.02em', maxWidth: 420 }}>
        4 salas activas · 17 amigos conectados · 2 watch parties esta semana
      </p>
    </div>
    <div style={{ display: 'flex', gap: 8 }}>
      <Btn variant="outline" size="md" icon="search">Buscar</Btn>
      <Btn variant="primary" size="md" icon="plus" onClick={onCreateRoom}>Crear sala</Btn>
    </div>
  </div>
);

const SectionHeader = ({ label, caption, action }) => (
  <div style={{
    display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
    paddingBottom: 12,
    borderBottom: '1px solid var(--line-soft)',
  }}>
    <div>
      <div style={{ fontSize: 18, fontWeight: 500, letterSpacing: '-0.015em' }}>{label}</div>
      <div className="mono mute" style={{ fontSize: 11, marginTop: 4, letterSpacing: '0.02em' }}>{caption}</div>
    </div>
    {action && (
      <button style={{
        display: 'inline-flex', alignItems: 'center', gap: 4,
        fontSize: 12, color: 'var(--fg-dim)',
      }}>
        {action} <Icon name="chevR" size={12}/>
      </button>
    )}
  </div>
);

const RoomCard = ({ room, onClick }) => {
  const community = COMMUNITIES.find(c => c.id === room.community);
  const participants = PEOPLE.slice(0, Math.min(4, room.participants));

  return (
    <button onClick={onClick} style={{
      textAlign: 'left',
      background: 'var(--bg-elev)',
      border: '1px solid var(--line-soft)',
      borderRadius: 4,
      overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
      transition: 'border-color 150ms, transform 150ms',
      width: '100%',
    }}
    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--line)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--line-soft)'; e.currentTarget.style.transform = 'translateY(0)'; }}
    >
      <div style={{ position: 'relative' }}>
        <Thumb label={room.cover} hue={community.color} ratio="16/9"/>
        <div style={{
          position: 'absolute', top: 10, left: 10,
          display: 'flex', gap: 6,
        }}>
          <Tag tone="live">LIVE</Tag>
          {room.sync && <Tag tone="sync" icon="sync">SYNC</Tag>}
          {room.locked && <Tag icon="lock">Privada</Tag>}
        </div>
        <div style={{
          position: 'absolute', bottom: 10, right: 10,
          display: 'flex', alignItems: 'center', gap: 6,
          background: 'oklch(0.12 0 0 / 0.7)',
          backdropFilter: 'blur(8px)',
          padding: '4px 8px', borderRadius: 4,
        }}>
          <Icon name="users" size={12}/>
          <span className="mono" style={{ fontSize: 11 }}>{room.participants}/{room.peak}</span>
        </div>
      </div>

      <div style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div>
          <div className="mono mute" style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>
            {community.name}
          </div>
          <div style={{ fontSize: 15, fontWeight: 500, letterSpacing: '-0.01em', lineHeight: 1.3 }}>{room.title}</div>
        </div>

        <div className="mono" style={{ fontSize: 11, color: 'var(--fg-dim)' }}>
          {room.elapsed ? (
            <>
              <span style={{ color: 'var(--accent)' }}>{room.elapsed}</span>
              <span className="mute"> / {room.duration}</span>
            </>
          ) : room.content}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex' }}>
            {participants.map((p, i) => (
              <div key={i} style={{ marginLeft: i === 0 ? 0 : -8 }}>
                <Avatar name={p.name} size={22} border="0 0 0 2px var(--bg-elev)"/>
              </div>
            ))}
            {room.participants > 4 && (
              <div className="mono mute" style={{
                marginLeft: 6, fontSize: 11, lineHeight: '22px',
              }}>+{room.participants - 4}</div>
            )}
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            {room.tags.map(t => <span key={t} className="mono" style={{
              fontSize: 10, color: 'var(--fg-mute)',
              padding: '2px 6px', border: '1px solid var(--line-soft)', borderRadius: 3,
            }}>{t}</span>)}
          </div>
        </div>
      </div>
    </button>
  );
};

const ScheduleStrip = () => {
  const events = [
    { day: 'DOM', date: '26', time: '21:00', title: 'La Grande Bellezza', host: 'Ana Torres', attending: 34 },
    { day: 'LUN', date: '27', time: '22:30', title: 'Twin Peaks · S3 E8', host: 'Kenji Sato', attending: 28 },
    { day: 'MAR', date: '28', time: '20:00', title: 'Jeanne Dielman', host: 'Lu Reyes', attending: 12 },
    { day: 'JUE', date: '30', time: '21:30', title: 'Stalker', host: 'Marco Vieri', attending: 41 },
    { day: 'SÁB', date: '02', time: '23:00', title: 'Mulholland Drive', host: 'Sasha Iqbal', attending: 56 },
  ];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10, marginTop: 16 }}>
      {events.map((e, i) => (
        <div key={i} style={{
          padding: 14,
          background: 'var(--bg-elev)',
          border: '1px solid var(--line-soft)',
          borderRadius: 4,
          display: 'flex', flexDirection: 'column', gap: 10,
        }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <div className="mono" style={{ fontSize: 11, color: 'var(--accent)', letterSpacing: '0.08em' }}>{e.day}</div>
            <div style={{ fontSize: 22, fontWeight: 500, letterSpacing: '-0.02em' }}>{e.date}</div>
            <div className="mono mute" style={{ fontSize: 11, marginLeft: 'auto' }}>{e.time}</div>
          </div>
          <div style={{ fontSize: 13, fontWeight: 500, lineHeight: 1.3 }}>{e.title}</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
            <div className="mono mute" style={{ fontSize: 10 }}>por {e.host}</div>
            <div className="mono" style={{ fontSize: 10, color: 'var(--fg-dim)' }}>{e.attending} van</div>
          </div>
        </div>
      ))}
    </div>
  );
};

const CatalogCard = ({ movie }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
    <div style={{ position: 'relative' }}>
      <Thumb label={movie.title} hue={movie.hue} ratio="2/3"/>
      <button style={{
        position: 'absolute', bottom: 8, right: 8,
        width: 32, height: 32, borderRadius: 16,
        background: 'oklch(0.12 0 0 / 0.7)',
        backdropFilter: 'blur(8px)',
        color: 'var(--fg)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon name="play" size={12}/>
      </button>
    </div>
    <div>
      <div style={{ fontSize: 13, fontWeight: 500, letterSpacing: '-0.01em' }}>{movie.title}</div>
      <div className="mono mute" style={{ fontSize: 10, marginTop: 3, letterSpacing: '0.04em' }}>
        {movie.kind} · {movie.year} · {movie.runtime}
      </div>
    </div>
  </div>
);

Object.assign(window, { HomeScreen });
