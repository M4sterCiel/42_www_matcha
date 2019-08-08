import axios from "axios";
import ApiCall from "../services/ApiCall";
export const GET_USER = "GET_USER";
export const USER_RECEIVED = "USER_RECEIVED";
export const UPDATE_USER = "UPDATE_USER";
export const USER_UPDATED = "USER_UPDATED";
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

export const updateUserData = (id, username, data) => {
  return dispatch => {
    dispatch({ type: "UPDATE_USER" });
    ApiCall.user
      .updateUserData(id, data)
      .then(response => {
        dispatch({ type: "USER_UPDATED", payload: data });
        axios
          .get(`${apiUrl}/profile/${username}`)
          .then(response => {
            dispatch({ type: "USER_RECEIVED", payload: response.data });
          })
          .catch(error => {
            dispatch({ type: "ERROR", payload: error });
          });
      })
      .catch(error => {
        dispatch({ type: "ERROR", payload: error });
      });
    dispatch({ type: "AFTER_ASYNC" });
  };
};
