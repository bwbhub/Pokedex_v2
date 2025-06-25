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
  }, [localLoading])

  return (
      <Grid
      sx={{
        transition: "all 0.5s ease-in-out",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>
        <PokeSvg color={color} animate={isLocalLoading} />
      </Grid>
  )
}

export default LocalLoading
