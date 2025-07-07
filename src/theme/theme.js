import {
  bgColorsLight,
  textColorsLight,
  bgColorsDark,
  textColorsDark,
  typeColorsLight,
} from '../utils/color';

export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          primary: {
            main: '#1D1D1D',
          },
          secondary: {
            main: '#FBFBFB',
          },
          tertiary: {
            main: '#DEDEDE',
          },
          background: {
            default: '#FDFDFD',
            paper: '#F2F2F2',
          },
          text: {
            primary: '#191919',
            secondary: '#333333',
            tertiary: '#5D5D5D',
          },
          accent: {
            main: '#6C4BA3',
          },
        }
      : {
          primary: {
            main: '#FBFBFB',
          },
          secondary: {
            main: '#1D1D1D',
          },
          tertiary: {
            main: '#212121',
          },
          background: {
            default: '#191919',
            paper: '#262626',
          },
          text: {
            primary: '#FDFDFD',
            secondary: '#E0E0E0',
            tertiary: '#A1A1A1',
          },
          accent: {
            main: '#8A63CF',
          },
        }),
    pokemon: {
      background: mode === 'light' ? bgColorsLight : bgColorsDark,
      text: mode === 'light' ? textColorsLight : textColorsDark,
      type: mode === 'light' ? typeColorsLight : textColorsDark,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
            width: '10px',
          },
          '&::-webkit-scrollbar-track, & *::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
            backgroundColor:
              mode === 'dark' ? '#A1A1A1' : '#5D5D5D',
              borderRadius: '6px',
              border: 'none',
            },

        },
      },
    },
  },
});
