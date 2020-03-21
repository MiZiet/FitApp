import { ADD_MSG, DELETE_MSG } from "../actions/types";

const initialState = [];

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_MSG:
      return [...state, payload];
    case DELETE_MSG:
      return state.filter(msg => msg.id !== payload);
    default:
      return state;
  }
}
