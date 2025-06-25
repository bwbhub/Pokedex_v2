import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/Homepage/HomePage';
import './App.css';
import pokeApi from './api/modules/pokedex.api';
import { useDispatch, useSelector } from 'react-redux';
import { setLanguages, setActiveLanguage } from './redux/features/languageSlice';

function App() {

  const dispatch = useDispatch();

  const activeLanguage = useSelector(state => state.language.activeLanguage);

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
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
      </Route>
    </Routes>
  );
}

export default App;
