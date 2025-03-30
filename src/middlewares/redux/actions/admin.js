import axios from "axios";
import { URL_SPECTRA_API } from "../../config";
import { getCategories, getGenres, getMediatypes, getProducers } from "./content";
import {
  CREATE_CONTENT,
  GET_INFO, GET_MEDIA, GET_USERS, SET_CONTENT_CATEGORIES,
  SET_CONTENT_GENRES, SET_CONTENT_MEDIATYPES, SET_CONTENT_PRODUCERS,
  SET_EDITION,
  UPDATE_CONTENT
} from "../../misc";

export const setEdition = (boolean) => {
  return {
    type: SET_EDITION,
    payload: boolean
  }
};

export const getMedia = () => {
  return async function (dispatch) {
    const response = await axios.get(`${URL_SPECTRA_API}/admin/content/`, { withCredentials: true });
    dispatch({
      type: GET_MEDIA,
      payload: response.data
    });
    return response.data;
  }
};

export const createMedia = (formData) => {
  return async function (dispatch) {
    const response = await axios.post(`${URL_SPECTRA_API}/admin/content/create`, formData, { withCredentials: true });
    dispatch({
      type: CREATE_CONTENT,
      payload: response.data
    });

    dispatch(getMedia());
    return response.data;
  }
};

export const updateMedia = (id, formData, visorFile, sliderFile) => {
  return async function (dispatch) {
    try {
      formData.imageVisor = {
        mimetype: visorFile.type,
        originalname: visorFile.name
      };

      formData.imageSlider = {
        mimetype: sliderFile.type,
        originalname: sliderFile.name
      };

      const response = await axios.patch(`${URL_SPECTRA_API}/admin/content/update/${id}`, formData, { withCredentials: true });
      dispatch({
        type: UPDATE_CONTENT,
        payload: response.data
      });

      await axios.put(response.data.presigned.visor, visorFile, {
        headers: {
          "Content-Type": visorFile.type,
        },
      });

      await axios.put(response.data.presigned.slider, sliderFile, {
        headers: {
          "Content-Type": sliderFile.type,
        },
      });

      dispatch(getMedia());
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
};

export const deleteMedia = (id) => {
  return async function (dispatch) {
    const response = await axios.delete(`${URL_SPECTRA_API}/admin/content/delete/${id}`, { withCredentials: true });
    dispatch(getMedia());
    return response;
  }
};

export function createMediatype(name) {
  return async function (dispatch) {
    const mediatype = { name }
    try {
      const response = await axios.post(`${URL_SPECTRA_API}/admin/mediatype/create`, mediatype, { withCredentials: true });
      dispatch(getMediatypes());
      return response;
    } catch (error) {
      console.error(error);
    }
  }
};

export function deleteMediatype(id) {
  return async function (dispatch) {
    try {
      const response = await axios.delete(`${URL_SPECTRA_API}/admin/mediatype/delete/${id}`, { withCredentials: true });
      dispatch(getMediatypes());
      return response;
    } catch (error) {
      console.error(error);
    }
  }
};

export function createGenre(name) {
  return async function (dispatch) {
    const genre = { name }
    try {
      const response = await axios.post(`${URL_SPECTRA_API}/admin/genre/create`, genre, { withCredentials: true });
      dispatch(getGenres());
      return response;
    } catch (error) {
      console.error(error);
    }
  }
};

export function deleteGenre(id) {
  return async function (dispatch) {
    try {
      const response = await axios.delete(`${URL_SPECTRA_API}/admin/genre/delete/${id}`, { withCredentials: true });
      dispatch(getGenres());
      return response;
    } catch (error) {
      console.error(error);
    }
  }
};

export function createCategory(name) {
  return async function (dispatch) {
    const category = { name }
    try {
      const response = await axios.post(`${URL_SPECTRA_API}/admin/category/create`, category, { withCredentials: true });
      dispatch(getCategories());
      return response;
    } catch (error) {
      console.error(error);
    }
  }
};

export function deleteCategory(id) {
  return async function (dispatch) {
    try {
      const response = await axios.delete(`${URL_SPECTRA_API}/admin/category/delete/${id}`, { withCredentials: true });
      dispatch(getCategories());
      return response;
    } catch (error) {
      console.error(error);
    }
  }
};

export function createProducer(name) {
  return async function (dispatch) {
    const producer = { name }
    try {
      const response = await axios.post(`${URL_SPECTRA_API}/admin/producer/create`, producer, { withCredentials: true });
      dispatch(getProducers());
      return response;
    } catch (error) {
      console.error(error);
    }
  }
};

export function deleteProducer(id) {
  return async function (dispatch) {
    try {
      const response = await axios.delete(`${URL_SPECTRA_API}/admin/producer/delete/${id}`, { withCredentials: true });
      dispatch(getProducers());
      return response;
    } catch (error) {
      console.error(error);
    }
  }
};

export function getUsers() {
  return async function (dispatch) {
    try {
      await axios.get(`${URL_SPECTRA_API}/user/`, { withCredentials: true })
        .then(res => {
          dispatch({
            type: GET_USERS,
            payload: res.data
          })
        })
    } catch (e) {
      console.error(e);
    }
  }
};

export function createUser(formData) {
  return async function (dispatch) {
    try {
      await axios.post(`${URL_SPECTRA_API}/admin/user/create/`, formData, { withCredentials: true })
        .then(res => {
          dispatch(getUsers())
          return res.data;
        })
    } catch (e) {
      console.error(e);
    }
  }
};

export function updateUser(id) {
  return async function (dispatch) {
    try {
      await axios.patch(`${URL_SPECTRA_API}/admin/user/update/${id}`, { withCredentials: true })
        .then(res => {
          dispatch(getUsers())
          return res.data;
        })
    } catch (e) {
      console.error(e);
    }
  }
};

export function deleteUser(id) {
  return async function (dispatch) {
    try {
      await axios.delete(`${URL_SPECTRA_API}/admin/user/delete/${id}`, { withCredentials: true })
        .then(res => {
          dispatch(getUsers())
          return res.data;
        })
    } catch (e) {
      console.error(e);
    }
  }
};

export function setInfoDetailViewer(formData) {
  return {
    type: GET_INFO,
    payload: formData
  }
};

export function setContentCategories(object) {
  return {
    type: SET_CONTENT_CATEGORIES,
    payload: object
  }
};

export function setContentGenres(object) {
  return {
    type: SET_CONTENT_GENRES,
    payload: object
  }
};

export function setContentMediatypes(object) {
  return {
    type: SET_CONTENT_MEDIATYPES,
    payload: object
  }
};

export function setContentProducers(object) {
  return {
    type: SET_CONTENT_PRODUCERS,
    payload: object
  }
};