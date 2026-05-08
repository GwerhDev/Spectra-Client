import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Avatar, Icon } from '@/app/components/ui';
import { AccountMenu } from '@/app/components/ui/AccountMenu/AccountMenu';
import { AppSwitcher } from '@/app/components/ui/AppSwitcher/AppSwitcher';
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
  const location = useLocation();
  const navigate = useNavigate();
  const userData = useAppSelector(s => s.session.userData);

  const active = NAV_ITEMS.find(it =>
    it.path === '/' ? location.pathname === '/' : location.pathname.startsWith(it.path)
  )?.id ?? 'home';

  return (
    <div className={styles.shell}>

      {/* ── Top header bar ── */}
      <header className={styles.header}>
        <AppSwitcher />
        <div className={styles.headerRight}>
          <button className={styles.iconBtn}>
            <Icon name="search" size={13}/>
          </button>
          <AccountMenu />
        </div>
      </header>

      {/* ── Body: sidebar + content ── */}
      <div className={styles.body}>

        {/* Sidebar */}
        <nav className={styles.sidebar}>
          {NAV_ITEMS.map(it => (
            <button
              key={it.id}
              onClick={() => navigate(it.path)}
              className={`${styles.navItem} ${active === it.id ? styles.navItemActive : ''}`}
            >
              {active === it.id && <span className={styles.activeDot}/>}
              {it.label}
            </button>
          ))}

          <div className={styles.sidebarSpacer}/>

          <div className={styles.sidebarBottom}>
            <button className={styles.liveBtn}>
              <span className="live-dot"/>
              <span className="mono">IN ROOM</span>
            </button>
          </div>
        </nav>

        {/* Content */}
        <main className={styles.main}>
          <div key={location.pathname} className={styles.page}>
            <Outlet/>
          </div>
        </main>

      </div>
    </div>
  );
}
