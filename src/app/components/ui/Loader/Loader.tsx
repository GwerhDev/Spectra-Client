import { useState, useEffect } from 'react';
import styles from './Loader.module.css';

const MESSAGES = [
  'INITIALIZING SESSION',
  'LOADING ROOMS',
  'SYNCING CATALOGUE',
  'FETCHING SCHEDULE',
  'PREPARING STAGE',
];

interface LoaderProps {
  progress?: number;
}

export function Loader({ progress = 0 }: LoaderProps) {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setMsgIndex(i => (i + 1) % MESSAGES.length), 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.inner}>
        <div className={styles.logoWrap}>
          <span className={styles.logo} />
        </div>
        <span className={styles.wordmark}>SPECTRA</span>
        <div className={styles.barTrack}>
          <div className={styles.bar} style={{ width: `${progress}%` }} />
        </div>
        <span className={styles.message}>{MESSAGES[msgIndex]}</span>
      </div>
    </div>
  );
}
