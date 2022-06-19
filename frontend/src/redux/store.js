import { configureStore } from '@reduxjs/toolkit';
import recipeReducer from './recipeBook';


export const store = configureStore({
  reducer: {
    recipeBook: recipeReducer
  },
});