import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, FormControl, Select, MenuItem, Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { setActiveLanguage } from '../../../redux/features/languageSlice';
import { supportedLanguages, langListSvg } from '../../../utils/svgs';

const LanguageSelector = () => {
  const dispatch = useDispatch();
  const { activeLanguage, availableLanguages } = useSelector(
    (state) => state.language,
  );
  const { t, i18n } = useTranslation();

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
    <Box
      sx={{ minWidth: 0, maxWidth: 70, display: 'flex', alignItems: 'center' }}
    >
      <FormControl fullWidth size="small">
        <Select
          labelId="language-select-label"
          id="language-select"
          value={activeLanguage}
          label={t('language.select')}
          onChange={handleLanguageChange}
          sx={{
            width: '65px',
            padding: 0,
            '& .MuiSelect-select': {
              padding: 0,
              display: 'flex',
              alignItems: 'center',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              border: 'none',
            },
            '&.MuiOutlinedInput-root': {
              padding: 0,
            },
          }}
        >
          {availableLanguages
            .filter((lang) => supportedLanguages.includes(lang.name))
            .map((lang) => (
              <MenuItem
                key={lang.name}
                value={lang.name}
                sx={{ minWidth: '65px' }}
              >
                <Tooltip
                  title={t(`language.languages.${lang.name}`)}
                  placement="right"
                >
                  <img src={langListSvg[lang.name]} alt={`${lang.name} flag`} />
                </Tooltip>
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default LanguageSelector;
