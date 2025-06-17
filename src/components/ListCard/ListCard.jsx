import React from 'react'
import { Card, Grid, Typography, Box } from '@mui/material'

import useListCard from './ListCardHooks'
import pokeball from '../../assets/pokeball.png'
import dots from '../../assets/dot.svg'
import { hexToRgba, bgColors, textColors } from '../../utils/color'
import { formatId } from '../../utils/textConvert'
import { typeListSvg } from '../../utils/svgs'

const ListCard = ({pokemonId, setOpenModal}) => {
    const {pokeInfo, handleOpenModal} = useListCard({id: pokemonId, setOpenModal})

    const imgUrl = pokeInfo?.sprites?.other?.["official-artwork"]?.front_default
    const mainType = pokeInfo?.types[0].type.name
    const color = bgColors[mainType]

  return (
    <Card sx={{
      backgroundColor: color, 
      borderRadius: '8px', 
      position: 'relative', 
      padding: '20px', 
      cursor: 'pointer',
      width: '100%',
      minWidth: '287px',
      height: '128px',
      backgroundImage: "linear-gradient(120deg, rgba(255,255,255,0.05) 10%, rgba(0,0,0,0.1) 100%",
      transition: "transform 0.3s ease-in-out",
      overflow: 'hidden',
      '&:hover': {
        transform: "scale(1.05)",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      },
    }}
    onClick={handleOpenModal}>
      {/* Background decorative elements - lowest z-index */}
      <Box sx={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        zIndex: 1 
      }}>
        <img 
          src={pokeball} 
          alt="pokemon" 
          style={{
            position: 'absolute', 
            top: "-36px", 
            right: "-56px", 
            height: "208px", 
            opacity: 0.3
          }}
        />
        <img
          src={dots}
          alt="dots"
          style={{
            position: 'absolute', 
            height: '4rem', 
            overflow: 'hidden', 
            left: '12px', 
            top: '-18px', 
            opacity: 0.15
          }}
        />
      </Box>
      
      {/* Content container - highest z-index */}
      <Grid sx={{ 
        position: 'relative', 
        zIndex: 10, 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'space-between' 
      }}>
        <Box>
          <Typography style={{fontSize: '12px', fontWeight: 'medium', color: '#f3f4f6'}}>
            {formatId(pokemonId)}
          </Typography>
          <Typography style={{fontSize: '26px', fontWeight: 'bold', textTransform: 'capitalize', color: '#f3f4f6'}}>
            {pokeInfo?.name}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', gap: '12px' }}>
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
                color: '#f3f4f6'
              }}
            >
              <img
                src={typeListSvg[type?.type?.name]}
                alt={`${type?.type?.name}`}
                style={{width: '16px'}}
              />
              <Typography sx={{textTransform: 'capitalize', fontSize: '12px', fontWeight: 'medium'}}>
                {type?.type?.name}
              </Typography>
            </Box>
          ))}
        </Box>
      </Grid>
      
      {/* Pokemon image - high z-index */}
      <Box sx={{ 
        position: 'absolute', 
        width: '45%', 
        right: 0, 
        top: -2, 
        zIndex: 5,
        filter: 'brightness(1.05) saturate(1.5)'
      }}>
        <img 
          src={imgUrl} 
          alt={pokeInfo?.name} 
          style={{width: '100%'}} 
        />
      </Box>
    </Card>
  )
}

export default ListCard