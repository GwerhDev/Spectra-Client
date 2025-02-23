import s from './LogoButton.module.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import navBack from '../../../functions/Navigator';
import logo from '../../../assets/images/svg/nhexavision-logo.svg';
import { toTop } from '../../../functions/toTop';
import { resetPlayer } from '../../../middlewares/redux/actions/player';
import { useDispatch } from 'react-redux';
import { resetOption } from '../../../middlewares/redux/actions';

export const LogoButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [posNav, setPosNav] = useState();
  window.onscroll = function () { navBack(setPosNav, posNav) };

  const handleLogoClick = () => {
    toTop();
    dispatch(resetPlayer());
    dispatch(resetOption());
    navigate('/');
  };

  return (
    <div className={s.container}>
      <div className={s.logoContainer}>
        <div className={s.logoButton}>
          <div className={s.containerLogo}>
            <img className={s.logo} src={logo} alt="Nhexa Vision" width={28} onClick={handleLogoClick} />
            <span className={s.typeContainer}>
              <p className={s.type}>NHEXA</p>
              <p className={s.subtitle}>vision</p>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
};
