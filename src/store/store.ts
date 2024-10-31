import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import jobReducer from '../slices/jobSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    jobs: jobReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
