import React, { useMemo } from 'react';
import { Grid, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import {
  capitalizeUppercase,
  formatDesc,
} from '../../../../../utils/textConvert';
import LocalLoading from '../../../../Loaders/LocalLoading';
import TypeStats from '../Stats/TypeStats';
import { Mars, Venus } from 'lucide-react';

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

  const getGender = (genderRate) => {
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

  const aboutData = [
    {
      label: 'species',
      value: pokeDetails?.genera?.find(
        (genus) => genus.language.name === activeLanguage,
      )?.genus,
      display: false,
    },
    {
      label: 'height',
      value: `${selectedPokeInfos?.height / 10}m`,
      display: false,
    },
    {
      label: 'weight',
      value: `${selectedPokeInfos?.weight / 10}kg (${((selectedPokeInfos?.weight / 10) * 2.204).toFixed(1)}lbs)`,
      display: false,
    },
    {
      label: 'weaknesses',
      value: <TypeStats selectedPokeInfos={selectedPokeInfos} onlyDouble />,
      display: true,
    },
    {
      label: 'gender',
      value: getGender(pokeDetails?.gender_rate),
      display: true,
    },
  ];

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
        <Grid container sx={{ flexDirection: 'column', gap: '12px' }}>
          {aboutData?.map((data, index) => (
            <Grid
              sx={{
                display: 'flex',
                gap: '12px',
                // justifyContent: 'space-between',
              }}
              key={index}
            >
              <Typography
                sx={{
                  color: theme.palette.text.tertiary,
                  fontSize: '18px',
                  fontWeight: 500,
                  width: '120px',
                }}
              >
                {t(`about.${data.label}`)}
              </Typography>
              {data.display ? (
                data.value
              ) : (
                <Typography
                  sx={{
                    color: theme.palette.text.primary,
                    fontSize: '18px',
                    fontWeight: 600,
                  }}
                >
                  {data.value}
                </Typography>
              )}
            </Grid>
          ))}
          <Typography
            sx={{
              fontSize: '18px',
              color: theme.palette.text.secondary,
              mt: '16px',
            }}
          >
            {useableDesc}
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default About;
