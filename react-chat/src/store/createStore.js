import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReduser from "./auth";

const rootReducer = combineReducers({
  // chats: chatsReduser,
  auth: authReduser,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
