import axios from "axios";
import { URL_SPECTRA_API } from "../../config";
import { GET_SEARCH } from "../../misc";

export const getSearch = (search) => {
  return async function (dispatch) {
    await axios.post(`${URL_SPECTRA_API}/search`, { search })
      .then(res => {
        dispatch({
          type: GET_SEARCH,
          payload: res.data
        })
      })
  }
};