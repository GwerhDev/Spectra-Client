import axios from "axios";
import { URL_API } from "../../config";
import { GET_USER_PLAN, GET_YT_SUBSCRIBERS } from "../../misc";

export const subscriberYoutubeVerification = (email) => {
  return async function (dispatch) {
    await axios.post(`${URL_API}/subscriber/youtube`, email)
      .then(res => {
        dispatch({
          type: GET_YT_SUBSCRIBERS,
          payload: res.data
        })
      })
      .catch(error => console.error(error));
  }
};

export const subscriberPlanVerification = (userId) => {
  return async function (dispatch) {
    await axios.post(`${URL_API}/subscriber/plan`, userId)
    .then(res => {
      dispatch({
        type: GET_USER_PLAN,
        payload: res.data
      })
    })      
    .catch(error => console.error(error));
  }
};
