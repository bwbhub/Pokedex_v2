import { createSlice } from '@reduxjs/toolkit';

export const languageSlice = createSlice({
  name: 'Language',
  initialState: {
    activeLanguage: 'en', // Langue par défaut
    availableLanguages: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    setLanguages: (state, action) => {
      state.availableLanguages = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setActiveLanguage: (state, action) => {
      state.activeLanguage = action.payload;
    },
    setLanguageLoading: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    setLanguageError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  setLanguages,
  setActiveLanguage,
  setLanguageLoading,
  setLanguageError,
} = languageSlice.actions;

export const languageSelector = (state) => state.language.activeLanguage;

export default languageSlice.reducer;
