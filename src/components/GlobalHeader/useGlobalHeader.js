import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTheme, useMediaQuery } from '@mui/material';

const useGlobalHeader = () => {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // États pour gérer l'affichage et les interactions
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  
  // Déterminer le type de page
  const isHomePage = location.pathname === '/';
  const isPokemonPage = location.pathname !== '/' && location.pathname !== '';
  
  // Gérer le scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fermer le menu quand on change de route
  useEffect(() => {
    setIsMenuOpen(false);
    setIsHovering(false);
  }, [location.pathname]);

  // Gérer l'ouverture/fermeture du menu
  const handleMenuToggle = () => {
    if (isMobile) {
      setIsMenuOpen(!isMenuOpen);
    }
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
    setIsHovering(false);
  };

  // Gérer le survol sur desktop
  const handleMouseEnter = () => {
    if (!isMobile) {
      setIsHovering(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setIsHovering(false);
    }
  };



  // Calculer les états d'affichage
  const showFullHeader = !isScrolled && isHomePage;
  // Le bouton menu ne s'affiche qu'après scroll sur la page d'accueil
  const showMenuButton = isHomePage && isScrolled;
  const showDropdownMenu = (isMobile && isMenuOpen) || (!isMobile && isHovering);

  return {
    // États
    isScrolled,
    isMenuOpen,
    isHovering,
    isMobile,
    isHomePage,
    isPokemonPage,
    
    // États calculés
    showFullHeader,
    showMenuButton,
    showDropdownMenu,
    
    // Handlers
    handleMenuToggle,
    handleMenuClose,
    handleMouseEnter,
    handleMouseLeave,
    
    // Theme
    theme,
  };
};

export default useGlobalHeader;
