import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveLanguage } from '../../redux/features/languageSlice';
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useTranslation } from 'react-i18next';


const LanguageSelector = () => {
  const dispatch = useDispatch();
  const { activeLanguage, availableLanguages } = useSelector(state => state.language);
  const { t, i18n } = useTranslation();

  // Langues supportées par l'application
  const supportedLanguages = ['en', 'fr', 'es', 'de', 'ja'];
  
  // Synchroniser la langue i18n avec Redux au chargement du composant
  useEffect(() => {
    // S'assurer que i18n utilise la même langue que celle dans Redux
    if (activeLanguage && i18n.language !== activeLanguage) {
      i18n.changeLanguage(activeLanguage);
    }
  }, [activeLanguage, i18n]);

  // Gestionnaire de changement de langue
  const handleLanguageChange = (event) => {
    const newLang = event.target.value;
    // Sauvegarder dans Redux
    dispatch(setActiveLanguage(newLang));
    // Changer la langue dans i18n
    i18n.changeLanguage(newLang);
    // Sauvegarder dans localStorage
    localStorage.setItem('user-language', newLang);
  };

  // Si aucune langue n'est disponible, ne pas afficher le sélecteur
  if (!availableLanguages || availableLanguages.length === 0) {
    return null;
  }

  return (
    <Box sx={{ minWidth: 120, maxWidth: 200, ml: 'auto', mr: 2 }}>
      <FormControl fullWidth size="small">
        <InputLabel id="language-select-label">{t('language.select')}</InputLabel>
        <Select
          labelId="language-select-label"
          id="language-select"
          value={activeLanguage}
          label={t('language.select')}
          onChange={handleLanguageChange}
        >
          {availableLanguages
            .filter(lang => supportedLanguages.includes(lang.name))
            .map((lang) => (
              <MenuItem key={lang.name} value={lang.name}>
                {t(`language.languages.${lang.name}`)}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default LanguageSelector;
