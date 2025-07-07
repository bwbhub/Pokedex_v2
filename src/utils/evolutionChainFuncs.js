import pokeApi from '../api/modules/pokedex.api';

// Traductions pour les conditions d'évolution
const evolutionTranslations = {
  en: {
    level: 'Level',
    happiness: 'Happiness',
    knowsMove: 'Knows move',
    knowsType: 'Knows',
    typeMove: 'type move',
    atLocation: 'At location',
    timeOfDay: 'Time of day',
    whileRaining: 'While raining',
    stats: 'Stats',
    equal: 'equal',
    attackGreater: 'attack > defense',
    defenseGreater: 'defense > attack',
    turnUpside: 'Turn device upside down',
    trade: 'Trade',
    holding: 'holding',
    with: 'with',
    use: 'Use',
    specialEvolution: 'Special evolution (Nincada → Shedinja)',
    specialCondition: 'Special condition',
    female: 'Female',
    male: 'Male',
    only: 'only',
    inParty: 'in party'
  },
  fr: {
    level: 'Niveau',
    happiness: 'Bonheur',
    knowsMove: 'Connaît l\'attaque',
    knowsType: 'Connaît une attaque de type',
    typeMove: '',
    atLocation: 'À l\'emplacement',
    timeOfDay: 'Moment de la journée',
    whileRaining: 'Sous la pluie',
    stats: 'Stats',
    equal: 'égales',
    attackGreater: 'attaque > défense',
    defenseGreater: 'défense > attaque',
    turnUpside: 'Retourner l\'appareil',
    trade: 'Échange',
    holding: 'en tenant',
    with: 'avec',
    use: 'Utiliser',
    specialEvolution: 'Évolution spéciale (Nincada → Munja)',
    specialCondition: 'Condition spéciale',
    female: 'Femelle',
    male: 'Mâle',
    only: 'uniquement',
    inParty: 'dans l\'équipe'
  },
  es: {
    level: 'Nivel',
    happiness: 'Felicidad',
    knowsMove: 'Conoce el movimiento',
    knowsType: 'Conoce un movimiento de tipo',
    typeMove: '',
    atLocation: 'En la ubicación',
    timeOfDay: 'Momento del día',
    whileRaining: 'Mientras llueve',
    stats: 'Stats',
    equal: 'iguales',
    attackGreater: 'ataque > defensa',
    defenseGreater: 'defensa > ataque',
    turnUpside: 'Dar la vuelta al dispositivo',
    trade: 'Intercambio',
    holding: 'sosteniendo',
    with: 'con',
    use: 'Usar',
    specialEvolution: 'Evolución especial (Nincada → Shedinja)',
    specialCondition: 'Condición especial',
    female: 'Hembra',
    male: 'Macho',
    only: 'solamente',
    inParty: 'en el equipo'
  },
  de: {
    level: 'Level',
    happiness: 'Zuneigung',
    knowsMove: 'Kennt Attacke',
    knowsType: 'Kennt',
    typeMove: 'Typ-Attacke',
    atLocation: 'An Ort',
    timeOfDay: 'Tageszeit',
    whileRaining: 'Bei Regen',
    stats: 'Stats',
    equal: 'gleich',
    attackGreater: 'Angriff > Verteidigung',
    defenseGreater: 'Verteidigung > Angriff',
    turnUpside: 'Gerät umdrehen',
    trade: 'Tausch',
    holding: 'trägt',
    with: 'mit',
    use: 'Verwende',
    specialEvolution: 'Spezielle Entwicklung (Nincada → Ninjask)',
    specialCondition: 'Spezielle Bedingung',
    female: 'Weiblich',
    male: 'Männlich',
    only: 'nur',
    inParty: 'im Team'
  },
  it: {
    level: 'Livello',
    happiness: 'Felicità',
    knowsMove: 'Conosce la mossa',
    knowsType: 'Conosce una mossa di tipo',
    typeMove: '',
    atLocation: 'Nella posizione',
    timeOfDay: 'Momento del giorno',
    whileRaining: 'Mentre piove',
    stats: 'Statistiche',
    equal: 'uguali',
    attackGreater: 'attacco > difesa',
    defenseGreater: 'difesa > attacco',
    turnUpside: 'Capovolgere il dispositivo',
    trade: 'Scambio',
    holding: 'tenendo',
    with: 'con',
    use: 'Usa',
    specialEvolution: 'Evoluzione speciale (Nincada → Shedinja)',
    specialCondition: 'Condizione speciale',
    female: 'Femmina',
    male: 'Maschio',
    only: 'solo',
    inParty: 'nella squadra'
  },
  ja: {
    level: 'レベル',
    happiness: 'なつき度',
    knowsMove: '技を覚えている',
    knowsType: 'タイプの技を覚えている',
    typeMove: '',
    atLocation: '場所',
    timeOfDay: '時間帯',
    whileRaining: '雨の時',
    stats: 'ステータス',
    equal: '同じ',
    attackGreater: '攻撃 > 防御',
    defenseGreater: '防御 > 攻撃',
    turnUpside: '本体を逆さまにする',
    trade: '通信交換',
    holding: 'を持たせて',
    with: 'と',
    use: '使用',
    specialEvolution: '特殊進化 (ツチニン → ヌケニン)',
    specialCondition: '特殊条件',
    female: 'メス',
    male: 'オス',
    only: 'のみ',
    inParty: '手持ちに'
  }
};

export const extractEvolutionInfo = async (evolutionDetails, language = 'en') => {
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
    const translations = evolutionTranslations[language] || evolutionTranslations['en'];
    return translations[key] || evolutionTranslations['en'][key] || key;
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

export const processEvolutionChain = async (evolutionChain, language = 'en') => {
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
        language
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
