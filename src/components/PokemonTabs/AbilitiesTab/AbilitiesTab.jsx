import React from 'react';
import { Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import useAbilitiesTab from './useAbilitiesTab';

/**
 * Composant affichant les capacités d'un Pokémon
 * @param {Object} props - Les propriétés du composant
 * @param {Object} props.pokeInfo - Les données du Pokémon
 */
const AbilitiesTab = ({ pokeInfo }) => {
  const { t } = useTranslation();
  const { normalAbilities, hiddenAbilities } = useAbilitiesTab({ pokeInfo });

  return (
    <>
      <Typography variant="h6" sx={{ mb: 2 }}>{t('pokemonTabs.abilities.title')}</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
            {t('pokemonTabs.abilities.normalAbilities')}:
          </Typography>
          {normalAbilities.length > 0 ? (
            normalAbilities.map((ability, index) => (
              <Typography key={index} sx={{ textTransform: 'capitalize', mb: 0.5 }}>
                {ability}
              </Typography>
            ))
          ) : (
            <Typography>{t('pokemonTabs.abilities.none')}</Typography>
          )}
        </Grid>
        <Grid item xs={12} sx={{ mt: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
            {t('pokemonTabs.abilities.hiddenAbility')}:
          </Typography>
          {hiddenAbilities.length > 0 ? (
            hiddenAbilities.map((ability, index) => (
              <Typography key={index} sx={{ textTransform: 'capitalize', mb: 0.5 }}>
                {ability}
              </Typography>
            ))
          ) : (
            <Typography>{t('pokemonTabs.abilities.noHidden')}</Typography>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default AbilitiesTab;
