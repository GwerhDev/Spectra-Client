import { donateFlow, donateMercadopago } from "../middlewares/redux/actions/donate";
import { subscribePlanFlow, subscribePlanMercadopago } from "../middlewares/redux/actions/subscribe";
import { PAYMENT_FLOW, PAYMENT_MERCADOPAGO } from "./consts";

export const handleCheckout = async (way, dispatch, type, formData) => {
  if(way === PAYMENT_MERCADOPAGO) {
    switch (type) {
      case "donation":
        return dispatch(donateMercadopago(formData));
      case "subscription":
        return dispatch(subscribePlanMercadopago(formData));
      default:
        return;
    }
  } else if(way === PAYMENT_FLOW) {
    switch (type) {
      case "donation":
        return dispatch(donateFlow(formData));
      case "subscription":
        return dispatch(subscribePlanFlow(formData));
      default:
        return;
    }
  }
}