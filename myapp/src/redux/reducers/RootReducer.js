import { combineReducers } from "redux";
import { blogReducer } from "./BlogReducer";
import { userReducer } from "./UserReducer";
export const rootReducer = combineReducers({ blogReducer, userReducer });
