import React from 'react';
import { Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import useGeneralInfoTab from './useGeneralInfoTab';

/**
 * Composant affichant les informations générales d'un Pokémon
 * @param {Object} props - Les propriétés du composant
 * @param {Object} props.species - Les données d'espèce du Pokémon
 * @param {Object} props.pokeInfo - Les données générales du Pokémon
 * @param {string} props.activeLanguage - La langue active
 */
const GeneralInfoTab = ({ species, pokeInfo, activeLanguage }) => {
  const { t } = useTranslation();
  const { formattedInfo } = useGeneralInfoTab({ species, pokeInfo, activeLanguage });

  return (
    <>
      <Typography variant="h6" sx={{ mb: 2 }}>{t('pokemonTabs.generalInfo.title')}</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography>
            <strong>{t('pokemonTabs.generalInfo.category')}:</strong> {formattedInfo.genus}
          </Typography>
          <Typography>
            <strong>{t('pokemonTabs.generalInfo.height')}:</strong> {formattedInfo.height} m
          </Typography>
          <Typography>
            <strong>{t('pokemonTabs.generalInfo.weight')}:</strong> {formattedInfo.weight} kg
          </Typography>
          <Typography>
            <strong>{t('pokemonTabs.generalInfo.eggGroups')}:</strong> {formattedInfo.eggGroups}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography>
            <strong>{t('pokemonTabs.generalInfo.habitat')}:</strong> {formattedInfo.habitat}
          </Typography>
          <Typography>
            <strong>{t('pokemonTabs.generalInfo.shape')}:</strong> {formattedInfo.shape}
          </Typography>
          <Typography>
            <strong>{t('pokemonTabs.generalInfo.color')}:</strong> {formattedInfo.color}
          </Typography>
          <Typography>
            <strong>{t('pokemonTabs.generalInfo.captureRate')}:</strong> {formattedInfo.captureRate}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default GeneralInfoTab;
