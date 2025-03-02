import s from './BackButton.module.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetOption } from '../../../middlewares/redux/actions';
import { toTop } from '../../../functions/toTop';
import { resetBackRoute } from '../../../middlewares/redux/actions/navigation';
import { resetDetailsMedia } from '../../../middlewares/redux/actions/content';
import { resetPlayer } from '../../../middlewares/redux/actions/player';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export const BackButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const backRoute = useSelector(state => state.navigation?.backRoute) || '';

  function handleButton() {
    toTop();
    dispatch(resetPlayer());
    dispatch(resetOption());
    dispatch(resetBackRoute());
    dispatch(resetDetailsMedia());
    navigate(backRoute);
  };

  return (
    <button className={s.container} onClick={handleButton}>
      <FontAwesomeIcon color='var(--nhexa-white)' icon={faArrowLeft} />
    </button>
  )
}
