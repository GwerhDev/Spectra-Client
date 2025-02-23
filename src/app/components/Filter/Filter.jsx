import s from './Filter.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { FilteredCard } from '../../utils/FilteredCard';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getSearch } from '../../../middlewares/redux/actions/search';
import { OptionSelector } from '../../utils/OptionSelector';

export const Filter = () => {
  const { artistResult, titleResult, infoResult } = useSelector(state => state.searchedMedia);
  const dispatch = useDispatch();
  const { search } = useParams();
  useEffect(() => {
    dispatch(getSearch(search))
  }, [dispatch, search]);

  return (
    <main className='main-container'>
      <div className='nav-fixed' />
      <div className='section-container'>
        <div className='header-container'>
          <span className='section-description-container'>
            <h1>Resultados de búsqueda</h1>
            <h3>Estos son los resultados de tu búsqueda: "{search}"</h3>
          </span>
          <OptionSelector search settings />
        </div>
        <ul className={s.ulSearchedItem}>
          Coincidencias por título
          {
            titleResult?.count
              ? titleResult?.rows.map((e, index) => {
                return (
                  <li key={index}>
                    <FilteredCard
                      id={e.id}
                      title={e.title}
                      img={e.imageSlider}
                      categories={e.categories}
                      artist={e.artist}
                      idLinkYT={e.idLinkYT}
                      mediaType={e.mediaType} />
                  </li>
                )
              }
              )
              : 
              <div className={s.notFound} >
                <h2>No se han encontrado títulos que coincidan con tu búsqueda: "{search}"</h2>
              </div>
          }
        </ul>
        <ul className={s.ulSearchedItem}>
          Coincidencias por artista
          {
            artistResult?.count
              ? artistResult?.rows.map((e, index) => {
                return (
                  <li key={index}>
                    <FilteredCard
                      id={e.id}
                      title={e.title}
                      img={e.imageSlider}
                      categories={e.categories}
                      artist={e.artist}
                      idLinkYT={e.idLinkYT}
                      mediaType={e.mediaType} />
                  </li>
                )
              }
              )
              : 
              <div className={s.notFound} >
                <h2>No se han encontrado artistas que coincidan con tu búsqueda: "{search}"</h2>
              </div>
          }
        </ul>
        <ul className={s.ulSearchedItem}>
          Coincidencias por información
          {
            infoResult?.count
              ? infoResult?.rows.map((e, index) => {
                return (
                  <li key={index}>
                    <FilteredCard
                      id={e.id}
                      title={e.title}
                      img={e.imageSlider}
                      categories={e.categories}
                      artist={e.artist}
                      idLinkYT={e.idLinkYT}
                      mediaType={e.mediaType} />
                  </li>
                )
              }
              )
              : 
              <div className={s.notFound} >
                <h2>No se ha encontrado información que coincida con tu búsqueda: "{search}"</h2>
              </div>
          }
        </ul>

      </div>
    </main>
  )
}
