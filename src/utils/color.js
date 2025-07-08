// Couleurs pour le mode sombre (existantes)
const textColorsDark = {
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

const bgColorsDark = {
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

// Couleurs pour le mode clair (optimisées pour l'accessibilité AA/AAA)
const textColorsLight = {
  bug: "#205000",     // Vert foncé pour contraste AA
  dark: "#121215",    // Presque noir pour contraste AAA
  dragon: "#00264D",  // Bleu très foncé pour contraste AAA
  electric: "#644700", // Jaune foncé pour contraste AA
  fairy: "#5C1A4A",   // Rose foncé pour contraste AA
  fighting: "#5D0A1F", // Rouge foncé pour contraste AAA
  fire: "#7A2800",    // Orange foncé pour contraste AA
  flying: "#1A2A4D",  // Bleu-gris foncé pour contraste AAA
  ghost: "#1F2A54",   // Violet foncé pour contraste AAA
  grass: "#0E4500",   // Vert foncé pour contraste AAA
  ground: "#4D1700",  // Marron foncé pour contraste AAA
  ice: "#004D4D",     // Cyan foncé pour contraste AA
  normal: "#2A2C30",  // Gris foncé pour contraste AAA
  poison: "#330047",  // Violet foncé pour contraste AAA
  psychic: "#4D0000", // Rouge foncé pour contraste AAA
  rock: "#3D3619",    // Marron foncé pour contraste AA
  steel: "#002E47",   // Bleu-gris foncé pour contraste AAA
  water: "#002E5C"    // Bleu foncé pour contraste AAA
}

const bgColorsLight = {
  bug: "#7AB317",     // Vert vif mais accessible
  dark: "#4D4D54",    // Gris foncé accessible
  dragon: "#4A72BF",  // Bleu accessible
  electric: "#E6B800", // Jaune accessible
  fairy: "#D957A0",   // Rose accessible
  fighting: "#C1415A", // Rouge accessible
  fire: "#F07427",    // Orange accessible
  flying: "#5B81C9",  // Bleu-gris accessible
  ghost: "#6B56AB",   // Violet accessible
  grass: "#5CB52A",   // Vert accessible
  ground: "#D67A45",  // Marron accessible
  ice: "#49B3BD",     // Cyan accessible
  normal: "#8F919A",  // Gris accessible
  poison: "#9A4DA6",  // Violet accessible
  psychic: "#D64242", // Rouge accessible
  rock: "#B99C47",    // Marron-doré accessible
  steel: "#3B8EAF",   // Bleu-gris accessible
  water: "#3A85C7"    // Bleu accessible
}

const hexToRgba = (hex, alpha) => {
  const r = parseInt(hex?.slice(1, 3), 16)
  const g = parseInt(hex?.slice(3, 5), 16)
  const b = parseInt(hex?.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

// Couleurs pour les types en mode clair (15% plus foncées que bgColorsLight)
const typeColorsLight = {
  bug: "#678F13",     // Vert 15% plus foncé
  dark: "#414147",    // Gris 15% plus foncé
  dragon: "#3F61A2",  // Bleu 15% plus foncé
  electric: "#C39C00", // Jaune 15% plus foncé
  fairy: "#B84A87",   // Rose 15% plus foncé
  fighting: "#A4374C", // Rouge 15% plus foncé
  fire: "#CC6321",    // Orange 15% plus foncé
  flying: "#4D6EAB",  // Bleu-gris 15% plus foncé
  ghost: "#5B4891",   // Violet 15% plus foncé
  grass: "#4E9A23",   // Vert 15% plus foncé
  ground: "#B6673A",  // Marron 15% plus foncé
  ice: "#3E98A1",     // Cyan 15% plus foncé
  normal: "#797B83",  // Gris 15% plus foncé
  poison: "#83418D",  // Violet 15% plus foncé
  psychic: "#B63838", // Rouge 15% plus foncé
  rock: "#9D853C",    // Marron-doré 15% plus foncé
  steel: "#327994",   // Bleu-gris 15% plus foncé
  water: "#3171A9"    // Bleu 15% plus foncé
}

// Exports des couleurs selon le mode
const textColors = textColorsDark;
const bgColors = bgColorsDark;

export { bgColors, textColors, bgColorsLight, textColorsLight, bgColorsDark, textColorsDark, typeColorsLight, hexToRgba }
