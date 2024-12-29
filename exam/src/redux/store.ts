import { configureStore, createSelector } from "@reduxjs/toolkit";
import { useDispatch, useSelector, useStore } from "react-redux";
import translatesReduser from "./translatesSlice";

export const store = configureStore({
  reducer: {
    translates: translatesReduser,
  },
  devTools: import.meta.env.NODE_ENV !== "production"
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispath = useDispatch.withTypes<AppDispatch>();
export const useAppStore = useStore.withTypes<typeof store>();
export const createAppSelector = createSelector.withTypes<AppState>();
