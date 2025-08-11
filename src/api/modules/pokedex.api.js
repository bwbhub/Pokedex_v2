import publicClient from '../client/public.client';

const pokedexEndpoints = {
  pokedexList: '/pokedex',
  pokedexId: ({ pokedexId }) => `/pokedex/${pokedexId}`,
  pokeList: '/pokemon/?offset=0&limit=100000s',
  pokemon: ({ pokeId }) => `pokemon/${pokeId}`,
  languages: `/language`,
  language: ({ languageId }) => `/language/${languageId}`,
  species: ({ pokeId }) => `/pokemon-species/${pokeId}`,
  evolution: ({ chainId }) => `/evolution-chain/${chainId}`,
  type: ({ typeName }) => `/type/${typeName}`,
  region: '/region',
  regionId: ({ regionId }) => `/region/${regionId}`,
  item: ({ itemName }) => `/item/${itemName}`,
  move: ({ moveName }) => `/move/${moveName}`,
  location: ({ location }) => `/location/${location}`,
  encounters: ({ pokeId }) => `/pokemon/${pokeId}/encounters`,
  nature: '/nature',
  natureId: ({ natureId }) => `/nature/${natureId}`,
};

const pokeApi = {
  getAll: async () => {
    try {
      const response = await publicClient.get(pokedexEndpoints.pokeList);

      return { response };
    } catch (err) {
      return { err };
    }
  },
  // Récupérer toutes les langues disponibles
  getLanguages: async () => {
    try {
      const response = await publicClient.get(pokedexEndpoints.languages);
      return { response };
    } catch (err) {
      return { err };
    }
  },
  // Récupérer une langue spécifique
  getLanguage: async ({ languageId }) => {
    try {
      const response = await publicClient.get(
        pokedexEndpoints.language({ languageId }),
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },
  getPoke: async ({ pokeId }) => {
    try {
      const response = await publicClient.get(
        pokedexEndpoints.pokemon({ pokeId }),
      );

      return { response };
    } catch (err) {
      return { err };
    }
  },
  getRegion: async () => {
    try {
      const response = await publicClient.get(pokedexEndpoints.region);

      return { response };
    } catch (err) {
      return { err };
    }
  },
  getRegiondId: async ({ regionId }) => {
    try {
      const response = await publicClient.get(
        pokedexEndpoints.regionId({ regionId }),
      );

      return { response };
    } catch (err) {
      return { err };
    }
  },
  getSpecies: async ({ pokeId }) => {
    try {
      const response = await publicClient.get(
        pokedexEndpoints.species({ pokeId }),
      );

      return { response };
    } catch (err) {
      return { err };
    }
  },
  getEvol: async ({ chainId }) => {
    try {
      const response = await publicClient.get(
        pokedexEndpoints.evolution({ chainId }),
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },
  getType: async ({ typeName }) => {
    try {
      const response = await publicClient.get(
        pokedexEndpoints.type({ typeName }),
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },
  getItem: async ({ itemName }) => {
    try {
      const response = await publicClient.get(
        pokedexEndpoints.item({ itemName }),
      );

      return { response };
    } catch (err) {
      return { err };
    }
  },
  getMove: async ({ moveName }) => {
    try {
      const response = await publicClient.get(
        pokedexEndpoints.move({ moveName }),
      );

      return { response };
    } catch (err) {
      return { err };
    }
  },
  getLocation: async ({ location }) => {
    try {
      const response = await publicClient.get(
        pokedexEndpoints.location({ location }),
      );

      return { response };
    } catch (err) {
      return { err };
    }
  },
  getEncounters: async ({ pokeId }) => {
    try {
      const response = await publicClient.get(
        pokedexEndpoints.encounters({ pokeId }),
      );

      return { response };
    } catch (err) {
      return { err };
    }
  },
  getPokedexList: async () => {
    try {
      const response = await publicClient.get(pokedexEndpoints.pokedexList());

      return { response };
    } catch (err) {
      return { err };
    }
  },
  getPokedexId: async ({ pokedexId }) => {
    try {
      const response = await publicClient.get(
        pokedexEndpoints.pokedexId({ pokedexId }),
      );

      return { response };
    } catch (err) {
      return { err };
    }
  },
  getNatureList: async () => {
    try {
      const response = await publicClient.get(pokedexEndpoints.nature());

      return { response };
    } catch (err) {
      return { err };
    }
  },
  getNatureId: async ({ natureId }) => {
    try {
      const response = await publicClient.get(
        pokedexEndpoints.natureId({ natureId }),
      );

      return { response };
    } catch (err) {
      return { err };
    }
  },
};

export default pokeApi;
