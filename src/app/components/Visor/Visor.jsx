import s from './Visor.module.css';
import { Link } from 'react-router-dom';
import playIconb from '../../../assets/images/ruinatv-icon-play-b.png';
import playIconn from '../../../assets/images/ruinatv-icon-play-n.png';
import visorIntroVideo from '../../../assets/videos/laruina-intro.mp4';
import { VisorFunction } from './Visor.functions';
import { $d } from "../../../functions";
import { InfoCanvas } from "../../utils/InfoCanvas";
import { PrimaryButton } from '../Buttons/PrimaryButton';
import { SecondaryButton } from '../Buttons/SecondaryButton';

export const Visor = () => {
  const {
    visorId, visorInfo, contentList, visorIcon,
    visorTitle, visorImage, currentUser, visorArtist,
  } = VisorFunction();

  function handleInfoButton() {
    $d('#info-background-container').style.display = 'flex';
  };

  return (
    <div className={s.visorContainer} id='visor'>
      <video className={s.visorVideoIntro} src={visorIntroVideo} autoPlay muted loop type="video/mp4" />
      <div className={s.backgroundCanvas}>
        <img className={s.background} id='visor-background' src={visorImage} alt='' />
      </div>
      <div className={s.visorCanvas} />
      <InfoCanvas title={visorTitle} artist={visorArtist} id={visorId} image={visorImage} />
      {
        contentList?.length &&
        <div className={s.visorInfo} id='visor-info'>
          <div className={s.visorArtist}>
            <p>{visorArtist}</p>
          </div>
          <div className={s.visorTitle}>
            <p>{visorTitle}</p>
            <div className={s.visorDescription}>
              <h3>{visorInfo}</h3>
            </div>
            <ul className={s.visorButton} id='visor-button'>
              <li>
                <Link to={`/view/v=${visorId}`}>
                  <PrimaryButton
                    onClick={() => { window.scrollTo(0, 0) }}
                    onMouseEnter={() => { $d('#visor-play-button').src = playIconb }}
                    onMouseLeave={() => { $d('#visor-play-button').src = playIconn }}
                    text={!currentUser ? 'Previsualizar' : 'Ir al contenido'}
                    icon={playIconn}
                    iconId='visor-play-button'
                  />
                </Link>
              </li>
              <li>
                <SecondaryButton
                  onClick={handleInfoButton}
                  text={"Más información"}
                />
              </li>
            </ul>
            <ul className={s.visorIcons}>
              {
                visorIcon?.map((e) => {
                  return (
                    <li key={e}><img className='visor-tag-icon' src={e} alt="" /></li>
                  )
                })
              }
            </ul>
          </div>
        </div>
      }
    </div>
  )
}
