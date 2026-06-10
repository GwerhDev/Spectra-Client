import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Avatar, Btn, Icon, Tag, Waveform } from '@/app/components/ui';
import { ACTIVE_ROOMS, AVATAR_COLORS, CHAT_MESSAGES } from '@/mocks/data';
import type { ChatMsg } from '@/interfaces';
import styles from './RoomScreen.module.css';

export function RoomScreen() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const room = ACTIVE_ROOMS.find(r => r.id === id) ?? ACTIVE_ROOMS[0];

  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(false);
  const [cam, setCam] = useState(false);
  const [chatOpen, setChatOpen] = useState(true);

  return (
    <div className={styles.layout} style={{ gridTemplateColumns: chatOpen ? '1fr 320px' : '1fr 0px' }}>
      {/* Main column */}
      <div className={styles.mainCol}>
        <RoomTopBar room={room} onExit={() => navigate('/')} chatOpen={chatOpen} setChatOpen={setChatOpen}/>

        <div className={styles.stageWrap}>
          <StreamStage room={room} playing={playing}/>
          <ParticipantRail/>
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
}

function RoomTopBar({ room, onExit }: {
  room: typeof ACTIVE_ROOMS[0];
  onExit: () => void;
  chatOpen: boolean;
  setChatOpen: (v: boolean) => void;
}) {
  return (
    <div className={styles.topBar}>
      <Tag tone="live">LIVE</Tag>
      <Tag tone="sync" icon="sync">SYNC · 42ms</Tag>
      <div className={styles.roomInfo}>
        <div className={styles.roomInfoTitle}>{room.title}</div>
        <div className={`mono mute ${styles.roomInfoSub}`}>
          Cineclub Medianoche · host {room.host}
        </div>
      </div>
      <div style={{ flex: 1 }}/>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <Icon name="users" size={14} className="dim"/>
        <span className="mono" style={{ fontSize: 12 }}>{room.participants}</span>
        <span className="mono mute" style={{ fontSize: 12 }}>/ {room.peak}</span>
      </div>
      <Btn variant="ghost" size="sm" icon="sparkle">Effects</Btn>
      <Btn variant="ghost" size="sm" icon="settings"/>
      <Btn variant="danger" size="sm" onClick={onExit}>Leave</Btn>
    </div>
  );
}

function StreamStage({ room, playing: _playing }: { room: typeof ACTIVE_ROOMS[0]; playing: boolean }) {
  return (
    <div className={styles.stage}>
      <div className={styles.stagePlaceholder}>
        <div className="mono" style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 10 }}>
          Video placeholder · 1920×1080
        </div>
        <div style={{ fontSize: 18, fontWeight: 500, letterSpacing: '-0.015em' }}>{room.content}</div>
        <div className="mono" style={{ fontSize: 10, marginTop: 8, opacity: 0.6 }}>{room.cover}</div>
      </div>
      <div className={styles.stageScanlines}/>
    </div>
  );
}

const PARTICIPANTS = [
  { name: 'Aria Voss',   speaking: true,  host: true   },
  { name: 'Luca Ren',    speaking: false               },
  { name: 'Mira Callum', speaking: false, muted: true  },
  { name: 'Soren Dale',  speaking: false               },
  { name: 'Eli Nakash',  speaking: false, camOff: true },
  { name: 'Nora Tane',   speaking: false, muted: true  },
];

function ParticipantRail() {
  return (
    <div className={styles.participantRail}>
      {PARTICIPANTS.map((p, i) => <ParticipantTile key={i} person={p}/>)}
      <div className={styles.listeningBadge}>+2 listening</div>
    </div>
  );
}

function ParticipantTile({ person }: { person: typeof PARTICIPANTS[0] }) {
  return (
    <div className={styles.participantTile} style={{
      border: person.speaking ? '1.5px solid var(--accent)' : '1px solid var(--line-soft)',
    }}>
      {person.camOff ? (
        <Avatar name={person.name} size={44}/>
      ) : (
        <div className={styles.camFeed} style={{
          background: `repeating-linear-gradient(45deg,
            oklch(0.28 0.04 ${(person.name.charCodeAt(0) * 3) % 360}) 0 2px,
            oklch(0.22 0.03 ${(person.name.charCodeAt(0) * 3) % 360}) 2px 14px)`,
        }}>
          <div className="mono" style={{ fontSize: 9, color: 'oklch(0.9 0 0)', letterSpacing: '0.1em' }}>CAM FEED</div>
        </div>
      )}
      <div className={styles.nameTag}>
        {person.host && <span style={{ fontSize: 8, fontFamily: 'var(--font-mono)', color: 'var(--accent)', marginRight: 2 }}>★</span>}
        <span style={{ fontSize: 10, fontWeight: 500, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {person.name.split(' ')[0]}
        </span>
        {person.muted
          ? <Icon name="micOff" size={10} className="dim"/>
          : person.speaking && <Waveform size={8} bars={3}/>
        }
      </div>
    </div>
  );
}

function SyncIndicator() {
  return (
    <div className={styles.syncIndicator}>
      <Icon name="sync" size={12} style={{ color: 'var(--ok)' }}/>
      <div>
        <div className="mono" style={{ fontSize: 10, color: 'var(--ok)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          Synced
        </div>
        <div className="mono mute" style={{ fontSize: 9, marginTop: 1 }}>
          8 streams · avg drift 42ms
        </div>
      </div>
    </div>
  );
}

function PlaybackBar({ playing: _playing, setPlaying: _setPlaying, room }: {
  playing: boolean;
  setPlaying: (v: boolean) => void;
  room: typeof ACTIVE_ROOMS[0];
}) {
  const [hover, setHover] = useState<number | null>(null);
  const pct = 45;

  return (
    <div className={styles.playbackBar}>
      <div
        className={styles.progressTrack}
        onMouseMove={e => {
          const r = e.currentTarget.getBoundingClientRect();
          setHover(((e.clientX - r.left) / r.width) * 100);
        }}
        onMouseLeave={() => setHover(null)}
      >
        <div className={styles.progressFill} style={{ width: `${pct}%` }}/>
        <div className={styles.progressThumb} style={{ left: `${pct}%` }}/>
        {[22, 44, 47, 47, 48].map((p, i) => (
          <div key={i} className={styles.participantCursor} style={{
            left: `${p}%`,
            background: AVATAR_COLORS[i % AVATAR_COLORS.length],
          }}/>
        ))}
        {hover !== null && (
          <div className={styles.hoverLabel} style={{ left: `${hover}%` }}>
            {Math.floor(hover * 1.638)}:00
          </div>
        )}
      </div>
      <div className={styles.timeRow}>
        <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: 11 }}>{room.elapsed}</span>
        <span className="mono mute" style={{ fontSize: 11 }}>-{room.duration}</span>
      </div>
    </div>
  );
}

function ControlBar({ muted, setMuted, cam, setCam, chatOpen, setChatOpen }: {
  muted: boolean; setMuted: (v: boolean) => void;
  cam: boolean; setCam: (v: boolean) => void;
  chatOpen: boolean; setChatOpen: (v: boolean) => void;
}) {
  return (
    <div className={styles.controlBar}>
      <div style={{ display: 'flex', gap: 4 }}>
        <Btn variant="ghost" size="md" icon="play" title="Reanudar"/>
        <Btn variant="ghost" size="md" icon="volume"/>
      </div>
      <div className={styles.divider}/>
      <div className={styles.centerControls}>
        <Btn variant={muted ? 'danger' : 'solid'} size="md" icon={muted ? 'micOff' : 'mic'} onClick={() => setMuted(!muted)}>
          {muted ? 'Muted' : 'Microphone'}
        </Btn>
        <Btn variant={cam ? 'solid' : 'outline'} size="md" icon={cam ? 'video' : 'videoOff'} onClick={() => setCam(!cam)}>
          Camera
        </Btn>
        <Btn variant="outline" size="md" icon="screen">Share screen</Btn>
        <Btn variant="outline" size="md" icon="sparkle">React</Btn>
      </div>
      <div className={styles.divider}/>
      <Btn variant="ghost" size="md" icon="chat" active={chatOpen} onClick={() => setChatOpen(!chatOpen)}/>
      <Btn variant="ghost" size="md" icon="fullscreen"/>
    </div>
  );
}

function RoomChat({ onClose }: { onClose: () => void }) {
  const [tab, setTab] = useState<'chat' | 'queue' | 'info'>('chat');

  return (
    <div className={styles.chat}>
      <div className={styles.chatTabs}>
        {(['chat', 'queue', 'info'] as const).map(k => (
          <button key={k} onClick={() => setTab(k)} className={`${styles.chatTab} ${tab === k ? styles.chatTabActive : ''}`}>
            {{ chat: 'Chat', queue: 'Queue', info: 'Info' }[k]}
          </button>
        ))}
        <div style={{ flex: 1 }}/>
        <button onClick={onClose} className={styles.chatClose}>
          <Icon name="close" size={14}/>
        </button>
      </div>

      <div className={styles.chatMessages}>
        {CHAT_MESSAGES.map((m, i) => <ChatMessage key={i} msg={m}/>)}
        <div className={`mono mute ${styles.chatEvent}`}>
          <span className={styles.chatEventLine}/>
          Aria paused at 01:12:48
          <span className={styles.chatEventLine}/>
        </div>
        <div className="mute" style={{ fontSize: 11, fontStyle: 'italic' }}>Mira and Soren are typing...</div>
      </div>

      <div className={styles.chatInput}>
        <div className={styles.inputWrap}>
          <input placeholder="Message · /play /pause /jump" className={styles.input}/>
          <Icon name="sparkle" size={13} className="mute"/>
        </div>
        <button className={styles.sendBtn}>
          <Icon name="send" size={14}/>
        </button>
      </div>
    </div>
  );
}

function ChatMessage({ msg }: { msg: ChatMsg }) {
  return (
    <div className={styles.chatMsg} style={{
      padding: msg.highlight ? '8px 10px' : '0',
      margin: msg.highlight ? '-4px -4px' : '0',
      background: msg.highlight ? 'color-mix(in srgb, var(--accent) 12%, transparent)' : 'transparent',
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
              }}>
                {r} <span className="mono mute" style={{ fontSize: 9 }}>{i + 2}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
