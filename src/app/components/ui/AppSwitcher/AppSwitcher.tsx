import { Icon } from '../Icon';
import styles from './AppSwitcher.module.css';

interface AppSwitcherProps {
  onClick: () => void;
}

// The header's top-left icon: opens Nhexa's apps (the desktop). Spectra's own icon, which
// turns into the apps icon (hexagon nodes) on hover.
export function AppSwitcher({ onClick }: AppSwitcherProps) {
  return (
    <button
      type="button"
      className={styles.trigger}
      onClick={onClick}
      title="Nhexa apps"
      aria-label="Nhexa apps"
      data-testid="app-switcher-trigger"
    >
      <span className={styles.appIcon} />
      <Icon name="hexagonNodes" size={18} className={styles.appsIcon} />
    </button>
  );
}
