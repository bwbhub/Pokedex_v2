import React from 'react';
import {
  Box,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import useStatisticsTab from './useStatisticsTab';
import Stats from '../../DetailsModal/BotCard/info/Stats/Stats';
import PokemonTypeChip from '../../PokemonTypeChip/PokemonTypeChip';
import useTypeEffectiveness from './useTypeEffectiveness';
import { typeList } from '../../../utils/svgs';

const StatisticsTab = ({ pokeInfo, color, isMobile }) => {
  const { t } = useTranslation();
  const { display, handleDisplayChange, statistics } = useStatisticsTab({
    pokeInfo,
  });
  const { multipliers } = useTypeEffectiveness(pokeInfo?.types);

  return (
    <Grid>
      <Grid sx={{ display: 'flex', gap: 4, alignItems: 'center' }}>
        <Typography variant="h6">
          {t('pokemonTabs.statistics.title')}
        </Typography>
        <ToggleButtonGroup
          value={display}
          exclusive
          onChange={handleDisplayChange}
          sx={{ maxHeight: '28px' }}
        >
          <ToggleButton
            sx={{ py: 0, px: 1, textTransform: 'capitalize' }}
            value={true}
          >
            Linéaire
          </ToggleButton>
          <ToggleButton
            sx={{ py: 0, px: 1, textTransform: 'capitalize' }}
            value={false}
          >
            Graph
          </ToggleButton>
        </ToggleButtonGroup>
      </Grid>
      <Grid sx={{ width: '100%' }}>
        <Stats
          selectedPokeInfos={pokeInfo}
          color={color}
          display={display}
          isMobile={isMobile}
          statistics={statistics}
          onPage
        />
      </Grid>
      <Grid sx={{ mt: 2, width: '100%' }}>
        <Box
          sx={{
            mt: 0.5,
            display: 'grid',
            gap: 1,
            gridTemplateColumns: { xs: 'repeat(4, 1fr)', md: 'repeat(6, 1fr)' },
            alignItems: 'stretch',
          }}
        >
          {typeList.map((type) => {
            const m = multipliers?.[type];
            const typo = m === 4
              ? 'x4'
              : m === 2
              ? 'x2'
              : m === 0.5
              ? 'x1/2'
              : m === 0.25
              ? 'x1/4'
              : m === 0
              ? 'x0'
              : 'x1';
            return (
              <Box key={`eff-cell-${type}`} sx={{ width: '100%' }}>
                <PokemonTypeChip type={type} typo={typo} sx={{ width: '100%' }} />
              </Box>
            );
          })}
        </Box>
      </Grid>
    </Grid>
  );
};

export default StatisticsTab;
