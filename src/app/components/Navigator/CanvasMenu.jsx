import s from './CanvasMenu.module.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetOption } from '../../../middlewares/redux/actions';
import { reset } from '../../../functions/Reset';
import navBack from '../../../functions/Navigator';
import { useNavigate } from 'react-router-dom';
import { resetPlayer } from '../../../middlewares/redux/actions/player';
import { toTop } from '../../../functions/toTop';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

export const CanvasMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [posNav, setPosNav] = useState();
  const [search, setSearch] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true)

  function handleInputChange(e) {
    e.preventDefault();
    setSearch(e.target.value);
    if (e.target.value.length) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true)
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (search.length > 0) {
      toTop();
      dispatch(resetPlayer());
      dispatch(resetOption());
      reset();
      navigate(`/search/${search}`)
    }
  };

  function handleClick() {
    toTop();
    dispatch(resetPlayer());
    dispatch(resetOption());
    reset();
  };

  window.onscroll = function () { navBack(setPosNav, posNav) };
  return (
    <div className="canvas-menu-container">
      <div className={s.contMenu}>
        <ul className={s.navBurgerMenu}>
          <li onClick={handleClick}>
            <Link className={s.option} to='/browser'>Inicio</Link>
          </li>
          <li onClick={handleClick}>
            <Link className={s.option} to='/releases'>Novedades</Link>
          </li>
          <li onClick={handleClick}>
            <Link className={s.option} to='/donate'>Colaborar</Link>
          </li>
          <li className={s.search}>
            <form className={s.formSearchBar} onSubmit={handleSubmit}>
              <input
                className={s.searchBar}
                type="text"
                placeholder="Buscar..."
                onChange={handleInputChange}
              />
              <button className={s.searchBtn} type="submit" disabled={buttonDisabled}>
                <FontAwesomeIcon color='var(--nhexa-white)' size='xl' icon={faMagnifyingGlass} />
              </button>
            </form>
          </li>
        </ul>
      </div>
    </div>
  )
}