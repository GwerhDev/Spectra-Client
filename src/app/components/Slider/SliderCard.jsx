import s from './SliderCard.module.css';
import playIconN from "../../../assets/images/ruinatv-icon-play-n.png";
import defaultBackground from '../../../assets/images/default-background.png'
import { FavIcon } from "../../utils/FavIcon";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const SliderCard = (props) => {
  const navigate = useNavigate();
  const favorites = useSelector(state => state.favorites);
  const currentUser = useSelector(state => state.currentUser);
  const { id, imageSlider, title } = props || null;

  function handleRedirect() {
    navigate(`/view/v=${id}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className={s.sliderItem}>
      <img alt='' className={s.media} onClick={handleRedirect}
        src={imageSlider || defaultBackground}
      />
      <div className={s.sliderInfoCanvas} onClick={handleRedirect}>
        <div className={s.ulTitlesItems}>
          <span className={s.title}>
            <img className={s.sliderItemIconPlayN} src={playIconN} alt="play" />
            <p style={{ color: 'black' }}>{title}</p>
          </span>
          {
            currentUser && favorites?.filter(e => e.id === id).length
              ? <FavIcon urlID={id} color={'red'} />
              : null
          }
        </div>
      </div>
    </div>
  );
};