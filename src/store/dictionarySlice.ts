import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Word } from '@/types';
import { fetchWordDefinition } from '@/services/dictionaryApi';

interface DictionaryState {
  currentWord: string;
  results: Word[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: DictionaryState = {
  currentWord: '',
  results: null,
  loading: false,
  error: null,
};

export const searchWord = createAsyncThunk(
  'dictionary/searchWord',
  async (word: string, { rejectWithValue }) => {
    try {
      const data = await fetchWordDefinition(word);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

const dictionarySlice = createSlice({
  name: 'dictionary',
  initialState,
  reducers: {
    setCurrentWord: (state, action: PayloadAction<string>) => {
      state.currentWord = action.payload;
    },
    clearResults: (state) => {
      state.results = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchWord.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchWord.fulfilled, (state, action: PayloadAction<Word[]>) => {
        state.loading = false;
        state.results = action.payload;
        state.currentWord = action.payload[0]?.word || state.currentWord;
      })
      .addCase(searchWord.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setCurrentWord, clearResults } = dictionarySlice.actions;
export default dictionarySlice.reducer;