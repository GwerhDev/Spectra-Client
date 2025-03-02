import s from './Colaborate.module.css';
import { Link } from 'react-router-dom';
import { BodyCss } from '../../../functions';
import logo from '../../../assets/images/svg/spectra-logo.svg'

export const Colaborate = () => {
  BodyCss()
  return (
    <main className='main-container'>
      <div className='nav-fixed' />
      <div className='section-container'>
        <div className='header-container'>
          <h1>DONAR A ESTE PROYECTO</h1>
          <img src={logo} alt='laruina.cl' width='300px' className={s.logo} />
          <ul className={s.ulContBtn}>
            <li className={s.buttonDonate}>
              <Link to='/checkout/donation'>
                <button className={s.btnSubmit}>
                  Ir al Checkout
                </button>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </main>
  )
}
