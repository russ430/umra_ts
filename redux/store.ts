import { configureStore } from '@reduxjs/toolkit';

import userReducer from './slices/userSlice';
import scheduleReducer from './slices/scheduleSlice';
import updatesReducer from './slices/updatesSlice';

export const store = configureStore({
  reducer: {
    schedule: scheduleReducer,
    updates: updatesReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
