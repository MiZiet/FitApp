import { v4 as uuidv4 } from "uuid";
import { ADD_MSG, DELETE_MSG } from "./types";

export const setMsg = (content, warning) => dispatch => {
  const id = uuidv4();
  dispatch({
    type: ADD_MSG,
    payload: { content, warning, id }
  });

  setTimeout(() => dispatch({ type: DELETE_MSG, payload: id }), 5000);
};
