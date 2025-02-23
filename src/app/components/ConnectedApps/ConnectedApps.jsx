import s from './ConnectedApps.module.css';
import { useSelector } from 'react-redux';
import { getUserToken } from '../../../middlewares/helpers';
import appsIcon from '../../../assets/images/svg/appstab-icon.svg'

export const ConnectedApps = (props) => {
  const { width } = props;
  const currentUser = useSelector((state) => state.currentUser);
  const urlMerch = 'https://merch.laruina.cl/';
  const urlPlay = currentUser ? 'https://play.laruina.cl/auth?token=' + getUserToken() : 'https://play.laruina.cl/';
  const urlHub = currentUser ? 'https://hub.laruina.cl/auth/' + getUserToken() : 'https://hub.laruina.cl/';

  return (
    <ul className={s.appsContainer} id='apps-container' style={{ width: width || "100%" }}>
      <img src={appsIcon} alt="" height={"50px"}/>
      <span>Apps</span>
      <div className={s.divider} />
      <a href={urlHub}><li id='app-option-1'>Hub</li></a>
      <a href={urlPlay}><li id='app-option-2'>Play</li></a>
      <a href={urlMerch}><li id='app-option-3'>Merch</li></a>
    </ul>
  )
}
