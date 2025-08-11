import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import pokeApi from '../../../api/modules/pokedex.api';

/**
 * Hook pour récupérer et traiter les informations de localisation d'un Pokémon
 * @param {Object} props - Les propriétés du hook
 * @param {number} props.id - L'identifiant du Pokémon
 * @returns {Object} Les données de localisation formatées pour l'affichage
 */
const useLocationTab = ({ id }) => {
  const [locations, setLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const activeLanguage = useSelector((state) => state.language.activeLanguage);

  // Helper function to get location area details with translations
  const getLocationAreaDetails = async (locationAreaUrl) => {
    try {
      // Extract location area ID from URL
      const locationAreaId = locationAreaUrl.split('/').slice(-2, -1)[0];
      const { response } = await pokeApi.getLocation({ location: locationAreaId });
      return response;
    } catch (error) {
      console.error('Error fetching location area details:', error);
      return null;
    }
  };

  // Helper function to get translated location name
  const getTranslatedLocationName = (locationDetails, language) => {
    if (!locationDetails?.names) {
      return null;
    }
    
    // Try to find name in the requested language
    const translatedName = locationDetails.names.find(
      name => name.language?.name === language
    );
    
    if (translatedName) {
      return translatedName.name;
    }
    
    // Fallback to English if available
    const englishName = locationDetails.names.find(
      name => name.language?.name === 'en'
    );
    
    return englishName?.name || null;
  };

  // Helper function to get formatted version name
  const getFormattedVersionName = (versionName) => {
    const versionNames = {
      'red': 'Rouge',
      'blue': 'Bleu',
      'yellow': 'Jaune',
      'gold': 'Or',
      'silver': 'Argent',
      'crystal': 'Cristal',
      'ruby': 'Rubis',
      'sapphire': 'Saphir',
      'emerald': 'Émeraude',
      'firered': 'Rouge Feu',
      'leafgreen': 'Vert Feuille',
      'diamond': 'Diamant',
      'pearl': 'Perle',
      'platinum': 'Platine',
      'heartgold': 'HeartGold',
      'soulsilver': 'SoulSilver',
      'black': 'Noir',
      'white': 'Blanc',
      'black-2': 'Noir 2',
      'white-2': 'Blanc 2',
      'x': 'X',
      'y': 'Y',
      'omega-ruby': 'Rubis Oméga',
      'alpha-sapphire': 'Saphir Alpha',
      'sun': 'Soleil',
      'moon': 'Lune',
      'ultra-sun': 'Ultra-Soleil',
      'ultra-moon': 'Ultra-Lune',
      'lets-go-pikachu': "Let's Go Pikachu",
      'lets-go-eevee': "Let's Go Évoli",
      'sword': 'Épée',
      'shield': 'Bouclier',
      'brilliant-diamond': 'Diamant Étincelant',
      'shining-pearl': 'Perle Scintillante',
      'legends-arceus': 'Légendes Arceus',
      'scarlet': 'Écarlate',
      'violet': 'Violet'
    };
    return versionNames[versionName] || versionName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  useEffect(() => {
    const fetchLocations = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Appel à l'API pour récupérer les données d'encounters
        const { response, err } = await pokeApi.getEncounters({
          pokeId: id,
        });

        if (err) {
          throw new Error(err);
        }

        if (response && response.length > 0) {
          // Transformation des données pour l'affichage avec traductions
          const encountersData = response;
          const versions = {};
          
          for (const encounter of encountersData) {
            const locationAreaUrl = encounter.location_area.url;
            const locationAreaName = encounter.location_area.name;
            
            // Get location area details with translations
            const locationAreaDetails = await getLocationAreaDetails(locationAreaUrl);
            
            // Get translated name
            const translatedName = getTranslatedLocationName(locationAreaDetails, activeLanguage);
            
            // Process version details
            for (const versionDetail of encounter.version_details) {
              const versionName = versionDetail.version.name;
              const formattedVersionName = getFormattedVersionName(versionName);
              
              // Initialize version if not exists
              if (!versions[versionName]) {
                versions[versionName] = {
                  name: formattedVersionName,
                  originalName: versionName,
                  locations: new Set() // Use Set to avoid duplicates
                };
              }
              
              // Add location to this version
              versions[versionName].locations.add(translatedName || locationAreaName);
            }
          }
          
          // Convert Sets to Arrays and sort
          const processedVersions = Object.values(versions).map(version => ({
            ...version,
            locations: Array.from(version.locations).sort()
          }));
          
          setLocations(processedVersions);
        } else {
          setLocations([]);
        }
      } catch (error) {
        console.error('Error fetching location data:', error);
        setError(error.message);
        setLocations([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchLocations();
    }
  }, [id]);

  return { locations, isLoading, error };
};

export default useLocationTab;
