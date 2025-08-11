import React from 'react';
import { Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Evolution from '../../DetailsModal/BotCard/info/Evolution/Evolution';

/**
 * Composant affichant la chaîne d'évolution d'un Pokémon
 * @param {Object} props - Les propriétés du composant
 * @param {number} props.id - L'identifiant du Pokémon
 * @param {Object} props.species - Les données d'espèce du Pokémon
 * @param {string} props.activeLanguage - La langue active
 */
const EvolutionTab = ({ id, species, activeLanguage }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <>
      <Typography variant="h6" sx={{ mb: 2 }}>
        {t('pokemonTabs.evolution.title')}
      </Typography>
      <Evolution pokeDetails={species} color={theme.palette.primary.main} />
    </>
  );
};

export default EvolutionTab;
