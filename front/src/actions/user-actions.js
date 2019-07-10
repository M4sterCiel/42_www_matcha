import axios from "axios";
export const GET_USER = "GET_USER";
export const USER_RECEIVED = "USER_RECEIVED";
export const ERROR = "ERROR";

const apiUrl = "/users";

export const getUserData = username => {
  return dispatch => {
    dispatch({ type: "GET_USER" });
    axios
      .get(`${apiUrl}/profile/${username}`)
      .then(response => {
        dispatch({ type: "USER_RECEIVED", payload: response.data });
      })
      .catch(error => {
        dispatch({ type: "ERROR", payload: error });
      });
    dispatch({ type: "AFTER_ASYNC" });
  };
};
