import { bgColors, textColors } from '../utils/color';

// Définition des thèmes light et dark
export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // Palette pour le mode clair
          primary: {
            main: 'hsl(0, 0%, 23%)', // #3b3b3b
          },
          secondary: {
            main: 'hsl(0, 0%, 17%)', // #2b2b2b
          },
          background: {
            default: 'hsl(0, 0%, 86%)', // Inverse de #242424
            paper: 'hsl(0, 0%, 77%)', // Inverse de #3b3b3b
          },
          text: {
            primary: 'hsla(0, 0%, 0%, 0.87)', // Inverse de rgba(255, 255, 255, 0.87)
            secondary: 'hsla(0, 0%, 0%, 0.6)',
          },
        }
      : {
          // Palette pour le mode sombre
          primary: {
            main: 'hsl(0, 0%, 23%)', // #3b3b3b
          },
          secondary: {
            main: 'hsl(0, 0%, 17%)', // #2b2b2b
          },
          background: {
            default: 'hsl(0, 0%, 14%)', // #242424
            paper: 'hsl(0, 0%, 23%)', // #3b3b3b
          },
          text: {
            primary: 'hsla(0, 0%, 100%, 0.87)', // rgba(255, 255, 255, 0.87)
            secondary: 'hsla(0, 0%, 100%, 0.6)',
          },
        }),
    // Couleurs des types de Pokémon
    pokemon: {
      // Couleurs de texte pour les types
      text: textColors,
      // Couleurs d'arrière-plan pour les types
      background: bgColors
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: mode === 'dark' ? 'hsl(0, 0%, 17%) hsl(0, 0%, 23%)' : 'hsl(0, 0%, 83%) hsl(0, 0%, 77%)',
          '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
            width: '10px',
          },
          '&::-webkit-scrollbar-track, & *::-webkit-scrollbar-track': {
            background: mode === 'dark' ? 'hsl(0, 0%, 23%)' : 'hsl(0, 0%, 77%)',
          },
          '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
            backgroundColor: mode === 'dark' ? 'hsl(0, 0%, 17%)' : 'hsl(0, 0%, 83%)',
            borderRadius: '6px',
          },
        },
      },
    },
  },
});
