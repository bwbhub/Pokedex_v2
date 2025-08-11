import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Hook pour le traitement des données d'informations générales d'un Pokémon
 * @param {Object} props - Les propriétés du hook
 * @param {Object} props.species - Les données d'espèce du Pokémon
 * @param {Object} props.pokeInfo - Les données générales du Pokémon
 * @param {string} props.activeLanguage - La langue active
 * @returns {Object} Les données formatées pour l'affichage
 */
const useGeneralInfoTab = ({ species, pokeInfo, activeLanguage }) => {
  const { t } = useTranslation();

  // Traitement et formatage des données pour l'affichage
  const formattedInfo = useMemo(() => {
    return {
      genus: species?.genera?.find(g => g.language.name === activeLanguage)?.genus || t('common.notFound'),
      height: pokeInfo?.height ? (pokeInfo.height / 10).toFixed(1) : t('common.notFound'),
      weight: pokeInfo?.weight ? (pokeInfo.weight / 10).toFixed(1) : t('common.notFound'),
      eggGroups: species?.egg_groups?.map(eg => t(`pokemonTabs.generalInfo.eggGroupTypes.${eg.name}`)).join(', ') || t('common.notFound'),
      habitat: species?.habitat?.name ? t(`pokemonTabs.generalInfo.habitatTypes.${species.habitat.name}`) : t('common.notFound'),
      shape: species?.shape?.name ? t(`pokemonTabs.generalInfo.shapeTypes.${species.shape.name}`) : t('common.notFound'),
      color: species?.color?.name ? t(`pokemonTabs.generalInfo.colorTypes.${species.color.name}`) : t('common.notFound'),
      captureRate: species?.capture_rate !== undefined ? species.capture_rate : t('common.notFound')
    };
  }, [species, pokeInfo, activeLanguage, t]);

  return { formattedInfo };
};

export default useGeneralInfoTab;
