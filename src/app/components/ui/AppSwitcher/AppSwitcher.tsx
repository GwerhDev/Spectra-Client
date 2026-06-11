import styles from './AppSwitcher.module.css';
import { useAppDispatch } from '@/store/hooks';
import { toggleMinimized } from '@/store/desktopSlice';

export function AppSwitcher() {
  const dispatch = useAppDispatch();

  return (
    <div className={styles.root}>
      <button
        className={styles.trigger}
        onClick={() => dispatch(toggleMinimized())}
        data-testid="app-switcher-trigger"
      >
        <span className={styles.brandSpectra}>
          <span className={styles.spectraIcon} />
          <span className={styles.name}>SPECTRA</span>
        </span>
        <span className={styles.brandNhexa}>
          <span className={styles.nhexaIcon} />
          <span className={styles.nhexaName}>NHEXA</span>
        </span>
      </button>
    </div>
  );
}
