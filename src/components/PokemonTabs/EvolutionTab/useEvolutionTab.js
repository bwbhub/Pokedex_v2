import { useState, useEffect } from 'react';
import pokeApi from '../../../api/modules/pokedex.api';
import { useTranslation } from 'react-i18next';

/**
 * Hook pour récupérer et traiter la chaîne d'évolution d'un Pokémon
 * @param {Object} props - Les propriétés du hook
 * @param {Object} props.species - Les données d'espèce du Pokémon
 * @param {string} props.activeLanguage - La langue active
 * @returns {Object} Les données d'évolution formatées pour l'affichage
 */
const useEvolutionTab = ({ species, activeLanguage }) => {
  const [evolutionChain, setEvolutionChain] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchEvolutionChain = async () => {
      if (!species?.evolution_chain?.url) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        // Extraction de l'ID de la chaîne d'évolution depuis l'URL
        const evolutionChainId = species.evolution_chain.url.split('/').filter(Boolean).pop();
        
        // Récupération des données de la chaîne d'évolution
        const { response: evolutionData, err: evolutionErr } = await pokeApi.getEvolutionChain({
          chainId: evolutionChainId,
        });

        if (evolutionErr) {
          throw new Error(evolutionErr);
        }

        if (evolutionData) {
          // Traitement des données d'évolution
          const processedEvolutions = await processEvolutionChain(evolutionData.chain);
          setEvolutionChain(processedEvolutions);
        }
      } catch (error) {
        console.error('Error fetching evolution data:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    // Fonction pour traiter récursivement la chaîne d'évolution
    const processEvolutionChain = async (chain, evolutions = []) => {
      if (chain.evolves_to && chain.evolves_to.length > 0) {
        for (const evolution of chain.evolves_to) {
          // Récupération des détails du Pokémon source
          const fromId = chain.species.url.split('/').filter(Boolean).pop();
          const { response: fromPokemon } = await pokeApi.getPoke({ pokeId: fromId });
          const { response: fromSpecies } = await pokeApi.getSpecies({ pokeId: fromId });
          
          // Récupération des détails du Pokémon cible
          const toId = evolution.species.url.split('/').filter(Boolean).pop();
          const { response: toPokemon } = await pokeApi.getPoke({ pokeId: toId });
          const { response: toSpecies } = await pokeApi.getSpecies({ pokeId: toId });

          // Formatage des conditions d'évolution
          const evolutionDetails = evolution.evolution_details[0];
          let condition = '';
          
          if (evolutionDetails) {
            if (evolutionDetails.min_level) {
              condition = t('pokemonTabs.evolution.level', { level: evolutionDetails.min_level });
            } else if (evolutionDetails.item) {
              condition = t('pokemonTabs.evolution.item', { item: t(`pokemonTabs.evolution.items.${evolutionDetails.item.name}`, evolutionDetails.item.name) });
            } else if (evolutionDetails.trigger?.name === 'trade') {
              condition = t('pokemonTabs.evolution.trade');
              if (evolutionDetails.held_item) {
                condition += t('pokemonTabs.evolution.heldItem', { item: t(`pokemonTabs.evolution.items.${evolutionDetails.held_item.name}`, evolutionDetails.held_item.name) });
              }
            } else if (evolutionDetails.trigger?.name === 'use-item') {
              condition = t('pokemonTabs.evolution.useItem', { item: t(`pokemonTabs.evolution.items.${evolutionDetails.item?.name}`, evolutionDetails.item?.name) });
            } else if (evolutionDetails.min_happiness) {
              condition = t('pokemonTabs.evolution.happiness', { value: evolutionDetails.min_happiness });
            } else {
              condition = t('pokemonTabs.evolution.unknown');
            }
          }

          // Récupération des noms localisés
          const fromName = fromSpecies?.names?.find(n => n.language.name === activeLanguage)?.name || chain.species.name;
          const toName = toSpecies?.names?.find(n => n.language.name === activeLanguage)?.name || evolution.species.name;

          // Ajout de l'évolution à la liste
          evolutions.push({
            fromId,
            fromName,
            fromSprite: fromPokemon?.sprites?.other?.['official-artwork']?.front_default,
            toId,
            toName,
            toSprite: toPokemon?.sprites?.other?.['official-artwork']?.front_default,
            condition
          });

          // Traitement récursif des évolutions suivantes
          await processEvolutionChain(evolution, evolutions);
        }
      }
      
      return evolutions;
    };

    if (species) {
      fetchEvolutionChain();
    }
  }, [species, activeLanguage, t]);

  return { evolutionChain, isLoading, error };
};

export default useEvolutionTab;
