import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SearchHistoryItem } from '@/types';

interface HistoryState {
  searchHistory: SearchHistoryItem[];
}

const initialState: HistoryState = {
  searchHistory: [],
};

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    addToHistory: (state, action: PayloadAction<string>) => {
      const newItem: SearchHistoryItem = {
        word: action.payload,
        timestamp: new Date().toISOString(),
      };
      
      // Se comprueba si el elemento ya existe en el historial
      const existingIndex = state.searchHistory.findIndex(
        (item) => item.word.toLowerCase() === action.payload.toLowerCase()
      );
      
      // Si exisste, se elimina el elemento (para mantener el orden de búsqueda)
      if (existingIndex !== -1) {
        state.searchHistory.splice(existingIndex, 1);
      }
      
      // Se añade el nuevo elemento al principio del historial
      state.searchHistory.unshift(newItem);
      
      // Se comprueba si el historial ha llegado al límite de 10 elementos
      if (state.searchHistory.length > 10) {
        state.searchHistory.pop();
      }
    },
    clearHistory: (state) => {
      state.searchHistory = [];
    },
  },
});

export const { addToHistory, clearHistory } = historySlice.actions;
export default historySlice.reducer;