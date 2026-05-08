import { useRef, useState, useEffect } from 'react';
import { useAppSelector } from '@/store/hooks';
import { fetchLogout } from '@/services/auth';
import styles from './AccountMenu.module.css';

export function AccountMenu() {
  const userData = useAppSelector(s => s.session.userData);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = async () => {
    try { await fetchLogout(); } finally { window.location.reload(); }
  };

  return (
    <div className={styles.root} ref={ref}>
      <button className={styles.trigger} onClick={() => setOpen(o => !o)}>
        {userData.profilePic
          ? <img src={userData.profilePic} alt="" className={styles.avatar}/>
          : <span className={styles.initials}>{(userData.username ?? 'U')[0].toUpperCase()}</span>
        }
      </button>

      {open && (
        <div className={styles.popover}>
          <div className={styles.profile}>
            {userData.profilePic
              ? <img src={userData.profilePic} alt="" className={styles.profilePic}/>
              : <span className={styles.profileInitials}>{(userData.username ?? 'U')[0].toUpperCase()}</span>
            }
            <span className={styles.username}>{userData.username ?? 'User'}</span>
          </div>
          <div className={styles.divider}/>
          <button className={styles.menuItem} onClick={() => setOpen(false)}>
            Account center
          </button>
          <button className={`${styles.menuItem} ${styles.logout}`} onClick={handleLogout}>
            Log out
          </button>
        </div>
      )}
    </div>
  );
}
