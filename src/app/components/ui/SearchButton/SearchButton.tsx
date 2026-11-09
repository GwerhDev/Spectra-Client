import { Icon } from '../Icon';
import styles from './SearchButton.module.css';

interface SearchButtonProps {
  // What opens the app's search (none yet: the button is there, as in Nhexa's other apps).
  onClick?: () => void;
}

// The header's search: a magnifying glass, at its right, as in Nhexa's other apps.
export function SearchButton({ onClick }: SearchButtonProps) {
  return (
    <button type="button" className={styles.button} onClick={onClick} title="Search" aria-label="Search" data-testid="search-button">
      <Icon name="search" size={15} />
    </button>
  );
}
