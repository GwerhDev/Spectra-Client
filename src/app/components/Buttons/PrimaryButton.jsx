import s from './PrimaryButton.module.css';

export const PrimaryButton = (props) => {
  const { text, icon, iconId, onClick, onMouseEnter, onMouseLeave } = props;

  return (
    <button className={s.primaryButton} onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {
        icon &&
        <img id={iconId || ""} className={s.icon} src={icon} alt="" />
      }
      {text}
    </button>
  )
}
