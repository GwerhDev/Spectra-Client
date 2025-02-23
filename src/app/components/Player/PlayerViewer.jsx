import s from './PlayerViewer.module.css';
import { useDispatch, useSelector } from "react-redux";
import { PlayerYouTube } from './PlayerYouTube';
import { PrimaryButton } from '../Buttons/PrimaryButton';
import { SecondaryButton } from '../Buttons/SecondaryButton';
import { ContentMagementButtons } from '../Admin/AdminButtons/ContentMagementButtons';
import userIcon from '../../../assets/images/user-icon.png';
import likeIcon from '../../../assets/images/like-icon.png';
import playIconn from '../../../assets/images/ruinatv-icon-play-n.png';
import playIconb from '../../../assets/images/ruinatv-icon-play-b.png';
import { addFavorites, deleteFavorites } from '../../../middlewares/redux/actions/account';
import { resetOption, setOption } from '../../../middlewares/redux/actions';
import { resetDetailsMedia } from '../../../middlewares/redux/actions/content';
import { resetBackRoute, setBackRoute } from '../../../middlewares/redux/actions/navigation';
import { resetPlayer, setPlayer } from '../../../middlewares/redux/actions/player';
import { useNavigate, useLocation } from 'react-router-dom';
import { $d } from '../../../functions';
import { Tags } from '../../utils/Tags';

export const PlayerViewer = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { artist, title, info, id, idYT, genres, categories, mediatypes } = props || {};
  const favorites = useSelector(state => state.favorites);
  const currentUser = useSelector(state => state.currentUser);

  function onClickValue() {
    dispatch(setBackRoute(location.pathname));
    dispatch(setOption('login'));
    navigate('/login');
  };

  function handleBackButton() {
    dispatch(resetPlayer());
    dispatch(resetOption());
    dispatch(resetBackRoute());
    dispatch(resetDetailsMedia());
    navigate('/');
  };

  function handleWatchButton() {
    dispatch(setPlayer({ idLinkYT: idYT }));
    $d('.player-ul').style.opacity = '1';
    $d('.player-background-effect').style.opacity = '1';
  };

  return (
    <div className={s.container} id='player-container'>
      <PlayerYouTube />
      <ul className={s.infoCanvas}>
        <li className={s.artist}>{artist}</li>
        <li className={s.title}>{title}</li>
        <li className={s.info}>{info}</li>
        {
          currentUser?.role === 'admin' &&
          <ContentMagementButtons />
        }
        <ul className={s.tags}>
          {
            categories?.map((e, i) => {
              return (
                <li key={i}>
                  <Tags tag={e} />
                </li>
              )
            })
          }
          {
            genres?.map((e, i) => {
              return (
                <li key={i}>
                  <Tags tag={e} />
                </li>
              )
            })
          }
          {
            mediatypes?.map((e, i) => {
              return (
                <li key={i}>
                  <Tags tag={e} />
                </li>
              )
            })
          }

        </ul>
        {
          currentUser &&
          <div className={s.userButtons}>
            <button className='button-add-favorite' onClick={() => { dispatch(favorites?.find(e => e.id === id) ? deleteFavorites(id) : addFavorites(id)) }}>
              <img
                className={s.favIcon}
                id="favViewIcon"
                src={likeIcon}
                alt='add favorites'
                width='25px'
                style={{ filter: `grayscale(${favorites?.find(e => e.id === id) ? 0 : 1} )` }}
              />
            </button>

          </div>
        }
        <div className={s.noUserButtons}>
          {
            currentUser
              ?
              <PrimaryButton
                onClick={handleWatchButton}
                onMouseEnter={() => { $d('#visor-play-button').src = playIconb }}
                onMouseLeave={() => { $d('#visor-play-button').src = playIconn }}
                icon={playIconn}
                iconId={"visor-play-button"}
                text={"Ver ahora"}
              />
              :
              <PrimaryButton
                onClick={onClickValue}
                icon={userIcon}
                iconId={"visor-play-button"}
                text={"Ingresar"}
              />
          }
          <SecondaryButton onClick={handleBackButton} text={"Volver al inicio"} />
        </div>
      </ul>
    </div>
  )
};

