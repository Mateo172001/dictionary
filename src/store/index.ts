import { configureStore } from '@reduxjs/toolkit';
import dictionaryReducer from './dictionarySlice';
import uiReducer from './uiSlice';
import historyReducer from './historySlice';

export const store = configureStore({
  reducer: {
    dictionary: dictionaryReducer,
    ui: uiReducer,
    history: historyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;