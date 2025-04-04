import s from './EnterButton.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { URL_CLIENT, URL_NHEXA_ACCOUNTS } from '../../../middlewares/config';

export const EnterButton = () => {
  const onClickValue = () => {
    window.location.href = URL_NHEXA_ACCOUNTS + "/login?callback=" + URL_CLIENT; 
  };

  return (
    <button className={s.container} onClick={onClickValue}>
      <FontAwesomeIcon color='var(--nhexa-white)' icon={faUser} />
    </button>
  )
};
