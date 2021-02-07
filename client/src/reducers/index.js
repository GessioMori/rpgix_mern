import { combineReducers } from "redux";

import authReducer from "./auth";
import {
  groupCreatorReducer,
  groupEnterReducer,
  currentGroupReducer,
} from "./groups";

export const reducers = combineReducers({
  authReducer,
  groupCreatorReducer,
  groupEnterReducer,
  currentGroupReducer,
});
