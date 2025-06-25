import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveLanguage } from '../../redux/features/languageSlice';
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

/**
 * Composant de sélection de langue
 * Permet à l'utilisateur de changer la langue de l'application
 */
const LanguageSelector = () => {
  const dispatch = useDispatch();
  const { activeLanguage, availableLanguages } = useSelector(state => state.language);

  // Langues couramment utilisées avec leurs noms en français
  const commonLanguages = {
    'fr': 'Français',
    'en': 'Anglais',
    'es': 'Espagnol',
    'de': 'Allemand',
    'it': 'Italien',
    'ja': 'Japonais'
  };

  // Gestionnaire de changement de langue
  const handleLanguageChange = (event) => {
    dispatch(setActiveLanguage(event.target.value));
  };

  // Si aucune langue n'est disponible, ne pas afficher le sélecteur
  if (!availableLanguages || availableLanguages.length === 0) {
    return null;
  }

  return (
    <Box sx={{ minWidth: 120, maxWidth: 200, ml: 'auto', mr: 2 }}>
      <FormControl fullWidth size="small">
        <InputLabel id="language-select-label">Langue</InputLabel>
        <Select
          labelId="language-select-label"
          id="language-select"
          value={activeLanguage}
          label="Langue"
          onChange={handleLanguageChange}
        >
          {availableLanguages
            .filter(lang => Object.keys(commonLanguages).includes(lang.name))
            .map((lang) => (
              <MenuItem key={lang.name} value={lang.name}>
                {commonLanguages[lang.name]}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default LanguageSelector;
