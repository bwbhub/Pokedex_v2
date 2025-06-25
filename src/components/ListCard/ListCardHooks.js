import React, { useEffect, useState } from 'react';
import pokeApi from '../../api/modules/pokedex.api';
import { usePokedetails } from '../../context/Pokedetails';
import { useSelector } from 'react-redux';

const useListCard = ({ id, setOpenModal }) => {
  const [pokeInfo, setPokeInfo] = useState(null);
  const [species, setSpecies] = useState(null);
  const { setPokeDetails, setPokeSpecies } = usePokedetails();

  const activeLanguage = useSelector((state) => state.language.activeLanguage);

  const handleOpenModal = () => {
    setOpenModal(true);
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

  useEffect(() => {
    getPoke(id);
    getSpecies(id);
  }, [id]);

  return { pokeInfo, handleOpenModal, species };
};

export default useListCard;
