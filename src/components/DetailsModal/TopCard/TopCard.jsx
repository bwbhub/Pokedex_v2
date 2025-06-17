import React from "react"

import pokeball from "../../../assets/pokeball.png"
import { textColors, hexToRgba } from "../../../utils/color"
import { typeListSvg } from "../../../utils/svgs"
import { formatId } from "../../../utils/textConvert"
import { Box, Grid, Typography } from "@mui/material"

const TopCard = ({ pokeInfo, color, imgUrl }) => {
  const formatedId = formatId(pokeInfo?.id)

  return (
    <Grid
      id="top-panel"
      container
      sx={{
        backgroundColor: color,
        width: "100%",
        height: "235px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "0 0 24px 24px",
        overflow: "hidden",
        marginBottom: "12px",
        position: "relative",
      }}
    >
      <Grid sx={{
        position: "absolute",
        top: "-16px",
      }}>
        <Typography
          className="bg-title"
          sx={{
            color: color,
            fontSize: "96px",
            fontWeight: "bold",
            textTransform: "uppercase",
            position: "relative",
            top: "1px",
          }}
        >
          {pokeInfo?.name}
        </Typography>
        <span
          style={{
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(to top, ${hexToRgba(color, 1)} 10%, ${hexToRgba(color, 0)} 100%)`,
            pointerEvents: "none"
          }}
        />
      </Grid>
      <Grid sx={{
        position: "absolute",
        width: "33.33%",
        left: "40px",
        bottom: "16px",
        opacity: "0.3",
      }}>
        <img src={pokeball} alt="Pokeball" style={{position: "relative", width: "100%"}} />
        <span
          style={{
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(to bottom, ${hexToRgba(color, 1.5)} 40%, ${hexToRgba(color, 0)} 100%)`,
            pointerEvents: "none"
          }}
        />
      </Grid>
      <Grid sx={{
        // position: "absolute",
        width: "50%",
        height: "100%",
        left: 0,
        bottom: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
        <img
          src={imgUrl}
          alt={pokeInfo?.name}
          style={{width: "83.3333%", zIndex: 100, filter: "brightness(1.05) saturate(1.5)"}}
        />
      </Grid>
      <Grid sx={{
        position: "relative",
        width: "50%",
      }}>
        <Typography sx={{fontSize: '12px', fontWeight: 'medium', color: '#f3f4f6'}}>
          {formatedId}
        </Typography>
        <Typography sx={{textTransform: 'capitalize', fontSize: '26px', fontWeight: 'bold', color: '#f3f4f6'}}>
          {pokeInfo?.name}
        </Typography>
        <Grid sx={{
          display: 'flex',
          gap: '12px',
        }}>
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
        </Grid>
      </Grid>
    </Grid>
  )
}

export default TopCard
