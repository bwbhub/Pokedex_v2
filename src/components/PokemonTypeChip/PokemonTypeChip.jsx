import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { typeListSvg } from '../../utils/svgs';

const PokemonTypeChip = ({ type, sx = {}, fontSize = '12px', typo = '' }) => {
  const theme = useTheme();
  const { t } = useTranslation();

  // Utiliser le nom du type si c'est un objet (comme dans TopCard et ListCard)
  const typeName = typeof type === 'object' ? type?.type?.name : type;

  return (
    <Box
      sx={{
        paddingX: '8px',
        paddingY: '5px',
        borderRadius: '8px',
        display: 'flex',
        gap: '4px',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.palette.pokemon.type[typeName],
        color: '#f3f4f6',
        ...sx,
      }}
    >
      <img
        src={typeListSvg[typeName]}
        alt={`${typeName}`}
        style={{ width: '16px' }}
      />

      <Typography
        sx={{
          fontSize: fontSize,
          fontWeight: 'medium',
          textTransform: 'capitalize',
        }}
      >
        {typo !== '' ? typo : t(`types.${typeName}`)}
      </Typography>
    </Box>
  );
};

export default PokemonTypeChip;
