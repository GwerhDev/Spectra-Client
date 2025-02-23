import s from './Checkout.module.css';
import { BodyCss } from '../../../functions';
import { handleCheckout } from '../../../handlers/checkout';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { PAYMENT_FLOW, PAYMENT_MERCADOPAGO } from '../../../handlers/consts';

const Checkout = () => {
  const dispatch = useDispatch();
  const { type } = useParams();
  const typeCheck = type === "donation" ? "donate" : "browser";
  const currentUser = useSelector(state => state.currentUser);

  BodyCss();
  return (
    <main className='main-container'>
      <div className='nav-fixed' />
      <div className='section-container'>
        <div className='header-container'>
          <h1>Plataforma de pago</h1>
          <p>Seleccione una opción:</p>
          <ul className={s.ulContBtn}>
            <li className={s.buttonDonate}>
              <button className={s.btnSubmit} onClick={() => handleCheckout(PAYMENT_FLOW, dispatch, type, currentUser)}>
                Flow.cl
              </button>
            </li>
            <li className={s.buttonDonate}>
              <button className={s.btnSubmit} onClick={() => handleCheckout(PAYMENT_MERCADOPAGO, dispatch, type, currentUser)}>
                MercadoPago
              </button>
            </li>
          </ul>
          <li className={s.salirBtn}>
            <Link to={`/${typeCheck}`}>
              <button className={s.backSubmit}>
                Volver
              </button>
            </Link>
          </li>
        </div>
      </div>
    </main>
  )
}

export default Checkout;