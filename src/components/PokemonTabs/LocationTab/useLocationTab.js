import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import pokeApi from '../../../api/modules/pokedex.api';


const useLocationTab = ({ id }) => {
  const [locations, setLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const activeLanguage = useSelector((state) => state.language.activeLanguage);

  // Get translated name from API response
  const getTranslatedName = (locationDetails, language) => {
    if (!locationDetails?.names) return null;
    
    const translated = locationDetails.names.find(n => n.language?.name === language);
    if (translated) return translated.name;
    
    const english = locationDetails.names.find(n => n.language?.name === 'en');
    return english?.name || null;
  };

  // Simple version grouping - returns translation key
  const getVersionGroupKey = (versionName) => {
    const groups = {
      'black': 'blackWhite', 'white': 'blackWhite',
      'black-2': 'black2White2', 'white-2': 'black2White2',
      'x': 'xy', 'y': 'xy',
      'red': 'redBlue', 'blue': 'redBlue',
      'gold': 'goldSilver', 'silver': 'goldSilver',
      'ruby': 'rubySapphire', 'sapphire': 'rubySapphire',
      'diamond': 'diamondPearl', 'pearl': 'diamondPearl',
      'sun': 'sunMoon', 'moon': 'sunMoon',
      'ultra-sun': 'ultraSunMoon', 'ultra-moon': 'ultraSunMoon',
      'sword': 'swordShield', 'shield': 'swordShield',
      'scarlet': 'scarletViolet', 'violet': 'scarletViolet'
    };
    return groups[versionName] || null;
  };

  useEffect(() => {
    const fetchLocations = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const { response, err } = await pokeApi.getEncounters({ pokeId: id });
        if (err) throw new Error(err);
        if (!response?.length) return setLocations([]);

        const groups = {};
        const translations = new Map();

        // Process each encounter
        for (const encounter of response) {
          const locationName = encounter.location_area.name;
          const locationId = encounter.location_area.url.split('/').filter(Boolean).pop();

          // Get translation if not cached
          if (!translations.has(locationName)) {
            try {
              const { response: details } = await pokeApi.getLocationArea({ locationAreaId: locationId });
              const translated = getTranslatedName(details, activeLanguage);
              translations.set(locationName, translated || locationName);
            } catch (error) {
              translations.set(locationName, locationName);
            }
          }

          // Group by versions
          for (const versionDetail of encounter.version_details) {
            const versionName = versionDetail.version.name;
            const groupKey = getVersionGroupKey(versionName);
            const groupName = groupKey || versionName.replace(/-/g, ' ');

            if (!groups[groupName]) {
              groups[groupName] = { 
                name: groupName, 
                translationKey: groupKey,
                locations: new Set() 
              };
            }
            groups[groupName].locations.add(translations.get(locationName));
          }
        }

        // Convert to final format
        const result = Object.values(groups).map(group => ({
          name: group.name,
          translationKey: group.translationKey,
          locations: Array.from(group.locations).sort()
        }));

        setLocations(result);
      } catch (error) {
        console.error('Error fetching location data:', error);
        setError(error.message);
        setLocations([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchLocations();
  }, [id, activeLanguage]);

  return { locations, isLoading, error, activeLanguage };
};

export default useLocationTab;
