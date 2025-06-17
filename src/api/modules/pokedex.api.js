import publicClient from "../client/public.client"

const pokedexEndpoints = {
  pokedex: "/pokedex",
  pokeList: "/pokemon/?offset=0&limit=100000s",
  pokemon: ({ pokeId }) => `pokemon/${pokeId}`,
  langue: "/language",
  species: ({ pokeId }) => `/pokemon-species/${pokeId}`,
  evolution: ({ chainId }) => `/evolution-chain/${chainId}`,
  type: ({ typeName }) => `/type/${typeName}`,
  generation: "/generation",
  generationId: ({ genId }) => `/generation/${genId}`
}

const pokeApi = {
  getAll: async () => {
    try {
      const response = await publicClient.get(pokedexEndpoints.pokeList)

      return { response }
    } catch (err) {
      return { err }
    }
  },
  getLanguage: async () => {
    try {
      const response = await publicClient.get(pokedexEndpoints.langue)

      return { response }
    } catch (err) {
      return { err }
    }
  },
  getPoke: async ({ pokeId }) => {
    try {
      const response = await publicClient.get(
        pokedexEndpoints.pokemon({ pokeId })
      )

      return { response }
    } catch (err) {
      return { err }
    }
  },
  getGen: async () => {
    try {
      const response = await publicClient.get(pokedexEndpoints.generation)

      return { response }
    } catch (err) {
      return { err }
    }
  },
  getGenId: async ({ genId }) => {
    try {
      const response = await publicClient.get(
        pokedexEndpoints.generationId({ genId })
      )

      return { response }
    } catch (err) {
      return { err }
    }
  },
  getDetails: async ({ pokeId }) => {
    try {
      const response = await publicClient.get(
        pokedexEndpoints.species({ pokeId })
      )

      return { response }
    } catch (err) {
      return { err }
    }
  },
  getEvol: async ({ chainId }) => {
    try {
      const response = await publicClient.get(
        pokedexEndpoints.evolution({ chainId })
      )
      return { response }
    } catch (err) {
      return { err }
    }
  },
  getType: async ({ typeName }) => {
    try {
      const response = await publicClient.get(
        pokedexEndpoints.type({ typeName })
      )
      return { response }
    } catch (err) {
      return { err }
    }
  }
}

export default pokeApi
