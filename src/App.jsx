import React, { createContext, useEffect, useMemo, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

import './App.css';
import Layout from './components/Layout';
import HomePage from './pages/Homepage/HomePage';
import pokeApi from './api/modules/pokedex.api';
import { getDesignTokens } from './theme/theme';
import {
  setLanguages,
  setActiveLanguage,
} from './redux/features/languageSlice';
import PokemonPage from './pages/PokemonPage/PokemonPage';
import { ModalProvider } from './contexts/ModalContext';

// Créer un contexte pour le mode de couleur
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
  mode: 'dark',
});

function App() {
  const dispatch = useDispatch();
  const activeLanguage = useSelector((state) => state.language.activeLanguage);
  // État local pour le mode de thème (dark/light)
  const [mode, setMode] = useState(() => {
    // Récupérer le mode depuis localStorage ou utiliser 'dark' par défaut
    const savedMode = localStorage.getItem('theme-mode');
    return savedMode || 'dark';
  });

  // Créer le thème en fonction du mode actuel
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  // Fonction pour basculer entre les modes dark et light
  const toggleColorMode = () => {
    const newMode = mode === 'dark' ? 'light' : 'dark';
    setMode(newMode);
    localStorage.setItem('theme-mode', newMode);
  };

  useEffect(() => {
    const fetchLanguages = async () => {
      // Récupérer toutes les langues disponibles
      const { response, err } = await pokeApi.getLanguages();
      if (response && response.results) {
        // Stocker les langues disponibles dans Redux
        dispatch(setLanguages(response.results));

        // Récupérer la langue sauvegardée dans localStorage
        const savedLanguage = localStorage.getItem('user-language');

        // Si une langue est sauvegardée dans localStorage, l'utiliser
        if (savedLanguage) {
          dispatch(setActiveLanguage(savedLanguage));
        }
        // Sinon, si une langue active est déjà définie, on la conserve
        else if (activeLanguage) {
          dispatch(setActiveLanguage(activeLanguage));
        }
      } else {
        console.error('Erreur lors de la récupération des langues:', err);
      }
    };
    fetchLanguages();
  }, [dispatch, activeLanguage]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* Passer la fonction toggleColorMode via le contexte */}
      <ColorModeContext.Provider value={{ toggleColorMode, mode }}>
        <ModalProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
            </Route>
            <Route path="/:id" element={<Layout />}>
              <Route index element={<PokemonPage />} />
            </Route>
          </Routes>
        </ModalProvider>
      </ColorModeContext.Provider>
    </ThemeProvider>
  );
}

export default App;
