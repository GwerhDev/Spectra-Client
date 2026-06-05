import { useRef, useState, useEffect } from 'react';
import { App, getAppList } from '@/services/apps';
import styles from './AppSwitcher.module.css';

const LOGO_FILTER = 'brightness(0) saturate(100%) invert(15%) sepia(94%) saturate(5640%) hue-rotate(330deg) brightness(91%) contrast(101%)';


export function AppSwitcher() {
  const [open, setOpen] = useState(false);
  const [apps, setApps] = useState<App[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getAppList().then(setApps).catch(() => {});
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
        <span className={styles.brandSpectra}>
          <img src="/logo.png" alt="" style={{ width: 15, height: 15, filter: LOGO_FILTER }} />
          <span className={styles.name}>SPECTRA</span>
        </span>
        <span className={styles.brandNhexa}>
          <span className={styles.nhexaIcon} />
          <span className={styles.nhexaName}>NHEXA</span>
        </span>
      </button>

      {open && (
        <div className={styles.popover}>
          {apps.length === 0 && (
            <span className={styles.empty}>Loading…</span>
          )}
          {apps.map(app => (
            <button
              key={app.url}
              className={styles.item}
              style={{ '--app-color': app.color ?? '#ffffff' } as React.CSSProperties}
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
