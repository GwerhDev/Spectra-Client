import s from './DesktopDock.module.css';
import { Icon, IconName } from '@/app/components/ui/Icon';
import { ACCOUNT_URL, NHEXA_URL } from '@/config/api';

// The desktop's fixed tools, there whatever StreamBy's catalog says: Nhexa's home, the account,
// and the settings (not available yet).
const TOOLS: { id: string; label: string; icon: IconName; url: string }[] = [
  { id: 'home', label: 'Inicio', icon: 'home', url: NHEXA_URL },
  { id: 'account', label: 'Cuenta', icon: 'user', url: ACCOUNT_URL },
];

export function DesktopDock() {
  return (
    <nav className={s.dock} data-testid="desktop-dock">
      {TOOLS.map(tool => (
        <button
          key={tool.id}
          type="button"
          className={s.tool}
          title={tool.label}
          aria-label={tool.label}
          onClick={() => { window.location.href = tool.url; }}
          data-testid={`dock-${tool.id}`}
        >
          <Icon name={tool.icon} size={20} />
        </button>
      ))}
      <span className={s.separator} />
      <button type="button" className={s.tool} title="Configuración (próximamente)" aria-label="Configuración (próximamente)" disabled data-testid="dock-settings">
        <Icon name="settings" size={20} />
      </button>
    </nav>
  );
}
