import s from './ConnectedApps.module.css';
import { useSelector } from 'react-redux';
import { getUserToken } from '../../../middlewares/helpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons';

export const ConnectedApps = (props) => {
  const { width } = props || {};
  const currentUser = useSelector((state) => state.currentUser);
  const urlMerch = 'https://merch.nhexa.cl/';
  const urlSpellcast = currentUser ? 'https://spell.nhexa.cl/auth/' + getUserToken() : 'https://spell.nhexa.cl/';

  return (
    <ul className={s.appsContainer} id='apps-container' style={{ width: width || "100%" }}>
      <FontAwesomeIcon color='var(--nhexa-white)' icon={faLayerGroup} />
      <span>Apps</span>
      <div className={s.divider} />
      <a href={urlSpellcast}><li id='app-option-1'>Spellcast</li></a>
      <a href={urlMerch}><li id='app-option-3'>Havenstore</li></a>
    </ul>
  )
}
