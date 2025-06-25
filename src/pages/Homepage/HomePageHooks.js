import { useEffect, useRef, useState, useCallback } from 'react';
import pokeApi from '../../api/modules/pokedex.api';
import { useDispatch } from 'react-redux';
import { setGlobalLoading } from '../../redux/features/globalLoadingSlice';


function throttle(fn, wait) {
  let lastCall = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastCall >= wait) {
      lastCall = now;
      fn(...args);
    }
  };
}

const useHomePage = () => {
  const [pokeList, setPokeList] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [initialLoading, setInitialLoading] = useState(true);
  const dispatch = useDispatch();
  const loadingRef = useRef(false);
  const allPokemonRef = useRef([]);

  const ITEMS_PER_PAGE = 30;

  const fetchAllPokemon = useCallback(async () => {
    if (allPokemonRef.current.length > 0) return;
    
    const { response, err } = await pokeApi.getAll();
    if (response && response.results) {
      allPokemonRef.current = response.results;
      console.log(`Total Pokémon disponibles: ${allPokemonRef.current.length}`);
    } else {
      console.error('Erreur lors du chargement des données:', err);
      allPokemonRef.current = [];
    }
  }, []);

  const getList = useCallback(async (page) => {
    loadingRef.current = true;
    
    if (allPokemonRef.current.length === 0) {
      await fetchAllPokemon();
    }
    
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = page * ITEMS_PER_PAGE;
    
    if (startIndex >= allPokemonRef.current.length) {
      loadingRef.current = false;
      return;
    }
    
    const newItems = allPokemonRef.current.slice(startIndex, endIndex);
    
      setPokeList((prevList) => {
      const uniqueMap = new Map();
      
      prevList.forEach(item => uniqueMap.set(item.name, item));
      
      newItems.forEach(item => {
        if (!uniqueMap.has(item.name)) {
          uniqueMap.set(item.name, item);
        }
      });
      
      return Array.from(uniqueMap.values());
    });
    
    loadingRef.current = false;
  }, [fetchAllPokemon]);

  useEffect(() => {
    const loadInitialList = async () => {
      if (initialLoading) {
        dispatch(setGlobalLoading(true));
        await getList(currentPage);
        dispatch(setGlobalLoading(false));
        setInitialLoading(false);
      }
    };
    loadInitialList();
  }, [currentPage, dispatch, initialLoading, getList]);

  useEffect(() => {
    const handleScroll = throttle(async () => {
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY || window.pageYOffset;
      const documentHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      );
      
      const scrollThreshold = 300;
      
      if (
        windowHeight + scrollY >= documentHeight - scrollThreshold &&
        !modalOpen &&
        !loadingRef.current 
      ) {
        const nextPage = currentPage + 1;
        await getList(nextPage);
        setCurrentPage(nextPage);
      }
    }, 200);

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [currentPage, modalOpen, getList]);

  return {
    pokeList,
    modalOpen,
    setModalOpen,
  };
}

export default useHomePage
