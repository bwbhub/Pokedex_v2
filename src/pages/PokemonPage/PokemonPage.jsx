import React, { useEffect, useRef } from 'react';
import { Box, Button, Grid, Typography, useMediaQuery } from '@mui/material';

import './PokemonPage.css';
import usePokemonPage from './PokemonPageHooks';
import { hexToRgba } from '../../utils/color';
import pokeball from '../../assets/pokeball.png';
import PokemonTypeChip from '../../components/PokemonTypeChip/PokemonTypeChip';
import { formatId } from '../../utils/textConvert';
import { Link, useNavigate } from 'react-router-dom';

const PokemonPage = () => {
  const {
    species,
    pokeInfo,
    filteredName,
    shownId,
    animationDistance,
    setAnimationDistance,
    shinyImg,
    setShinyImg,
    mainType,
    color,
    theme,
    activeLanguage,
    id,
  } = usePokemonPage();
  const textRef = useRef(null);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  // Nouveau: détection du breakpoint mobile
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (containerRef.current && textRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const textWidth = textRef.current.offsetWidth;
      const distance = textWidth - containerWidth;
      setAnimationDistance(distance > 0 ? distance : 0);

      if (textRef.current) {
        textRef.current.style.setProperty('--slide-distance', `-${distance}px`);
      }
    }
  }, [filteredName]);

  return (
    <Grid
      container
      sx={{ backgroundColor: color, height: '100%', minHeight: '100vh' }}
    >
      {/* Conteneur pour la barre sticky qui ne prend pas de place dans le flux */}
      <Box sx={{ height: 0, width: '100%', position: 'relative', zIndex: 10 }}>
        <Grid
          xs={12}
          sx={{
            width: '100%',
            height: '50px',
            position: isMobile ? 'sticky' : 'absolute',
            top: 0, // Important pour le positionnement sticky
            backgroundColor: color,
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Grid sx={{ width: '40%', px: '12px' }}>
            {isMobile ? (
              <Link to={`/${Number(id) - 1}`}>{formatId(shownId - 1)}</Link>
            ) : (
              Array.from({ length: 4 })
                .map((_, index) => (
                  <Link to={`/${Number(id) - (index + 1)}`} key={index}>
                    {formatId(shownId - (index + 1))}
                  </Link>
                ))
                .reverse()
            )}
          </Grid>
          <Grid sx={{ width: '40%', textAlign: 'end', px: '12px' }}>
            {isMobile ? (
              <Link to={`/${Number(id) + 1}`}>{formatId(shownId + 1)}</Link>
            ) : (
              Array.from({ length: 4 }).map((_, index) => (
                <Link to={`/${Number(id) + (index + 1)}`} key={index}>
                  {formatId(shownId + (index + 1))}
                </Link>
              ))
            )}
          </Grid>
        </Grid>
      </Box>
      {/* Section 1: Détails du Pokémon */}
      <Grid
        sx={{
          width: isMobile ? '100%' : '40%',
          height: '100%',
          minHeight: ['100vh', '100dvh'],
          position: 'relative',
          overflow: 'hidden',
        }}
        xs={12}
        sm={5}
      >
        <Grid
          ref={containerRef}
          className="bg-title-container"
          sx={{
            top: '-16px',
            height: '300px',
            zIndex: 0,
          }}
        >
          <Typography
            ref={textRef}
            className="bg-title"
            sx={{
              color: 'transparent',
              fontSize: '200px',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              top: '1px',
              animation:
                animationDistance > 0 ? 'sliding 20s infinite linear' : 'none',
              left: '0',
              position: 'absolute',
              pointerEvents: 'none',
              zIndex: 1,
            }}
          >
            {filteredName}
          </Typography>
          <span
            style={{
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `linear-gradient(to top, ${hexToRgba(color, 1)} 30%, ${hexToRgba(color, 0)} 100%)`,
              pointerEvents: 'none',
              zIndex: 2,
            }}
          />
          <span
            style={{
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `linear-gradient(to left, ${hexToRgba(color, 1)} 0%, ${hexToRgba(color, 0)} 5%)`,
              pointerEvents: 'none',
              zIndex: 2,
            }}
          />
        </Grid>
        <Grid
          sx={{
            width: isMobile ? '90%' : '70%',
            overflow: 'hidden',
            position: 'absolute',
            left: '50%',
            bottom: '50%',
            transform: 'translate(-50%, 50%)',
            zIndex: 4,
          }}
        >
          <Grid
            sx={{
              width: '200%',
              transition:
                'margin-left 800ms cubic-bezier(0.770, 0.000, 0.175, 1.000)',
              ml: shinyImg ? '-100%' : 0,
              cursor: 'pointer',
            }}
            onClick={() => setShinyImg(!shinyImg)}
          >
            <Box
              component="img"
              src={
                pokeInfo?.sprites?.other?.['official-artwork']?.front_default
                // pokeInfo?.sprites?.other?.home?.front_default
              }
              alt={filteredName}
              sx={{
                width: '50%',
                zIndex: 5,
                filter:
                  'brightness(1.05) saturate(1.5) drop-shadow(5px 5px 5px rgba(0,0,0,0.3))',
              }}
            />
            <Box
              component="img"
              src={
                pokeInfo?.sprites?.other?.['official-artwork']?.front_shiny
                // pokeInfo?.sprites?.other?.home?.front_shiny
              }
              alt={filteredName}
              sx={{
                width: '50%',
                zIndex: 5,
                filter:
                  'brightness(1.05) saturate(1.5) drop-shadow(5px 5px 5px rgba(0,0,0,0.3))',
              }}
            />
          </Grid>
          <img
            src={pokeball}
            alt="Pokeball"
            style={{
              rotate: '35deg',
              maskImage: `url(${pokeball})`,
              WebkitMaskImage: `url(${pokeball})`,
              maskSize: 'contain',
              WebkitMaskSize: 'contain',
              backgroundColor: theme.palette.text.secondary,
              position: 'absolute',
              width: '100%',
              left: '70%',
              bottom: '25%',
              transform: 'translate(-50%, 50%)',
              opacity: '0.15',
              zIndex: -10,
            }}
          />
          <Grid
            sx={{
              position: 'relative',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography
              sx={{
                textTransform: 'capitalize',
                fontSize: '26px',
                fontWeight: 'bold',
                color: '#f3f4f6',
                lineHeight: '28px',
              }}
            >
              {filteredName}
            </Typography>
            <Typography
              sx={{
                textTransform: 'capitalize',
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#f3f4f6',
                lineHeight: '20px',
                mb: 1,
              }}
            >
              {formatId(shownId)}
            </Typography>
            <Grid
              sx={{
                display: 'flex',
                gap: '12px',
              }}
            >
              {pokeInfo?.types?.map((type, idx) => (
                <PokemonTypeChip key={type + idx} type={type} fontSize="16px" />
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Section 2: Chaîne d'évolution */}
      <Grid
        sx={{
          width: isMobile ? '100%' : '60%',
          height: '100%',
          minHeight: '100vh',
        }}
        xs={12}
        sm={7}
      >
        {/* ... (votre contenu pour la chaîne d'évolution ici) ... */}
      </Grid>
    </Grid>
  );
};

export default PokemonPage;
