import React from 'react';
import { Card, Grid, Typography, Box, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';

import useListCard from './ListCardHooks';
import pokeball from '../../assets/pokeball.png';
import dots from '../../assets/dot.svg';
import { formatId } from '../../utils/textConvert';
import PokemonTypeChip from '../PokemonTypeChip/PokemonTypeChip';

const ListCard = ({ pokemonId, setOpenModal }) => {
  const { pokeInfo, species, handleOpenModal, filteredName } = useListCard({
    id: pokemonId,
    setOpenModal,
  });
  const { t } = useTranslation();
  const theme = useTheme();

  const imgUrl = pokeInfo?.sprites?.other?.['official-artwork']?.front_default;
  const mainType = pokeInfo?.types[0].type.name;
  const color = theme.palette.pokemon.background[mainType];

  console.log('species', species);

  return (
    <Card
      sx={{
        backgroundColor: color,
        borderRadius: '8px',
        position: 'relative',
        padding: '20px',
        cursor: 'pointer',
        width: '100%',
        minWidth: '287px',
        height: '128px',
        backgroundImage:
          'linear-gradient(120deg, rgba(255,255,255,0.05) 10%, rgba(0,0,0,0.1) 100%)',
        transition: 'transform 0.3s ease-in-out',
        overflow: 'hidden',
        '&:hover': {
          transform: 'scale(1.07)',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        },
      }}
      onClick={handleOpenModal}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      >
        <img
          src={pokeball}
          alt="pokemon"
          style={{
            position: 'absolute',
            top: '-36px',
            right: '-56px',
            height: '208px',
            opacity: 0.3,
          }}
        />
        <img
          src={dots}
          alt="dots"
          style={{
            position: 'absolute',
            height: '4rem',
            overflow: 'hidden',
            left: '12px',
            top: '-18px',
            opacity: 0.15,
          }}
        />
      </Box>

      <Grid
        sx={{
          position: 'relative',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Box>
          <Typography
            style={{ fontSize: '12px', fontWeight: 'medium', color: '#f3f4f6' }}
          >
            {formatId(pokemonId)}
          </Typography>
          <Typography
            style={{
              fontSize: '26px',
              fontWeight: 'bold',
              textTransform: 'capitalize',
              color: '#f3f4f6',
            }}
          >
            {filteredName}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: '12px' }}>
          {pokeInfo?.types?.map((type, idx) => (
            <PokemonTypeChip key={type + idx} type={type} />
          ))}
        </Box>
      </Grid>

      <Box
        sx={{
          position: 'absolute',
          width: '45%',
          right: 0,
          top: -2,
          filter: 'brightness(1.05) saturate(1.5)',
        }}
      >
        <img src={imgUrl} alt={pokeInfo?.name} style={{ width: '100%' }} />
      </Box>
    </Card>
  );
};

export default ListCard;
