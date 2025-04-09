import s from './ConnectedApps.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLayerGroup, faMusic, faStore } from '@fortawesome/free-solid-svg-icons';
import nhexaLogo from '../../../assets/images/svg/nhexa-logo.svg';

export const ConnectedApps = (props) => {
  const { width } = props || {};
  const urlNhexaHub = 'https://nhexa.cl/';
  const urlMerch = 'https://havenstore.nhexa.cl/';
  const urlSpellcast = 'https://spellcast.nhexa.cl/';

  return (
    <ul className={s.appsContainer} id='apps-container' style={{ width: width || "100%" }}>
      <FontAwesomeIcon color='var(--nhexa-white)' icon={faLayerGroup} />
      <span>Apps</span>
      <div className={s.divider} />
      <a href={urlNhexaHub}><li id='app-option-1'><img src={nhexaLogo} width={25} alt="" />Nhexa</li></a>
      <a href={urlSpellcast}><li id='app-option-2'><FontAwesomeIcon icon={faMusic} />Spellcast</li></a>
      <a href={urlMerch}><li id='app-option-3'><FontAwesomeIcon icon={faStore} />Havenstore</li></a>
    </ul>
  )
}
