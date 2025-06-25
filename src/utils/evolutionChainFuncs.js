
export const extractEvolutionInfo = (evolutionDetails) => {
  if (!evolutionDetails || evolutionDetails.length === 0) return null;
  
  const detail = evolutionDetails[0];
  const evolutionInfo = {
    method: detail.trigger?.name || null,
    condition: null,
    details: {}
  };

  switch (detail.trigger?.name) {
    case 'level-up':
      if (detail.min_level) {
        evolutionInfo.condition = `Level ${detail.min_level}`;
        evolutionInfo.details.level = detail.min_level;
      } else if (detail.min_happiness) {
        evolutionInfo.condition = `Happiness (${detail.min_happiness})`;
        evolutionInfo.details.happiness = detail.min_happiness;
      } else if (detail.known_move) {
        evolutionInfo.condition = `Knows move: ${detail.known_move.name}`;
        evolutionInfo.details.move = detail.known_move.name;
      } else if (detail.known_move_type) {
        evolutionInfo.condition = `Knows ${detail.known_move_type.name} type move`;
        evolutionInfo.details.moveType = detail.known_move_type.name;
      } else if (detail.location) {
        evolutionInfo.condition = `At location: ${detail.location.name}`;
        evolutionInfo.details.location = detail.location.name;
      } else if (detail.time_of_day) {
        evolutionInfo.condition = `Time of day: ${detail.time_of_day}`;
        evolutionInfo.details.timeOfDay = detail.time_of_day;
      } else if (detail.needs_overworld_rain) {
        evolutionInfo.condition = 'While raining';
        evolutionInfo.details.rain = true;
      } else if (detail.relative_physical_stats !== null) {
        const statsRelation = detail.relative_physical_stats === 0 ? 'equal' : 
                             detail.relative_physical_stats > 0 ? 'attack > defense' : 'defense > attack';
        evolutionInfo.condition = `Stats: ${statsRelation}`;
        evolutionInfo.details.statsRelation = statsRelation;
      } else if (detail.turn_upside_down) {
        evolutionInfo.condition = 'Turn device upside down';
        evolutionInfo.details.upsideDown = true;
      }
      break;

    case 'trade':
      evolutionInfo.condition = 'Trade';
      if (detail.held_item) {
        evolutionInfo.condition += ` holding ${detail.held_item.name}`;
        evolutionInfo.details.heldItem = detail.held_item.name;
      }
      if (detail.trade_species) {
        evolutionInfo.condition += ` with ${detail.trade_species.name}`;
        evolutionInfo.details.tradeWith = detail.trade_species.name;
      }
      break;

    case 'use-item':
      if (detail.item) {
        evolutionInfo.condition = `Use ${detail.item.name}`;
        evolutionInfo.details.item = detail.item.name;
      }
      break;

    case 'shed':
      evolutionInfo.condition = 'Special evolution (Nincada → Shedinja)';
      break;

    default:
      evolutionInfo.condition = 'Special condition';
  }

  if (detail.gender !== null) {
    const gender = detail.gender === 1 ? 'Female' : 'Male';
    evolutionInfo.condition += `, ${gender} only`;
    evolutionInfo.details.gender = gender;
  }

  if (detail.party_species) {
    evolutionInfo.condition += `, with ${detail.party_species.name} in party`;
    evolutionInfo.details.partySpecies = detail.party_species.name;
  }

  if (detail.party_type) {
    evolutionInfo.condition += `, with ${detail.party_type.name} type in party`;
    evolutionInfo.details.partyType = detail.party_type.name;
  }

  return evolutionInfo;
};


export const processEvolutionChain = (evolutionChain) => {
  const speciesList = [];
  
  const traverseEvolutions = (evolution, previousSpecies = null) => {
    const speciesInfo = {
      name: evolution?.species?.name,
      url: evolution?.species?.url,
      evolutionDetails: null,
      evolvedFrom: previousSpecies
    };
    
    if (previousSpecies) {
      speciesInfo.evolutionDetails = extractEvolutionInfo(evolution.evolution_details);
    }
    
    speciesList.push(speciesInfo);
    
    if (evolution?.evolves_to?.length > 0) {
      evolution.evolves_to.forEach((nextEvolution) => {
        traverseEvolutions(nextEvolution, evolution.species.name);
      });
    }
  };
  
  traverseEvolutions(evolutionChain);
  return speciesList;
};