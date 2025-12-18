import React from 'react';
import {
  Box,
  IconButton,
  Backdrop,
  Paper,
  Fade,
} from '@mui/material';
import { Menu } from 'lucide-react';
import Header from '../Header/Header';
import DetailsModal from '../DetailsModal/DetailsModal';
import useGlobalHeader from './useGlobalHeader';
import { useModal } from '../../contexts/ModalContext';

const GlobalHeader = () => {
  const {
    showFullHeader,
    showMenuButton,
    showDropdownMenu,
    isHomePage,
    isPokemonPage,
    isScrolled,
    handleMenuToggle,
    handleMenuClose,
    handleMouseEnter,
    handleMouseLeave,
    theme,
  } = useGlobalHeader();
  
  // Utiliser le contexte modal global
  const { modalOpen, openModal, closeModal } = useModal();

  // Fonction pour calculer la couleur de fond du menu avec transparence
  const getMenuBackgroundColor = () => {
    const baseColor = theme.palette.background.paper;
    const isDark = theme.palette.mode === 'dark';
    
    if (isDark) {
      // Mode sombre : éclaircir de ~15%
      return `rgba(66, 66, 66, 0.95)`;
    } else {
      // Mode clair : éclaircir de ~15%
      return `rgba(255, 255, 255, 0.95)`;
    }
  };

  return (
    <>
      {/* Header complet visible en haut de la page d'accueil */}
      {showFullHeader && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            backgroundColor: 'transparent',
            padding: '16px 0',
            transition: 'all 0.3s ease-in-out',
          }}
        >
          <Header openModal={openModal} setPokeModal={openModal} showLogo={true} />
        </Box>
      )}

      {/* Bouton menu pour les pages Pokémon (style unifié) */}
      {isPokemonPage && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            height: '50px',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <IconButton
            onClick={handleMenuToggle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              color: theme.palette.text.primary,
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              },
            }}
          >
            <Menu size={24} />
          </IconButton>
        </Box>
      )}

      {/* Bouton menu après scroll */}
      <Fade in={showMenuButton} timeout={300}>
        <Box
          sx={{
            position: 'fixed',
            top: '16px',
            right: isHomePage ? '16px' : '50%',
            transform: isHomePage ? 'none' : 'translateX(50%)',
            zIndex: 1000,
            opacity: showMenuButton ? 1 : 0,
            pointerEvents: showMenuButton ? 'auto' : 'none',
          }}
        >
          <IconButton
            onClick={handleMenuToggle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            sx={{
              backgroundColor: theme.palette.background.paper,
              boxShadow: theme.shadows[4],
              color: theme.palette.text.primary,
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
              },
            }}
          >
            <Menu size={24} />
          </IconButton>
        </Box>
      </Fade>

      {/* Menu déroulant/popup */}
      <Backdrop
        open={showDropdownMenu}
        onClick={handleMenuClose}
        sx={{
          zIndex: 999,
          backgroundColor: 'rgba(0, 0, 0, 0.15)',
        }}
      >
        <Fade in={showDropdownMenu} timeout={200}>
          <Paper
            onClick={(e) => e.stopPropagation()}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            sx={{
              position: 'fixed',
              top: isHomePage && isScrolled ? '70px' : isPokemonPage ? '70px' : '16px',
              right: isHomePage ? '16px' : '50%',
              transform: isHomePage ? 'none' : 'translateX(50%)',
              minWidth: { xs: '300px', sm: '400px' },
              maxWidth: { xs: '95vw', sm: '90vw' },
              maxHeight: { xs: '85vh', sm: '80vh' },
              overflowY: 'auto',
              backgroundColor: getMenuBackgroundColor(),
              backdropFilter: 'blur(10px)',
              borderRadius: '12px',
              padding: '16px',
              boxShadow: theme.shadows[8],
            }}
          >
            <Header openModal={openModal} setPokeModal={openModal} showLogo={false} isMenuMode={true} />
          </Paper>
        </Fade>
      </Backdrop>
      
      {/* Modal de détails Pokémon */}
      {modalOpen && (
        <DetailsModal
          openModal={modalOpen}
          closeModal={closeModal}
        />
      )}
    </>
  );
};

export default GlobalHeader;
