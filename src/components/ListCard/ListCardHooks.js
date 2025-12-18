import React, { useEffect, useMemo, useState } from 'react';
import pokeApi from '../../api/modules/pokedex.api';
import { usePokedetails } from '../../context/Pokedetails';
import { useSelector } from 'react-redux';

const useListCard = ({ id, openModal }) => {
  const [pokeInfo, setPokeInfo] = useState(null);
  const [species, setSpecies] = useState(null);
  const { setPokeDetails, setPokeSpecies, regionDex } = usePokedetails();

  const activeLanguage = useSelector((state) => state.language.activeLanguage);

  const handleOpenModal = () => {
    // Passer les données Pokémon au contexte modal global
    openModal({ pokeInfo, species });
    // Aussi mettre à jour le contexte Pokedetails pour la compatibilité
    setPokeDetails(pokeInfo);
    setPokeSpecies(species);
  };

  const getPoke = async () => {
    const { response, err } = await pokeApi.getPoke({ pokeId: id });

    if (response) {
      setPokeInfo(response);
    } else {
      console.error(err);
    }
  };

  const getSpecies = async () => {
    const { response, err } = await pokeApi.getSpecies({ pokeId: id });

    if (response) {
      setSpecies(response);
    } else {
      console.error(err);
    }
  };

  const filteredName = useMemo(() => {
    const name = species?.names?.find(
      (name) => name.language.name === activeLanguage,
    );
    return name?.name;
  }, [species, activeLanguage]);

  const shownId = regionDex
    ? species?.pokedex_numbers.find(
        (number) => number?.pokedex?.name === regionDex?.name,
      )?.entry_number
    : id;

  useEffect(() => {
    getPoke(id);
    if (id < 9999) {
      getSpecies(id);
    }
  }, [id]);

  return { pokeInfo, handleOpenModal, species, filteredName, shownId };
};

export default useListCard;
