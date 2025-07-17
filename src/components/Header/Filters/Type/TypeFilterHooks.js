import React from 'react';
import { usePokedetails } from '../../../../context/Pokedetails';

const useTypeFilter = () => {
  const { typeFilter, setTypeFilter } = usePokedetails();

  return {};
};

export default useTypeFilter;
