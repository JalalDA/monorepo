import { combineReducers } from "@reduxjs/toolkit";
import { user } from "./action";

export const rootReducer = combineReducers({
    user : user.reducer
})
