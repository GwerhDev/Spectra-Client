import s from './SearchBar.module.css';
import { useState } from "react";
import { resetOption } from "../../../middlewares/redux/actions";
import { searchBarFunction } from '../../../functions/SearchBar';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import searchIcon from '../../../assets/images/search-icon.png';
import { reset } from '../../../functions/Reset';

export function SearchBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setSearch(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (search.length > 0) {
      return (
        dispatch(resetOption()),
        reset(),
        navigate(`/search/${search}`)
      );
    }
  };

  return (
    <div className={s.barCont}>
      <form className={s.formSearchBar} onSubmit={handleSubmit}>
        <input
          className={s.liSearchBar}
          id="liSearchBar"
          type="text"
          placeholder="Buscar..."
          onChange={handleInputChange}
          onMouseEnter={() => searchBarFunction('enter')}
        />
        <button 
          className={s.liSearchBtn}
          type="submit"
          disabled={false}
          onMouseEnter={() => searchBarFunction('enter')}
        >
          <img className={s.mediaSearch} src={searchIcon} height='20' alt="search" />
        </button>
      </form>
    </div>
  )
}
