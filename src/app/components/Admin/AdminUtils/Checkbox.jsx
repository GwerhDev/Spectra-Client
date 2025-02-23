import s from './Checkbox.module.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { CheckboxCard } from './CheckboxCard';
import closeIcon from '../../../../assets/images/svg/close-icon.svg'

export const Checkbox = (props) => {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const {
    selector,
    data,
    label,
    newAttribute,
    createFunction,
    deleteFunction,
    actionFunction,
    setNewAttribute,
  } = props;

  function handleNewAttribute(e) {
    e.preventDefault();
    dispatch(createFunction(newAttribute));
    setNewAttribute("");
  };

  return (
    <div>
      <span className={s.checkboxTitle}>
        <label>{label}</label>
        <button type='button' onClick={() => setEdit(!edit)}>{edit ? "Cancelar" : "Editar"}</button>
      </span>

      <ul>
        {
          data?.map((t, index) => (
            <li className={s.checkboxItem} key={`${t.name}-${index}`}>
              <CheckboxCard
                data={t}
                selector={selector}
                actionFunction={actionFunction}
                label={t.name}
              />
              {
                edit &&
                <div className={s.deleteButtonContainer}>
                  <button type='button' onClick={() => dispatch(deleteFunction(t.id))} disabled={!t.name?.length}>
                    <img src={closeIcon} width="10" alt="Botón eliminar" />
                  </button>
                </div>
              }
            </li>
          ))
        }
        {
          edit &&
          <div className={s.addCardContainer}>
            <input value={newAttribute || ''} className={s.inputCreate} onInput={(e) => setNewAttribute(e.target.value)} type="text" />
            <button type='button' onClick={handleNewAttribute} className={s.buttonCreate} disabled={!newAttribute?.length}>
              +
            </button>
          </div>
        }
      </ul>
    </div>
  )
}
