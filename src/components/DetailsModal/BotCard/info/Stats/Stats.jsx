import React from 'react';
import { ResponsiveRadar } from '@nivo/radar';
import { Grid, LinearProgress, Typography, useTheme, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

import LocalLoading from '../../../../Loaders/LocalLoading';

const Stats = ({
  selectedPokeInfos,
  color,
  loading,
  display = true,
  isMobile,
  statistics = [],
  onPage = false,
}) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const generalStats =
    statistics?.length > 0 ? statistics : selectedPokeInfos?.stats;

  const stats = generalStats?.map((statObj) => ({
    stat: statObj?.stat?.name
      ? t(`stats.${statObj?.stat?.name?.replace(/special/i, 's')}`)
      : t(`stats.${statObj?.stat?.replace(/special/i, 's')}`),
    value: statObj?.base_stat,
    value_50: statObj?.stat_50 ?? null,
    value_100: statObj?.stat_100 ?? null,
  }));

  const maxValuecheck = (stats) => {
    for (let i = 0; i < stats?.length; i++) {
      const value = stats[i]?.value;
      if (value > 150) return true;
    }
  };

  const bitImg = selectedPokeInfos?.sprites?.front_default;

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
          {display ? (
            <>
              {onPage && (
                <Grid
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: theme.palette.text.secondary,
                  }}
                >
                  <Typography sx={{ fontSize: '12px' }}>
                    {t('pokemonTabs.statistics.legend.order')}{' '}
                    {t('pokemonTabs.statistics.legend.base')},{' '}
                    <Box
                      component="span"
                      sx={{ color: theme.palette.info.main }}
                    >
                      {t('pokemonTabs.statistics.legend.level50')}
                    </Box>
                    ,{' '}
                    <Box
                      component="span"
                      sx={{ color: theme.palette.success.main }}
                    >
                      {t('pokemonTabs.statistics.legend.level100')}
                    </Box>
                  </Typography>
                </Grid>
              )}
              {stats?.map((stat, index) => (
                <Grid
                  xs={12}
                  key={index}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    gap: isMobile ? '4px' : '8px',
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
                      {stat.stat}
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
                    {stat?.value_50 != null && (
                      <Typography
                        sx={{
                          color: theme.palette.info.main,
                          fontSize: '16px',
                          fontWeight: 600,
                          width: '40px',
                          textAlign: 'center',
                        }}
                      >
                        {stat.value_50}
                      </Typography>
                    )}
                    {stat?.value_100 != null && (
                      <Typography
                        sx={{
                          color: theme.palette.success.main,
                          fontSize: '16px',
                          fontWeight: 600,
                          width: '40px',
                          textAlign: 'center',
                        }}
                      >
                        {stat.value_100}
                      </Typography>
                    )}
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
            </>
          ) : (
            <Grid
              sx={{
                position: 'relative',
                width: '100%',
                height: isMobile ? 210 : 320,
              }}
            >
              <img
                src={bitImg}
                alt="bit-version"
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 10,
                  width: isMobile ? '20%' : '10%',
                }}
              />
              <Box sx={{ width: '100%', height: '100%' }}>
                {stats?.length > 0 && (
                  <ResponsiveRadar
                    data={stats}
                    keys={['value']}
                    indexBy="stat"
                    maxValue={maxValuecheck(stats) === true ? 255 : 155}
                    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                    valueFormat=">-.0f"
                    colors={[color]}
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
                  />
                )}
              </Box>
            </Grid>
          )}
        </Grid>
      )}
    </Grid>
  );
};

export default Stats;
