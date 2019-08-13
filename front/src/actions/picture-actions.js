import axios from "axios";
import ApiCall from "../services/ApiCall";
import ErrorToast from "../services/ErrorToastService";
import InfoToast from "../services/InfoToastService";
export const USER_RECEIVED = "USER_RECEIVED";
export const UPDATE_PICTURE = "UPDATE_PICTURE";
export const PICTURE_UPDATED = "PICTURE_UPDATED";
export const ERROR = "ERROR";

const apiUrl = "/users";

export const deleteUserPicture = (user_id, username, pic_index) => {
  return dispatch => {
    dispatch({ type: "UPDATE_PICTURE" });
    ApiCall.user
      .deleteUserPicture(user_id, pic_index)
      .then(response => {
        dispatch({
          type: "PICTURE_UPDATED",
          payload: { user_id, pic_index }
        });
        axios
          .get(`${apiUrl}/profile/${username}`)
          .then(response => {
            InfoToast.custom.info("Updated", 1400);
            dispatch({ type: "USER_RECEIVED", payload: response.data });
          })
          .catch(error => {
            dispatch({
              type: "ERROR",
              payload: error
            });
          });
      })
      .catch(error => {
        console.log(error.response);
        ErrorToast.custom.error(error.response["data"]["error"], 1400);
        dispatch({ type: "ERROR", payload: error });
      });
  };
};

export const updateUserPicture = (user_id, username, data) => {
  return dispatch => {
    console.log(user_id);
    console.log(username);
    console.log(data);
    dispatch({ type: "UPDATE_PICTURE" });
    ApiCall.user
      .updateUserPicture(user_id, data)
      .then(response => {
        dispatch({
          type: "PICTURE_UPDATED",
          payload: { user_id, username, data }
        });
        axios
          .get(`${apiUrl}/profile/${username}`)
          .then(response => {
            InfoToast.custom.info("Updated", 1400);
            dispatch({ type: "USER_RECEIVED", payload: response.data });
          })
          .catch(error => {
            dispatch({
              type: "ERROR",
              payload: error
            });
          });
      })
      .catch(error => {
        console.log(error.response);
        ErrorToast.custom.error(error.response["data"]["error"], 1400);
        dispatch({ type: "ERROR", payload: error });
      });
  };
};
