import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from './Action/tokenSlice';
import authReducer from './Action/authSlice'
import keyReducer from './Action/uniqueKeySlice'


export const store = configureStore({
    reducer: {
        token: tokenReducer,
        auth: authReducer,
        key: keyReducer
    },
  })

