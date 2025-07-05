import React, { useMemo } from 'react';
import { Grid, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import {
  capitalizeUppercase,
  formatDesc,
} from '../../../../../utils/textConvert';
import LocalLoading from '../../../../Loaders/LocalLoading';

const About = ({ selectedPokeInfos, pokeDetails, loading, color }) => {
  const activeLanguage = useSelector((state) => state.language.activeLanguage);
  const { t } = useTranslation();
  const theme = useTheme();

  const filteredDesc = useMemo(() => {
    return pokeDetails?.flavor_text_entries?.filter(
      (text) => text.language.name === activeLanguage,
    );
  }, [activeLanguage, pokeDetails]);

  const okDesc = formatDesc(filteredDesc[0]?.flavor_text);
  const useableDesc = capitalizeUppercase(okDesc);

  return (
    <Grid
      id="about"
      container
      sx={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        px: '24px',
        pt: '12px',
      }}
    >
      {loading ? (
        <Grid
          sx={{
            height: '100%',
            width: '100%',
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Grid sx={{ width: '25%', height: '25%' }}>
            <LocalLoading color={color} />
          </Grid>
        </Grid>
      ) : (
        <Grid container sx={{ flexDirection: 'column' }}>
          <Typography
            sx={{
              fontSize: '18px',
              color: theme.palette.text.secondary,
              mb: '16px',
            }}
          >
            {useableDesc}
          </Typography>
          <Typography
            sx={{
              fontSize: '18px',
              fontWeight: 'bold',
              mb: '4px',
              color: theme.palette.text.primary,
              width: '100%',
              textAlign: 'center',
            }}
          >
            {t('botCard.pokemonData')}
          </Typography>
          <Grid container sx={{ mb: '16px' }}>
            <Grid style={{ color: theme.palette.text.primary }}>
              <Typography>{t('botCard.height')}</Typography>
              <Typography>{t('botCard.weight')}</Typography>
            </Grid>
            <Grid sx={{ ml: '24px' }}>
              <Grid style={{ color: theme.palette.text.secondary }}>
                <Typography>{selectedPokeInfos?.height / 10 + 'm'}</Typography>
                <Typography>
                  {selectedPokeInfos?.weight / 10 +
                    'kg (' +
                    ((selectedPokeInfos?.weight / 10) * 2.204).toFixed(1) +
                    'lbs)'}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid container sx={{ gap: '16px', display: 'flex' }}>
            <Grid style={{ color: theme.palette.text.primary }}>
              <Typography>{t('botCard.captureRate')}</Typography>
              <Typography>{t('botCard.baseHappiness')}</Typography>
              <Typography>{t('botCard.baseExp')}</Typography>
              <Typography>{t('botCard.growthRate')}</Typography>
            </Grid>
            <Grid style={{ color: theme.palette.text.secondary }}>
              <Typography>{pokeDetails?.capture_rate} / 255</Typography>
              <Typography>{pokeDetails?.base_happiness} / 255</Typography>
              <Typography>{selectedPokeInfos?.base_experience}</Typography>
              <Typography>{pokeDetails?.growth_rate?.name}</Typography>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default About;
