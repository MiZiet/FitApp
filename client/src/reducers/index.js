import { combineReducers } from "redux";

import auth from "./auth";
import trainings from "./trainings";
import msg from "./msg";

export default combineReducers({
  auth,
  trainings,
  msg
});
