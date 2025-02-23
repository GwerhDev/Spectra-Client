import { LogoButton } from '../components/Buttons/LogoButton';
import s from './Footer.module.css';

export const Footer = () => {
  return (
    <div className={s.ruinaContFooter}>
      <div className={s.columnsContainer}>
        <div className={s.column}>
          <p>Contáctanos</p>
          <p>Acerca de nosotros</p>
          <p>Nhexa Entertainment</p>
          <p>La Ruina Records</p>
          <p>EL Umbral Studios</p>
          <p>Terminal Core</p>
          <p>Fulgor Systems</p>
        </div>
        <div className={s.column}>
          <p>Términos de uso</p>
          <p>Política de privacidad</p>
          <p>Acerca de esta página</p>
        </div>
        <div className={s.column}>
          <p>Nhexa Hub</p>
          <p>Nhexa Pod</p>
          <p>Nhexa Merch</p>
        </div>
        <div className={s.column}>
          <p>Soporte técnico</p>
        </div>
      </div>
      <span className={s.logo}>
        <h3>© {new Date().getFullYear()}</h3>
        <LogoButton />
      </span>
    </div>
  )
}
