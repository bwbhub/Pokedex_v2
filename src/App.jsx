import React, { createContext, useEffect, useMemo, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/Homepage/HomePage';
import './App.css';
import pokeApi from './api/modules/pokedex.api';
import { useDispatch, useSelector } from 'react-redux';
import { setLanguages, setActiveLanguage } from './redux/features/languageSlice';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { getDesignTokens } from './theme/theme';

// Créer un contexte pour le mode de couleur
export const ColorModeContext = createContext({ 
  toggleColorMode: () => {}, 
  mode: 'dark' 
});



function App() {
  const dispatch = useDispatch();
  const activeLanguage = useSelector(state => state.language.activeLanguage);
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
        
        // Si une langue active est déjà définie, on la conserve
        if (activeLanguage) {
          dispatch(setActiveLanguage(activeLanguage));
        }
      } else {
        console.error("Erreur lors de la récupération des langues:", err);
      }
    }
    fetchLanguages();
  }, [dispatch, activeLanguage]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* Passer la fonction toggleColorMode via le contexte */}
      <ColorModeContext.Provider value={{ toggleColorMode, mode }}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
          </Route>
        </Routes>
      </ColorModeContext.Provider>
    </ThemeProvider>
  );
}

export default App;
