import React, { useEffect, useMemo, useState } from 'react';
import { usePokedetails } from '../../context/Pokedetails';
import pokeApi from '../../api/modules/pokedex.api';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useTheme } from '@mui/material';

const usePokemonPage = () => {
  const { regionDex } = usePokedetails();
  const [pokeInfo, setPokeInfo] = useState(null);
  const [species, setSpecies] = useState(null);
  const [animationDistance, setAnimationDistance] = useState(0);
  const [shinyImg, setShinyImg] = useState(false);

  const params = useParams();
  const theme = useTheme();

  const id = params?.id;

  const activeLanguage = useSelector((state) => state.language.activeLanguage);

  const mainType = pokeInfo?.types[0].type.name;
  const color = theme.palette.pokemon.background[mainType];

  const filteredName = useMemo(() => {
    const name = species?.names?.find(
      (name) => name.language.name === activeLanguage,
    );
    return name?.name;
  }, [species, activeLanguage]);

  const shownId = useMemo(() => {
    return regionDex
      ? species?.pokedex_numbers.find(
          (number) => number?.pokedex?.name === regionDex?.name,
        )?.entry_number
      : id;
  }, [regionDex, species]);

  const getPoke = async () => {
    const { response, err } = await pokeApi.getPoke({
      pokeId: id,
    });

    if (response) {
      setPokeInfo(response);
    } else {
      console.error(err);
    }
  };

  const getSpecies = async () => {
    const { response, err } = await pokeApi.getSpecies({
      pokeId: id,
    });

    if (response) {
      setSpecies(response);
    } else {
      console.error(err);
    }
  };

  useEffect(() => {
    getPoke();
    getSpecies();
  }, [id]);

  console.log('pokeInfo', pokeInfo);
  console.log('species', species);

  return {
    species,
    pokeInfo,
    filteredName,
    shownId,
    animationDistance,
    setAnimationDistance,
    shinyImg,
    setShinyImg,
    mainType,
    color,
    theme,
    activeLanguage,
    id,
  };
};

export default usePokemonPage;
