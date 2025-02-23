import s from './Navigator.module.css';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NavSearchBar } from '../SearchBar/NavSearchBar';
import { NavMenu } from './NavMenu';
import { UserMenu } from '../UserMenu/UserMenu';
import { LogoButton } from '../Buttons/LogoButton';
import { BurgerButton } from '../Buttons/BurgerButton';
import { UserOptions } from '../UserOptions/UserOptions';
import { getUserData } from '../../../middlewares/redux/actions/account';
import navBack from '../../../functions/Navigator';
import { ConnectedApps } from '../ConnectedApps/ConnectedApps';
import { AppsButton } from '../Buttons/AppsButton';

export const Navigator = () => {
  const dispatch = useDispatch();
  const [posNav, setPosNav] = useState();
  window.onscroll = function () { navBack(setPosNav, posNav) };

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  return (
    <div className='nav-container'>
      <div className={s.innerNavContainer}>
        <section className={s.leftSection}>
          <LogoButton />
        </section>
        <section className={s.middleSection}>
          <NavMenu />
          <BurgerButton />
        </section>
        <NavSearchBar />
        <section className={s.rightSection}>
          <ul className={s.appsMenuSection}>
            <AppsButton />
            <ConnectedApps width={"230px"} />
          </ul>
          <ul className={s.userMenuSection}>
            <UserMenu />
            <UserOptions />
          </ul>
        </section>
      </div>
    </div>
  )
}
