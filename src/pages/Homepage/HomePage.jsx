import React, { useRef } from 'react';
import { Grid } from '@mui/material';

import PokeSvg from '../../components/SVG/PokeSvg';
import ListCard from '../../components/ListCard/ListCard';
import { urlConvert } from '../../utils/textConvert';
import useHomePage from './HomePageHooks';

const HomePage = () => {
  const { pokeList } = useHomePage();
  const scrollRef = useRef(null);

  return (
    <>
    <Grid 
      container 
      ref={scrollRef}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        pt: 16, // Padding top augmenté pour éviter que les ListCards passent sous le header transparent
        pb: 8,
        maxWidth: "7xl",
        position: "relative",
        minHeight: "100vh" 
      }}
      >
        <Grid sx={{
        position: "fixed",
        top: "-53%", 
        zIndex: 0, 
        width: "100%",
        height: "100%"
        }}>
          <PokeSvg />
        </Grid>
      
      <Grid 
        container 
        spacing={2} 
        sx={{ 
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center",
          pb: 10 
        }}
        >
        {pokeList.map((pokemon) => (
          <Grid key={pokemon.name} xs={12} sm={6} md={4} lg={3} xl={2}>
            <ListCard pokemonId={urlConvert(pokemon)} />
          </Grid>
        ))}
      </Grid>
    </Grid>
    </>
  );
};

export default HomePage;
