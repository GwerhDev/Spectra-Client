import axios from "axios";
import { URL_SPECTRA_API } from "../../config";

export const donateMercadopago = (formData) => {
  return async function (dispatch) {
    await axios.post(`${URL_SPECTRA_API}/donation/mercadopago`, formData);
    return;
  }
};

export const donateFlow = (formData) => {
  return async function (dispatch) {
    await axios.post(`${URL_SPECTRA_API}/donation/flow`, formData);
    return;
  }
};

export const donatePaypal = (formData) => {
  return async function (dispatch) {
    await axios.post(`${URL_SPECTRA_API}/donation/paypal`, formData);
    return;
  }
};