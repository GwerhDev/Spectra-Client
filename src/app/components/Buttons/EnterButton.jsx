import s from './EnterButton.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setOption } from '../../../middlewares/redux/actions';

export const EnterButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onClickValue() {
    dispatch(setOption('login'));
    navigate('/login');
  };

  return (
    <button className={s.container} onClick={onClickValue}>
      <FontAwesomeIcon  color='var(--nhexa-white)' icon={faUser} />
    </button>
  )
};
