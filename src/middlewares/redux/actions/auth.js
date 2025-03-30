import axios from "axios";
import { URL_SPECTRA_API } from "../../config";
import { AUTHENTICATING, CURRENT_USER, ERROR, IS_LOGGED } from "../../misc";
import { reset } from "../../../functions/Reset";

export function isLogged(e) {
  return {
    type: IS_LOGGED,
    payload: e,
  }
};

export function auth(navigate, backRoute) {
  return async function (dispatch) {
    dispatch(isLogged(AUTHENTICATING));
    await axios.get(`${URL_SPECTRA_API}/auth`, { withCredentials: true })
      .then(res => {
        dispatch(isLogged(true));
        dispatch({
          type: CURRENT_USER,
          payload: res.data
        });
        res.data.logged && navigate(backRoute || '/');
        return;
      })
      .catch((e) => {
        dispatch(isLogged(false));
        console.error(e);
        return;
      })
  }
};

export function loginInner(email, password, navigate) {
  return async function (dispatch) {
    await axios.post(`${URL_SPECTRA_API}/login-inner`, { email, password })
      .then(res => {
        localStorage.setItem('userToken', res.data.token);
        res.data.logged && navigate(`/auth?token=${res.data.token}`);
        reset();
      })
      .catch((e) => {
        dispatch({
          type: ERROR,
          payload: e.response.data.message
        });
        console.error(e.code);
        return;
      }
      )
  }
};

export function loginGoogle() {
  return async function () {
    await axios.get(`${URL_SPECTRA_API}/login-google`)
      .catch((e) => { console.error(e) });
  }
};

export function signupInner(email, password, navigate) {
  return async function () {
    await axios.post(`${URL_SPECTRA_API}/signup-inner`, { email, password })
      .then(res => {
        return res.data.logged && navigate(`/auth?token=${res.data.token}`);
      })
      .catch((e) => {
        console.error(e);
        return;
      }
      )
  }
};

export function signupGoogle(navigate) {
  return async function () {
    await axios.get(`${URL_SPECTRA_API}/signup-google`)
      .then(res => {
        return res.data.logged && navigate(`/auth?token=${res.data.token}`);
      })
      .catch((e) => {
        console.error(e);
        return;
      }
      )
  }
};

