import s from './RequestProfile.module.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import userIcon from '../../../assets/images/svg/profile-icon.svg';
import likeIcon from '../../../assets/images/svg/like-icon.svg';
import adminIcon from '../../../assets/images/svg/admin-icon.svg';
import logoutIcon from '../../../assets/images/svg/logout-icon.svg';
import subscriptionIcon from '../../../assets/images/svg/billing-icon.svg';
import { OptionProfile } from '../../../functions';
import { resetOption } from '../../../middlewares/redux/actions';
import { logout } from '../../../middlewares/redux/actions/account';
import { toTop } from '../../../functions/toTop';

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
                <img
                  src={userIcon}
                  className={s.userIcon} id='profileIcon' alt="perfil"
                  onClick={() => handleOption('/u/profile')}
                />
            }
          </li>
          <li>
            <img
              src={likeIcon}
              className={s.likeIcon}
              id='favoritesIcon' alt="favoritos"
              onClick={() => handleOption('/favorites')}
            />
          </li>
          <li>
            <img
              src={subscriptionIcon}
              className={s.subscriptionIcon} id='subscriptionIcon' alt="lista"
              onClick={() => handleOption('/subscription')}
            />
          </li>
          {
            role === 'admin'
              ? <li>
                <img
                  src={adminIcon}
                  className={s.adminIcon} id='dashboardIcon' alt="lista"
                  onClick={() => handleOption('/dashboard')}
                />
              </li>
              : null
          }
          <li>
            <img
              src={logoutIcon}
              className={s.logoutIcon}
              alt="salir"
              onClick={() => logout(navigate)} />
          </li>
        </ul>
      </div>
    </div>
  )
}
