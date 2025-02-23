import s from './UserMenu.module.css';
import navBack from '../../../functions/Navigator';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { EnterButton } from '../Buttons/EnterButton';
import { BackButton } from '../Buttons/BackButton';
import { UserButton } from '../Buttons/UserButton';
import { AUTHENTICATING } from '../../../middlewares/misc';
import { Loader } from '../../utils/Loader';

export const UserMenu = () => {
  const [posNav, setPosNav] = useState();
  const option = useSelector(state => state.option);
  const isLogged = useSelector(state => state.isLogged);
  const currentUser = useSelector(state => state.currentUser);
  window.onscroll = function () { navBack(setPosNav, posNav) };

  return (
    <span className={s.container}>
      {
        isLogged === AUTHENTICATING
          ?
          <div className={s.loaderContainer}>
            <Loader width={"25px"} />
          </div>
          :
          !currentUser
            ? option === 'login'
              ? <span className={s.buttonContainer}><BackButton /></span>
              : <span className={s.buttonContainer}><EnterButton /></span>
            : option === '' || option === 'login'
              ? <span className={s.buttonContainer}><UserButton /></span>
              : <span className={s.buttonContainer}><BackButton /></span>

      }
    </span>
  )
}