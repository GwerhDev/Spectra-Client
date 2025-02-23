import s from './NavSearchBar.module.css';
import { useState } from 'react';
import { SearchBar } from './SearchBar';
import navBack from '../../../functions/Navigator';

export const NavSearchBar = () => {
  const [posNav, setPosNav] = useState()
  window.onscroll = function () { navBack(setPosNav, posNav) };

  return (
    <div className={s.container}>
      <div className={s.innerContainer}>
        <SearchBar />
      </div>
    </div>
  )
};
