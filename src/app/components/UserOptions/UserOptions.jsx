import s from './UserOptions.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toTop } from '../../../functions/toTop';
import { setBackRoute } from '../../../middlewares/redux/actions/navigation';
import { setOption } from '../../../middlewares/redux/actions';
import { logout } from '../../../middlewares/redux/actions/account';
import { userButtonEnter } from '../../../functions/UserButton';
import { resetPlayer } from '../../../middlewares/redux/actions/player';
import { motion } from 'framer-motion';
import { faCreditCard, faHeart, faRightFromBracket, faUser, faUserShield } from '@fortawesome/free-solid-svg-icons';

export const UserOptions = () => {
  const currentUser = useSelector(state => state.currentUser);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  function onClickValue(e) {
    toTop();
    dispatch(resetPlayer());
    dispatch(setBackRoute(location.pathname));
    dispatch(setOption(e.target.value || e));
    navigate("/" + e.target.value || e);
  };

  return (
    <motion.ul
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={s.ulProfileOptions}
      id='ul-options-profile-menu'
    >
      <li className={s.liProfileMenuDisplay}>
        <button
          id='optionProfileBtn0'
          className={s.optionProfileBtn}
          value='profile'
          onClick={(e) => onClickValue(e)}
          onMouseEnter={userButtonEnter}>
          {
            !currentUser?.profilePic
              ? <FontAwesomeIcon onClick={(e) => e.target.value = 'profile'} className={s.imgIcon} icon={faUser} />
              : <img
                className={s.imgIconProf}
                referrerPolicy="no-referrer"
                src={currentUser?.profilePic}
                onClick={(e) => e.target.value = 'profile'}
                alt=""
              />
          }
          PERFIL
        </button>
      </li>
      <li className={s.liProfileMenuDisplay}>
        <button
          id='optionProfileBtn2'
          className={s.optionProfileBtn}
          value='favorites'
          onClick={(e) => onClickValue(e)}
          onMouseEnter={userButtonEnter}>

          <FontAwesomeIcon onClick={(e) => e.target.value = 'favorites'} className={s.imgIcon} icon={faHeart} />

          MIS FAVORITOS
        </button>
      </li>

      <li className={s.liProfileMenuDisplay}>
        <button
          id='optionProfileBtn4'
          className={s.optionProfileBtn}
          value='subscription'
          onClick={(e) => onClickValue(e)}
          onMouseEnter={userButtonEnter}>

          <FontAwesomeIcon className={s.imgIcon} onClick={(e) => e.target.value = 'subscription'} icon={faCreditCard} />

          SUSCRIPCIÓN
        </button>
      </li>
      {
        currentUser?.role === 'admin'
          ?
          <li className={s.liProfileMenuDisplay}>
            <button
              id='optionProfileBtn5'
              className={s.optionProfileBtn}
              value={currentUser?.role === 'admin' ? 'dashboard' : 'subscription'}
              onClick={(e) => onClickValue(e)}
              onMouseEnter={userButtonEnter}>

              <FontAwesomeIcon className={s.imgIcon} onClick={(e) => e.target.value = 'dashboard'} icon={faUserShield} />

              DASHBOARD
            </button>
          </li>
          : null
      }
      <li className={s.liProfileMenuDisplay}>
        <button id='optionProfileBtn6' className={s.optionProfileBtn} onClick={() => logout(navigate)} onMouseEnter={userButtonEnter}>
          <FontAwesomeIcon className={s.imgIcon} icon={faRightFromBracket} />
          SALIR
        </button>
      </li>
    </motion.ul>
  )
}
