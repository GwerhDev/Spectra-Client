import styles from './AppTitle.module.css';

interface AppTitleProps {
  label: string;
  onClick: () => void;
}

// The header's centered title: the app's name, which goes to the app's home.
export function AppTitle({ label, onClick }: AppTitleProps) {
  return (
    <button type="button" className={styles.title} onClick={onClick} data-testid="app-title">
      {label.toUpperCase()}
    </button>
  );
}
