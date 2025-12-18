import { Grid, Typography, useTheme } from '@mui/material';
import { Mars, Venus } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Gender = ({ genderRate }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  if (genderRate === -1) {
    return (
      <Typography
        sx={{
          color: theme.palette.text.primary,
          fontSize: '18px',
          fontWeight: 600,
        }}
      >
        {t('gender.genderless')}
      </Typography>
    );
  } else {
    const femalePercentage = (genderRate / 8) * 100;
    const malePercentage = 100 - femalePercentage;

    return (
      <Grid sx={{ display: 'flex', gap: '12px' }}>
        <Typography
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '4px',
            color: '#F293C5',
            fontSize: '16px',
            fontWeight: 600,
          }}
        >
          <Venus /> {femalePercentage.toFixed(1)}%
        </Typography>
        <Typography
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '4px',
            color: '#64B6F3',
            fontWeight: 600,
            fontSize: '16px',
          }}
        >
          <Mars /> {malePercentage.toFixed(1)}%
        </Typography>
      </Grid>
    );
  }
};

export default Gender;
