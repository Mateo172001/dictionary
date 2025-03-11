import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FontType, ThemeType } from '@/types';

interface UIState {
  font: FontType;
  theme: ThemeType;
}

// Comprueba si el usuario prefiere el modo oscuro
const prefersDarkMode = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

const initialState: UIState = {
  font: 'sans-serif',
  theme: prefersDarkMode ? 'dark' : 'light',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setFont: (state, action: PayloadAction<FontType>) => {
      state.font = action.payload;
    },
    setTheme: (state, action: PayloadAction<ThemeType>) => {
      state.theme = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
  },
});

export const { setFont, setTheme, toggleTheme } = uiSlice.actions;
export default uiSlice.reducer;