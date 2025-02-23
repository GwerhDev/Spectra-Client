import s from './Viewer.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { $d, $gId } from '../../../functions';
import { Loader } from '../../utils/Loader';
import { PlayerViewer } from '../Player/PlayerViewer';
import ContentUpdate from '../Admin/ContentUpdate/ContentUpdate';
import { useEffect } from 'react';
import { getMediaById } from '../../../middlewares/redux/actions/content';
import { getFavorites } from '../../../middlewares/redux/actions/account';
import { DeleteCanvas } from '../../utils/DeleteCanvas';
import { deleteMedia } from '../../../middlewares/redux/actions/admin';

export const Viewer = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;
  const currentUser = useSelector(state => state.currentUser);
  const infoDetailViewer = useSelector(state => state.infoDetailViewer);
  const editionActive = useSelector(state => state.navigation.editionActive);

  function handleClickBack() {
    $d('.player-background-effect').style.opacity = '0';
  };

  function styles(boolean) {
    if (boolean) {
      return (
        $gId('edition-canvas').style.width = '100%',
        $gId('edition-canvas').style.minWidth = '300px'
      )
    } else {
      return (
        $gId('edition-canvas').style.width = '0',
        $gId('edition-canvas').style.minWidth = '0'
      )
    }
  }

  const {
    imageVisor,
    info,
    title,
    artist,
    idLinkYT,
    genres,
    categories,
    mediatypes,
  } = infoDetailViewer;

  useEffect(() => {
    styles(currentUser && editionActive);
    dispatch(getMediaById(id));
    dispatch(getFavorites());
  }, [dispatch, currentUser, editionActive, id]);

  return (
    <div className={s.container} style={{ backgroundImage: 'url(' + imageVisor + ')' }}>
      <div className={s.viewerCanvas} />
      <div className='player-background-effect' onClick={handleClickBack} />
      {
        currentUser?.role === 'admin' &&
        <div className={s.editionCanvas} id='edition-canvas'>
          <ContentUpdate />
        </div>
      }
      {
        infoDetailViewer?.id
          ?
          <div className={s.viewer}>
            <div className={s.sectionsContainer}>
              <span className={s.playerContainer}>
                <PlayerViewer
                  artist={artist}
                  title={title}
                  info={info}
                  id={id}
                  idYT={idLinkYT}
                  genres={genres}
                  categories={categories}
                  mediatypes={mediatypes}
                />
              </span>
            </div>
            {
              currentUser?.role === 'admin' &&
              <DeleteCanvas id={id} deleteFunction={deleteMedia} title={artist + " - " + title} />
            }
          </div>
          :
          <div className={s.loaderContainer}>
            <Loader width={"50px"} />
          </div>
      }
    </div>
  )
}
