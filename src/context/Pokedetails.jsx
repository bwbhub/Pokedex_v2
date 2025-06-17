import React, { createContext, useContext, useState } from 'react';

export const PokedetailsContext = createContext();

export const usePokedetails = () => useContext(PokedetailsContext);

export const PokedetailsProvider = ({ children }) => {
  const [pokeDetails, setPokeDetails] = useState(null);

  return (
    <PokedetailsContext.Provider value={{ pokeDetails, setPokeDetails }}>
      {children}
    </PokedetailsContext.Provider>
  );
};

