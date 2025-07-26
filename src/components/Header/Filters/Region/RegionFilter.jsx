import React from 'react';
import { Grid, Tooltip, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import './RegionFilter.css';
import useRegionFilter from './RegionFilterHooks';
import { imgRegionList } from '../../../../utils/regionList';

const RegionFilter = ({ closeFilterModal }) => {
  const {
    regionList,
    handleRegionFilter,
    regionFilter,
    openList,
    pokedexesList,
    activeLanguage,
    handlePokedexFilter,
    handleClear,
  } = useRegionFilter({
    closeFilterModal,
  });

  const { t } = useTranslation();

  return (
    <Grid container spacing={1.5}>
      {regionList?.map((region, index) => (
        <Grid item xs={4} sx={{ width: '100px' }} key={region?.name + index}>
          <button
            key={index}
            onClick={() => handleRegionFilter(region?.name)}
            style={{
              border: 'none',
              width: '100%',
              cursor: 'pointer',
              backgroundColor: 'transparent',
            }}
            className={regionFilter === region?.name ? 'bounce' : ''}
          >
            <img
              src={imgRegionList[region?.name]}
              alt={region?.name}
              style={{ width: '100%' }}
            />
          </button>
        </Grid>
      ))}
      {openList && pokedexesList?.length > 1 && (
        <Grid
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <Grid sx={{ display: 'flex', gap: '12px', width: '100%' }}>
            {pokedexesList?.map((pokedex) => (
              <Tooltip
                title={
                  <Typography sx={{ fontSize: '14px' }}>
                    {`${
                      pokedex?.descriptions?.find(
                        (dex) => dex?.language?.name === activeLanguage,
                      )?.description ||
                      pokedex?.descriptions?.find(
                        (dex) => dex?.language?.name === 'en',
                      )?.description
                    }

                    (${pokedex?.pokemon_entries?.length} Pokémons)`}
                  </Typography>
                }
                key={pokedex?.name}
              >
                <button
                  onClick={() => handlePokedexFilter(pokedex)}
                  style={{
                    border: 'none',
                    width: '100%',
                    maxWidth: 'fit-content',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: 600,
                  }}
                >
                  {pokedex?.names?.find(
                    (dex) => dex?.language?.name === activeLanguage,
                  )?.name ||
                    pokedex?.names?.find((dex) => dex?.language?.name === 'en')
                      ?.name}
                </button>
              </Tooltip>
            ))}
          </Grid>

          <button
            onClick={handleClear}
            style={{
              border: 'none',
              width: '100%',
              maxWidth: 'fit-content',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 600,
              textDecoration: 'underline',
              ml: 'auto',
            }}
          >
            {t('filters.reset')}
          </button>
        </Grid>
      )}
    </Grid>
  );
};

export default RegionFilter;
