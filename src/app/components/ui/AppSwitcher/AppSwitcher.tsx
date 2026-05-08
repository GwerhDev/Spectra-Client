import { useRef, useState, useEffect } from 'react';
import { NHEXA_API } from '@/config/api';
import styles from './AppSwitcher.module.css';

const LOGO_FILTER = 'brightness(0) saturate(100%) invert(15%) sepia(94%) saturate(5640%) hue-rotate(330deg) brightness(91%) contrast(101%)';

type App = { label: string; url: string; icon: string };

const isCurrent = (url: string) => {
  try { return new URL(url).origin === window.location.origin; } catch { return false; }
};

export function AppSwitcher() {
  const [open, setOpen] = useState(false);
  const [apps, setApps] = useState<App[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(`${NHEXA_API}/app-list`, { credentials: 'include' })
      .then(r => r.json())
      .then(data => setApps(data.user ?? []))
      .catch(() => {});
  }, []);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  return (
    <div className={styles.root} ref={ref}>
      <button className={styles.trigger} onClick={() => setOpen(o => !o)}>
        <img src="/logo.png" alt="" style={{ width: 15, height: 15, filter: LOGO_FILTER }} />
        <span className={styles.name}>SPECTRA</span>
      </button>

      {open && (
        <div className={styles.popover}>
          {apps.length === 0 && (
            <span className={styles.empty}>Loading…</span>
          )}
          {apps.filter(app => !isCurrent(app.url)).map(app => (
            <button
              key={app.url}
              className={styles.item}
              onClick={() => { window.location.href = app.url; }}
            >
              <img src={app.icon} alt="" className={styles.appIcon} />
              <span className={styles.label}>{app.label.toUpperCase()}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
