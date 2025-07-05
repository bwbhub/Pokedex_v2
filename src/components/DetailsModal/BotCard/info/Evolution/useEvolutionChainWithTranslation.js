import { useState, useEffect } from 'react';
import useEvolutionChain from './useEvolutionChain';
import pokeApi from '../../../../../api/modules/pokedex.api';
import { languageSelector } from '../../../../../redux/features/languageSlice';
import { useSelector } from 'react-redux';

const useEvolutionChainWithTranslation = (pokeDetails) => {
  const {
    evolDetails: originalEvolDetails,
    isLoading: isLoadingEvol,
    error,
  } = useEvolutionChain(pokeDetails);

  // Récupérer la langue active
  const activeLanguage = useSelector(languageSelector);

  const [evolDetails, setEvolDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Effet pour récupérer les données d'évolution avec les noms localisés
  useEffect(() => {
    const fetchPokemonSpeciesData = async () => {
      if (!originalEvolDetails || isLoadingEvol) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);

      try {
        // Pour chaque Pokémon dans la chaîne d'évolution, récupérer ses données d'espèce
        const enhancedEvolutions = await Promise.all(
          originalEvolDetails.map(async (evolution) => {
            try {
              // Récupérer les données d'espèce du Pokémon
              const { response: speciesData } = await pokeApi.getSpecies({
                pokeId: evolution.name,
              });

              if (!speciesData) {
                return {
                  ...evolution,
                  originalName: evolution.name,
                };
              }

              // Extraire le nom localisé
              const translatedName =
                speciesData.names.find(
                  (name) => name.language.name === activeLanguage,
                )?.name || speciesData.name;

              // Extraire la description localisée (flavor text)
              const flavorTexts = speciesData.flavor_text_entries || [];
              const translatedDescription =
                flavorTexts.find(
                  (entry) => entry.language.name === activeLanguage,
                )?.flavor_text ||
                flavorTexts.find((entry) => entry.language.name === 'en')
                  ?.flavor_text ||
                null;

              return {
                ...evolution,
                name: translatedName || evolution.name,
                originalName: evolution.name, // Garder le nom original pour l'URL de l'image
                description: translatedDescription,
              };
            } catch (err) {
              console.error(
                `Erreur lors de la récupération des données pour ${evolution.name}:`,
                err,
              );
              return {
                ...evolution,
                originalName: evolution.name,
              };
            }
          }),
        );

        setEvolDetails(enhancedEvolutions);
      } catch (err) {
        console.error('Erreur lors de la récupération des évolutions:', err);
        setEvolDetails(originalEvolDetails);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPokemonSpeciesData();
  }, [originalEvolDetails, isLoadingEvol, activeLanguage]);

  return {
    evolDetails,
    isLoading: isLoading || isLoadingEvol,
    error,
  };
};

export default useEvolutionChainWithTranslation;
