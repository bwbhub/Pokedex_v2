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

  // Navigation logic based on current Pokedex
  const navigationInfo = useMemo(() => {
    if (!regionDex || !regionDex.pokemon_entries) {
      // Default navigation for national dex (simple id +/- 1)
      return {
        prevId: Number(id) > 1 ? Number(id) - 1 : null,
        nextId: Number(id) < 1010 ? Number(id) + 1 : null, // Assuming max 1010 Pokemon
        prevShownId: Number(id) > 1 ? Number(id) - 1 : null,
        nextShownId: Number(id) < 1010 ? Number(id) + 1 : null,
        hasNavigation: true
      };
    }

    // Regional dex navigation
    const pokemonList = regionDex.pokemon_entries;
    const currentIndex = pokemonList.findIndex(
      entry => entry.pokemon_species.name === species?.name
    );

    if (currentIndex === -1) {
      return { prevId: null, nextId: null, prevShownId: null, nextShownId: null, hasNavigation: false };
    }

    const prevEntry = currentIndex > 0 ? pokemonList[currentIndex - 1] : null;
    const nextEntry = currentIndex < pokemonList.length - 1 ? pokemonList[currentIndex + 1] : null;

    // Extract Pokemon ID from URL (e.g., "https://pokeapi.co/api/v2/pokemon-species/1/" -> "1")
    const getPokemonIdFromUrl = (url) => {
      return url.split('/').filter(Boolean).pop();
    };

    return {
      prevId: prevEntry ? getPokemonIdFromUrl(prevEntry.pokemon_species.url) : null,
      nextId: nextEntry ? getPokemonIdFromUrl(nextEntry.pokemon_species.url) : null,
      prevShownId: prevEntry ? prevEntry.entry_number : null,
      nextShownId: nextEntry ? nextEntry.entry_number : null,
      hasNavigation: true
    };
  }, [regionDex, species, id]);

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
    navigationInfo,
  };
};

export default usePokemonPage;
