import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import s from './UserButton.module.css';
import btnMenuTv from '../../../assets/images/ruinatv-icon-play-b.png';
import userIcon from '../../../assets/images/svg/profile-icon.svg';
import { useSelector } from 'react-redux';
import { userButtonClick, userButtonLeave } from '../../../functions/UserButton';
import { setBackRoute } from '../../../middlewares/redux/actions/navigation';
import { $d } from '../../../functions';

export const UserButton = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const currentUser = useSelector(state => state.currentUser);
  const { profilePic, username } = currentUser;
  userButtonLeave();

  function handleClick() {
    dispatch(setBackRoute(location.pathname));
    $d(`#apps-button`).style.opacity = '1';
    $d(`#apps-button`).style.scale = '1'
    navigate("/u/profile");
  };

  return (
    <div className={s.container}>
      <div className={s.profileBtnCont}>
        <div className={s.profileBtnMenu} id='profile-button' onClick={userButtonLeave}>
          <div className={s.usernameContainer} id='username-container'>
            {
              profilePic
                ?
                <img onClick={userButtonClick} className={s.profilePic} referrerPolicy="no-referrer" src={profilePic} alt='userIcon' width='25px' />
                :
                <img onClick={userButtonClick} className={s.userIcon} referrerPolicy="no-referrer" src={userIcon} alt='userIcon' width='25px' />
            }
            <p onClick={handleClick} id='username' className={s.username}>Hola, <span>{username ? username.substring(0, 5) + "..." : "Usuario"}</span></p>
          </div>
          <div className={s.openMenuButton} onClick={userButtonClick} onMouseLeave={userButtonLeave}>
            <img className={s.btnMenuTv} src={btnMenuTv} alt='Menú' width='8px' />
          </div>
        </div>
      </div>
    </div>
  )
}
