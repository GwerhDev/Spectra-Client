import s from './RequestProfile.module.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { OptionProfile } from '../../../functions';
import { resetOption } from '../../../middlewares/redux/actions';
import { logout } from '../../../middlewares/redux/actions/account';
import { toTop } from '../../../functions/toTop';
import { faCreditCard, faHeart, faRightFromBracket, faUser, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const RequestProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const option = useSelector(state => state.option);
  const { profilePic, role } = useSelector(state => state.currentUser);

  useEffect(() => {
    OptionProfile(option)
  }, [option]);

  function handleOption(e) {
    toTop();
    navigate(e);
    dispatch(resetOption())
  };

  return (
    <div className={s.outerContainer}>
      <div className={s.innerContainer}>
        <ul className={s.ulRequestProfile}>
          <li>
            {
              profilePic
                ?
                <img
                  src={profilePic}
                  className={s.profilePic} id='profileIcon' alt="perfil"
                  onClick={() => handleOption('/u/profile')}
                />
                :
                <FontAwesomeIcon
                  icon={faUser}
                  onClick={() => handleOption('/u/profile')}
                  className={s.icon}
                  id='profileIcon'
                  alt="perfil"
                  size="xl"
                />
            }
          </li>
          <li>
            <FontAwesomeIcon
              icon={faHeart}
              className={s.icon}
              id='favoritesIcon' alt="favoritos"
              onClick={() => handleOption('/favorites')}
              size="xl"
            />
          </li>
          <li>
            <FontAwesomeIcon
              icon={faCreditCard}
              className={s.icon} id='subscriptionIcon' alt="lista"
              onClick={() => handleOption('/subscription')}
              size="xl"
            />
          </li>
          {
            role === 'admin' &&
            <li>
              <FontAwesomeIcon
                icon={faUserShield}
                className={s.icon} id='dashboardIcon' alt="lista"
                onClick={() => handleOption('/dashboard')}
                size="xl"
              />
            </li>
          }
          <li>
            <FontAwesomeIcon
              icon={faRightFromBracket}
              className={s.icon}
              alt="salir"
              onClick={() => logout(navigate)}
              size="xl"
            />
          </li>
        </ul>
      </div>
    </div>
  )
}
