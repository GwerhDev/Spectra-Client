import s from './Colaborate.module.css';
import { Link } from 'react-router-dom';
import { BodyCss } from '../../../functions';
import laruinaLogo from '../../../assets/images/ruina-records-logo.png'

export const Colaborate = () => {
  BodyCss()
  return (
    <main className='main-container'>
      <div className='nav-fixed' />
      <div className='section-container'>
        <div className='header-container'>
          <h1>DONAR A ESTE PROYECTO</h1>
          <img src={laruinaLogo} alt='laruina.cl' width='300px' className={s.laruinaLogo} />
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
