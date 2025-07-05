import React, { useContext } from 'react';
import { IconButton, useTheme } from '@mui/material';
import { Moon, Sun } from 'lucide-react';
import { ColorModeContext } from '../../App';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const theme = useTheme();
  const { toggleColorMode, mode } = useContext(ColorModeContext);
  
  return (
      <IconButton 
        onClick={toggleColorMode} 
        sx={{ 
          bgcolor: theme.palette.secondary.main,
          color: theme.palette.text.primary,
          '&:hover': {
            bgcolor: theme.palette.primary.main,
          },
        }}
      >
        {mode === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
      </IconButton>
  );
};

export default ThemeToggle;
