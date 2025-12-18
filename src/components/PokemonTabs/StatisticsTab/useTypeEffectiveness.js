import { useEffect, useMemo, useState } from 'react';
import pokeApi from '../../../api/modules/pokedex.api';
import { typeList } from '../../../utils/svgs';

/**
 * Compute defensive type effectiveness for a Pokémon's types.
 * Returns per-type multipliers and grouped categories for UI.
 * @param {Array<string|{type:{name:string}}>} types - Array of type names or objects { type: { name } }
 */
const useTypeEffectiveness = (types) => {
  const [multipliers, setMultipliers] = useState(null);

  const typeNames = useMemo(() => {
    if (!types) return [];
    return types
      .map((t) => (typeof t === 'object' ? t?.type?.name : t))
      .filter(Boolean);
  }, [types]);

  useEffect(() => {
    let cancelled = false;

    const fetchAndCompute = async () => {
      if (!typeNames.length) {
        setMultipliers(null);
        return;
      }

      try {
        // Initialize all attacking types with neutral (x1)
        const map = {};
        typeList.forEach((t) => {
          map[t] = 1;
        });

        // Fetch damage relations for each defending type
        const fetches = typeNames.map((n) => pokeApi.getType({ typeName: n }));
        const results = await Promise.all(fetches);

        const applyRelations = (rels) => {
          if (!rels) return;
          rels.no_damage_from?.forEach(({ name }) => {
            map[name] *= 0;
          });
          rels.half_damage_from?.forEach(({ name }) => {
            map[name] *= 0.5;
          });
          rels.double_damage_from?.forEach(({ name }) => {
            map[name] *= 2;
          });
        };

        results.forEach(({ response }) => {
          const rels = response?.damage_relations;
          applyRelations(rels);
        });

        if (!cancelled) setMultipliers(map);
      } catch (err) {
        console.error(err);
        if (!cancelled) setMultipliers(null);
      }
    };

    fetchAndCompute();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeNames.join('|')]);

  const categories = useMemo(() => {
    const res = {
      x4: [],
      x2: [],
      x0_25: [],
      x0_5: [],
      x0: [],
      x1: [],
    };
    if (!multipliers) return res;

    Object.entries(multipliers).forEach(([type, mult]) => {
      if (mult === 4) res.x4.push(type);
      else if (mult === 2) res.x2.push(type);
      else if (mult === 0.25) res.x0_25.push(type);
      else if (mult === 0.5) res.x0_5.push(type);
      else if (mult === 0) res.x0.push(type);
      else if (mult === 1) res.x1.push(type);
    });

    return res;
  }, [multipliers]);

  return { multipliers, categories };
};

export default useTypeEffectiveness;
