import { configureStore } from '@reduxjs/toolkit'
import formReducer from './statemanagement';
export const store = configureStore({
  reducer: {
    form:formReducer
  },
})