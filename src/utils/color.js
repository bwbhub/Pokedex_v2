const textColors = {
  bug: "#394913",
  dark: "#2c2b30",
  dragon: "#073057",
  electric: "#5f5513",
  fairy: "#743561",
  fighting: "#631e2f",
  fire: "#a74b0a",
  flying: "#323d57",
  ghost: "#2f3a5f",
  grass: "#2a7522",
  ground: "#572e1c",
  ice: "#2d615a",
  normal: "#45474b",
  poison: "#422152",
  psychic: "#4b1e1e",
  rock: "#4b4534",
  steel: "#1d3846",
  water: "#1c3753"
}
const bgColors = {
  bug: "#366b26",
  dark: "#181830",
  dragon: "#212d57",
  electric: "#ad891c",
  fairy: "#943158",
  fighting: "#77253a",
  fire: "#cc680a",
  flying: "#284072",
  ghost: "#3c2970",
  grass: "#265826",
  ground: "#884221",
  ice: "#27777e",
  normal: "#5d606e",
  poison: "#55184b",
  psychic: "#862325",
  rock: "#7c601f",
  steel: "#174e68",
  water: "#124a7a"
}

const hexToRgba = (hex, alpha) => {
  const r = parseInt(hex?.slice(1, 3), 16)
  const g = parseInt(hex?.slice(3, 5), 16)
  const b = parseInt(hex?.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

export { bgColors, textColors, hexToRgba }
