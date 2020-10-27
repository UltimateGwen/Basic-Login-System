import {
  GET_USER,
  LOGIN,
  REGISTER
} from "./types";

export default (state, action) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
      };
    case LOGIN:
      return {
        ...state,
        token: action.payload,
      };
    case REGISTER:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };

    default:
      return state;
  }
};
