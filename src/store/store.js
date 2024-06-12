import { configureStore } from '@reduxjs/toolkit'
import todoSlice from '../reducers/todoClice/todoClise'

export const store = configureStore({
  reducer: {
    todo : todoSlice
  },
})