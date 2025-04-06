import s from './OptionSelector.module.css';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion, faCreditCard, faGear, faHeart, faList, faMagnifyingGlass, faShield, faUser } from '@fortawesome/free-solid-svg-icons';

export const OptionSelector = (props) => {
  const dispatch = useDispatch();
  const { settings, security, favorites, subscription, users, content, support, search, onClick } = props || null;

  return (
    <section className={s.container}>
      {
        content &&
        <li className={s.option} onClick={() => dispatch(onClick("content"))}>
          <FontAwesomeIcon icon={faList} />
        </li>
      }
      {
        users &&
        <li className={s.option} onClick={() => dispatch(onClick("users"))}>
          <FontAwesomeIcon icon={faUser} />
        </li>
      }
      {
        favorites &&
        <li className={s.option} onClick={() => dispatch(onClick("favorites"))}>
          <FontAwesomeIcon icon={faHeart} />
        </li>
      }
      {
        subscription &&
        <li className={s.option} onClick={() => dispatch(onClick("subscription"))}>
          <FontAwesomeIcon icon={faCreditCard} />
        </li>
      }
      {
        search &&
        <li className={s.option} onClick={() => dispatch(onClick("search"))}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </li>
      }
      {
        security &&
        <li className={s.option} onClick={() => dispatch(onClick("security"))}>
          <FontAwesomeIcon icon={faShield} />
        </li>
      }
      {
        settings &&
        <li className={s.option} onClick={() => dispatch(onClick("settings"))}>
          <FontAwesomeIcon icon={faGear} />
        </li>
      }
      {
        support &&
        <li className={s.option} onClick={() => dispatch(onClick("support"))}>
          <FontAwesomeIcon icon={faCircleQuestion} />
        </li>
      }
    </section>
  )
}
