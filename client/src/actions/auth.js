import axios from "axios";
import { USER_LOADED, LOGIN_USER, REGISTER_USER, LOGOUT } from "./types";
import { setMsg } from "./msg";
import JWTsetToken from "../utils/JWTsetToken";

//GET USER DATA
export const getUserData = () => async dispatch => {
  if (localStorage.token) {
    JWTsetToken(localStorage.token);
  }
  try {
    const res = await axios.get("api/users");
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setMsg(error.msg, true)));
    }
  }
};

//REGISTER USER
export const register = (username, password) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify({ username, password });
  try {
    const res = await axios.post("api/users/register", body, config);
    dispatch({
      type: REGISTER_USER,
      payload: res.data
    });
    dispatch(getUserData());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setMsg(error.msg, true)));
    }
  }
};

export const login = (username, password) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify({ username, password });
  try {
    const res = await axios.post("api/users/login", body, config);
    dispatch({
      type: LOGIN_USER,
      payload: res.data
    });
    dispatch(getUserData());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setMsg(error.msg, true)));
    }
  }
};

export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
};
