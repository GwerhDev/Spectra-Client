import { useDispatch } from 'react-redux';
import s from './Login.module.css';
import LoginGoogle from '../../components/Login/LoginGoogle';
import LoginInner from '../../components/Login/LoginInner';
import { URL_NHEXA_REGISTER } from '../../../middlewares/config';
import LoginNhexa from '../../components/Login/LoginNhexa';
import { useEffect } from 'react';
import { setOption } from '../../../middlewares/redux/actions';

const Enter = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setOption('login'));
  }, [dispatch]
  );

  return (
    <div className={s.container}>
      <div className='nav-fixed'/>
      <div className={s.welcomeCont} id='welcomeCont'>
        <h1>ENTRÁ BOBO, VENÍ PARA ACÁ</h1>
        <LoginInner/>
        <div className={s.separatorContainer}>
          <div className='separator'/>
          <span className='family-poppins separator-or'>O</span>
          <div className='separator'/>
        </div>
        <h4 className='family-poppins'>puedes ingresar con:</h4>
        <LoginGoogle/>
        <br/>
        <LoginNhexa/>
        <br/>
        <p className='family-poppins'>¿No tienes una cuenta? <a className={s.linkHub} href={URL_NHEXA_REGISTER}>Regístrate</a></p>
      </div>
    </div>
  )
}

export default Enter;
