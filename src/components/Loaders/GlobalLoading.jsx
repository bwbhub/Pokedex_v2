import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import PokeSvg from "./PokeSvg"
import { Grid } from "@mui/material"

const GlobalLoading = () => {
  const { globalLoading } = useSelector((state) => state.globalLoading)

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (globalLoading) {
      setIsLoading(true)
    } else {
      setTimeout(() => {
        setIsLoading(false)
      }, 1000)
    }
  }, [globalLoading])

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{
        opacity: isLoading ? 1 : 0,
        transition: "opacity 2s ease-in-out",
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
      <Grid sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        transition: "opacity 2s ease-in-out",
        opacity: isLoading ? 1 : 0,
        }}>
        <PokeSvg />
      </Grid>
    </Grid>
  )
}

export default GlobalLoading
