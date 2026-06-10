import React, { useRef, useState, useEffect } from 'react';
import { App, getAppList } from '@/services/apps';
import styles from './AppSwitcher.module.css';

const LOGO_STYLE: React.CSSProperties = {
  display: 'inline-block', width: 15, height: 15, flexShrink: 0,
  backgroundColor: 'var(--accent)',
  WebkitMask: 'url(/logo.png) no-repeat center / contain',
  mask: 'url(/logo.png) no-repeat center / contain',
};


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
          <span style={LOGO_STYLE} />
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
