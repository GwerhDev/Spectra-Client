import axios from "axios";
import { URL_NHEXA_API, URL_SPECTRA_API } from "../../config";
import { ADD_FAVORITES, AUTHENTICATING, GET_FAVORITES, GET_USER_DATA } from "../../misc";
import { isLogged } from "./auth";

export function getUserData() {
  return async function (dispatch) {
    dispatch(isLogged(AUTHENTICATING));
    try {
      const response = await axios.get(`${URL_NHEXA_API}/account`, { withCredentials: true });
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
    await axios.get(`${URL_SPECTRA_API}/account/my-favorites/`, { withCredentials: true })
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
    await axios.get(`${URL_SPECTRA_API}/account/add-favorite/${contentId}`, { withCredentials: true })
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
    await axios.delete(`${URL_SPECTRA_API}/account/delete-favorite/${contentId}`, { withCredentials: true })
      .then(res => {
        dispatch({
          type: GET_FAVORITES,
          payload: res.data.favorites
        });
      })
      .catch(e => console.error(e));
  }
};

export async function logout(navigate) {
  try {
    await fetch(URL_NHEXA_API + "/logout", {
      method: "GET",
      credentials: "include"
    });
    navigate && navigate('/browser');

    window.location.reload();

  } catch (error) {
    console.log(error);
    return;
  }
}