// Screen: Live Room — stream + participants + chat

const RoomScreen = ({ onExit, layout = 'sidebar' }) => {
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(false);
  const [cam, setCam] = useState(false);
  const [chatOpen, setChatOpen] = useState(true);
  const room = ACTIVE_ROOMS[0];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: chatOpen ? '1fr 320px' : '1fr 0px',
      height: '100%',
      background: 'oklch(0.11 0.005 60)',
      transition: 'grid-template-columns 200ms',
    }}>
      <div style={{
        display: 'flex', flexDirection: 'column',
        overflow: 'hidden',
      }}>
        <RoomTopBar room={room} onExit={onExit} chatOpen={chatOpen} setChatOpen={setChatOpen}/>
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
          <StreamStage playing={playing} room={room}/>
          <ParticipantRail layout={layout}/>
          <SyncIndicator/>
        </div>
        <PlaybackBar playing={playing} setPlaying={setPlaying} room={room}/>
        <ControlBar
          muted={muted} setMuted={setMuted}
          cam={cam} setCam={setCam}
          chatOpen={chatOpen} setChatOpen={setChatOpen}
        />
      </div>
      {chatOpen && <RoomChat onClose={() => setChatOpen(false)}/>}
    </div>
  );
};

const RoomTopBar = ({ room, onExit, chatOpen, setChatOpen }) => (
  <div style={{
    display: 'flex', alignItems: 'center', gap: 14,
    padding: '14px 20px',
    borderBottom: '1px solid var(--line-soft)',
    background: 'var(--bg-inset)',
  }}>
    <Tag tone="live">LIVE</Tag>
    <Tag tone="sync" icon="sync">SYNC · 42ms</Tag>
    <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
      <div style={{ fontSize: 14, fontWeight: 500, letterSpacing: '-0.01em' }}>{room.title}</div>
      <div className="mono mute" style={{ fontSize: 11, marginTop: 2 }}>
        Cineclub Medianoche · anfitrión Ana Torres
      </div>
    </div>
    <div style={{ flex: 1 }}/>
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <Icon name="users" size={14} className="dim"/>
      <span className="mono" style={{ fontSize: 12 }}>{room.participants}</span>
      <span className="mono mute" style={{ fontSize: 12 }}>/ {room.peak}</span>
    </div>
    <Btn variant="ghost" size="sm" icon="sparkle">Efectos</Btn>
    <Btn variant="ghost" size="sm" icon="settings"/>
    <Btn variant="danger" size="sm" onClick={onExit}>Salir</Btn>
  </div>
);

const StreamStage = ({ playing, room }) => (
  <div style={{
    position: 'absolute', inset: 0,
    background: `
      radial-gradient(ellipse at center, oklch(0.22 0.04 190) 0%, oklch(0.10 0.01 190) 70%),
      repeating-linear-gradient(135deg, oklch(0.16 0.01 190) 0 2px, oklch(0.12 0.005 190) 2px 14px)
    `,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  }}>
    <div style={{
      textAlign: 'center',
      color: 'oklch(0.85 0.02 190)',
      fontFamily: 'var(--font-mono)',
    }}>
      <div style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 10 }}>
        Video placeholder · 1920×1080
      </div>
      <div style={{ fontSize: 18, fontWeight: 500, fontFamily: 'var(--font-sans)', letterSpacing: '-0.015em' }}>
        {room.content}
      </div>
      <div style={{ fontSize: 10, marginTop: 8, opacity: 0.6 }}>{room.cover}</div>
    </div>
    {/* Scanline effect */}
    <div style={{
      position: 'absolute', inset: 0, pointerEvents: 'none',
      background: 'repeating-linear-gradient(0deg, transparent 0 2px, oklch(0 0 0 / 0.1) 2px 3px)',
    }}/>
  </div>
);

const ParticipantRail = ({ layout }) => {
  const participants = [
    { name: 'Ana Torres', speaking: true, host: true },
    { name: 'Kenji Sato', speaking: false },
    { name: 'Lu Reyes', speaking: false, muted: true },
    { name: 'Marco Vieri', speaking: false },
    { name: 'Sasha Iqbal', speaking: false, camOff: true },
    { name: 'Noor Aziz', speaking: false, muted: true },
  ];

  return (
    <div style={{
      position: 'absolute',
      top: 16, right: 16, bottom: 16,
      width: 180,
      display: 'flex', flexDirection: 'column', gap: 8,
      pointerEvents: 'none',
    }}>
      {participants.map((p, i) => <ParticipantTile key={i} person={p}/>)}
      <div style={{
        padding: 8,
        borderRadius: 8,
        background: 'oklch(0.12 0 0 / 0.5)',
        backdropFilter: 'blur(8px)',
        border: '1px dashed var(--line-soft)',
        textAlign: 'center',
        fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--fg-mute)',
        letterSpacing: '0.06em', textTransform: 'uppercase',
      }}>+2 escuchando</div>
    </div>
  );
};

const ParticipantTile = ({ person }) => (
  <div style={{
    aspectRatio: '16/10',
    borderRadius: 4,
    background: 'oklch(0.14 0.01 60)',
    border: person.speaking ? '1.5px solid var(--accent)' : '1px solid var(--line-soft)',
    overflow: 'hidden',
    position: 'relative',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    transition: 'border-color 150ms',
    pointerEvents: 'auto',
  }}>
    {person.camOff ? (
      <Avatar name={person.name} size={44}/>
    ) : (
      <div style={{
        position: 'absolute', inset: 0,
        background: `repeating-linear-gradient(45deg,
          oklch(0.28 0.04 ${(person.name.charCodeAt(0) * 3) % 360}) 0 2px,
          oklch(0.22 0.03 ${(person.name.charCodeAt(0) * 3) % 360}) 2px 14px)`,
      }}>
        <div style={{
          position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-mono)', fontSize: 9, color: 'oklch(0.9 0 0)', letterSpacing: '0.1em',
        }}>CAM FEED</div>
      </div>
    )}
    <div style={{
      position: 'absolute', bottom: 4, left: 4, right: 4,
      display: 'flex', alignItems: 'center', gap: 4,
      padding: '3px 6px',
      background: 'oklch(0.10 0 0 / 0.7)',
      backdropFilter: 'blur(6px)',
      borderRadius: 4,
    }}>
      {person.host && <span style={{
        fontSize: 8, fontFamily: 'var(--font-mono)', letterSpacing: '0.1em',
        color: 'var(--accent)', marginRight: 2,
      }}>★</span>}
      <span style={{ fontSize: 10, fontWeight: 500, flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
        {person.name.split(' ')[0]}
      </span>
      {person.muted ? <Icon name="micOff" size={10} className="dim" /> : person.speaking && <Waveform size={8} bars={3}/>}
    </div>
  </div>
);

const SyncIndicator = () => (
  <div style={{
    position: 'absolute', top: 16, left: 16,
    padding: '8px 12px',
    background: 'oklch(0.12 0 0 / 0.6)',
    backdropFilter: 'blur(10px)',
    border: '1px solid var(--line-soft)',
    borderRadius: 4,
    display: 'flex', alignItems: 'center', gap: 10,
  }}>
    <Icon name="sync" size={12} style={{ color: 'var(--ok)' }}/>
    <div>
      <div className="mono" style={{ fontSize: 10, color: 'var(--ok)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
        Sincronizado
      </div>
      <div className="mono mute" style={{ fontSize: 9, marginTop: 1 }}>
        8 streams · drift medio 42ms
      </div>
    </div>
  </div>
);

const PlaybackBar = ({ playing, setPlaying, room }) => {
  const [hover, setHover] = useState(null);
  const progressPct = 45;
  return (
    <div style={{
      padding: '16px 20px 8px',
      background: 'var(--bg-inset)',
      borderTop: '1px solid var(--line-soft)',
    }}>
      <div style={{
        position: 'relative',
        height: 6,
        background: 'var(--bg-elev-2)',
        borderRadius: 3,
        cursor: 'pointer',
      }}
      onMouseMove={e => {
        const r = e.currentTarget.getBoundingClientRect();
        setHover(((e.clientX - r.left) / r.width) * 100);
      }}
      onMouseLeave={() => setHover(null)}
      >
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: `${progressPct}%`,
          background: 'var(--accent)', borderRadius: 3,
        }}/>
        <div style={{
          position: 'absolute', left: `${progressPct}%`, top: '50%', transform: 'translate(-50%, -50%)',
          width: 12, height: 12, borderRadius: 6, background: 'var(--accent)',
          boxShadow: '0 0 0 4px oklch(0.72 0.17 230 / 0.25)',
        }}/>
        {/* Other participants' cursors */}
        {[22, 44, 47, 47, 48].map((pct, i) => (
          <div key={i} style={{
            position: 'absolute', left: `${pct}%`, top: -2,
            width: 2, height: 10, background: AVATAR_COLORS[i % AVATAR_COLORS.length],
            opacity: 0.7,
          }}/>
        ))}
        {hover !== null && (
          <div style={{
            position: 'absolute', left: `${hover}%`, top: -28,
            transform: 'translateX(-50%)',
            padding: '3px 6px',
            background: 'var(--bg-elev-2)', border: '1px solid var(--line)',
            borderRadius: 3, fontSize: 10, fontFamily: 'var(--font-mono)',
            pointerEvents: 'none',
          }}>
            {Math.floor(hover * 1.638)}:00
          </div>
        )}
      </div>
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        marginTop: 8,
        fontFamily: 'var(--font-mono)', fontSize: 11,
      }}>
        <span style={{ color: 'var(--accent)' }}>{room.elapsed}</span>
        <span className="mute">-{room.duration}</span>
      </div>
    </div>
  );
};

const ControlBar = ({ muted, setMuted, cam, setCam, chatOpen, setChatOpen }) => (
  <div style={{
    display: 'flex', alignItems: 'center', gap: 8,
    padding: '10px 20px 14px',
    background: 'var(--bg-inset)',
  }}>
    {/* Left: playback */}
    <div style={{ display: 'flex', gap: 4 }}>
      <Btn variant="ghost" size="md" icon="play" title="Reanudar"/>
      <Btn variant="ghost" size="md" icon="volume"/>
    </div>
    <div style={{ width: 1, height: 22, background: 'var(--line-soft)', margin: '0 4px' }}/>

    {/* Center: AV controls */}
    <div style={{ display: 'flex', gap: 6, flex: 1, justifyContent: 'center' }}>
      <Btn variant={muted ? 'danger' : 'solid'} size="md" icon={muted ? 'micOff' : 'mic'} onClick={() => setMuted(!muted)}>
        {muted ? 'Silenciado' : 'Micrófono'}
      </Btn>
      <Btn variant={cam ? 'solid' : 'outline'} size="md" icon={cam ? 'video' : 'videoOff'} onClick={() => setCam(!cam)}>
        Cámara
      </Btn>
      <Btn variant="outline" size="md" icon="screen">Compartir pantalla</Btn>
      <Btn variant="outline" size="md" icon="sparkle">Reacción</Btn>
    </div>

    {/* Right: layout */}
    <div style={{ width: 1, height: 22, background: 'var(--line-soft)', margin: '0 4px' }}/>
    <Btn variant="ghost" size="md" icon="chat" active={chatOpen} onClick={() => setChatOpen(!chatOpen)}/>
    <Btn variant="ghost" size="md" icon="fullscreen"/>
  </div>
);

const RoomChat = ({ onClose }) => {
  const [tab, setTab] = useState('chat');
  return (
    <div style={{
      borderLeft: '1px solid var(--line-soft)',
      background: 'var(--bg-inset)',
      display: 'flex', flexDirection: 'column',
      overflow: 'hidden',
    }}>
      <div style={{
        display: 'flex', padding: '12px 14px 0',
        borderBottom: '1px solid var(--line-soft)',
        gap: 14,
      }}>
        {[['chat', 'Chat'], ['queue', 'Cola'], ['info', 'Info']].map(([k, label]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            paddingBottom: 10,
            fontSize: 12,
            color: tab === k ? 'var(--fg)' : 'var(--fg-mute)',
            borderBottom: `1.5px solid ${tab === k ? 'var(--accent)' : 'transparent'}`,
            fontWeight: tab === k ? 500 : 400,
            marginBottom: -1,
          }}>{label}</button>
        ))}
        <div style={{ flex: 1 }}/>
        <button onClick={onClose} style={{ color: 'var(--fg-mute)', paddingBottom: 10 }}>
          <Icon name="close" size={14}/>
        </button>
      </div>

      <div style={{ flex: 1, overflow: 'auto', padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {CHAT_MESSAGES.map((m, i) => <ChatMessage key={i} msg={m}/>)}
        <div className="mono mute" style={{
          fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase',
          textAlign: 'center', padding: '8px 0',
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <span style={{ flex: 1, height: 1, background: 'var(--line-soft)' }}/>
          Ana pausó en 01:12:48
          <span style={{ flex: 1, height: 1, background: 'var(--line-soft)' }}/>
        </div>
        <div className="mute" style={{ fontSize: 11, fontStyle: 'italic' }}>Kenji y Lu escribiendo...</div>
      </div>

      <div style={{ padding: '10px 14px', borderTop: '1px solid var(--line-soft)', display: 'flex', gap: 6 }}>
        <div style={{
          flex: 1, display: 'flex', alignItems: 'center', gap: 6,
          padding: '8px 10px',
          background: 'var(--bg-elev)', border: '1px solid var(--line-soft)', borderRadius: 4,
        }}>
          <input placeholder="Mensaje · /play /pause /jump" style={{
            flex: 1, background: 'transparent', border: 'none', outline: 'none',
            color: 'var(--fg)', fontSize: 13,
          }}/>
          <Icon name="sparkle" size={13} className="mute"/>
        </div>
        <button style={{
          width: 34, height: 34,
          background: 'var(--accent)', color: 'oklch(0.15 0 0)',
          borderRadius: 4,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon name="send" size={14}/>
        </button>
      </div>
    </div>
  );
};

const ChatMessage = ({ msg }) => (
  <div style={{
    display: 'flex', gap: 10,
    padding: msg.highlight ? '8px 10px' : 0,
    margin: msg.highlight ? '-4px -4px' : 0,
    background: msg.highlight ? 'oklch(0.28 0.06 85 / 0.15)' : 'transparent',
    borderLeft: msg.highlight ? '2px solid var(--accent)' : 'none',
    borderRadius: msg.highlight ? 4 : 0,
  }}>
    <Avatar name={msg.who} size={28}/>
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
        <span style={{ fontSize: 12, fontWeight: 500 }}>{msg.who}</span>
        <span className="mono mute" style={{ fontSize: 10 }}>{msg.at}</span>
      </div>
      <div style={{ fontSize: 13, color: 'var(--fg-dim)', marginTop: 3, lineHeight: 1.4 }}>{msg.text}</div>
      {msg.reactions && (
        <div style={{ display: 'flex', gap: 4, marginTop: 6 }}>
          {msg.reactions.map((r, i) => (
            <div key={i} style={{
              padding: '2px 6px', fontSize: 11,
              background: 'var(--bg-elev)', border: '1px solid var(--line-soft)', borderRadius: 10,
            }}>{r} <span className="mono mute" style={{ fontSize: 9 }}>{i + 2}</span></div>
          ))}
        </div>
      )}
    </div>
  </div>
);

Object.assign(window, { RoomScreen });
