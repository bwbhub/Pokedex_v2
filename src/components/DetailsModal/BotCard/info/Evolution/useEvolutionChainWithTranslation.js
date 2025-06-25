import { useState, useEffect, useCallback } from 'react';
import useEvolutionChain from './useEvolutionChain';
import useTranslation from '../../../../../hooks/useTranslation';
import pokeApi from '../../../../../api/modules/pokedex.api';

const useEvolutionChainWithTranslation = (pokeDetails) => {
  const {
    evolDetails: originalEvolDetails,
    isLoading: isLoadingEvol,
    error,
  } = useEvolutionChain(pokeDetails);

  // Récupérer les fonctions de traduction
  const { activeLanguage } = useTranslation();

  const [evolDetails, setEvolDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fonction pour traduire les conditions d'évolution avec useCallback pour éviter les problèmes de dépendances
  const translateEvolutionCondition = useCallback(
    (condition) => {
      if (!condition) return null;

      // Traduction des conditions d'évolution communes
      const conditionTranslations = {
        en: {
          Level: 'Level',
          Happiness: 'Happiness',
          Trade: 'Trade',
          'Use Item': 'Use Item',
          with: 'with',
          during: 'during',
          'knowing move': 'knowing move',
          'at location': 'at location',
          holding: 'holding',
          daytime: 'daytime',
          night: 'night',
          rain: 'rain',
          female: 'female',
          male: 'male',
        },
        fr: {
          Level: 'Niveau',
          Happiness: 'Bonheur',
          Trade: 'Échange',
          'Use Item': 'Utiliser',
          with: 'avec',
          during: 'pendant',
          'knowing move': 'connaissant',
          'at location': 'à',
          holding: 'tenant',
          daytime: 'jour',
          night: 'nuit',
          rain: 'pluie',
          female: 'femelle',
          male: 'mâle',
        },
      };

      // Si la langue active n'est pas supportée, utiliser l'anglais
      const translations =
        conditionTranslations[activeLanguage] || conditionTranslations.en;

      // Traduire chaque partie de la condition
      let translatedCondition = condition;
      Object.entries(translations).forEach(([key, value]) => {
        translatedCondition = translatedCondition.replace(
          new RegExp(key, 'g'),
          value,
        );
      });

      return translatedCondition;
    },
    [activeLanguage],
  );

  // Effet pour récupérer et traduire les données d'évolution
  useEffect(() => {
    const fetchPokemonSpeciesData = async () => {
      if (!originalEvolDetails || isLoadingEvol) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);

      try {
        // Pour chaque Pokémon dans la chaîne d'évolution, récupérer ses données d'espèce
        const translatedEvolutions = await Promise.all(
          originalEvolDetails.map(async (evolution) => {
            try {
              // Récupérer les données d'espèce du Pokémon
              const { response: speciesData } = await pokeApi.getSpeciesByName({
                pokeName: evolution.name,
              });

              if (!speciesData) {
                return {
                  ...evolution,
                  originalName: evolution.name,
                  condition: translateEvolutionCondition(evolution.condition),
                };
              }

              // Extraire le nom localisé
              const translatedName = speciesData.names.find(
                (name) => name.language.name === activeLanguage
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
                condition: translateEvolutionCondition(evolution.condition),
              };
            } catch (err) {
              console.error(
                `Erreur lors de la récupération des données pour ${evolution.name}:`,
                err,
              );
              return {
                ...evolution,
                originalName: evolution.name,
                condition: translateEvolutionCondition(evolution.condition),
              };
            }
          }),
        );

        setEvolDetails(translatedEvolutions);
      } catch (err) {
        console.error('Erreur lors de la traduction des évolutions:', err);
        setEvolDetails(originalEvolDetails);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPokemonSpeciesData();
  }, [
    originalEvolDetails,
    isLoadingEvol,
    activeLanguage,
    translateEvolutionCondition,
  ]);

  return {
    evolDetails,
    isLoading: isLoading || isLoadingEvol,
    error,
  };
};

export default useEvolutionChainWithTranslation;
