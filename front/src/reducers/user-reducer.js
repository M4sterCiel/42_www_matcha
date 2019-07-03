import { GET_USER, USER_RECEIVED, ERROR } from "../actions/user-actions";

const initalState = {
  sendingRequest: false,
  requestReceived: false,
  status: "",
  statusClass: ""
};

function userReducer(state = initalState, { type, payload }) {
  switch (type) {
    case GET_USER:
      return {
        ...state,
        sendingRequest: true,
        status: "Pending...",
        statusClass: "pending"
      };
    case USER_RECEIVED:
      return payload;
    case ERROR:
      return {
        ...state,
        sendingRequest: false,
        status: `${payload.message}`,
        statusClass: "error"
      };
    default:
      return state;
  }
}

export default userReducer;
