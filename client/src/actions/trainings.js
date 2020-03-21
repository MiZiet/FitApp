import axios from "axios";
import { setMsg } from "./msg";
import {
  GET_TRAININGS,
  CREATE_TRAINING,
  GET_ACTIVE,
  DELETE_TRAINING,
  ADD_EXERCISE,
  ADD_SET,
  SAVE_TRAINING,
  DELETE_EXERCISE
} from "./types";

export const getTrainings = () => async dispatch => {
  try {
    const res = await axios.get("api/trainings/user");
    dispatch({
      type: GET_TRAININGS,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setMsg(error.msg, true)));
    }
  }
};

export const createTraining = NTinput => async dispatch => {
  try {
    const body = { name: NTinput };
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    await axios.post("api/trainings", body, config);
    dispatch({
      type: CREATE_TRAINING
    });
    dispatch(getTrainings());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setMsg(error.msg, true)));
    }
  }
};

export const getActiveTraining = id => async dispatch => {
  try {
    const res = await axios.get(`api/trainings/${id}`);
    dispatch({
      type: GET_ACTIVE,
      payload: res.data
    });
  } catch (err) {}
};

export const deleteTraining = id => async dispatch => {
  try {
    await axios.delete(`/api/trainings/${id}`);
    dispatch({
      type: DELETE_TRAINING
    });
    dispatch(setMsg("Training Deleted", false));
    dispatch(getTrainings());
  } catch (err) {}
};

export const addExercise = name => dispatch => {
  name
    ? dispatch({
        type: ADD_EXERCISE,
        payload: { name }
      })
    : dispatch(setMsg("Name is required", true));
};
export const addSet = (index, { NSreps, NSweight }) => dispatch => {
  dispatch({
    type: ADD_SET,
    payload: { index, NSreps, NSweight }
  });
};

export const saveTraining = trainingData => async dispatch => {
  try {
    const body = trainingData;
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    await axios.post(`/api/trainings/update/${trainingData._id}`, body, config);
    dispatch({
      type: SAVE_TRAINING
    });
    dispatch(setMsg("Training Saved", false));
    dispatch(getActiveTraining());
  } catch (err) {}
};

export const deleteExercise = index => dispatch => {
  dispatch({
    type: DELETE_EXERCISE,
    payload: { index }
  });
  dispatch(setMsg("Exercise Deleted", false));
};
