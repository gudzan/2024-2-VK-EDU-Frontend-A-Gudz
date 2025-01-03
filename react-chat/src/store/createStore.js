import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReduser from "./auth/auth";
import chatsReduser from "./chats/chats";

const rootReducer = combineReducers({
  chats: chatsReduser,
  auth: authReduser
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: import.meta.env.NODE_ENV !== "production"
});

export default store;
