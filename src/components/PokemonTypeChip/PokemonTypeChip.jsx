import React from 'react';
import { Chip, useTheme } from '@mui/material';

const PokemonTypeChip = ({ type, sx = {} }) => {
  const theme = useTheme();

  const backgroundColor =
    theme.palette.pokemon.background[type] || theme.palette.grey[500];
  const textColor =
    theme.palette.pokemon.text[type] || theme.palette.common.white;

  return (
    <Chip
      label={type}
      sx={{
        backgroundColor,
        color: textColor,
        fontWeight: 'bold',
        textTransform: 'capitalize',
        ...sx,
      }}
    />
  );
};

export default PokemonTypeChip;
