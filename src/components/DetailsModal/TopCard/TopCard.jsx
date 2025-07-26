import React, { useRef } from 'react';
import { Grid, Typography, Box, useTheme, IconButton } from '@mui/material';
import { useSelector } from 'react-redux';
import { Volume2 } from 'lucide-react';

import { formatId } from '../../../utils/textConvert';
import pokeball from '../../../assets/pokeball.png';
import PokemonTypeChip from '../../PokemonTypeChip/PokemonTypeChip';
import { usePokedetails } from '../../../context/Pokedetails';

const TopCard = ({ pokeInfo, color, imgUrl, species }) => {
  const theme = useTheme();
  const activeLanguage = useSelector((state) => state.language.activeLanguage);
  const { regionDex } = usePokedetails();

  const audioRef = useRef(null);

  const formatedId = formatId(
    regionDex
      ? species?.pokedex_numbers.find(
          (number) => number?.pokedex?.name === regionDex?.name,
        )?.entry_number
      : pokeInfo?.id,
  );

  const filteredName = species?.names?.find(
    (name) => name.language.name === activeLanguage,
  )?.name;

  const playPokemonCry = () => {
    if (pokeInfo?.cries?.latest && audioRef.current) {
      audioRef.current.play();
    }
  };

  return (
    <Grid
      id="top-panel"
      container
      sx={{
        backgroundColor: color,
        width: '100%',
        minHeight: '285px',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <Grid
        sx={{
          position: 'absolute',
          width: '65%',
          left: '50%',
          bottom: '50%',
          transform: 'translate(-50%, 50%)',
          opacity: '0.15',
        }}
      >
        <img
          src={pokeball}
          alt="Pokeball"
          style={{
            position: 'relative',
            width: '100%',
            rotate: '35deg',
            maskImage: `url(${pokeball})`,
            WebkitMaskImage: `url(${pokeball})`,
            maskSize: 'contain',
            WebkitMaskSize: 'contain',
            backgroundColor: theme.palette.text.secondary,
          }}
        />
      </Grid>
      <Grid
        sx={{
          position: 'absolute',
          top: '13px',
          right: '15px',
          opacity: 0.3,
        }}
      >
        <Typography
          sx={{ fontSize: '18px', fontWeight: '500', color: '#f3f4f6' }}
        >
          {formatedId}
        </Typography>
      </Grid>
      <Grid
        sx={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          opacity: 0.2,
        }}
      >
        <Box
          sx={{
            width: '36px',
            height: '36px',
            maskImage: `url(${imgUrl})`,
            WebkitMaskImage: `url(${imgUrl})`,
            maskSize: 'contain',
            WebkitMaskSize: 'contain',
            backgroundColor: '#f3f4f6',
            zIndex: 100,
          }}
        />
        <IconButton onClick={playPokemonCry} sx={{ padding: 1, mt: 1 }}>
          <Volume2 color="#F3F4F6" size={26} strokeWidth={4} />
          <audio ref={audioRef} src={pokeInfo?.cries?.latest} preload="auto" />
        </IconButton>
      </Grid>
      <Grid
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Grid
          sx={{
            width: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box
            component="img"
            src={imgUrl}
            alt={filteredName}
            sx={{
              width: '95%',
              zIndex: 100,
              filter: 'brightness(1.05) saturate(1.5)',
              cursor: 'pointer',
              transition: 'transform 0.2s ease-in-out',
              '&:hover': {
                transform: 'scale(1.05)',
              },
              '&:active': {
                transform: 'scale(0.98)',
              },
            }}
          />
        </Grid>
        <Grid
          sx={{
            position: 'relative',
            width: '50%',
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
            }}
          >
            {filteredName}
          </Typography>
          <Grid
            sx={{
              display: 'flex',
              gap: '12px',
            }}
          >
            {pokeInfo?.types?.map((type, idx) => (
              <PokemonTypeChip key={type + idx} type={type} />
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TopCard;
