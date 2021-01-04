import { combineReducers } from "redux";
import { userReducer } from "./user";
import {alertReducer} from './alert'
import {profileReducer} from './profile'
import {postReducer} from "./post"
import {adminReducer} from "./admin"
import {caseReducer} from "./case"



export const rootReducer = combineReducers({ userReducer, alertReducer,profileReducer,postReducer,adminReducer,caseReducer });
