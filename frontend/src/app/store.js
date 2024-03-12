import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import userReducer from '../features/user/userUpdationSlice'
import adminReducer from '../features/admin/adminSlice'
export const store = configureStore({
  reducer: {
    auth:authReducer,
    updation:userReducer,
    admin:adminReducer
  },
});
