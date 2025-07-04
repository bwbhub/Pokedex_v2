import React, { useRef, useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';

import pokeball from '../../../assets/pokeball.png';
import { textColors, hexToRgba } from '../../../utils/color';
import { typeListSvg } from '../../../utils/svgs';
import { formatId } from '../../../utils/textConvert';
import { useSelector } from 'react-redux';
import './TopCard.css';

const TopCard = ({ pokeInfo, color, imgUrl, species }) => {
  const formatedId = formatId(pokeInfo?.id);
  const activeLanguage = useSelector((state) => state.language.activeLanguage);
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const [animationDistance, setAnimationDistance] = useState(0);

  const filteredName = species?.names?.find(
    (name) => name.language.name === activeLanguage,
  )?.name;
  
  useEffect(() => {
    if (containerRef.current && textRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const textWidth = textRef.current.offsetWidth;
      const distance = textWidth - containerWidth;
      setAnimationDistance(distance > 0 ? distance : 0);
      
      // Définir la variable CSS personnalisée
      if (textRef.current) {
        textRef.current.style.setProperty('--slide-distance', `-${distance}px`);
      }
    }

  }, [filteredName]);

  return (
    <Grid
      id="top-panel"
      container
      sx={{
        backgroundColor: color,
        width: '100%',
        height: '235px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '0 0 24px 24px',
        overflow: 'hidden',
        marginBottom: '12px',
        position: 'relative',
      }}
    >
      <Grid
        ref={containerRef}
        className="bg-title-container"
        sx={{
          top: '-16px',
          height: '120px',
        }}
      >
        <Typography
          ref={textRef}
          className="bg-title"
          sx={{
            color: color,
            fontSize: '96px',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            top: '1px',
            animation: animationDistance > 0 ? 'sliding 10s infinite linear' : 'none',
            left: '0',
            // Assurez-vous que le texte est initialement visible
            position: 'absolute',
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
            background: `linear-gradient(to top, ${hexToRgba(color, 1)} 10%, ${hexToRgba(color, 0)} 100%)`,
            pointerEvents: 'none',
          }}
        />
      </Grid>
      <Grid
        sx={{
          position: 'absolute',
          width: '33.33%',
          left: '40px',
          bottom: '16px',
          opacity: '0.3',
        }}
      >
        <img
          src={pokeball}
          alt="Pokeball"
          style={{ position: 'relative', width: '100%' }}
        />
        <span
          style={{
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(to bottom, ${hexToRgba(color, 1.5)} 40%, ${hexToRgba(color, 0)} 100%)`,
            pointerEvents: 'none',
          }}
        />
      </Grid>
      <Grid
        sx={{
          // position: "absolute",
          width: '50%',
          height: '100%',
          left: 0,
          bottom: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img
          src={imgUrl}
          alt={filteredName}
          style={{
            width: '83.3333%',
            zIndex: 100,
            filter: 'brightness(1.05) saturate(1.5)',
          }}
        />
      </Grid>
      <Grid
        sx={{
          position: 'relative',
          width: '50%',
        }}
      >
        <Typography
          sx={{ fontSize: '12px', fontWeight: 'medium', color: '#f3f4f6' }}
        >
          {formatedId}
        </Typography>
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
            <Box
              key={type + idx}
              sx={{
                padding: '5px',
                borderRadius: '8px',
                display: 'flex',
                gap: '4px',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: textColors[type?.type?.name],
                color: '#f3f4f6',
              }}
            >
              <img
                src={typeListSvg[type?.type?.name]}
                alt={`${type?.type?.name}`}
                style={{ width: '16px' }}
              />
              <Typography
                sx={{
                  textTransform: 'capitalize',
                  fontSize: '12px',
                  fontWeight: 'medium',
                }}
              >
                {type?.type?.name}
              </Typography>
            </Box>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TopCard;
