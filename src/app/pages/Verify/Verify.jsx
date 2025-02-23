import s from './Verify.module.css';
import React from 'react';
import { useLocation } from 'react-router-dom';
import LoginInner from '../../components/Login/LoginInner';
import { $d } from '../../../functions';
import { PrimaryButton } from '../../components/Buttons/PrimaryButton';

function Verify() {
  const location = useLocation()
  const message = location.search.split('=')[1]

  if (message === "verified") {
    return (
      <div className={s.verify_container}>
        <h1 style={{ color: 'var(--nhexa-white)' }}>Tu correo fue verificado!</h1>
        <h3 style={{ color: 'var(--nhexa-white)', filter: 'drop-shadow(0px 0px 2px green)' }}>Ya puedes iniciar sesión</h3>
        <PrimaryButton
          onClick={() => {
            $d('.LogInBody').style.transitionDuration = "1s"
            $d('.LogInBody').style.transform = "translate(0)"
          }}
          text="Iniciar sesión"
        />
        <LoginInner />
      </div>
    )
  } else {
    return (
      <div className={s.verify_container}>
        <h1 style={{ color: 'var(--nhexa-white)' }}>No pudimos verificar tu correo"</h1>
        <h2 style={{ color: 'var(--nhexa-white)', filter: 'drop-shadow(0px 0px 2px red)' }}>Vuelve a intentarlo</h2>
      </div>
    )
  }

}

export default Verify
