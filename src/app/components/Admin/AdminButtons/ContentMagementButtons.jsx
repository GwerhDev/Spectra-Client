import s from './ContentMagementButtons.module.css';

import editIcon from '../../../../assets/images/edit-icon.png';
import deleteIcon from '../../../../assets/images/delete-icon.png';
import { $gId } from '../../../../functions';
import { useDispatch } from 'react-redux';
import { setEdition } from '../../../../middlewares/redux/actions/admin';

export const ContentMagementButtons = () => {
  const dispatch = useDispatch();

  function handleEdit() {
    dispatch(setEdition(true))
    $gId('edition-canvas').style.width = '300px';
  };

  function handleDelete() {
    dispatch(setEdition(false))
    $gId(`canvas-delete`).style.display='flex';
  };

  return (
    <ul className={s.container}>
      <li className={s.adminBtn} onClick={handleEdit}>
        <img src={editIcon} className={s.editImg} alt='edit' width='12px' />
        <p>Editar</p>
      </li>
      <li className={s.adminBtn} onClick={handleDelete}>
        <img src={deleteIcon} className={s.editImg} alt='edit' width='12px' />
        <p>Eliminar</p>
      </li>
    </ul>
  )
}