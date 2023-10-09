import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import toastReducer from "../components/Toast/toastReducer";
import rankReducer from "../features/leaderboard/reducer";

const createStore = () => {
  return configureStore({
    reducer: {
      toast: toastReducer,
      ranks: rankReducer,
    },
  });
};

export let store = createStore();

export const refreshStore = () => {
  store = createStore();
};

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type StoreType = typeof store;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
