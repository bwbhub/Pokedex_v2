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
import Gender from './Gender';

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
      value: `${selectedPokeInfos?.height / 10}m (${((selectedPokeInfos?.height / 10) * 3.281).toFixed(1)}ft)`,
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
      value: <Gender genderRate={pokeDetails?.gender_rate} />,
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
        mt: '24px',
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
        <Grid container sx={{ flexDirection: 'column', gap: '16px' }}>
          {aboutData?.map((data, index) => (
            <Grid
              sx={{
                display: 'flex',
                gap: '18px',
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
                    fontSize: '17px',
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
              fontSize: '19px',
              color: theme.palette.text.secondary,
              fontWeight: 500,
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
