import { combineReducers } from "redux";
import userReducer from "./user-reducer";
import tagReducer from "./tag-reducer";

const rootReducer = combineReducers({ user: userReducer, tag: tagReducer });

export default rootReducer;
