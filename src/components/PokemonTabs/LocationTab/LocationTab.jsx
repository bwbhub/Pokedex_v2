import React, { useState, useEffect } from 'react';
import { Box, Typography, Chip, Accordion, AccordionSummary, AccordionDetails, Alert, Grid } from '@mui/material';
import { ChevronDown, Info } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import useLocationTab from './useLocationTab';

const LocationTab = ({ id }) => {
  const { t } = useTranslation();
  const { locations, isLoading, error } = useLocationTab({ id });
  const [expandedAccordion, setExpandedAccordion] = useState(false);

  // Reset accordion state when tab changes (id changes)
  useEffect(() => {
    setExpandedAccordion(false);
  }, [id]);

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpandedAccordion(isExpanded ? panel : false);
  };

  return (
    <Grid>
      <Typography variant="h6" sx={{ mb: 2 }}>
        {t('pokemonTabs.location.title')}
      </Typography>

      {/* Disclaimer for Gen 8 & 9 */}
      <Alert 
        severity="info" 
        icon={<Info size={20} />}
        sx={{ mb: 2, fontSize: '0.875rem' }}
      >
        <Typography variant="body2">
          {t('pokemonTabs.location.disclaimer')}
        </Typography>
      </Alert>

      {isLoading && <Typography>{t('common.loading')}</Typography>}

      {error && (
        <Typography color="error">
          {t('common.error')}: {error}
        </Typography>
      )}

      {!isLoading && !error && locations?.length === 0 && (
        <Typography>{t('pokemonTabs.location.noLocations')}</Typography>
      )}

      {!isLoading && !error && locations?.length > 0 && (
        <Box>
          {locations?.map((versionGroup, index) => {
            const panelId = `panel-${index}`;
            return (
              <Accordion 
                key={index} 
                sx={{ mb: 1 }}
                expanded={expandedAccordion === panelId}
                onChange={handleAccordionChange(panelId)}
              >
                <AccordionSummary expandIcon={<ChevronDown />}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      {versionGroup.translationKey ? t(`pokemonTabs.location.versionGroups.${versionGroup.translationKey}`) : versionGroup.name}
                    </Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {versionGroup.locations.map((location, locationIndex) => (
                      <Typography 
                        key={locationIndex} 
                        variant="body2" 
                        sx={{ 
                          p: 1, 
                          borderRadius: 1, 
                          bgcolor: 'background.default',
                          textTransform: 'capitalize'
                        }}
                      >
                        • {location.replace(/-/g, ' ')}
                      </Typography>
                    ))}
                  </Box>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </Box>
      )}
    </Grid>
  );
};

export default LocationTab;
