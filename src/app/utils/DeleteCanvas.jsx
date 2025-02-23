import { useNavigate } from "react-router-dom";
import {$gId } from "../../functions";
import s from "./DeleteCanvas.module.css";
import { useDispatch } from "react-redux";

export const DeleteCanvas = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id, deleteFunction, title } = props || {};

  function handleDelete() {
    dispatch(deleteFunction(id));
    $gId(`canvas-delete`).style.display='none';
    if (navigate.location.pathname !== '/browser') {
      navigate('/browser');
    }
  };

  function handleCancelDelete() {
    $gId(`canvas-delete`).style.display='none';
  };

  return (
    <div className={s.container} id={`canvas-delete`}>
      <div className={s.canvasContainer}>
        ¿Eliminar `&quot;`{title}`&quot;`?
        <button className={s.secundaryButton} onClick={handleDelete}>Sí</button>
        <button className={s.primaryButton} onClick={handleCancelDelete}>No</button>
      </div>
    </div>
  )
}