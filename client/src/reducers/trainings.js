import {
  GET_TRAININGS,
  CREATE_TRAINING,
  GET_ACTIVE,
  DELETE_TRAINING,
  ADD_EXERCISE,
  ADD_SET,
  SAVE_TRAINING,
  DELETE_EXERCISE,
  LOGOUT
} from "../actions/types";

const initialState = {
  trainingsList: [],
  activeTraining: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_TRAININGS:
      return {
        ...state,
        trainingsList: payload
      };
    case CREATE_TRAINING:
      return {
        ...state
      };
    case GET_ACTIVE:
      return {
        ...state,
        activeTraining: payload
      };
    case DELETE_TRAINING:
      return {
        ...state
      };
    case ADD_EXERCISE:
      const newExerciseData = {
        exerciseName: payload.name,
        series: []
      };
      return {
        ...state,
        activeTraining: {
          ...state.activeTraining,
          exercise: [...state.activeTraining.exercise, newExerciseData]
        }
      };
    case ADD_SET:
      const newSetData = {
        reps: payload.NSreps,
        weight: payload.NSweight
      };
      let sad = state.activeTraining.exercise.slice();
      sad[payload.index].series.push(newSetData);
      return {
        ...state,
        activeTraining: {
          ...state.activeTraining
        }
      };
    case SAVE_TRAINING:
      return {
        ...state
      };
    case DELETE_EXERCISE:
      let happy = state.activeTraining.exercise.slice();
      console.log(happy);
      happy.splice(payload.index, 1);
      console.log(happy);
      return {
        ...state,
        activeTraining: {
          ...state.activeTraining,
          exercise: happy
        }
      };
    case LOGOUT:
      return {
        ...state,
        trainingsList: [],
        activeTraining: {}
      };
    default:
      return state;
  }
}
