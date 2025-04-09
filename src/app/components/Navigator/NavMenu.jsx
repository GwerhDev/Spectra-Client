import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { resetOption } from '../../../middlewares/redux/actions';
import { reset } from '../../../functions/Reset';
import navBack from '../../../functions/Navigator';
import { toTop } from '../../../functions/toTop';

export const NavMenu = () => {
  const dispatch = useDispatch();
  const [posNav, setPosNav] = useState();

  window.onscroll = function () { navBack(setPosNav, posNav) };

  function handleClick() {
    dispatch(resetOption());
    toTop();
    reset();
  };

  return (
    <ul className='nav-menu'>
      <li onClick={handleClick}>
        <Link to='/browser'>Inicio</Link>
      </li>
      <li onClick={handleClick}>
        <Link to='/releases'>Novedades</Link>
      </li>
      <li onClick={handleClick}>
        <Link to='/donate'>Colaborar</Link>
      </li>
    </ul>
  )
}
