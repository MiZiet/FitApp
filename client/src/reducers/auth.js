import {
  USER_LOADED,
  LOGIN_USER,
  REGISTER_USER,
  LOGOUT
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isLogged: null,
  user: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        user: payload,
        isLogged: true
      };
    case REGISTER_USER:
    case LOGIN_USER:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload
      };
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isLogged: null,
        user: null
      };
    default:
      return state;
  }
}
