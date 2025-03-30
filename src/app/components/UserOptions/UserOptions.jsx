import s from './UserOptions.module.css';
import likeIcon from '../../../assets/images/svg/like-icon.svg';
import adminIcon from '../../../assets/images/svg/admin-icon.svg';
import userIcon from '../../../assets/images/svg/profile-icon.svg';
import logoutIcon from '../../../assets/images/svg/logout-icon.svg';
import subscriptionIcon from '../../../assets/images/svg/billing-icon.svg';
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
          <img
            className={s.imgIconProf}
            referrerPolicy="no-referrer"
            src={currentUser?.profilePic || userIcon}
            onClick={(e) => e.target.value = 'profile'}
            alt=""
          />
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
          <img
            className={s.imgIcon}
            onClick={(e) => e.target.value = 'favorites'}
            src={likeIcon}
            alt="" />
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
          <img
            className={s.imgIcon}
            onClick={(e) => e.target.value = 'subscription'}
            src={subscriptionIcon}
            alt="" />
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
              <img
                className={s.imgIcon}
                onClick={(e) => e.target.value = 'dashboard'}
                src={adminIcon}
                alt="" />
              DASHBOARD
            </button>
          </li>
          : null
      }
      <li className={s.liProfileMenuDisplay}>
        <button
          id='optionProfileBtn6'
          className={s.optionProfileBtn}
          onClick={() => logout(navigate)}
          onMouseEnter={userButtonEnter}>
          <img
            className={s.imgIcon}
            src={logoutIcon}
            alt="" />
          SALIR
        </button>
      </li>
    </motion.ul>
  )
}
