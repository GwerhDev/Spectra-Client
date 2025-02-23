import s from "./LoginInner.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { loginInner } from "../../../middlewares/redux/actions/auth";
import { resetError } from "../../../middlewares/redux/actions/error";
import { errorMessages } from "../../utils/errors";

const LoginInner = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector(state => state.error);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  function handleEmail(e) {
    setEmail(e.target.value);
    setErrorMessage("");
    dispatch(resetError());
    return;
  };

  function handlePassword(e) {
    setPassword(e.target.value);
    setErrorMessage("");
    dispatch(resetError());
    return;
  };

  function handleSubmit(e) {
    e.preventDefault();

    if(!email.includes("@")) {
      return setErrorMessage(errorMessages.login.email);
    }

    return (
      dispatch(loginInner(email, password, navigate))
    )
  }

  useEffect(() => {
    if (email && password) setDisabled(false);
    else setDisabled(true);
  }, [email, password]);

  useEffect(() => {
    setErrorMessage(error);
  }, [error]);

  return (
    <div className={s.formCont}>
      <ul className={s.form_ul}>
        <form className={s.form}>
          <li className={s.form_li}>
            <label>Correo electrónico</label>
            <input
              type="text"
              name="email"
              required
              onInput={handleEmail}
              placeholder="email"
            />
          </li>
          <li className={s.form_li}>
            <label>Contraseña</label>
            <input
              type="password"
              name="password"
              required
              onInput={handlePassword}
              placeholder="contraseña"
            />
          </li>
          <li className={s.form_li}>
            <p>{errorMessage}</p>
            <button disabled={disabled} className={`${s.innerLoginButton} button-primary`} onClick={handleSubmit}>
              Entrar
            </button>
          </li>
        </form>
      </ul>
    </div>
  );
};

export default LoginInner;
