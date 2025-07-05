import { useState, useEffect } from 'react';
import pokeApi from '../../../../../api/modules/pokedex.api';
import { processEvolutionChain } from '../../../../../utils/evolutionChainFuncs';

const useEvolutionChain = (pokeDetails) => {
  const [evolDetails, setEvolDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvolutionChain = async () => {
      if (!pokeDetails?.evolution_chain?.url) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const url = pokeDetails.evolution_chain.url;
        const parts = url.split('/');
        const chainId = parts[parts.length - 2];

        const { response, err } = await pokeApi.getEvol({ chainId });

        if (response) {
          const evolChain = response.chain;
          const evolList = processEvolutionChain(evolChain);
          setEvolDetails(evolList);
        } else {
          setError(err);
          console.error(err);
        }
      } catch (err) {
        setError(err);
        console.error('Error fetching evolution chain:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvolutionChain();
  }, [pokeDetails]);

  return { evolDetails, isLoading, error };
};

export default useEvolutionChain;
