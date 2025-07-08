import pokeApi from '../api/modules/pokedex.api';

export const extractEvolutionInfo = async (evolutionDetails, language = 'en', translations) => {
  if (!evolutionDetails || evolutionDetails.length === 0) return null;

  const detail = evolutionDetails[0];
  const evolutionInfo = {
    method: detail.trigger?.name || null,
    condition: null,
    details: {},
  };

  // Helper function to get translated name
  const getTranslatedName = (names, fallbackName) => {
    if (!names || !Array.isArray(names)) return fallbackName;
    const translatedName = names.find(name => name.language.name === language);
    return translatedName ? translatedName.name : fallbackName;
  };

  // Helper function to get translated text
  const getTranslatedText = (key) => {
    if (!translations || !translations.evolution) return key;
    return translations.evolution[key] || key;
  };

  switch (detail.trigger?.name) {
    case 'level-up':
      if (detail.min_level) {
        evolutionInfo.condition = `${getTranslatedText('level')} ${detail.min_level}`;
        evolutionInfo.details.level = detail.min_level;
      } else if (detail.min_happiness) {
        evolutionInfo.condition = `${getTranslatedText('happiness')} (${detail.min_happiness})`;
        evolutionInfo.details.happiness = detail.min_happiness;
      } else if (detail.known_move) {
        try {
          const { response: moveData } = await pokeApi.getMove({ moveName: detail.known_move.name });
          const translatedMoveName = moveData ? getTranslatedName(moveData.names, detail.known_move.name) : detail.known_move.name;
          evolutionInfo.condition = `${getTranslatedText('knowsMove')}: ${translatedMoveName}`;
          evolutionInfo.details.move = translatedMoveName;
          evolutionInfo.details.originalMove = detail.known_move.name;
        } catch (err) {
          console.error('Error fetching move data:', err);
          evolutionInfo.condition = `${getTranslatedText('knowsMove')}: ${detail.known_move.name}`;
          evolutionInfo.details.move = detail.known_move.name;
        }
      } else if (detail.known_move_type) {
        const typeText = getTranslatedText('typeMove');
        if (typeText) {
          evolutionInfo.condition = `${getTranslatedText('knowsType')} ${detail.known_move_type.name} ${typeText}`;
        } else {
          evolutionInfo.condition = `${getTranslatedText('knowsType')} ${detail.known_move_type.name}`;
        }
        evolutionInfo.details.moveType = detail.known_move_type.name;
      } else if (detail.location) {
        try {
          const { response: locationData } = await pokeApi.getLocation({ location: detail.location.name });
          const translatedLocationName = locationData ? getTranslatedName(locationData.names, detail.location.name) : detail.location.name;
          evolutionInfo.condition = `${getTranslatedText('atLocation')}: ${translatedLocationName}`;
          evolutionInfo.details.location = translatedLocationName;
          evolutionInfo.details.originalLocation = detail.location.name;
        } catch (err) {
          console.error('Error fetching location data:', err);
          evolutionInfo.condition = `${getTranslatedText('atLocation')}: ${detail.location.name}`;
          evolutionInfo.details.location = detail.location.name;
        }
      } else if (detail.time_of_day) {
        evolutionInfo.condition = `${getTranslatedText('timeOfDay')}: ${detail.time_of_day}`;
        evolutionInfo.details.timeOfDay = detail.time_of_day;
      } else if (detail.needs_overworld_rain) {
        evolutionInfo.condition = getTranslatedText('whileRaining');
        evolutionInfo.details.rain = true;
      } else if (detail.relative_physical_stats !== null) {
        const statsRelation =
          detail.relative_physical_stats === 0
            ? getTranslatedText('equal')
            : detail.relative_physical_stats > 0
              ? getTranslatedText('attackGreater')
              : getTranslatedText('defenseGreater');
        evolutionInfo.condition = `${getTranslatedText('stats')}: ${statsRelation}`;
        evolutionInfo.details.statsRelation = statsRelation;
      } else if (detail.turn_upside_down) {
        evolutionInfo.condition = getTranslatedText('turnUpside');
        evolutionInfo.details.upsideDown = true;
      }
      break;

    case 'trade':
      evolutionInfo.condition = getTranslatedText('trade');
      if (detail.held_item) {
        try {
          const { response: itemData } = await pokeApi.getItem({ itemName: detail.held_item.name });
          const translatedItemName = itemData ? getTranslatedName(itemData.names, detail.held_item.name) : detail.held_item.name;
          evolutionInfo.condition += ` ${getTranslatedText('holding')} ${translatedItemName}`;
          evolutionInfo.details.heldItem = translatedItemName;
          evolutionInfo.details.originalHeldItem = detail.held_item.name;
        } catch (err) {
          console.error('Error fetching held item data:', err);
          evolutionInfo.condition += ` ${getTranslatedText('holding')} ${detail.held_item.name}`;
          evolutionInfo.details.heldItem = detail.held_item.name;
        }
      }
      if (detail.trade_species) {
        evolutionInfo.condition += ` ${getTranslatedText('with')} ${detail.trade_species.name}`;
        evolutionInfo.details.tradeWith = detail.trade_species.name;
      }
      break;

    case 'use-item':
      if (detail.item) {
        try {
          const { response: itemData } = await pokeApi.getItem({ itemName: detail.item.name });
          const translatedItemName = itemData ? getTranslatedName(itemData.names, detail.item.name) : detail.item.name;
          evolutionInfo.condition = `${getTranslatedText('use')} ${translatedItemName}`;
          evolutionInfo.details.item = translatedItemName;
          evolutionInfo.details.originalItem = detail.item.name;
        } catch (err) {
          console.error('Error fetching item data:', err);
          evolutionInfo.condition = `${getTranslatedText('use')} ${detail.item.name}`;
          evolutionInfo.details.item = detail.item.name;
        }
      }
      break;

    case 'shed':
      evolutionInfo.condition = getTranslatedText('specialEvolution');
      break;

    default:
      evolutionInfo.condition = getTranslatedText('specialCondition');
  }

  if (detail.gender !== null) {
    const gender = detail.gender === 1 ? getTranslatedText('female') : getTranslatedText('male');
    evolutionInfo.condition += `, ${gender} ${getTranslatedText('only')}`;
    evolutionInfo.details.gender = gender;
  }

  if (detail.party_species) {
    evolutionInfo.condition += `, ${getTranslatedText('with')} ${detail.party_species.name} ${getTranslatedText('inParty')}`;
    evolutionInfo.details.partySpecies = detail.party_species.name;
  }

  if (detail.party_type) {
    evolutionInfo.condition += `, ${getTranslatedText('with')} ${detail.party_type.name} type ${getTranslatedText('inParty')}`;
    evolutionInfo.details.partyType = detail.party_type.name;
  }

  return evolutionInfo;
};

export const processEvolutionChain = async (evolutionChain, language = 'en', translations) => {
  const speciesList = [];

  const traverseEvolutions = async (evolution, previousSpecies = null) => {
    const speciesInfo = {
      name: evolution?.species?.name,
      url: evolution?.species?.url,
      evolutionDetails: null,
      evolvedFrom: previousSpecies,
    };

    if (previousSpecies) {
      speciesInfo.evolutionDetails = await extractEvolutionInfo(
        evolution.evolution_details,
        language,
        translations
      );
    }

    speciesList.push(speciesInfo);

    if (evolution?.evolves_to?.length > 0) {
      for (const nextEvolution of evolution.evolves_to) {
        await traverseEvolutions(nextEvolution, evolution.species.name);
      }
    }
  };

  await traverseEvolutions(evolutionChain);
  return speciesList;
};
