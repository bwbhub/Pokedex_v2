import React from "react"
import { ResponsiveRadar } from "@nivo/radar"

import LocalLoading from "../../../Loaders/LocalLoading"
import TypeStats from "./TypeStats"
import { Grid } from "@mui/material"

const Stats = ({ selectedPokeInfos, color, loading }) => {
  const generalStats = selectedPokeInfos?.stats

  const stats = generalStats.map((statObj) => ({
    stat: statObj?.stat?.name.replace(/special/i, "s"),
    value: statObj?.base_stat
  }))

  const maxValuecheck = (stats) => {
    for (let i = 0; i < stats?.length; i++) {
      const value = stats[i]?.value
      if (value > 150) return true
    }
  }

  const bitImg = selectedPokeInfos?.sprites?.front_default

  return (
    <Grid id="about" container sx={{
      height: "100%",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "8px"
    }}>
      {loading ? (
        <Grid sx={{height: "100%", width: "100%", position: "relative", display: "flex", justifyContent: "center", alignItems: "center"}}>
          <Grid sx={{width: "25%", height: "25%"}}>
            <LocalLoading color={color} />
          </Grid>
        </Grid>      ) : (
        <Grid container sx={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          mt: "12px",
          gap: "8px",
        }}>
          <Grid container sx={{
            height: "60%",
            width: "100%",
            position: "relative",
            
          }}>
            <img
              src={bitImg}
              alt="bit-version"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 10,
                width: "20%",
              }}
            />
            <ResponsiveRadar
              data={stats}
              keys={["value"]}
              indexBy="stat"
              maxValue={maxValuecheck(stats) === true ? 255 : 155}
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              valueFormat=">-.0f"
              colors={color}
              borderColor={color}
              borderWidth={3}
              fillOpacity={0.4}
              gridLabelOffset={10}
              motionConfig="wobbly"
              gridShape="linear"
              enableDots={false}
              isInteractive={true}
              theme={{
                axis: {
                  ticks: {
                    text: {
                      fill: "#ffffff",
                      fontSize: 13,
                      textTransform: "capitalize"
                    }
                  }
                },
                tooltip: {
                  container: {
                    textTransform: "capitalize"
                  }
                }
              }}
            />
          </Grid>
          <TypeStats selectedPokeInfos={selectedPokeInfos} color={color}/>
        </Grid>
      )}
    </Grid>
  )
}

export default Stats
