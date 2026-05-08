import { useNavigate } from 'react-router-dom';
import { Avatar, Icon, Thumb } from '@/app/components/ui';
import { ACTIVE_ROOMS, COMMUNITIES, PEOPLE } from '@/mocks/data';
import type { Room } from '@/interfaces';
import styles from './EditorialHome.module.css';

export function EditorialHome() {
  const navigate = useNavigate();

  const enterRoom = (id: string) => navigate(`/room/${id}`);
  const createRoom = () => navigate('/create');

  return (
    <div>
      <Hero onEnterRoom={() => enterRoom(ACTIVE_ROOMS[0].id)}/>
      <Rail onEnterRoom={enterRoom}/>
      <Programme/>
      <Footer onCreateRoom={createRoom}/>
    </div>
  );
}

function Hero({ onEnterRoom }: { onEnterRoom: () => void }) {
  const room = ACTIVE_ROOMS[0];

  return (
    <div className={styles.hero}>
      {/* Backdrop */}
      <div className={styles.heroBackdrop}/>
      <div className={styles.heroScanlines}/>

      {/* Content */}
      <div className={styles.heroContent}>
        <div className={styles.heroBadgeRow}>
          <span className={styles.liveBadge}>● NOW LIVE</span>
          <span className={`mono ${styles.heroSubtitle}`}>
            Cineclub Medianoche · host Ana Torres
          </span>
        </div>

        <h1 className={styles.heroTitle}>
          {room.content.split(' ').slice(0, -1).join(' ')}<br/>
          <span className={styles.heroTitleDim}>{room.content.split(' ').slice(-1)}</span>
          <span className={styles.heroDot}>.</span>
        </h1>

        <p className={`mono ${styles.heroDesc}`}>
          Screening with {room.participants} people in the room. Perfect sync,<br/>
          live chat and collective pause at each act.
        </p>
      </div>

      {/* Bottom row */}
      <div className={styles.heroBottom}>
        <div className={styles.heroMeta}>
          {/* Progress */}
          <div className={styles.heroProgress}>
            <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: 11 }}>
              {room.elapsed}
            </span>
            <div className={styles.progressTrack}>
              <div className={styles.progressFill} style={{ width: '45%' }}/>
            </div>
            <span className="mono mute" style={{ fontSize: 11 }}>{room.duration}</span>
          </div>

          {/* Participants */}
          <div className={styles.heroPeople}>
            <div className={styles.avatarStack}>
              {PEOPLE.slice(0, 5).map((p, i) => (
                <div key={i} style={{ marginLeft: i === 0 ? 0 : -8 }}>
                  <Avatar name={p.name} size={28} border="0 0 0 2px oklch(0.12 0 0)"/>
                </div>
              ))}
            </div>
            <span className="mono" style={{ fontSize: 11, color: 'var(--fg-dim)' }}>
              + 3 listening
            </span>
          </div>
        </div>

        <div className={styles.heroActions}>
          <button onClick={onEnterRoom} className={styles.btnJoin}>
            <span className="live-dot" style={{ background: 'oklch(0.10 0 0)' }}/>
            Join room
          </button>
          <button className={styles.btnDetails}>
            View details
          </button>
        </div>
      </div>
    </div>
  );
}

function Rail({ onEnterRoom }: { onEnterRoom: (id: string) => void }) {
  return (
    <div className={styles.rail}>
      <SectionHead
        kicker="/01"
        label="Active rooms"
        caption="4 simultaneous in your community · perfect sync between participants"
      />
      <div className={styles.roomGrid}>
        {ACTIVE_ROOMS.slice(1).map((r, i) => (
          <RoomCard key={r.id} room={r} index={i} onClick={() => onEnterRoom(r.id)}/>
        ))}
      </div>
    </div>
  );
}

function RoomCard({ room, index, onClick }: { room: Room; index: number; onClick: () => void }) {
  const community = COMMUNITIES.find(c => c.id === room.community);

  return (
    <button
      onClick={onClick}
      className={styles.roomCard}
      style={{ borderLeft: index === 0 ? 'none' : '1px solid var(--line-soft)' }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'oklch(0.18 0.003 0 / 0.5)'; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
    >
      {/* Thumb */}
      <div className={styles.roomThumb}>
        <Thumb label={room.cover} hue={community?.color ?? 60} ratio="16/10"/>
        <div className={styles.roomThumbOverlay}/>
        <div className={styles.roomBadges}>
          <span className={styles.roomBadge} style={{
            background: room.locked ? 'var(--bg-elev-2)' : 'var(--accent)',
            color: room.locked ? 'var(--fg)' : 'oklch(0.10 0 0)',
          }}>
            {room.locked ? '● Private' : '● Live'}
          </span>
          {room.sync && <span className={styles.roomBadgeSoft}>Sync</span>}
        </div>
      </div>

      {/* Text */}
      <div className={styles.roomText}>
        <div className={styles.roomMeta}>
          <span className="mono" style={{ fontSize: 10, color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            /{String(index + 2).padStart(2, '0')}
          </span>
          <span className="mono mute" style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            {community?.name}
          </span>
        </div>
        <h3 className={styles.roomTitle}>{room.title}</h3>
        <div className="mono mute" style={{ fontSize: 11, marginTop: 4, letterSpacing: '0.02em' }}>
          {room.elapsed ? `${room.elapsed} / ${room.duration}` : room.content}
        </div>
      </div>

      {/* Footer */}
      <div className={styles.roomFooter}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Icon name="users" size={12} className="mute"/>
          <span className="mono" style={{ fontSize: 11 }}>{room.participants}</span>
          <span className="mono mute" style={{ fontSize: 11 }}>/ {room.peak}</span>
        </div>
        <span className="mono" style={{ fontSize: 10, color: 'var(--fg-dim)', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 6 }}>
          Enter <Icon name="chevR" size={10}/>
        </span>
      </div>
    </button>
  );
}

function Programme() {
  const events = [
    { day: 'SUN', date: '26', time: '21:00', title: 'The Quiet Signal',   director: 'Vael, 2024',    host: 'Aria Voss',    attending: 34 },
    { day: 'MON', date: '27', time: '22:30', title: 'Fracture — S3 E8',   director: 'Morn, 2023',    host: 'Mira Callum',  attending: 28 },
    { day: 'TUE', date: '28', time: '20:00', title: 'Between Lines',       director: 'Calder, 2022',  host: 'Soren Dale',   attending: 12 },
    { day: 'THU', date: '30', time: '21:30', title: 'Threshold',           director: 'Fen, 2021',     host: 'Luca Ren',     attending: 41 },
  ];

  return (
    <div className={styles.programme}>
      <SectionHead
        kicker="/02"
        label="Schedule"
        caption="Watch parties lined up for this week. Reserve with one click."
      />
      <div>
        {events.map((e, i) => (
          <button
            key={i}
            className={styles.eventRow}
            onMouseEnter={ev => {
              const el = ev.currentTarget as HTMLElement;
              el.style.background = 'oklch(0.18 0.003 0 / 0.3)';
              el.style.padding = '22px 12px';
            }}
            onMouseLeave={ev => {
              const el = ev.currentTarget as HTMLElement;
              el.style.background = 'transparent';
              el.style.padding = '22px 0';
            }}
          >
            <div>
              <div className="mono" style={{ fontSize: 11, color: 'var(--accent)', letterSpacing: '0.12em' }}>{e.day}</div>
              <div style={{ fontSize: 36, fontWeight: 500, letterSpacing: '-0.03em', lineHeight: 1 }}>{e.date}</div>
            </div>
            <div>
              <div style={{ fontSize: 20, fontWeight: 500, letterSpacing: '-0.015em' }}>{e.title}</div>
              <div className="mono mute" style={{ fontSize: 11, marginTop: 4, letterSpacing: '0.02em' }}>{e.director}</div>
            </div>
            <div className="mono" style={{ fontSize: 11, color: 'var(--fg-dim)' }}>
              host<br/>
              <span style={{ color: 'var(--fg)', marginTop: 2, display: 'inline-block' }}>{e.host}</span>
            </div>
            <div className="mono" style={{ fontSize: 11, color: 'var(--fg-dim)' }}>{e.time}</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 8 }}>
              <span className="mono" style={{ fontSize: 11, color: 'var(--accent)' }}>{e.attending} going</span>
              <Icon name="chevR" size={12} className="mute"/>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function Footer({ onCreateRoom }: { onCreateRoom: () => void }) {
  return (
    <div className={styles.footer}>
      <div>
        <div className="mono" style={{ fontSize: 11, color: 'var(--accent)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 14 }}>
          /03 — Open a room
        </div>
        <h2 className={styles.footerTitle}>
          Pick a title, invite whoever you want, and let Spectra sync the rest.
        </h2>
      </div>
      <button onClick={onCreateRoom} className={styles.btnCreate}>
        Create room <Icon name="chevR" size={14}/>
      </button>
    </div>
  );
}

function SectionHead({ kicker, label, caption }: { kicker: string; label: string; caption: string }) {
  return (
    <div className={styles.sectionHead}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 20 }}>
        <span className="mono" style={{ fontSize: 12, color: 'var(--accent)', letterSpacing: '0.08em', fontWeight: 600 }}>
          {kicker}
        </span>
        <h2 className={styles.sectionLabel}>{label}</h2>
      </div>
      <p className="mono mute" style={{ fontSize: 11, margin: 0, maxWidth: 400, textAlign: 'right', lineHeight: 1.5, letterSpacing: '0.015em' }}>
        {caption}
      </p>
    </div>
  );
}
