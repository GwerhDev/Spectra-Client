import s from './CheckboxCard.module.css';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

export const CheckboxCard = (props) => {
  const dispatch = useDispatch();
  const { label, data, selector, actionFunction } = props;
  const [checked, setChecked] = useState(false);

  function handleCheck(e) {
    let newSelector;
    if (e.target.checked) {
      newSelector = [...selector, data];
      dispatch(actionFunction(newSelector));
    } else {
      newSelector = selector?.filter(e => e?.id !== data?.id);
      dispatch(actionFunction(newSelector));
    }
  };

  useEffect(() => {
    setChecked(selector? selector.find(e => e.id === data.id) : false);
  }, [selector, data]);

  return (
    <>
      <input
        className={s.checkbox}
        type="checkbox"
        name={data?.name}
        value={data?.name || ''}
        checked={checked || false}
        onChange={handleCheck}
      />
      <label className={s.label} htmlFor={label}>{label}</label>
    </>
  )
}
