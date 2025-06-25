import { useEffect, useState, useMemo } from 'react';
import { usePokedetails } from '../../context/Pokedetails';
import pokeApi from '../../api/modules/pokedex.api';

const useHeader = ({ openModal, setPokeModal }) => {
  const [modalFilterOpen, setModalFilterOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [searchList, setSearchList] = useState([]);
  const { setPokeDetails } = usePokedetails()

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
    setPokeDetails(pokémon);
    setPokeModal(true);
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


  const filteredSearchList = useMemo(() => {
    if (!query) return [];
    return searchList.filter((poke) => 
      poke?.name?.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, searchList]);

  return {
    modalFilterOpen,
    query,
    searchList: filteredSearchList,
    onQueryChange,
    openFilterModal,
    closeFilterModal,
    handleSetPokedetails,
  };
};

export default useHeader;