import React from "react"
import { capitalizeUppercase, formatDesc } from "../../../../../utils/textConvert"
import LocalLoading from "../../../../Loaders/LocalLoading"
import { Grid, Typography } from "@mui/material"

const About = ({ selectedPokeInfos, pokeDetails, loading, color }) => {
  const rawDesc = pokeDetails?.flavor_text_entries?.[2]?.flavor_text
  const okDesc = formatDesc(rawDesc)
  const useableDesc = capitalizeUppercase(okDesc)


  return (
    <Grid id="about" container sx={{
      height: "100%",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      px: "24px",
      pt: "12px",
    }}>
      {loading ? (
        <Grid sx={{height: "100%", width: "100%", position: "relative", display: "flex", justifyContent: "center", alignItems: "center"}}>
          <Grid sx={{width: "25%", height: "25%"}}>
            <LocalLoading color={color} />
          </Grid>
        </Grid>
      ) : (
        <Grid container sx={{flexDirection: "column"}}>
          <Typography sx={{fontSize: "18px", color: "#9e9e9e", mb: "16px"}}>{useableDesc}</Typography>
          <Typography sx={{fontSize: "18px", fontWeight: "bold", mb: "4px", color: "#fff", width: "100%", textAlign: "center"}}>
            Pokémon's data
          </Typography>
          <Grid container sx={{mb: "16px"}}>
            <Grid style={{ color: "#fff"}}>
              <Typography>Height:</Typography>
              <Typography>Weight:</Typography>
            </Grid>
            <Grid sx={{ml: "24px"}}>
              <Grid style={{ color: "#9e9e9e"}}>
                <Typography>{selectedPokeInfos?.height / 10 + "m"}</Typography>
                <Typography>
                  {selectedPokeInfos?.weight / 10 +
                    "kg (" +
                    ((selectedPokeInfos?.weight / 10) * 2.204).toFixed(1) +
                    "lbs)"}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid container sx={{gap: "16px", display: "flex"}}>
            <Grid style={{ color: "#fff"}}>
              <Typography>Capture Rate:</Typography>
              <Typography>Base Happiness:</Typography>
              <Typography>Base Exp:</Typography>
              <Typography>Growth Rate:</Typography>
            </Grid>
            <Grid style={{ color: "#9e9e9e"}}>
              <Typography>{pokeDetails?.capture_rate} / 255</Typography>
              <Typography>{pokeDetails?.base_happiness} / 255</Typography>
              <Typography>{selectedPokeInfos?.base_experience}</Typography>
              <Typography>{pokeDetails?.growth_rate?.name}</Typography>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Grid>
  )
}

export default About
