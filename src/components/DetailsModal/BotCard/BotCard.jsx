import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button, Grid, Box, useTheme } from '@mui/material';
import './BotCard.css';

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

  // Définir la variable CSS pour la couleur de fond des onglets
  useEffect(() => {
    document.documentElement.style.setProperty(
      '--tab-bg-color',
      theme.palette.background.paper,
    );
  }, [theme.palette.background.paper]);

  return (
    <Grid
      sx={{
        backgroundColor: theme.palette.background.paper,
        height: '100%',
        padding: '0',
        marginTop: '12px',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <Grid
        className="tabs-container"
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          height: '44px',
          backgroundColor: color,
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Indicateur d'onglet avec animation */}
        <Box
          className="tab-indicator"
          sx={{
            width: '33.333%',
            left:
              activeComp === 'about'
                ? '0%'
                : activeComp === 'stats'
                  ? '33.33%'
                  : '66.66%',
          }}
        />

        <Box
          component="button"
          className="tab-button"
          onClick={() => setActiveComp('about')}
          sx={{
            textTransform: 'capitalize',
            color: activeComp === 'about' ? theme.palette.text.primary : '#fff',
            fontWeight: activeComp === 'about' ? 'bold' : 'normal',
            backgroundColor: 'transparent',
            minWidth: '33%',
            height: '38px',
            position: 'relative',
            zIndex: 2,
            border: 'none',
            cursor: 'pointer',
            padding: '12px 16px',
            outline: 'none',
            '&:focus': {
              outline: 'none',
            },
          }}
        >
          {t('botCard.about')}
        </Box>
        <Box
          component="button"
          className="tab-button"
          onClick={() => setActiveComp('stats')}
          sx={{
            textTransform: 'capitalize',
            color: activeComp === 'stats' ? theme.palette.text.primary : '#fff',
            fontWeight: activeComp === 'stats' ? 'bold' : 'normal',
            backgroundColor: 'transparent',
            minWidth: '33%',
            height: '38px',
            position: 'relative',
            zIndex: 2,
            border: 'none',
            cursor: 'pointer',
            padding: '12px 16px',
            outline: 'none',
            '&:focus': {
              outline: 'none',
            },
          }}
        >
          {t('botCard.stats')}
        </Box>
        <Box
          component="button"
          className="tab-button"
          onClick={() => setActiveComp('evolution')}
          sx={{
            textTransform: 'capitalize',
            color:
              activeComp === 'evolution' ? theme.palette.text.primary : '#fff',
            fontWeight: activeComp === 'evolution' ? 'bold' : 'normal',
            backgroundColor: 'transparent',
            minWidth: '33%',
            height: '38px',
            position: 'relative',
            zIndex: 2,
            border: 'none',
            cursor: 'pointer',
            padding: '12px 16px',
            outline: 'none',
            '&:focus': {
              outline: 'none',
            },
          }}
        >
          {t('botCard.evolution')}
        </Box>
      </Grid>
      <Grid sx={{ padding: '16px', height: '100%', width: '100%' }}>
        {modalComponent()}
      </Grid>
    </Grid>
  );
};

export default BotCard;
