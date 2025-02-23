import { ERROR } from "../../misc";

export const resetError = () => {
  return async function (dispatch) {
    dispatch({
      type: ERROR,
      payload: ""
    })
  }
};