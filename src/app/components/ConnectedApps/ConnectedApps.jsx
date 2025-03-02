import s from './ConnectedApps.module.css';
import { useSelector } from 'react-redux';
import { getUserToken } from '../../../middlewares/helpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faLayerGroup, faMusic, faStore } from '@fortawesome/free-solid-svg-icons';
import { faSoundcloud } from '@fortawesome/free-brands-svg-icons';

export const ConnectedApps = (props) => {
  const { width } = props || {};
  const currentUser = useSelector((state) => state.currentUser);
  const urlMerch = 'https://havenstore.nhexa.cl/';
  const urlNhexaHub = 'https://download.nhexa.cl/?product=nhexahub-desktop';
  const urlSpellcast = currentUser ? 'https://spellcast.nhexa.cl/auth/' + getUserToken() : 'https://spellcast.nhexa.cl/';

  return (
    <ul className={s.appsContainer} id='apps-container' style={{ width: width || "100%" }}>
      <FontAwesomeIcon color='var(--nhexa-white)' icon={faLayerGroup} />
      <span>Apps</span>
      <div className={s.divider} />
      <a href={urlNhexaHub}><li id='app-option-1'><FontAwesomeIcon icon={faDownload} />Nhexa Hub</li></a>
      <a href={urlSpellcast}><li id='app-option-2'><FontAwesomeIcon icon={faMusic} />Spellcast</li></a>
      <a href={urlMerch}><li id='app-option-3'><FontAwesomeIcon icon={faStore} />Havenstore</li></a>
    </ul>
  )
}
