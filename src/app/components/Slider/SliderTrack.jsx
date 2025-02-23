import s from './SliderTrack.module.css';
import { SliderCard } from './SliderCard';
import playIconb from '../../../assets/images/ruinatv-icon-play-b.png';
import { useState } from 'react';
import { nextButton, prevButton } from '../../../functions/Slider';

export const SliderTrack = (props) => {
  const { data, id } = props || null;
  const maxWidth = data?.length * 210;
  const [currentPosition, setCurrentPosition] = useState(0);

  return (
    <div className={s.container}>
      <div className={s.desktop}>
        {
          data.length > 1 && currentPosition > 0 && /* maxWidth > window.innerWidth && */
          <button className={s.prevButton} onClick={() => prevButton(currentPosition, setCurrentPosition, maxWidth, id)}>
            <img className={s.prevButtonImg} alt='' src={playIconb} width="100%" />
          </button>
        }
        <ul className={s.itemList} id={`item-list-${id}`}>
          {
            data?.map((e) => {
              return (
                <li className={s.item} key={e.id}>
                  <SliderCard
                    id={e.id}
                    title={e.title}
                    imageSlider={e.imageSlider}
                  />
                </li>
              )
            })
          }
        </ul>
        {
          data.length > 1 && currentPosition < maxWidth - 210 && /* maxWidth > window.innerWidth && */
          <button className={s.nextButton} onClick={() => nextButton(currentPosition, setCurrentPosition, maxWidth, id)}>
            <img className={s.nextButtonImg} alt='' src={playIconb} width="100%" />
          </button>
        }
      </div>
      <div className={s.mobile}>
        <ul className={s.itemList}>
          {
            data?.map((e) => {
              return (
                <li className={s.item} key={e.id}>
                  <SliderCard
                    id={e.id}
                    imageSlider={e.imageSlider}
                  />
                </li>
              )
            })
          }
        </ul>
      </div>
    </div>
  )
}
