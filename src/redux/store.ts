import { configureStore } from '@reduxjs/toolkit';
import countryReducer from './slice';
 
export const store = configureStore({
  reducer: {
    countries: countryReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;