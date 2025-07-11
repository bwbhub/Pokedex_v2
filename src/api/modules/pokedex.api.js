import publicClient from '../client/public.client';

const pokedexEndpoints = {
  pokedex: '/pokedex',
  pokeList: '/pokemon/?offset=0&limit=100000s',
  pokemon: ({ pokeId }) => `pokemon/${pokeId}`,
  languages: `/language`,
  language: ({ languageId }) => `/language/${languageId}`,
  species: ({ pokeId }) => `/pokemon-species/${pokeId}`,
  evolution: ({ chainId }) => `/evolution-chain/${chainId}`,
  type: ({ typeName }) => `/type/${typeName}`,
  generation: '/generation',
  generationId: ({ genId }) => `/generation/${genId}`,
  item: ({ itemName }) => `/item/${itemName}`,
  move: ({ moveName }) => `/move/${moveName}`,
  location: ({ location }) => `/location/${location}`,
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
  getGen: async () => {
    try {
      const response = await publicClient.get(pokedexEndpoints.generation);

      return { response };
    } catch (err) {
      return { err };
    }
  },
  getGenId: async ({ genId }) => {
    try {
      const response = await publicClient.get(
        pokedexEndpoints.generationId({ genId }),
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
};

export default pokeApi;
