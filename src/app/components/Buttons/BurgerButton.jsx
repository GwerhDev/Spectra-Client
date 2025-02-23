import s from './BurgerButton.module.css';
import menuIcon from '../../../assets/images/menu-icon.png';
import { $d } from '../../../functions';

export const BurgerButton = () => {
  function openMenu() {
    $d('.canvas-menu-container').style.display = 'flex';
  }

  return (
    <span className={s.container}>
      <img className={s.menuIcon} onClick={openMenu} src={menuIcon} alt="Menú" height='30px' />
    </span>
  )
}