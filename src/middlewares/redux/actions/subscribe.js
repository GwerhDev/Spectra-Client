import axios from "axios";
import { URL_API } from "../../config";

export const subscribePlanMercadopago = (formData) => {
  return async function (dispatch) {
    await axios.post(`${URL_API}/subscription/mercadopago`, formData);
    return;
  }
};

export const subscribePlanFlow = (formData) => {
  return async function (dispatch) {
    await axios.post(`${URL_API}/subscription/flow`, formData);
    return;
  }
};

export const subscribePlanPaypal = (formData) => {
  return async function (dispatch) {
    await axios.post(`${URL_API}/subscription/paypal`, formData);
    return;
  }
};