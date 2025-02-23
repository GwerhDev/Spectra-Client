import axios from "axios";
import { URL_API } from "../../config";
import { GET_CATEGORIES, GET_FULL_DETAIL, GET_GENRES, GET_INFO, GET_MEDIA, GET_MEDIATYPES, GET_PRODUCERS, RESET_DETAILS_MEDIA, RESET_MEDIA } from "../../misc";

export async function getImage(id) {
  try {
    const response = await axios.get(`${URL_API}/image/${id}`);
    return response.data.image;
  } catch (error) {
    console.error(error)
  }
};

export function getMedia() {
  return async function (dispatch) {
    try {
      const response = await axios.get(`${URL_API}/content`);
      dispatch({
        type: GET_MEDIA,
        payload: response.data
      })
    } catch (error) {
      console.error(error)
    }
  }
};

export function getMediaById(id) {
  return async function (dispatch) {
    try {
      const response = await axios.get(`${URL_API}/content/${id}`);
      dispatch({
        type: GET_INFO,
        payload: response.data
      })
    } catch (error) {
      console.error(error)
    }
  }
};

export function resetMedia() {
  return {
    type: RESET_MEDIA
  }
};

export function resetDetailsMedia() {
  return {
    type: RESET_DETAILS_MEDIA
  }
};

export function getCategories() {
  return async function (dispatch) {
    try {
      const response = await axios.get(`${URL_API}/category/`);
      dispatch({
        type: GET_CATEGORIES,
        payload: response.data
      })
    } catch (error) {
      console.error(error)
    }
  }
};

export function getGenres() {
  return async function (dispatch) {
    try {
      const response = await axios.get(`${URL_API}/genre/`);
      dispatch({
        type: GET_GENRES,
        payload: response.data?.genres
      })
    } catch (error) {
      console.error(error)
    }
  }
};

export function getMediatypes() {
  return async function (dispatch) {
    try {
      const response = await axios.get(`${URL_API}/mediatype/`);
      dispatch({
        type: GET_MEDIATYPES,
        payload: response.data?.mediatypes
      })
    } catch (error) {
      console.error(error)
    }
  }
};

export function getProducers() {
  return async function (dispatch) {
    try {
      const response = await axios.get(`${URL_API}/producer/`);
      dispatch({
        type: GET_PRODUCERS,
        payload: response.data?.producers
      })
    } catch (error) {
      console.error(error)
    }
  }
};

export function getFullDetail(id) {
  return async function (dispatch) {
    try {
      const response = await axios.get(`${URL_API}/content/full-detail/${id}`);
      dispatch({
        type: GET_FULL_DETAIL,
        payload: response.data
      })
    } catch (error) {
      console.error(error)
    }
  }
};