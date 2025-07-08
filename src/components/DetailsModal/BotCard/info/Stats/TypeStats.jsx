import React, { useEffect, useState } from 'react';
import { Grid, Tooltip, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';

import pokeApi from '../../../../../api/modules/pokedex.api';
import { typeListSvg } from '../../../../../utils/svgs';
import { textColors } from '../../../../../utils/color';

const TypeStats = ({ selectedPokeInfos, onlyDouble = false }) => {
  const [mainTypeIs, setMainTypeIs] = useState(null);
  const [secondTypeIs, setSecondTypeIs] = useState(null);
  const { t } = useTranslation();
  const theme = useTheme();

  const mainType = selectedPokeInfos.types[0]?.type?.name;
  const secondType = selectedPokeInfos?.types[1]?.type?.name;

  const noDmg = [];
  const halfDmg = [];
  const doubleDmg = [];

  const noDmgFromMain = mainTypeIs?.no_damage_from?.map(
    (statObj) => statObj?.name,
  );

  const halfDmgFromMain = mainTypeIs?.half_damage_from?.map(
    (statObj) => statObj?.name,
  );

  const doubleDmgFromMain = mainTypeIs?.double_damage_from?.map(
    (statObj) => statObj?.name,
  );

  const noDmgFromSecond = secondTypeIs?.no_damage_from?.map(
    (statObj) => statObj?.name,
  );
  const halfDmgFromSecond = secondTypeIs?.half_damage_from?.map(
    (statObj) => statObj?.name,
  );
  const doubleDmgFromSecond = secondTypeIs?.double_damage_from?.map(
    (statObj) => statObj?.name,
  );

  const pushUnique = (arr, values) => {
    values.forEach((value) => {
      if (!arr.includes(value)) {
        arr.push(value);
      }
    });
  };

  if ((noDmgFromMain, halfDmgFromMain, doubleDmgFromMain !== undefined)) {
    pushUnique(noDmg, noDmgFromMain);
    pushUnique(halfDmg, halfDmgFromMain);
    pushUnique(doubleDmg, doubleDmgFromMain);
  }

  if ((noDmgFromSecond, halfDmgFromSecond, doubleDmgFromSecond !== undefined)) {
    pushUnique(noDmg, noDmgFromSecond);
    pushUnique(halfDmg, halfDmgFromSecond);
    pushUnique(doubleDmg, doubleDmgFromSecond);
  }

  useEffect(() => {
    const getMainType = async (typeName) => {
      const { response, err } = await pokeApi.getType({ typeName: typeName });

      if (response) {
        const data = response.damage_relations;
        setMainTypeIs(data);
      } else {
        console.error(err);
      }
    };

    const getSecondType = async (typeName) => {
      const { response, err } = await pokeApi.getType({ typeName: typeName });

      if (response) {
        const data = response.damage_relations;
        setSecondTypeIs(data);
      } else {
        console.error(err);
      }
    };

    getMainType(mainType);
    if (secondType !== undefined) {
      getSecondType(secondType);
    }
  }, [mainType, secondType]);

  return onlyDouble ? (
    <>
      <Grid
        sx={{
          display: 'flex',
          gap: '8px',
        }}
      >
        {doubleDmg.map((type, idx) => (
          <Tooltip title={t(`types.${type}`)} arrow>
            <Grid
              key={type + idx}
              sx={{
                backgroundColor: textColors[type],
                padding: '5px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
                borderRadius: '4px',
                width: '28px',
              }}
            >
              <img
                src={typeListSvg[type]}
                alt={`${type}`}
                style={{ width: '100%' }}
              />
            </Grid>
          </Tooltip>
        ))}
      </Grid>
    </>
  ) : (
    <Grid
      container
      sx={{
        width: '100%',
        height: '33%',
        paddingX: '8px',
        color: theme.palette.text.primary,
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
      }}
    >
      {noDmg.length > 0 && (
        <Grid>
          <Typography
            sx={{
              fontSize: '16px',
            }}
          >
            {t('botCard.takesNoDamageFrom')}
          </Typography>
          <Grid
            sx={{
              display: 'flex',
              gap: '8px',
            }}
          >
            {noDmg.map((type, idx) => (
              <Grid
                key={type + idx}
                sx={{
                  backgroundColor: textColors[type],
                  padding: '5px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px',
                  borderRadius: '4px',
                  width: '28px',
                }}
              >
                <img
                  src={typeListSvg[type]}
                  alt={`${type}`}
                  style={{ width: '100%' }}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      )}
      {halfDmg.length > 0 && (
        <Grid>
          <Typography
            sx={{
              fontSize: '16px',
            }}
          >
            {t('botCard.takesHalfDamageFrom')}
          </Typography>
          <Grid
            sx={{
              display: 'flex',
              gap: '8px',
            }}
          >
            {' '}
            {halfDmg.map((type, idx) => (
              <Grid
                key={type + idx}
                sx={{
                  backgroundColor: textColors[type],
                  padding: '5px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px',
                  borderRadius: '4px',
                  width: '28px',
                }}
              >
                <img
                  src={typeListSvg[type]}
                  alt={`${type}`}
                  style={{ width: '100%' }}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      )}
      {doubleDmg.length > 0 && (
        <Grid>
          <Typography
            sx={{
              fontSize: '16px',
            }}
          >
            {t('botCard.takesDoubleDamageFrom')}
          </Typography>
          <Grid
            sx={{
              display: 'flex',
              gap: '8px',
            }}
          >
            {' '}
            {doubleDmg.map((type, idx) => (
              <Grid
                key={type + idx}
                sx={{
                  backgroundColor: textColors[type],
                  padding: '5px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px',
                  borderRadius: '4px',
                  width: '28px',
                }}
              >
                <img
                  src={typeListSvg[type]}
                  alt={`${type}`}
                  style={{ width: '100%' }}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default TypeStats;
