import { configureStore } from '@reduxjs/toolkit';
import sessionReducer from './sessionSlice';
import desktopReducer from './desktopSlice';

export const store = configureStore({
  reducer: {
    session: sessionReducer,
    desktop: desktopReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
