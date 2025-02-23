import s from './OptionSelector.module.css';
import shieldIcon from '../../assets/images/svg/shield-icon.svg';
import settingsIcon from '../../assets/images/svg/settings-icon.svg';
import favoriteIcon from '../../assets/images/svg/like-icon.svg';
import billingIcon from '../../assets/images/svg/billing-icon.svg';
import userIcon from '../../assets/images/svg/profile-icon.svg';
import supportIcon from '../../assets/images/svg/support-icon.svg';
import contentIcon from '../../assets/images/svg/content-icon.svg';
import searchIcon from '../../assets/images/svg/search-icon.svg';
import { useDispatch } from 'react-redux';

export const OptionSelector = (props) => {
  const dispatch = useDispatch();
  const { settings, security, favorites, subscription, users, content, support, search, onClick } = props || null;

  return (
    <section className={s.container}>
      {
        content &&
        <li className={s.option} onClick={() => dispatch(onClick("content"))}>
          <img src={contentIcon} alt="" height="25px" />
        </li>
      }
      {
        users &&
        <li className={s.option} onClick={() => dispatch(onClick("users"))}>
          <img src={userIcon} alt="" height="25px" />
        </li>
      }
      {
        favorites &&
        <li className={s.option} onClick={() => dispatch(onClick("favorites"))}>
          <img src={favoriteIcon} alt="" height="25px" />
        </li>
      }
      {
        subscription &&
        <li className={s.option} onClick={() => dispatch(onClick("subscription"))}>
          <img src={billingIcon} alt="" height="25px" />
        </li>
      }
      {
        search &&
        <li className={s.option} onClick={() => dispatch(onClick("search"))}>
          <img src={searchIcon} alt="" height="25px" />
        </li>
      }
      {
        security &&
        <li className={s.option} onClick={() => dispatch(onClick("security"))}>
          <img src={shieldIcon} alt="" height="25px" />
        </li>
      }
      {
        settings &&
        <li className={s.option} onClick={() => dispatch(onClick("settings"))}>
          <img src={settingsIcon} alt="" height="25px" />
        </li>
      }
      {
        support &&
        <li className={s.option} onClick={() => dispatch(onClick("support"))}>
          <img src={supportIcon} alt="" height="25px" />
        </li>
      }
    </section>
  )
}
