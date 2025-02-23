import axios from "axios";
import { URL_API } from "../../config";

export const donateMercadopago = (formData) => {
  return async function (dispatch) {
    await axios.post(`${URL_API}/donation/mercadopago`, formData);
    return;
  }
};

export const donateFlow = (formData) => {
  return async function (dispatch) {
    await axios.post(`${URL_API}/donation/flow`, formData);
    return;
  }
};

export const donatePaypal = (formData) => {
  return async function (dispatch) {
    await axios.post(`${URL_API}/donation/paypal`, formData);
    return;
  }
};