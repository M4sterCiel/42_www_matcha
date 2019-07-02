import { GET_USER } from "../actions/user-actions";

function userReducer(state = [], { type, payload }) {
  switch (type) {
    case GET_USER:
      return payload;
    default:
      return state;
  }
}

export default userReducer;
