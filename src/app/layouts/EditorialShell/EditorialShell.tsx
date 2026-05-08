import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Avatar, Icon } from '@/app/components/ui';
import { useAppSelector } from '@/store/hooks';
import styles from './EditorialShell.module.css';

const NAV_ITEMS = [
  { id: 'home',      label: 'Home',        path: '/' },
  { id: 'live',      label: 'Live',        path: '/live' },
  { id: 'catalog',   label: 'Catalog',     path: '/catalog' },
  { id: 'agenda',    label: 'Schedule',    path: '/agenda' },
  { id: 'colaborar', label: 'Collaborate', path: '/colaborar' },
];

export function EditorialShell() {
  return (
    <div className={styles.shell}>
      <EditorialNav/>
      <main className={styles.main}>
        <Outlet/>
      </main>
    </div>
  );
}

function EditorialNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const userData = useAppSelector(s => s.session.userData);

  const active = NAV_ITEMS.find(it =>
    it.path === '/' ? location.pathname === '/' : location.pathname.startsWith(it.path)
  )?.id ?? 'home';

  return (
    <nav className={styles.nav}>
      {/* Wordmark */}
      <button className={styles.wordmark} onClick={() => navigate('/')}>
        <img
          src="/logo.png"
          alt=""
          style={{
            width: 22, height: 22,
            filter: 'brightness(0) saturate(100%) invert(15%) sepia(94%) saturate(5640%) hue-rotate(330deg) brightness(91%) contrast(101%)',
          }}
        />
        <span className={styles.wordmarkText}>SPECTRA</span>
      </button>

      {/* Nav items */}
      <div className={styles.navItems}>
        {NAV_ITEMS.map(it => (
          <button
            key={it.id}
            onClick={() => navigate(it.path)}
            className={`${styles.navItem} ${active === it.id ? styles.navItemActive : ''}`}
          >
            {it.label}
            {active === it.id && <span className={styles.activeDot}/>}
          </button>
        ))}
      </div>

      <div className={styles.spacer}/>

      {/* Right actions */}
      <div className={styles.navRight}>
        <button className={styles.iconBtn}>
          <Icon name="search" size={15}/>
        </button>
        <button className={styles.liveBtn}>
          <span className="live-dot"/>
          <span className="mono">IN ROOM</span>
        </button>
        <button className={styles.avatarBtn}>
          <Avatar name={userData.username ?? 'User'} size={26}/>
        </button>
      </div>
    </nav>
  );
}
