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
            transform: 'scale(1.1)',
          },
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          transition: 'all 0.3s ease',
        }}
      >
        {mode === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
      </IconButton>
  );
};

export default ThemeToggle;
