import { useNavigate } from 'react-router-dom';
import s from './FilteredCard.module.css'
import { useDispatch } from 'react-redux';
import { setBackRoute } from '../../middlewares/redux/actions/navigation';
import { useLocation } from 'react-router-dom';

export const FilteredCard = (props) => {
  const { id, title, img, artist } = props || {};
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  function handleClick() {
    dispatch(setBackRoute(location.pathname));
    navigate(`/view/v=${id}`);
  }

  return (
    <div className={s.container}>
      <div onClick={handleClick} className={s.cardContainer} style={{ backgroundImage: `url(${img})` }}>
        <div className={s.divContSearch}>
          <h2 className={s.artist}>{artist}</h2>
          <h1 className={s.title}>{title}</h1>
        </div>
      </div>
    </div>
  )
}