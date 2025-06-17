import { useEffect, useState } from 'react';
import { usePokedetails } from '../../context/Pokedetails';
import pokeApi from '../../api/modules/pokedex.api';

const useHeader = ({ openModal }) => {
  const [modalFilterOpen, setModalFilterOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [searchList, setSearchList] = useState([]);
  const { setPokedetails } = usePokedetails()

  const onQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const openFilterModal = () => {
    setModalFilterOpen(true);
  };

  const closeFilterModal = () => {
    setModalFilterOpen(false);
  };

  const handleSetPokedetails = (pokémon) => {
    setPokedetails(pokémon);
    openModal(true);
  };

  useEffect(() => {
    const getList = async () => {
      const { response, err } = await pokeApi.getAll();

      if (response) {
        setSearchList(response.results);
      } else {
        console.error(err);
      }
    };
    getList();
  }, []);


  return {
    modalFilterOpen,
    query,
    searchList,
    onQueryChange,
    openFilterModal,
    closeFilterModal,
    handleSetPokedetails,
  };
};

export default useHeader;