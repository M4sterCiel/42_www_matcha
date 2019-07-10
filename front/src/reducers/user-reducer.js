import { GET_USER, USER_RECEIVED, ERROR } from "../actions/user-actions";

const initalState = {
  sendingRequest: false,
  requestReceived: false,
  data: [],
  status: "",
  statusClass: ""
};

function userReducer(state = initalState, { type, payload }) {
  switch (type) {
    case GET_USER:
      return {
        ...state,
        sendingRequest: true,
        requestReceived: false,
        data: [],
        status: "Pending...",
        statusClass: "pending"
      };
    case USER_RECEIVED:
      return {
        ...state,
        sendingRequest: false,
        requestReceived: true,
        data: payload.data,
        status: "User Received",
        statusClass: "received"
      };
    case ERROR:
      return {
        ...state,
        sendingRequest: false,
        requestReceived: false,
        data: [],
        status: `${payload.message}`,
        statusClass: "error"
      };
    default:
      return state;
  }
}

export default userReducer;
