import s from './MyFavorites.module.css';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RequestProfile } from '../RequestProfile/RequestProfile';
import { setOption } from '../../../middlewares/redux/actions';
import { getFavorites } from '../../../middlewares/redux/actions/account';
import { OptionSelector } from '../../utils/OptionSelector';
import { FilteredCard } from '../../utils/FilteredCard';
import { setNavigationFavorites } from '../../../middlewares/redux/actions/navigation';

export const MyFavorites = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.currentUser);
  const favoritesList = useSelector(state => state.favorites);
  const favorites = useSelector(state => state.navigation?.favorites);
  const userId = currentUser?.id;

  useEffect(() => {
    dispatch(getFavorites(userId));
    dispatch(setOption('favorites'));
    dispatch(setNavigationFavorites('content'))
  }, [dispatch, userId]);

  return (
    <main className='main-container'>
      <div className='nav-fixed' />
      <div className='section-container'>
        <div className='header-container'>
          <span className='section-description-container'>
            {
              favoritesList?.length
                ?
                <>
                  <h1>Tus favoritos</h1>
                  <h3>Encuentra tu contenido favorito aquí</h3>
                </>
                :
                <>
                  <h1>Nada por aquí...</h1>
                  <h3>¡Agrega contenido a tus favoritos!</h3>
                </>
            }
          </span>
          <OptionSelector content settings onClick={setNavigationFavorites} />
        </div>
        {
          favorites.option === 'content' &&
          <ul className={s.favoritesContainer}>
            {
              favoritesList?.map((e, index) => {
                return (
                  <li key={index}>
                    <FilteredCard
                      id={e.id}
                      title={e.title}
                      img={e.imageSlider}
                      categories={e.categories}
                      artist={e.artist}
                      idLinkYT={e.idLinkYT}
                      mediaType={e.mediaType}
                    />
                  </li>
                )
              })
            }
          </ul>
        }
      </div>
      <RequestProfile />
    </main>
  )
}
