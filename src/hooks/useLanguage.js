import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

export const useLanguage = () => {
  const { activeLanguage } = useSelector((state) => state.language);
  const { i18n } = useTranslation();

  // Synchroniser la langue active de Redux avec i18next
  useEffect(() => {
    if (activeLanguage && i18n.language !== activeLanguage) {
      i18n.changeLanguage(activeLanguage);
    }
  }, [activeLanguage, i18n]);

  return { i18n, activeLanguage };
};

export default useLanguage;
