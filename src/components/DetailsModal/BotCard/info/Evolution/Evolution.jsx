import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Grid, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { formatId, urlConvert } from '../../../../../utils/textConvert';
import useEvolutionChain from './useEvolutionChain';
import LocalLoading from '../../../../Loaders/LocalLoading';

const Evolution = ({ pokeDetails, color }) => {
  const { evolDetails, isLoading } = useEvolutionChain(pokeDetails);
  const theme = useTheme();
  const { t } = useTranslation();

  if (!isLoading && !evolDetails) {
    return (
      <Grid
        sx={{
          height: '100%',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflowY: 'auto',
        }}
      >
        <Typography
          sx={{ color: theme.palette.text.primary, fontSize: '16px' }}
        >
          {t('botCard.noEvolutionData')}
        </Typography>
      </Grid>
    );
  }

  return evolDetails ? (
    <Grid
      id="evolution"
      sx={{
        height: '90%',
        width: '100%',
        overflowY: 'auto',
        overflowX: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: '6px',
        padding: '8px',
      }}
    >
      {isLoading ? (
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
        evolDetails.map((levelPokemon, levelIndex) => (
          <React.Fragment key={`level-${levelIndex}`}>
            <Grid
              container
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                position: 'relative',
              }}
            >
              {levelPokemon.map((pokemon, pokemonIndex) => {
                const id = urlConvert(pokemon);
                return (
                  <Grid
                    item
                    key={`${pokemon.name}-${pokemonIndex}`}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      minWidth: '100px',
                      maxWidth: '120px',
                      flex: '0 0 auto',
                      position: 'relative',
                      mt: '-2px',
                    }}
                  >
                    {pokemon?.evolutionDetails && (
                      <Typography
                        sx={{
                          fontSize: '12px',
                          color: theme.palette.text.secondary,
                          minHeight: '30px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '100px',
                          mb: '4px',
                        }}
                      >
                        {pokemon?.evolutionDetails?.condition}
                      </Typography>
                    )}
                    <img
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${urlConvert({ ...pokemon, name: pokemon.originalName || pokemon.name })}.png`}
                      alt={pokemon.name}
                      style={{ height: '80px' }}
                    />
                    <Typography
                      sx={{
                        fontSize: '16px',
                        fontWeight: 'bold',
                        textTransform: 'capitalize',
                        lineHeight: '16px',
                        color: theme.palette.text.primary,
                      }}
                    >
                      {pokemon?.name}
                    </Typography>
                    {id && (
                      <Typography
                        sx={{
                          fontSize: '12px',
                          fontWeight: 'bold',
                          textTransform: 'capitalize',
                          color: theme.palette.text.tertiary,
                        }}
                      >
                        {formatId(id)}
                      </Typography>
                    )}
                  </Grid>
                );
              })}
            </Grid>
          </React.Fragment>
        ))
      )}
    </Grid>
  ) : null;
};

export default Evolution;
