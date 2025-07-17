import React, { useEffect, useState } from 'react';
import { usePokedetails } from '../../../../context/Pokedetails';
import pokeApi from '../../../../api/modules/pokedex.api';
import { useSelector } from 'react-redux';

const useGenerationFilter = ({ closeFilterModal }) => {
  const { regionFilter, setRegionFilter, setRegionDex } = usePokedetails();
  const [regionList, setRegionList] = useState(null);
  const [regionInfo, setRegionInfo] = useState(null);
  const [pokedexesList, setPokedexesList] = useState([]);
  const [openList, setOpenList] = useState(false);
  const { activeLanguage } = useSelector((state) => state.language);

  const handleRegionFilter = (gen) => {
    setRegionFilter(gen);
    setOpenList(true);
  };

  const handlePokedexFilter = (pokedex) => {
    setRegionDex(pokedex);
    closeFilterModal();
  };

  const handleClear = () => {
    setRegionDex(null);
    setRegionFilter('');
    setOpenList(false);
  };

  const getRegionInfo = async () => {
    const { response, err } = await pokeApi.getRegiondId({
      regionId: regionFilter,
    });
    if (response) {
      setRegionInfo(response);
    } else {
      console.error('Erreur lors du chargement des données:', err);
    }
  };

  const getRegionList = async () => {
    const { response, err } = await pokeApi.getRegion();

    if (response && response.results) {
      setRegionList(response.results);
    } else {
      console.error('Erreur lors de la récupération des générations', err);
    }
  };

  const getPokedexId = async ({ pokedexId }) => {
    const { response, err } = await pokeApi.getPokedexId({ pokedexId });

    if (response) {
      setPokedexesList((prev) => [...prev, response]);
    } else {
      console.error('Erreur lors de la récupération du pokedex', err);
    }
  };

  useEffect(() => {
    getRegionList();
  }, []);

  useEffect(() => {
    if (regionFilter !== '') {
      getRegionInfo();
      setOpenList(true);
    }
  }, [regionFilter]);

  useEffect(() => {
    if (pokedexesList?.length > 0) setPokedexesList([]);
    regionInfo?.pokedexes?.forEach((pokedex) =>
      getPokedexId({ pokedexId: pokedex.name }),
    );
  }, [regionInfo]);

  return {
    regionList,
    handleRegionFilter,
    regionFilter,
    openList,
    pokedexesList,
    setRegionDex,
    activeLanguage,
    handlePokedexFilter,
    handleClear,
  };
};

export default useGenerationFilter;
