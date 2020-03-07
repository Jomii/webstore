//combines all reducers

import { combineReducers } from "redux";
import { authReducer } from "./auth.js";

export const allReducers = combineReducers({
  auth: authReducer
});
