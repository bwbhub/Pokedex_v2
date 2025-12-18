import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Hook pour le traitement des capacités d'un Pokémon
 * @param {Object} props - Les propriétés du hook
 * @param {Object} props.pokeInfo - Les données du Pokémon
 * @returns {Object} Les capacités formatées pour l'affichage
 */
const useAbilitiesTab = ({ pokeInfo }) => {
  const { t } = useTranslation();

  // Séparation des capacités normales et cachées
  const normalAbilities = useMemo(() => {
    if (!pokeInfo?.abilities) return [];
    
    return pokeInfo.abilities
      .filter(ability => !ability.is_hidden)
      .map(ability => {
        const abilityName = ability.ability.name.replace('-', ' ');
        return t(`pokemonTabs.abilities.abilityNames.${abilityName}`, abilityName);
      });
  }, [pokeInfo, t]);

  const hiddenAbilities = useMemo(() => {
    if (!pokeInfo?.abilities) return [];
    
    return pokeInfo.abilities
      .filter(ability => ability.is_hidden)
      .map(ability => {
        const abilityName = ability.ability.name.replace('-', ' ');
        return t(`pokemonTabs.abilities.abilityNames.${abilityName}`, abilityName);
      });
  }, [pokeInfo, t]);

  return { normalAbilities, hiddenAbilities };
};

export default useAbilitiesTab;
