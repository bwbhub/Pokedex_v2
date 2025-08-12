import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Button,
  Grid,
  Typography,
  useMediaQuery,
  Tabs,
  Tab,
  Select,
  MenuItem,
  FormControl,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

import './PokemonPage.css';
import usePokemonPage from './PokemonPageHooks';
import { hexToRgba } from '../../utils/color';
import pokeball from '../../assets/pokeball.png';
import PokemonTypeChip from '../../components/PokemonTypeChip/PokemonTypeChip';
import { formatId } from '../../utils/textConvert';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ChevronsUpDown } from 'lucide-react';

import GeneralInfoTab from '../../components/PokemonTabs/GeneralInfoTab/GeneralInfoTab';
import StatisticsTab from '../../components/PokemonTabs/StatisticsTab/StatisticsTab';
import AbilitiesTab from '../../components/PokemonTabs/AbilitiesTab/AbilitiesTab';
import LocationTab from '../../components/PokemonTabs/LocationTab/LocationTab';
import EvolutionTab from '../../components/PokemonTabs/EvolutionTab/EvolutionTab';

const PokemonPage = () => {
  const { t } = useTranslation();

  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const {
    species,
    pokeInfo,
    filteredName,
    shownId,
    animationDistance,
    setAnimationDistance,
    shinyImg,
    setShinyImg,
    mainType,
    color,
    theme,
    activeLanguage,
    id,
    navigationInfo,
  } = usePokemonPage();
  const textRef = useRef(null);
  const containerRef = useRef(null);

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (containerRef.current && textRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const textWidth = textRef.current.offsetWidth;
      const distance = textWidth - containerWidth;
      setAnimationDistance(distance > 0 ? distance : 0);

      if (textRef.current) {
        textRef.current.style.setProperty('--slide-distance', `-${distance}px`);
      }
    }
  }, [filteredName]);

  return (
    <Grid
      container
      sx={{ backgroundColor: color, height: '100%', minHeight: '100vh' }}
    >
      {/* Conteneur pour la barre sticky qui ne prend pas de place dans le flux */}
      <Box sx={{ height: 0, width: '100%', position: 'relative', zIndex: 10 }}>
        <Grid
          xs={12}
          sx={{
            width: '100%',
            height: '50px',
            position: isMobile ? 'sticky' : 'absolute',
            top: 0, // Important pour le positionnement sticky
            backgroundColor: color,
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Grid
            sx={{
              width: '40%',
              p: '12px',
              display: 'flex',
              justifyContent: 'start',
              gap: '8px',
            }}
          >
            {isMobile ? (
              navigationInfo?.prevId ? (
                <Link
                  to={`/${navigationInfo.prevId}`}
                  style={{
                    textDecoration: 'none',
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: '#F3F4F6',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <ChevronLeft size={20} />
                  {formatId(navigationInfo.prevShownId)}
                </Link>
              ) : null
            ) : (
              <>
                {navigationInfo?.prevId && (
                  <Link
                    to={`/${navigationInfo.prevId}`}
                    style={{
                      textDecoration: 'none',
                      fontSize: '1rem',
                      fontWeight: '600',
                      color: '#F3F4F6',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <ChevronLeft size={20} />
                    {formatId(navigationInfo.prevShownId)}
                  </Link>
                )}
              </>
            )}
          </Grid>
          <Grid
            sx={{
              width: '40%',
              p: '12px',
              display: 'flex',
              justifyContent: 'end',
              gap: '12px',
            }}
          >
            {isMobile ? (
              navigationInfo?.nextId ? (
                <Link
                  to={`/${navigationInfo.nextId}`}
                  style={{
                    textDecoration: 'none',
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: '#F3F4F6',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  {formatId(navigationInfo.nextShownId)}
                  <ChevronRight size={20} />
                </Link>
              ) : null
            ) : (
              <>
                {navigationInfo?.nextId && (
                  <Link
                    to={`/${navigationInfo.nextId}`}
                    style={{
                      textDecoration: 'none',
                      fontSize: '1rem',
                      fontWeight: '600',
                      color: '#F3F4F6',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    {formatId(navigationInfo.nextShownId)}
                    <ChevronRight size={20} />
                  </Link>
                )}
              </>
            )}
          </Grid>
        </Grid>
      </Box>
      {/* Section 1: Détails du Pokémon */}
      <Grid
        sx={{
          width: isMobile ? '100%' : '40%',
          height: '100%',
          minHeight: ['100vh', '100dvh'],
          position: 'relative',
          overflow: 'hidden',
        }}
        xs={12}
        sm={5}
      >
        <Grid
          ref={containerRef}
          className="bg-title-container"
          sx={{
            top: '-16px',
            height: '300px',
            zIndex: 0,
          }}
        >
          <Typography
            ref={textRef}
            className="bg-title"
            sx={{
              color: 'transparent',
              fontSize: '200px',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              top: '1px',
              animation:
                animationDistance > 0 ? 'sliding 20s infinite linear' : 'none',
              left: '0',
              position: 'absolute',
              pointerEvents: 'none',
              zIndex: 1,
            }}
          >
            {filteredName}
          </Typography>
          <span
            style={{
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `linear-gradient(to top, ${hexToRgba(color, 1)} 30%, ${hexToRgba(color, 0)} 100%)`,
              pointerEvents: 'none',
              zIndex: 2,
            }}
          />
          <span
            style={{
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `linear-gradient(to left, ${hexToRgba(color, 1)} 0%, ${hexToRgba(color, 0)} 5%)`,
              pointerEvents: 'none',
              zIndex: 2,
            }}
          />
        </Grid>
        <Grid
          sx={{
            width: isMobile ? '90%' : '70%',
            overflow: 'hidden',
            position: 'absolute',
            left: '50%',
            bottom: '50%',
            transform: 'translate(-50%, 50%)',
            zIndex: 4,
          }}
        >
          <Grid
            sx={{
              width: '200%',
              transition:
                'margin-left 800ms cubic-bezier(0.770, 0.000, 0.175, 1.000)',
              ml: shinyImg ? '-100%' : 0,
              cursor: 'pointer',
            }}
            onClick={() => setShinyImg(!shinyImg)}
          >
            <Box
              component="img"
              src={
                pokeInfo?.sprites?.other?.['official-artwork']?.front_default
                // pokeInfo?.sprites?.other?.home?.front_default
              }
              alt={filteredName}
              sx={{
                width: '50%',
                zIndex: 5,
                filter:
                  'brightness(1.05) saturate(1.5) drop-shadow(5px 5px 5px rgba(0,0,0,0.3))',
              }}
            />
            <Box
              component="img"
              src={
                pokeInfo?.sprites?.other?.['official-artwork']?.front_shiny
                // pokeInfo?.sprites?.other?.home?.front_shiny
              }
              alt={filteredName}
              sx={{
                width: '50%',
                zIndex: 5,
                filter:
                  'brightness(1.05) saturate(1.5) drop-shadow(5px 5px 5px rgba(0,0,0,0.3))',
              }}
            />
          </Grid>
          <img
            src={pokeball}
            alt="Pokeball"
            style={{
              rotate: '35deg',
              maskImage: `url(${pokeball})`,
              WebkitMaskImage: `url(${pokeball})`,
              maskSize: 'contain',
              WebkitMaskSize: 'contain',
              backgroundColor: theme.palette.text.secondary,
              position: 'absolute',
              width: '100%',
              left: '70%',
              bottom: '25%',
              transform: 'translate(-50%, 50%)',
              opacity: '0.15',
              zIndex: -10,
            }}
          />
          <Grid
            sx={{
              position: 'relative',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography
              sx={{
                textTransform: 'capitalize',
                fontSize: '26px',
                fontWeight: 'bold',
                color: '#f3f4f6',
                lineHeight: '28px',
              }}
            >
              {filteredName}
            </Typography>
            <Typography
              sx={{
                textTransform: 'capitalize',
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#f3f4f6',
                lineHeight: '20px',
                mb: 1,
              }}
            >
              {formatId(shownId)}
            </Typography>
            <Grid
              sx={{
                display: 'flex',
                gap: '12px',
              }}
            >
              {pokeInfo?.types?.map((type, idx) => (
                <PokemonTypeChip key={type + idx} type={type} fontSize="16px" />
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Section 2: Chaîne d'évolution */}
      <Grid
        sx={{
          width: isMobile ? '100%' : 'calc(60% - 12px)',
          height: '100%',
          minHeight: isMobile ? '100vh' : 'calc(100vh - 62px)',
          backgroundColor: theme.palette.background.paper,
          ...(isMobile
            ? {}
            : {
                marginTop: '62px',
                marginLeft: '12px',
              }),
          borderRadius: isMobile ? '32px 32px 0 0' : '32px 0 0 0',
          overflow: 'hidden',
        }}
        xs={12}
        sm={7}
      >
        {/** Section 3 - Tabs */}
        <Box sx={{ width: '100%', p: 2 }}>
          {/* Navigation : Tabs pour desktop, Select pour mobile */}
          {isMobile ? (
            // Version mobile : Menu déroulant
            <FormControl sx={{ mb: 2, width: '80%' }}>
              <Select
                value={tabValue}
                onChange={(event) => setTabValue(event.target.value)}
                variant="standard"
                disableUnderline
                sx={{
                  fontSize: '1rem',
                  fontWeight: 500,
                  color: theme.palette.text.primary,
                  '& .MuiSelect-select': {
                    paddingTop: 1,
                    paddingBottom: 1,
                    paddingLeft: 0,
                    paddingRight: '24px !important',
                  },
                  '& .MuiSelect-icon': {
                    color: theme.palette.text.primary,
                    display: 'none',
                  },
                }}
                endAdornment={<ChevronsUpDown />}
              >
                <MenuItem value={0}>
                  {t('pokemonTabs.tabs.generalInfo')}
                </MenuItem>
                <MenuItem value={1}>
                  {t('pokemonTabs.tabs.statistics')}
                </MenuItem>
                <MenuItem value={2}>{t('pokemonTabs.tabs.abilities')}</MenuItem>
                <MenuItem value={3}>{t('pokemonTabs.tabs.location')}</MenuItem>
                <MenuItem value={4}>{t('pokemonTabs.tabs.evolution')}</MenuItem>
              </Select>
            </FormControl>
          ) : (
            // Version desktop : Tabs classiques
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              aria-label="pokemon information tabs"
              sx={{
                mb: 2,
                '& .MuiTabs-indicator': {
                  backgroundColor: color,
                },
                '& .MuiTab-root.Mui-selected': {
                  color: color,
                },
              }}
            >
              <Tab
                label={t('pokemonTabs.tabs.generalInfo')}
                id="tab-0"
                aria-controls="tabpanel-0"
              />
              <Tab
                label={t('pokemonTabs.tabs.statistics')}
                id="tab-1"
                aria-controls="tabpanel-1"
              />
              <Tab
                label={t('pokemonTabs.tabs.abilities')}
                id="tab-2"
                aria-controls="tabpanel-2"
              />
              <Tab
                label={t('pokemonTabs.tabs.location')}
                id="tab-3"
                aria-controls="tabpanel-3"
              />
              <Tab
                label={t('pokemonTabs.tabs.evolution')}
                id="tab-4"
                aria-controls="tabpanel-4"
              />
            </Tabs>
          )}

          {/* Container pour l'affichage des contenus */}
          {isMobile ? (
            // Version mobile : Animation d'opacité
            <Box sx={{ position: 'relative', height: 'calc(100vh - 62px - 56px)' }}>
              {/* Tab 0 - Informations générales */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  opacity: tabValue === 0 ? 1 : 0,
                  visibility: tabValue === 0 ? 'visible' : 'hidden',
                  transition:
                    'opacity 500ms ease-in-out, visibility 500ms ease-in-out',
                  pointerEvents: tabValue === 0 ? 'auto' : 'none',
                }}
              >
                <GeneralInfoTab
                  species={species}
                  pokeInfo={pokeInfo}
                  activeLanguage={activeLanguage}
                  isMobile={isMobile}
                />
              </Box>

              {/* Tab 1 - Statistiques */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  opacity: tabValue === 1 ? 1 : 0,
                  visibility: tabValue === 1 ? 'visible' : 'hidden',
                  transition:
                    'opacity 500ms ease-in-out, visibility 500ms ease-in-out',
                  pointerEvents: tabValue === 1 ? 'auto' : 'none',
                }}
              >
                <StatisticsTab
                  pokeInfo={pokeInfo}
                  color={color}
                  theme={theme}
                  isMobile={isMobile}
                />
              </Box>

              {/* Tab 2 - Capacités */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  opacity: tabValue === 2 ? 1 : 0,
                  visibility: tabValue === 2 ? 'visible' : 'hidden',
                  transition:
                    'opacity 500ms ease-in-out, visibility 500ms ease-in-out',
                  pointerEvents: tabValue === 2 ? 'auto' : 'none',
                }}
              >
                <AbilitiesTab pokeInfo={pokeInfo} isMobile={isMobile} />
              </Box>

              {/* Tab 3 - Localisation */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  opacity: tabValue === 3 ? 1 : 0,
                  height: '100%',
                  visibility: tabValue === 3 ? 'visible' : 'hidden',
                  transition:
                    'opacity 500ms ease-in-out, visibility 500ms ease-in-out',
                  pointerEvents: tabValue === 3 ? 'auto' : 'none',
                  overflowY: 'auto',
                  '&::-webkit-scrollbar': {
                    width: '6px',
                  },
                  '&::-webkit-scrollbar-track': {
                    background: 'rgba(0,0,0,0.1)',
                    borderRadius: '3px',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    background: 'rgba(0,0,0,0.3)',
                    borderRadius: '3px',
                    '&:hover': {
                      background: 'rgba(0,0,0,0.5)',
                    },
                  },
                }}
              >
                <LocationTab id={id} isMobile={isMobile} />
              </Box>

              {/* Tab 4 - Évolutions */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  opacity: tabValue === 4 ? 1 : 0,
                  visibility: tabValue === 4 ? 'visible' : 'hidden',
                  transition:
                    'opacity 500ms ease-in-out, visibility 500ms ease-in-out',
                  pointerEvents: tabValue === 4 ? 'auto' : 'none',
                }}
              >
                <EvolutionTab
                  id={id}
                  species={species}
                  activeLanguage={activeLanguage}
                  isMobile={isMobile}
                />
              </Box>
            </Box>
          ) : (
            // Version desktop : animation carousel
            <Box
              sx={{
                width: '100%',
                overflowY: 'scroll',
                overflowX: 'hidden',
                position: 'relative',
                height: 'calc(100vh - 180px)', // Simple calculation: viewport - estimated space for header, tabs, paddings
              }}
            >
              <Box
                sx={{
                  width: '500%', // 5 tabs × 100%
                  display: 'flex',
                  transition:
                    'margin-left 800ms cubic-bezier(0.770, 0.000, 0.175, 1.000)',
                  marginLeft: `${-tabValue * 100}%`, // Décalage basé sur l'index du tab
                }}
              >
                {/* Tab 0 - Informations générales */}
                <Box sx={{ width: '20%', flexShrink: 0, px: 1 }}>
                  <GeneralInfoTab
                    species={species}
                    pokeInfo={pokeInfo}
                    activeLanguage={activeLanguage}
                  />
                </Box>

                {/* Tab 1 - Statistiques */}
                <Box sx={{ width: '20%', flexShrink: 0, px: 1 }}>
                  <StatisticsTab
                    pokeInfo={pokeInfo}
                    color={color}
                    theme={theme}
                  />
                </Box>

                {/* Tab 2 - Capacités */}
                <Box sx={{ width: '20%', flexShrink: 0, px: 1 }}>
                  <AbilitiesTab pokeInfo={pokeInfo} />
                </Box>

                {/* Tab 3 - Localisation */}
                <Box
                  sx={{
                    width: '20%',
                    flexShrink: 0,
                    px: 1,
                    height: '100%',
                    overflowY: 'auto',
                    '&::-webkit-scrollbar': {
                      width: '6px',
                    },
                    '&::-webkit-scrollbar-track': {
                      background: 'rgba(0,0,0,0.1)',
                      borderRadius: '3px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                      background: 'rgba(0,0,0,0.3)',
                      borderRadius: '3px',
                      '&:hover': {
                        background: 'rgba(0,0,0,0.5)',
                      },
                    },
                  }}
                >
                  <LocationTab id={id} />
                </Box>

                {/* Tab 4 - Évolutions */}
                <Box sx={{ width: '20%', flexShrink: 0, px: 1 }}>
                  <EvolutionTab
                    id={id}
                    species={species}
                    activeLanguage={activeLanguage}
                  />
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default PokemonPage;
