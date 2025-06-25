import React from "react"
import { ArrowRight } from "lucide-react"

import { urlConvert } from "../../../../../utils/textConvert"
import useEvolutionChainWithTranslation from "./useEvolutionChainWithTranslation"
import LocalLoading from "../../../../Loaders/LocalLoading"
import { Grid, Typography } from "@mui/material"
import useTranslation from "../../../../../hooks/useTranslation"

const Evolution = ({ pokeDetails, color, loading: externalLoading }) => {
  const { evolDetails, isLoading } = useEvolutionChainWithTranslation(pokeDetails)
  const { activeLanguage } = useTranslation()
  
  // Messages traduits pour l'absence de données d'évolution
  const noDataMessages = {
    fr: "Pas de données d'évolution disponibles",
    en: "No evolution data available",
    es: "No hay datos de evolución disponibles",
    de: "Keine Evolutionsdaten verfügbar",
    it: "Nessun dato di evoluzione disponibile",
    ja: "進化データがありません"
  }
  
  const noDataMessage = noDataMessages[activeLanguage] || noDataMessages.en
  
  const loading = externalLoading || isLoading
  if (!loading && !evolDetails) {
    return (
      <Grid
        sx={{
          height: "100%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Typography sx={{ color: "white", fontSize: "16px" }}>
          {noDataMessage}
        </Typography>
      </Grid>
    )
  }

  return evolDetails ? (
    <Grid
      id="evolution"
      sx={{
        height: "90%",
        width: "100%",
        display: "flex",
        gap: "3px",
        justifyContent: "center",
        alignItems: "center",
        textTransform: "capitalize",
        overflowY:"scroll"
      }}
      container
    >
      {loading ? (
        <Grid sx={{height: "100%", width: "100%", position: "relative", display: "flex", justifyContent: "center", alignItems: "center"}}>
          <Grid sx={{width: "25%", height: "25%"}}>
            <LocalLoading color={color} />
          </Grid>
        </Grid>
      ) : (
        evolDetails.map((detail, idx) => (
          <Grid sx={{width: "25%", display: "flex", alignItems: "center", gap: "4px"}} key={detail.name + idx} xs={4}>
            <Grid sx={{display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "4px"}}>
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${urlConvert({...detail, name: detail.originalName || detail.name})}.png`}
                alt={detail.name}
                style={{width: "100%", height: "100%"}}
              />
              <Typography sx={{fontSize: "16px", fontWeight: "bold", textTransform: "capitalize", color: "white" }}>{detail.name}</Typography>
              
              {detail.evolutionDetails && (
                <Typography sx={{
                  fontSize: "12px", 
                  color: "rgba(255,255,255,0.8)",
                  textAlign: "center",
                  padding: "0 4px"
                }}>
                  {detail.evolutionDetails.condition}
                </Typography>
              )}
            </Grid>
            {idx < evolDetails.length - 1 && (
              <Grid sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                <ArrowRight size={20} color={"#fff"} />
              </Grid>
            )}
          </Grid>
        ))
      )}
    </Grid>
  ) : null
}

export default Evolution
