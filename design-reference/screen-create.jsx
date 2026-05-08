// Screens: Create Room + Catalog Browser

const CreateScreen = ({ onCancel, onCreate }) => {
  const [mode, setMode] = useState('film');
  const [privacy, setPrivacy] = useState('public');
  const [selected, setSelected] = useState(0);
  const [sync, setSync] = useState(true);
  const modes = [
    { id: 'film', label: 'Película / Serie', icon: 'film', sub: 'Catálogo compartido' },
    { id: 'screen', label: 'Pantalla compartida', icon: 'screen', sub: 'Anfitrión comparte su pantalla' },
    { id: 'music', label: 'Sesión de audio', icon: 'music', sub: 'Playlist o vinyl mode' },
  ];
  return (
    <div style={{ padding: '28px 36px 60px', maxWidth: 920 }}>
      <div className="mono mute" style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 8 }}>
        Nueva sala · Cineclub Medianoche
      </div>
      <h1 style={{ fontSize: 36, fontWeight: 500, margin: 0, letterSpacing: '-0.03em' }}>
        ¿Qué vamos a compartir?
      </h1>

      <div style={{ marginTop: 32, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
        {modes.map(m => (
          <button key={m.id} onClick={() => setMode(m.id)} style={{
            textAlign: 'left', padding: 16,
            background: mode === m.id ? 'oklch(0.28 0.06 85 / 0.3)' : 'var(--bg-elev)',
            border: `1px solid ${mode === m.id ? 'var(--accent-dim)' : 'var(--line-soft)'}`,
            borderRadius: 8,
            display: 'flex', flexDirection: 'column', gap: 8,
            transition: 'all 120ms',
          }}>
            <Icon name={m.icon} size={20} className={mode === m.id ? '' : 'dim'} style={{ color: mode === m.id ? 'var(--accent)' : undefined }}/>
            <div style={{ fontSize: 14, fontWeight: 500, marginTop: 8 }}>{m.label}</div>
            <div className="mono mute" style={{ fontSize: 11 }}>{m.sub}</div>
          </button>
        ))}
      </div>

      {mode === 'film' && (
        <div style={{ marginTop: 32 }}>
          <SectionHeader label="Elegir del catálogo" caption="4 resultados · con sincronización perfecta" action="Pegar link externo"/>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginTop: 16 }}>
            {CATALOG.slice(0, 4).map((m, i) => (
              <button key={i} onClick={() => setSelected(i)} style={{
                textAlign: 'left', padding: 0, background: 'transparent', border: 'none',
                display: 'flex', flexDirection: 'column', gap: 8,
              }}>
                <div style={{
                  position: 'relative', borderRadius: 6, overflow: 'hidden',
                  outline: selected === i ? '2px solid var(--accent)' : 'none',
                  outlineOffset: 2,
                }}>
                  <Thumb label={m.title} hue={m.hue} ratio="2/3"/>
                  {selected === i && (
                    <div style={{
                      position: 'absolute', top: 8, right: 8,
                      width: 22, height: 22, borderRadius: 11,
                      background: 'var(--accent)', color: 'oklch(0.15 0 0)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 12, fontWeight: 600,
                    }}>✓</div>
                  )}
                </div>
                <div style={{ fontSize: 12, fontWeight: 500 }}>{m.title}</div>
                <div className="mono mute" style={{ fontSize: 10 }}>{m.kind} · {m.year} · {m.runtime}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      <div style={{ marginTop: 32 }}>
        <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 14 }}>Detalles</div>
        <FormField label="Nombre de la sala" placeholder="Blade Runner 2049 — revisión"/>
        <FormField label="Descripción (opcional)" placeholder="Spoilers permitidos, debate al final" textarea/>
      </div>

      <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 10 }}>Visibilidad</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[
              { id: 'public', label: 'Pública', sub: 'Cualquiera de la comunidad puede entrar' },
              { id: 'invite', label: 'Solo con invitación', sub: 'Compartes un link privado' },
              { id: 'password', label: 'Con contraseña', sub: 'Pide clave al entrar' },
            ].map(p => (
              <button key={p.id} onClick={() => setPrivacy(p.id)} style={{
                textAlign: 'left', padding: 12,
                background: privacy === p.id ? 'var(--bg-elev-2)' : 'var(--bg-elev)',
                border: `1px solid ${privacy === p.id ? 'var(--line)' : 'var(--line-soft)'}`,
                borderRadius: 6,
                display: 'flex', alignItems: 'center', gap: 10,
              }}>
                <div style={{
                  width: 16, height: 16, borderRadius: 8,
                  border: `1.5px solid ${privacy === p.id ? 'var(--accent)' : 'var(--line)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {privacy === p.id && <div style={{ width: 8, height: 8, borderRadius: 4, background: 'var(--accent)' }}/>}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13 }}>{p.label}</div>
                  <div className="mono mute" style={{ fontSize: 10 }}>{p.sub}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 10 }}>Opciones</div>
          <Toggle label="Sincronización de reproducción" sub="Todos ven exactamente el mismo frame" checked={sync} onChange={setSync}/>
          <Toggle label="Solo el anfitrión controla" sub="Pausa, avance y retroceso solo para host" checked/>
          <Toggle label="Video de participantes activo" sub="Webcams encendidas por defecto"/>
          <Toggle label="Reacciones flotantes" sub="Emojis sobre el stream" checked/>
          <Toggle label="Permitir latecomers" sub="Nuevos entran en punto actual"/>
        </div>
      </div>

      <div style={{ marginTop: 40, display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
        <Btn variant="ghost" size="lg" onClick={onCancel}>Cancelar</Btn>
        <Btn variant="outline" size="lg">Programar para después</Btn>
        <Btn variant="primary" size="lg" icon="play" onClick={onCreate}>Abrir sala ahora</Btn>
      </div>
    </div>
  );
};

const FormField = ({ label, placeholder, textarea }) => (
  <div style={{ marginBottom: 12 }}>
    <div className="mono mute" style={{ fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>{label}</div>
    {textarea ? (
      <textarea rows={2} placeholder={placeholder} style={{
        width: '100%', padding: '10px 12px',
        background: 'var(--bg-elev)', border: '1px solid var(--line-soft)', borderRadius: 6,
        color: 'var(--fg)', fontSize: 13, resize: 'vertical', outline: 'none',
      }}/>
    ) : (
      <input placeholder={placeholder} style={{
        width: '100%', padding: '10px 12px',
        background: 'var(--bg-elev)', border: '1px solid var(--line-soft)', borderRadius: 6,
        color: 'var(--fg)', fontSize: 13, outline: 'none',
      }}/>
    )}
  </div>
);

const Toggle = ({ label, sub, checked: initial = false, onChange }) => {
  const [on, setOn] = useState(initial);
  useEffect(() => { if (onChange) onChange(on); }, [on]);
  return (
    <button onClick={() => setOn(!on)} style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '10px 12px',
      background: 'var(--bg-elev)', border: '1px solid var(--line-soft)',
      borderRadius: 6,
      width: '100%', textAlign: 'left', marginBottom: 6,
    }}>
      <div style={{
        width: 30, height: 18, borderRadius: 9,
        background: on ? 'var(--accent)' : 'var(--line)',
        position: 'relative', transition: 'background 120ms', flexShrink: 0,
      }}>
        <div style={{
          position: 'absolute', top: 2, left: on ? 14 : 2,
          width: 14, height: 14, borderRadius: 7,
          background: on ? 'oklch(0.15 0 0)' : 'var(--bg-elev)',
          transition: 'left 120ms',
        }}/>
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 12 }}>{label}</div>
        <div className="mono mute" style={{ fontSize: 10, marginTop: 2 }}>{sub}</div>
      </div>
    </button>
  );
};

const CatalogScreen = () => {
  const [filter, setFilter] = useState('Todo');
  const filters = ['Todo', 'Películas', 'Series', 'Documentales', 'Concerts', 'Tus listas'];
  return (
    <div style={{ padding: '28px 36px 60px' }}>
      <div className="mono mute" style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 8 }}>
        Catálogo · 2,417 títulos compartibles
      </div>
      <h1 style={{ fontSize: 36, fontWeight: 500, margin: 0, letterSpacing: '-0.03em' }}>Explorar</h1>

      <div style={{ display: 'flex', gap: 8, marginTop: 24, alignItems: 'center', flexWrap: 'wrap' }}>
        {filters.map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            padding: '6px 12px', borderRadius: 20,
            background: filter === f ? 'var(--fg)' : 'transparent',
            color: filter === f ? 'oklch(0.15 0 0)' : 'var(--fg-dim)',
            border: `1px solid ${filter === f ? 'var(--fg)' : 'var(--line)'}`,
            fontSize: 12,
          }}>{f}</button>
        ))}
        <div style={{ flex: 1 }}/>
        <Btn variant="outline" size="sm" icon="search">Buscar</Btn>
      </div>

      <div style={{ marginTop: 32, display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 16 }}>
        {[...CATALOG, ...CATALOG].slice(0, 18).map((m, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ position: 'relative' }}>
              <Thumb label={m.title} hue={m.hue} ratio="2/3"/>
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 500, lineHeight: 1.3 }}>{m.title}</div>
              <div className="mono mute" style={{ fontSize: 10, marginTop: 3 }}>{m.year} · {m.runtime}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

Object.assign(window, { CreateScreen, CatalogScreen });
