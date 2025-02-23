import { useSelector } from 'react-redux';
import s from './PlayerYouTube.module.css';
import YouTube from 'react-youtube';
import { useRef } from 'react';

export const PlayerYouTube = () => {
  const idLinkYT = useSelector(state => state.player.idLinkYT);
  const currentUser = useSelector(state => state.currentUser);
  const videoPlayerRef = useRef();

  const opts = {
    width: '100%',
    playerVars: {
      controls: 1,
      showinfo: 0,
      autoplay: 0, 
      rel: 0,
      modestbranding: 1,
      fs: 1,
      iv_load_policy: 3,
      start: 0,
    },
  };

  return (
    <div className={s.playerContainer}>
      {
        idLinkYT && currentUser &&
        <YouTube iframeClassName={s.youtubeComponent}
          videoId={idLinkYT} ref={videoPlayerRef} opts={opts} />
      }
    </div>
  )
}
