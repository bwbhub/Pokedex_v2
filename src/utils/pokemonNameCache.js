
const pokemonNameCache = {
};

const nameToIdMap = {
};

export const addPokemonToCache = (id, names) => {
  pokemonNameCache[id] = names;
  
  Object.entries(names).forEach(([lang, name]) => {
    nameToIdMap[name.toLowerCase()] = id;
  });
};

export const getPokemonIdByName = (name) => {
  return nameToIdMap[name.toLowerCase()] || null;
};

export const getPokemonNameByLang = (id, lang) => {
  return pokemonNameCache[id]?.[lang] || null;
};

export const searchPokemonByName = (searchTerm) => {
  if (!searchTerm) return [];
  
  const term = searchTerm.toLowerCase();
  const results = [];
  
  Object.entries(nameToIdMap).forEach(([name, id]) => {
    if (name.includes(term)) {
      if (!results.includes(id)) {
        results.push(id);
      }
    }
  });
  
  return results;
};

export default {
  addPokemonToCache,
  getPokemonIdByName,
  getPokemonNameByLang,
  searchPokemonByName,
};
