import React, { createContext, useContext, useState, useEffect } from 'react';

export const PokedetailsContext = createContext();

export const usePokedetails = () => useContext(PokedetailsContext);

export const PokedetailsProvider = ({ children }) => {
  const [pokeDetails, setPokeDetails] = useState(null);
  const [pokeSpecies, setPokeSpecies] = useState(null);
  const [regionFilter, setRegionFilter] = useState(localStorage.getItem('pokemonRegionFilter') || '');
  const [typeFilter, setTypeFilter] = useState('');
  const [regionDex, setRegionDex] = useState(() => {
    const saved = localStorage.getItem('pokemonRegionDex');
    return saved ? JSON.parse(saved) : null;
  });

  // Sauvegarde automatique du regionFilter
  useEffect(() => {
    if (regionFilter) {
      localStorage.setItem('pokemonRegionFilter', regionFilter);
    } else {
      localStorage.removeItem('pokemonRegionFilter');
      localStorage.removeItem('pokemonRegionDex');
      setRegionDex(null);
    }
  }, [regionFilter]);

  // Sauvegarde automatique du regionDex
  useEffect(() => {
    if (regionDex) {
      localStorage.setItem('pokemonRegionDex', JSON.stringify(regionDex));
    } else {
      localStorage.removeItem('pokemonRegionDex');
    }
  }, [regionDex]);

  console.log('regionDex', regionDex);

  return (
    <PokedetailsContext.Provider
      value={{
        pokeDetails,
        setPokeDetails,
        pokeSpecies,
        setPokeSpecies,
        regionFilter,
        setRegionFilter,
        typeFilter,
        setTypeFilter,
        regionDex,
        setRegionDex,
      }}
    >
      {children}
    </PokedetailsContext.Provider>
  );
};
