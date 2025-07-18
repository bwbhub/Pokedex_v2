import { useEffect, useState, useCallback } from 'react';
import { usePokedetails } from '../../context/Pokedetails';
import { useSelector } from 'react-redux';
import pokeApi from '../../api/modules/pokedex.api';
import {
  searchPokemonByName,
  addPokemonToCache,
  getPokemonNameByLang,
} from '../../utils/pokemonNameCache';

const useHeader = ({ setPokeModal }) => {
  const [modalFilterOpen, setModalFilterOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [allPokemon, setAllPokemon] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  const { setPokeDetails } = usePokedetails();
  const { activeLanguage } = useSelector((state) => state.language);

  const onQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const openFilterModal = () => {
    setModalFilterOpen(true);
  };

  const closeFilterModal = () => {
    setModalFilterOpen(false);
  };

  const handleSetPokedetails = (pokemon) => {
    setPokeDetails(pokemon);
    setPokeModal(true);
  };

  const loadPokemonNames = useCallback(async (pokemonList) => {
    setIsLoading(true);

    const batchSize = 20;
    const supportedLanguages = ['en', 'fr', 'es', 'de', 'ja'];

    try {
      for (let i = 0; i < pokemonList.length; i += batchSize) {
        const batch = pokemonList.slice(i, i + batchSize);

        await Promise.all(
          batch.map(async (pokemon) => {
            try {
              const id = pokemon.url.split('/').filter(Boolean).pop();

              if (id > 9999) return;

              const { response } = await pokeApi.getSpecies({ pokeId: id });

              if (response?.names) {
                const names = response.names.reduce((acc, nameObj) => {
                  const langCode = nameObj.language.name;
                  if (supportedLanguages.includes(langCode)) {
                    acc[langCode] = nameObj.name;
                  }
                  return acc;
                }, {});

                addPokemonToCache(id, names);
                pokemon.id = id;
              }
            } catch (error) {
              console.error(`Erreur pour ${pokemon.name}:`, error);
            }
          }),
        );

        if (i + batchSize < pokemonList.length) {
          await new Promise((resolve) => setTimeout(resolve, 50));
        }
      }
    } catch (error) {
      console.error('Erreur lors du chargement des noms:', error);
    } finally {
      setIsLoading(false);
      setInitialLoadComplete(true);
    }
  }, []);

  useEffect(() => {
    const getList = async () => {
      const { response, err } = await pokeApi.getAll();

      if (response && response.results) {
        setAllPokemon(response.results);
        loadPokemonNames(response.results);
      } else {
        console.error('Erreur lors de la récupération des Pokémon:', err);
      }
    };
    getList();
  }, [loadPokemonNames]);

  useEffect(() => {
    if (!query) {
      setSearchResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    const searchTimeout = setTimeout(() => {
      const normalizedQuery = query.toLowerCase();

      if (!initialLoadComplete) {
        const filtered = allPokemon.filter((pokemon) =>
          pokemon.name.toLowerCase().includes(normalizedQuery),
        );
        setSearchResults(filtered);
        setIsLoading(false);
        return;
      }

      const matchingIds = searchPokemonByName(normalizedQuery);

      const pokemonMap = new Map();
      allPokemon.forEach((pokemon) => {
        if (pokemon.id) {
          pokemonMap.set(pokemon.id, pokemon);
        }
      });

      const results = matchingIds
        .map((id) => {
          const pokemon = pokemonMap.get(id);
          if (pokemon) {
            const translatedName =
              getPokemonNameByLang(id, activeLanguage) || pokemon.name;
            return {
              ...pokemon,
              displayName: translatedName,
            };
          }
          return null;
        })
        .filter(Boolean);

      setSearchResults(results);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(searchTimeout);
  }, [query, allPokemon, initialLoadComplete, activeLanguage]);

  return {
    modalFilterOpen,
    query,
    searchList: searchResults,
    onQueryChange,
    openFilterModal,
    closeFilterModal,
    handleSetPokedetails,
    isLoading,
  };
};

export default useHeader;
