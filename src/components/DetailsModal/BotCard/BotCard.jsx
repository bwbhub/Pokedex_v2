import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button, Grid, useTheme } from '@mui/material';

import Stats from './info/Stats/Stats';
import Evolution from './info/Evolution/Evolution';
import About from './info/About/About';
import { setLocalLoading } from '../../../redux/features/localLoadingSlice';

const BotCard = ({ selectedPokeInfos, pokeDetails, color }) => {
  const [activeComp, setActiveComp] = useState('about');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const theme = useTheme();

  const modalComponent = () => {
    switch (activeComp) {
      case 'about':
        return (
          <About
            pokeDetails={pokeDetails}
            selectedPokeInfos={selectedPokeInfos}
            loading={loading}
            color={color}
          />
        );
      case 'stats':
        return (
          <Stats
            pokeDetails={pokeDetails}
            selectedPokeInfos={selectedPokeInfos}
            color={color}
            loading={loading}
          />
        );
      case 'evolution':
        return (
          <Evolution
            pokeDetails={pokeDetails}
            selectedPokeInfos={selectedPokeInfos}
            color={color}
            loading={loading}
          />
        );
      default:
        return (
          <About
            pokeDetails={pokeDetails}
            selectedPokeInfos={selectedPokeInfos}
            loading={loading}
            color={color}
          />
        );
    }
  };

  useEffect(() => {
    setLoading(true);
    dispatch(setLocalLoading(true));

    const timer = setTimeout(() => {
      setLoading(false);
      dispatch(setLocalLoading(false));
    }, 500);

    return () => clearTimeout(timer);
  }, [activeComp, dispatch]);

  return (
    <Grid
      id="bot-panel"
      container
      sx={{
        // height: '400px',
        height: '100%',
        backgroundColor: theme.palette.background.paper,
        borderRadius: ' 24px 24px 0 0',
      }}
    >
      <Grid
        sx={{
          height: '32px',
          width: '100%',
        }}
      >
        <Grid
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}
        >
          <Button
            sx={{
              textTransform: 'capitalize',
              color: theme.palette.text.primary,
              fontWeight: activeComp === 'about' ? 'bold' : 'Thin',
            }}
            onClick={() => setActiveComp('about')}
          >
            {t('botCard.about')}
          </Button>
          <Button
            sx={{
              textTransform: 'capitalize',
              color: theme.palette.text.primary,
              fontWeight: activeComp === 'stats' ? 'bold' : 'Thin',
            }}
            onClick={() => setActiveComp('stats')}
          >
            {t('botCard.stats')}
          </Button>
          <Button
            sx={{
              textTransform: 'capitalize',
              color: theme.palette.text.primary,
              fontWeight: activeComp === 'evolution' ? 'bold' : 'Thin',
            }}
            onClick={() => setActiveComp('evolution')}
          >
            {t('botCard.evolution')}
          </Button>
        </Grid>
      </Grid>
      {modalComponent()}
    </Grid>
  );
};

export default BotCard;
