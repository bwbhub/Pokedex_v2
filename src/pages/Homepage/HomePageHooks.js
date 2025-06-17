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
  const allPokemonRef = useRef([]); // Référence pour stocker tous les Pokémon

  const ITEMS_PER_PAGE = 30;

  // Fonction pour récupérer la liste complète une seule fois
  const fetchAllPokemon = useCallback(async () => {
    if (allPokemonRef.current.length > 0) return; // Si déjà chargé, ne pas recharger
    
    const { response, err } = await pokeApi.getAll();
    if (response && response.results) {
      allPokemonRef.current = response.results;
      console.log(`Total Pokémon disponibles: ${allPokemonRef.current.length}`);
    } else {
      console.error('Erreur lors du chargement des données:', err);
      allPokemonRef.current = [];
    }
  }, []);

  // Fonction pour charger une page spécifique
  const getList = useCallback(async (page) => {
    loadingRef.current = true;
    
    // S'assurer que nous avons les données complètes d'abord
    if (allPokemonRef.current.length === 0) {
      await fetchAllPokemon();
    }
    
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = page * ITEMS_PER_PAGE;
    
    // Vérifier s'il y a plus de données à charger
    if (startIndex >= allPokemonRef.current.length) {
      loadingRef.current = false;
      return;
    }
    
    const newItems = allPokemonRef.current.slice(startIndex, endIndex);
    
    // Mettre à jour la liste avec les nouveaux éléments
    setPokeList((prevList) => {
      // Créer un Map pour garantir l'unicité basée sur le nom du Pokémon
      const uniqueMap = new Map();
      
      // Ajouter d'abord les éléments précédents
      prevList.forEach(item => uniqueMap.set(item.name, item));
      
      // Ajouter ensuite les nouveaux éléments (ils remplaceront les anciens s'il y a des doublons)
      newItems.forEach(item => {
        // Vérifier si cet élément n'existe pas déjà
        if (!uniqueMap.has(item.name)) {
          uniqueMap.set(item.name, item);
        }
      });
      
      // Convertir le Map en tableau
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
      // Obtenir la hauteur de la page et la position de défilement de manière plus fiable
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY || window.pageYOffset;
      const documentHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      );
      
      // Déclencher le chargement lorsque l'utilisateur est à 300px du bas de la page
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
