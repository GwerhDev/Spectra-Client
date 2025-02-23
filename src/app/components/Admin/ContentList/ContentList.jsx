import s from './ContentList.module.css';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { resetIdYT, resetOption } from "../../../../middlewares/redux/actions";
import { resetMedia } from '../../../../middlewares/redux/actions/content';
import { getMedia } from '../../../../middlewares/redux/actions/admin';
import { setEdition } from '../../../../middlewares/redux/actions/admin';
import { Link } from 'react-router-dom';

const ContentList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const contentList = useSelector(state => state.contentList);
  const currentUser = useSelector(state => state.currentUser);

  function handleEditButton(id) {
    dispatch(setEdition(true));
    navigate(`/view/v=${id}`);
  };

  useEffect(() => {
    dispatch(getMedia());
    dispatch(resetMedia());
    dispatch(resetOption());
    dispatch(resetIdYT());
  }, [dispatch]);

  return (
    <main className='main-container'>
      <div className='nav-fixed' />
      {
        currentUser?.role === 'admin' &&
        <div className='section-container'>
          <div className='header-container'>
            <span className='section-description-container'>
              <h1>Listado de contenido</h1>
              <h3>Admin</h3>
            </span>
          </div>
          <div className={s.adminButtonContainer}>
            <Link to='/admin/dashboard' className={s.adminButton}>Dashboard</Link>
          </div>
          <div className={s.divList}>
            <ul className={s.ulList0}>
              <li>Title</li>  -
              <li>Artist</li> -
              <li>Edit</li>
            </ul>
            {
              contentList?.map((e, index) => {
                return (
                  <ul className={s.list} key={index}>
                    <li>{e.title || "❗"}</li> -
                    <li>{e.artist || "❗"}</li> -
                    <li>
                      <button className={s.btnEdit} onClick={() => handleEditButton(e.id)} />
                    </li>
                  </ul>
                )
              })
            }
          </div>
        </div>
      }
    </main>
  )
}

export default ContentList;