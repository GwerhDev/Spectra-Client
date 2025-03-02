import s from './LogoButton.module.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import navBack from '../../../functions/Navigator';
import logo from '../../../assets/images/svg/spectra-logo.svg';
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
          <div className={s.containerLogo} onClick={handleLogoClick}>
            <img className={s.logo} src={logo} alt="Spectra" width={28} />
            <span className={s.typeContainer}>
              <p className={s.type}>SPECTRA</p>
              <p className={s.subtitle}>NHEXA</p>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
};
