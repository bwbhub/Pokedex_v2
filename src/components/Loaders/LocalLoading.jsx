import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import PokeSvg from "../SVG/PokeSvg"
import { Grid } from "@mui/material"

const LocalLoading = ({ color }) => {
  const { localLoading } = useSelector((state) => state.globalLoading)

  const [isLocalLoading, setIsLocalLoading] = useState(true)

  useEffect(() => {
    if (localLoading) {
      setIsLocalLoading(true)
    } else {
      setTimeout(() => {
        setIsLocalLoading(false)
      }, 1000)
    }
  }, [isLocalLoading])

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{
        display: isLocalLoading ? "block" : "hidden",
        width: "100vw",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        zIndex: 50,
        backgroundColor: "#3b3b3b",
        pointerEvents: "none",
      }}
    >
      <Grid
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        translateX: "-50%",
        translateY: "-50%",
        transition: "all 0.5s ease-in-out",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>
        <PokeSvg color={color} />
      </Grid>
    </Grid>
  )
}

export default LocalLoading
