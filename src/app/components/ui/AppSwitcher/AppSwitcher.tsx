import { Icon } from '../Icon';
import styles from './AppSwitcher.module.css';

interface AppSwitcherProps {
  onClick: () => void;
}

// Opens Nhexa's apps (the desktop): the apps icon (hexagon nodes), at the header's right, as in
// Nhexa's other apps.
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
      <Icon name="hexagonNodes" className={styles.icon} />
    </button>
  );
}
