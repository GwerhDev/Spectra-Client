import s from './ContentCreate.module.css';
import { Link } from 'react-router-dom';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toTop } from '../../../../functions/toTop';
import { PrimaryButton } from '../../Buttons/PrimaryButton';
import { SecondaryButton } from '../../Buttons/SecondaryButton';
import { createMedia } from '../../../../middlewares/redux/actions/admin';
import { Content } from '../../../../interfaces/Content';

const ContentCreate = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState(new Content());
  const [submitted, setSubmitted] = useState(false);
  const [redirectRoute, setRedirectRoute] = useState("");
  const [validatedForm, setValidatedForm] = useState(false);

  function handleInputChange(e) {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
    formValidation();
  };

  async function handleSubmit(e) {
    e.preventDefault();
    toTop();
    setSubmitted(true);
    const { id } = await dispatch(createMedia(data));
    setRedirectRoute('/view/v=' + id);
  };

  function continueUpdate() {

  };

  function resetForm() {
    setSubmitted(false);
    setData(new Content());
    setRedirectRoute(null);
  };

  function formValidation() {
    if (data.title && data.artist && data.info) {
      return setValidatedForm(true);
    } else {
      return setValidatedForm(false);
    }
  };

  return (
    <div className={s.mainContainer}>
      <div className='nav-fixed' />
      {
        submitted
          ?
          <div className={s.container}>
            <h1>
              {
                redirectRoute
                  ? "¡Contenido creado!"
                  : "Creando contenido..."
              }
            </h1>
            {
              redirectRoute
                ?
                <div className={s.buttonsContainer}>
                  <Link to={redirectRoute}>
                    <PrimaryButton onClick={continueUpdate} text={"Continuar"} />
                  </Link>
                  <SecondaryButton onClick={resetForm} text={"Crear nuevo contenido"} />
                </div>
                :
                <div className={s.loaderContainer}>
                  Espere un momento...
                  <div className='loader' />
                </div>
            }
          </div>
          :
          <div className={s.createBody}>
            <form className={s.createForm} onSubmit={handleSubmit}>
              <h1 className={s.createTitle}>Crear un Nuevo Contenido</h1>
              <section className={s.contTitleArtistDesc}>
                <span>
                  <label>Artista</label>
                  <input
                    type="text"
                    name="artist"
                    placeholder="Nombre del intérprete"
                    onInput={handleInputChange}
                  />
                </span>
                <span>
                  <label>Titulo</label>
                  <input
                    type="text"
                    name="title"
                    placeholder="Título de la publicación"
                    onInput={handleInputChange}
                  />
                </span>
                <span>
                  <label>Descripción</label>
                  <textarea
                    placeholder="Escribe una breve reseña..."
                    type="text"
                    name="info"
                    onInput={handleInputChange}
                  />
                </span>
              </section>
              <div className={s.submitButtonsContainer}>
                <Link to='/admin/dashboard' className={s.submit}>
                  Dashboard
                </Link>
                <button disabled={!validatedForm} type="submit" className={s.submit}>
                  Continuar
                </button>
              </div>
            </form>
          </div>
      }
    </div>
  );
};

export default ContentCreate;
