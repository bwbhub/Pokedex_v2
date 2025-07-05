import React from 'react';
import { Chip, useTheme } from '@mui/material';

/**
 * Composant pour afficher un type de Pokémon sous forme de puce
 * @param {Object} props
 * @param {string} props.type - Le type de Pokémon (bug, dark, dragon, etc.)
 * @param {Object} props.sx - Styles supplémentaires à appliquer au composant
 */
const PokemonTypeChip = ({ type, sx = {} }) => {
  const theme = useTheme();
  
  // Récupérer les couleurs du thème pour ce type de Pokémon
  const backgroundColor = theme.palette.pokemon.background[type] || theme.palette.grey[500];
  const textColor = theme.palette.pokemon.text[type] || theme.palette.common.white;
  
  return (
    <Chip
      label={type}
      sx={{
        backgroundColor,
        color: textColor,
        fontWeight: 'bold',
        textTransform: 'capitalize',
        ...sx
      }}
    />
  );
};

export default PokemonTypeChip;
