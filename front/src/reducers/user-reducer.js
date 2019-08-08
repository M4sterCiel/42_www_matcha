import {
  GET_USER,
  USER_RECEIVED,
  UPDATE_USER,
  USER_UPDATED,
  ERROR
} from "../actions/user-actions";

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
    case UPDATE_USER:
      return {
        ...state,
        sendingRequest: true,
        requestReceived: false,
        status: "Pending...",
        statusClass: "pending"
      };
    case USER_UPDATED:
      return {
        ...state,
        sendingRequest: false,
        requestReceived: true,
        dataSent: payload,
        status: "User Updated",
        statusClass: "updated"
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
