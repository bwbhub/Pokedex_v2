import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import pokeApi from '../../../../../api/modules/pokedex.api';
import { processEvolutionChain } from '../../../../../utils/evolutionChainFuncs';
import { languageSelector } from '../../../../../redux/features/languageSlice';
import { useSelector } from 'react-redux';

const useEvolutionChain = (pokeDetails) => {
  const [rawEvolDetails, setRawEvolDetails] = useState(null);
  const [evolDetails, setEvolDetails] = useState(null);
  const [error, setError] = useState(null);

  // Récupérer la langue active et les traductions
  const activeLanguage = useSelector(languageSelector);
  const { t } = useTranslation();

  // Extraire l'ID du Pokémon originel pour éviter un appel API redondant
  const originalPokemonId = pokeDetails?.id ? String(pokeDetails.id) : null;
  const originalPokemonName = pokeDetails?.name || null;

  // Première étape : récupérer la chaîne d'évolution de base
  useEffect(() => {
    const fetchEvolutionChain = async () => {
      if (!pokeDetails?.evolution_chain?.url) {
        return;
      }

      setError(null);

      try {
        const url = pokeDetails.evolution_chain.url;
        const parts = url.split('/');
        const chainId = parts[parts.length - 2];

        const { response, err } = await pokeApi.getEvol({ chainId });

        if (response) {
          const evolChain = response.chain;
          // Créer un objet de traductions pour les évolutions
          const evolutionTranslations = {
            evolution: {
              level: t('evolution.level'),
              happiness: t('evolution.happiness'),
              knowsMove: t('evolution.knowsMove'),
              knowsType: t('evolution.knowsType'),
              typeMove: t('evolution.typeMove'),
              atLocation: t('evolution.atLocation'),
              timeOfDay: t('evolution.timeOfDay'),
              whileRaining: t('evolution.whileRaining'),
              stats: t('evolution.stats'),
              equal: t('evolution.equal'),
              attackGreater: t('evolution.attackGreater'),
              defenseGreater: t('evolution.defenseGreater'),
              turnUpside: t('evolution.turnUpside'),
              trade: t('evolution.trade'),
              holding: t('evolution.holding'),
              with: t('evolution.with'),
              use: t('evolution.use'),
              specialEvolution: t('evolution.specialEvolution'),
              specialCondition: t('evolution.specialCondition'),
              female: t('evolution.female'),
              male: t('evolution.male'),
              only: t('evolution.only'),
              inParty: t('evolution.inParty'),
            },
          };
          const evolList = await processEvolutionChain(
            evolChain,
            activeLanguage,
            evolutionTranslations,
          );
          setRawEvolDetails(evolList);
        } else {
          setError(err);
          console.error(err);
        }
      } catch (err) {
        setError(err);
        console.error('Error fetching evolution chain:', err);
      }
    };

    fetchEvolutionChain();
  }, [pokeDetails]);

  const buildLevel = (rawData) => {
    if (!rawData || rawData.length === 0) {
      return [];
    }

    const levels = [];
    // Level 0: Pokémon with no predecessor (the base form)
    const level0 = rawData.filter((p) => p.evolvedFrom === null);
    if (level0.length > 0) {
      levels.push(level0);
    } else {
      // This case is unlikely if the data is correct, but it's a safe guard.
      return [];
    }

    let currentLevelIndex = 0;
    // Loop as long as the last level we processed has Pokémon
    while (levels[currentLevelIndex] && levels[currentLevelIndex].length > 0) {
      // Get the names of all Pokémon in the current level
      const currentLevelPokemonNames = new Set(
        levels[currentLevelIndex].map((p) => p.name),
      );

      // Find all Pokémon from the raw list that evolve from the current level Pokémon
      const nextLevel = rawData.filter((p) =>
        currentLevelPokemonNames.has(p.evolvedFrom),
      );

      // If we found any, add them as a new level
      if (nextLevel.length > 0) {
        levels.push(nextLevel);
      }

      currentLevelIndex++;

      // Safety break to prevent infinite loops with malformed data
      if (currentLevelIndex > 10) {
        break;
      }
    }

    return levels;
  };

  // Deuxième étape : enrichir avec les traductions et structurer par niveaux
  useEffect(() => {
    const processAndSetEvolutions = async () => {
      if (!rawEvolDetails) {
        setEvolDetails(null);
        return;
      }

      try {
        const evolutionLevels = buildLevel(rawEvolDetails);

        const translatedLevels = await Promise.all(
          evolutionLevels.map(async (level) => {
            return await Promise.all(
              level.map(async (evolution) => {
                try {
                  let speciesData;
                  if (
                    evolution.name === originalPokemonName ||
                    evolution.id === originalPokemonId
                  ) {
                    speciesData = pokeDetails;
                  } else {
                    const { response } = await pokeApi.getSpecies({
                      pokeId: evolution.name,
                    });
                    speciesData = response;
                  }

                  if (!speciesData) {
                    return { ...evolution, originalName: evolution.name };
                  }

                  const translatedName =
                    speciesData.names.find(
                      (name) => name.language.name === activeLanguage,
                    )?.name || speciesData.name;

                  return {
                    ...evolution,
                    name: translatedName || evolution.name,
                    originalName: evolution.name,
                  };
                } catch (err) {
                  console.error(
                    `Erreur lors de la récupération des données pour ${evolution.name}:`,
                    err,
                  );
                  return { ...evolution, originalName: evolution.name };
                }
              }),
            );
          }),
        );

        setEvolDetails(translatedLevels);
      } catch (err) {
        console.error('Erreur lors de la récupération des évolutions:', err);
        setEvolDetails(buildLevel(rawEvolDetails)); // Fallback avec les données brutes structurées
      }
    };

    processAndSetEvolutions();
  }, [
    rawEvolDetails,
    activeLanguage,
    originalPokemonId,
    originalPokemonName,
    pokeDetails,
  ]);

  return { evolDetails, error };
};

export default useEvolutionChain;
