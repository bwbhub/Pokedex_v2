import React from 'react';
import { ResponsiveRadar } from '@nivo/radar';
import { Grid, LinearProgress, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';

import LocalLoading from '../../../../Loaders/LocalLoading';
import TypeStats from './TypeStats';

const Stats = ({ selectedPokeInfos, color, loading }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const generalStats = selectedPokeInfos?.stats;

  const stats = generalStats.map((statObj) => ({
    stat: statObj?.stat?.name.replace(/special/i, 's'),
    value: statObj?.base_stat,
  }));

  return (
    <Grid
      id="about"
      container
      sx={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '8px',
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
        <Grid
          container
          sx={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            mt: '12px',
          }}
        >
          {/* <img
              src={bitImg}
              alt="bit-version"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 10,
                width: '20%',
              }}
            />
            <ResponsiveRadar
              data={stats}
              keys={['value']}
              indexBy="stat"
              maxValue={maxValuecheck(stats) === true ? 255 : 155}
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              valueFormat=">-.0f"
              colors={color}
              borderColor={color}
              borderWidth={3}
              fillOpacity={0.4}
              gridLabelOffset={10}
              motionConfig="wobbly"
              gridShape="linear"
              enableDots={false}
              isInteractive={true}
              theme={{
                axis: {
                  ticks: {
                    text: {
                      fill: theme.palette.text.primary,
                      fontSize: 13,
                      textTransform: 'capitalize',
                    },
                  },
                },
                tooltip: {
                  container: {
                    textTransform: 'capitalize',
                    background: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                  },
                },
              }}
            /> */}
          {stats?.map((stat, index) => (
            <Grid
              xs={12}
              key={index}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                gap: '8px',
              }}
            >
              <Grid
                sx={{
                  display: 'flex',
                  gap: '8px',
                  // justifyContent: 'space-between',
                }}
              >
                <Typography
                  sx={{
                    color: theme.palette.text.tertiary,
                    fontSize: '16px',
                    fontWeight: 500,
                    textTransform: 'capitalize',
                  }}
                >
                  {t(`stats.${stat.stat}`)}
                </Typography>
                <Typography
                  sx={{
                    color: theme.palette.text.primary,
                    fontSize: '16px',
                    fontWeight: 600,
                    width: '40px',
                    textAlign: 'center',
                  }}
                >
                  {stat.value}
                </Typography>
              </Grid>
              <LinearProgress
                variant="determinate"
                value={(stat.value / 255) * 100}
                sx={{
                  width: '100%',
                  height: '8px',
                  borderRadius: '5px',
                  backgroundColor: theme.palette.tertiary.main,
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: color,
                  },

                  '--LinearProgress-progressRadius': '12px',
                  '--LinearProgress-radius': '12px',
                }}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Grid>
  );
};

export default Stats;
