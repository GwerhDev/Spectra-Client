import s from './MySubscription.module.css';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { RequestProfile } from '../RequestProfile/RequestProfile';
import { reset } from '../../../functions/Reset';
import { resetOption, setOption } from '../../../middlewares/redux/actions';
import checkedIcon from '../../../assets/images/checked-icon.png';
import { subscriberPlanVerification } from '../../../middlewares/redux/actions/subscriber';
import { OptionSelector } from '../../utils/OptionSelector';
import { setNavigationSubscription } from '../../../middlewares/redux/actions/navigation';

export const MySubscription = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useSelector(state => state.currentUser);
  const activePlan = useSelector(state => state.activePlan);
  const subscription = useSelector(state => state.navigation?.subscription);

  function handleClick() {
    dispatch(resetOption());
    navigate('/checkout/subscription');
    reset();
  };

  useEffect(() => {
    dispatch(setOption('subscription'));
    dispatch(setNavigationSubscription('content'));
    dispatch(subscriberPlanVerification(id));
  }, [dispatch, id]);

  return (
    <main className='main-container'>
      <div className='nav-fixed' />
      <div className='section-container'>
        <div className='header-container'>
          <span className='section-description-container'>
            <h1>Suscripción</h1>
            <h3>Elegí tu plan</h3>
          </span>
          <OptionSelector content security settings support onClick={setNavigationSubscription} />
        </div>
        {
          subscription.option === 'content' &&
          <ul className={s.ulCheck}>
            <li className={s.liCheck}>
              <div className={s.divCheckCont}>
                <h2>Plan Freemium</h2>
                <div className={s.divPrice}>
                  Gratuito
                </div>
                <ul className={s.ulDescription}>
                  <li>
                    <img src={checkedIcon} width="12px" alt="check" /> Acceso a todo nuestro contenido mediante plataformas comerciales
                  </li>
                  <li>
                    <img src={checkedIcon} width="12px" alt="check" /> Debes suscribirte a nuestro canal de Youtube
                  </li>
                </ul>
                <div className={s.btnSubmitFree}>Activo</div>
              </div>
            </li>
            <li className={s.liCheck}>
              <div className={s.divCheckCont}>
                <h2>Plan Suscriptor</h2>
                <div className={s.divPrice}>
                  $1.000 CLP mensual
                </div>
                <ul className={s.ulDescription}>
                  <li>
                    <img src={checkedIcon} width="12px" alt="check" /> Acceso a todo nuestro contenido sin anuncios
                  </li>
                  <li>
                    <img src={checkedIcon} width="12px" alt="check" /> Reproduce tus canciones en cualquier lugar, incluso sin conexión
                  </li>
                </ul>
                <button className={!activePlan ? s.btnSubmitEnabled : s.btnSubmitDisabled} disabled={activePlan} onClick={handleClick}>
                  {!activePlan ? 'Comenzar' : 'Activo'}
                </button>
              </div>
            </li>
          </ul>
        }
      </div>
      <RequestProfile />
    </main>
  )
}
