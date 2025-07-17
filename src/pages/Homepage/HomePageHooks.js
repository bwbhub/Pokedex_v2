import { useEffect, useRef, useState, useCallback } from 'react';
import pokeApi from '../../api/modules/pokedex.api';
import { useDispatch } from 'react-redux';
import { setGlobalLoading } from '../../redux/features/globalLoadingSlice';
import { usePokedetails } from '../../context/Pokedetails';

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

  const { regionDex } = usePokedetails();

  const ITEMS_PER_PAGE = 30;

  const fetchAllPokemon = useCallback(async () => {
    if (allPokemonRef.current.length > 0) return;

    const { response, err } = await pokeApi.getAll();
    if (response && response.results) {
      allPokemonRef.current = response.results;
    } else {
      console.error('Erreur lors du chargement des données:', err);
      allPokemonRef.current = [];
    }
  }, []);

  const getList = useCallback(
    async (page) => {
      // Marque le début du chargement pour éviter les appels simultanés
      loadingRef.current = true;

      // Détermine la source des données selon regionDex
      let dataSource;
      if (regionDex !== null) {
        // Si un pokédex régional est sélectionné, utilise ses entrées
        // Extrait seulement l'objet pokemon_species de chaque entrée
        dataSource =
          regionDex?.pokemon_entries?.map((entry) => entry.pokemon_species) ||
          [];
      } else {
        // Sinon, utilise tous les Pokémon de l'API
        if (allPokemonRef.current.length === 0) {
          await fetchAllPokemon();
        }
        dataSource = allPokemonRef.current;
      }

      // Calcul des indices pour la pagination
      const startIndex = (page - 1) * ITEMS_PER_PAGE;
      const endIndex = page * ITEMS_PER_PAGE;

      // Vérification si on a dépassé la fin des données
      if (startIndex >= dataSource.length) {
        loadingRef.current = false;
        return;
      }

      // Extraction des nouveaux éléments pour cette page
      const newItems = dataSource.slice(startIndex, endIndex);

      // Mise à jour de la liste en évitant les doublons
      setPokeList((prevList) => {
        // Utilisation d'une Map pour garantir l'unicité par nom
        const uniqueMap = new Map();

        // Ajout des éléments existants dans la Map
        prevList.forEach((item) => {
          const key = item.name; // Maintenant tous les éléments ont une propriété name
          uniqueMap.set(key, item);
        });

        // Ajout des nouveaux éléments s'ils n'existent pas déjà
        newItems.forEach((item) => {
          const key = item.name; // Maintenant tous les éléments ont une propriété name
          if (!uniqueMap.has(key)) {
            uniqueMap.set(key, item);
          }
        });

        // Conversion de la Map en tableau
        return Array.from(uniqueMap.values());
      });

      // Marque la fin du chargement
      loadingRef.current = false;
    },
    [fetchAllPokemon, regionDex], // Ajout de regionDex aux dépendances
  );

  /**
   * Effect pour gérer le scroll infini (infinite scroll)
   * Charge automatiquement la page suivante quand l'utilisateur approche du bas de la page
   */
  useEffect(() => {
    /**
     * Gestionnaire d'événement scroll avec throttling
     * Vérifie si l'utilisateur est proche du bas de la page pour charger plus de contenu
     */
    const handleScroll = throttle(async () => {
      // Hauteur de la fenêtre visible
      const windowHeight = window.innerHeight;
      // Position actuelle du scroll vertical
      const scrollY = window.scrollY || window.pageYOffset;
      // Hauteur totale du document (prend le maximum pour la compatibilité)
      const documentHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight,
      );

      // Seuil en pixels avant la fin de page pour déclencher le chargement
      const scrollThreshold = 300;

      // Conditions pour charger la page suivante :
      // 1. L'utilisateur est proche du bas (moins de 300px)
      // 2. Aucune modale n'est ouverte
      // 3. Aucun chargement n'est en cours
      if (
        windowHeight + scrollY >= documentHeight - scrollThreshold &&
        !modalOpen &&
        !loadingRef.current
      ) {
        const nextPage = currentPage + 1;
        await getList(nextPage); // Charge la page suivante
        setCurrentPage(nextPage); // Met à jour le numéro de page
      }
    }, 200); // Throttle à 200ms pour éviter trop d'appels

    // Ajout de l'écouteur d'événement scroll
    window.addEventListener('scroll', handleScroll);

    // Nettoyage : suppression de l'écouteur au démontage
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [currentPage, modalOpen, getList]);

  /**
   * Effet pour réinitialiser la liste quand regionDex change
   * Permet de basculer entre le pokédex complet et un pokédex régional
   */
  useEffect(() => {
    // Réinitialise la liste et la pagination quand regionDex change
    setPokeList([]);
    setCurrentPage(1);
    setInitialLoading(true);
    // Vide le cache si on passe à un pokédex régional
    if (regionDex !== null) {
      allPokemonRef.current = [];
    }
  }, [regionDex]);

  /**
   * Effet pour charger immédiatement les données au changement de regionDex
   * Évite le problème du throttle qui peut retarder l'affichage initial
   */
  useEffect(() => {
    if (initialLoading) {
      // Force le chargement immédiat sans attendre le throttle
      const loadData = async () => {
        dispatch(setGlobalLoading(true));
        await getList(1);
        dispatch(setGlobalLoading(false));
        setInitialLoading(false);
      };
      loadData();
    }
  }, [regionDex, initialLoading, dispatch, getList]);

  // Retourne les états et fonctions nécessaires au composant
  return {
    pokeList, // Liste des Pokémon à afficher
    modalOpen, // État d'ouverture des modales
    setModalOpen, // Fonction pour contrôler l'ouverture des modales
  };
};

export default useHomePage;
