import s from './BurgerButton.module.css';
import { useEffect, useState } from 'react';
import { $d } from '../../../functions';
import { CanvasMenuFunction } from '../../../functions/CanvasMenuFunction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';

export const BurgerButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  console.log(isOpen)

  const openMenu = () => {
    $d('.canvas-menu-container').style.display = 'flex';
    setIsOpen(true);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    CanvasMenuFunction(isOpen, setIsOpen);
  }, [isOpen]);

  return (
    <span className={s.container}>
      {
        isOpen && <FontAwesomeIcon icon={faXmark} color='var(--nhexa-color)' size='lg' onClick={closeMenu} />
      }
      {
        !isOpen && <FontAwesomeIcon icon={faBars} color='var(--nhexa-white)' size='lg' onClick={openMenu} />
      }
    </span>
  )
}