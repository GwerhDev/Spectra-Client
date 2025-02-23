import axios from "axios";
import { URL_API } from "../../config";
import { ADD_FAVORITES, AUTHENTICATING, GET_FAVORITES, GET_USER_DATA } from "../../misc";
import { options } from "../../helpers";
import { isLogged } from "./auth";

export function getUserData() {
  return async function (dispatch) {
    dispatch(isLogged(AUTHENTICATING));
    try {
      const response = await axios.get(`${URL_API}/account/my-data`, options());
      dispatch(isLogged(true));
      dispatch({
        type: GET_USER_DATA,
        payload: response.data
      });
    } catch (e) {
      dispatch(isLogged(false));
      console.error(e);
    }
  }
};

export function getFavorites() {
  return async function (dispatch) {
    await axios.get(`${URL_API}/account/my-favorites/`, options())
      .then(res => {
        dispatch({
          type: GET_FAVORITES,
          payload: res.data
        });
      })
      .catch(e => console.error(e));
  }
};

export function addFavorites(contentId) {
  return async function (dispatch) {
    await axios.get(`${URL_API}/account/add-favorite/${contentId}`, options())
      .then(res => {
        dispatch({
          type: ADD_FAVORITES,
          payload: res.data
        });
      })
      .catch(e => console.error(e));
  }
};

export function deleteFavorites(contentId) {
  return async function (dispatch) {
    await axios.delete(`${URL_API}/account/delete-favorite/${contentId}`, options())
      .then(res => {
        dispatch({
          type: GET_FAVORITES,
          payload: res.data.favorites
        });
      })
      .catch(e => console.error(e));
  }
};