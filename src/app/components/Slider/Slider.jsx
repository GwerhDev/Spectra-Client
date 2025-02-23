import s from "./Slider.module.css";
import { SliderTrack } from "./SliderTrack";

export const Slider = (props) => {
  const { title, data, id } = props;

  return (
    <section>
      {
        data?.length
          ?
          <div className={s.container}>
            <h3>{title}</h3>
            <SliderTrack title={title} id={id} data={data} />
          </div>
          :
          <div className={s.container}>
            <div className={s.emptySliderContItems}>
              <span className={s.emptyTitle}></span>
              <div className={s.emptySliderList}>
                <span className={s.emptySlider}></span>
                <span className={s.emptySlider}></span>
              </div>
            </div>
          </div>
      }
    </section>
  );
}
