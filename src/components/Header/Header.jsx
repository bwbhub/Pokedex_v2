import React from 'react';
import {
  Box,
  Stack,
  InputBase,
  IconButton,
  Paper,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Dialog,
  Grid,
  Divider,
  useTheme,
} from '@mui/material';
import LocalLoading from '../Loaders/LocalLoading';
import logo from '../../assets/logo.png';
import LanguageSelector from './LanguageSelector/LanguageSelector';
import ThemeToggle from './ThemeToggle/ThemeToggle';

// import TypeFilter from '../filters/TypeFilter';
import RegionFilter from './Filters/Region/RegionFilter';
import useHeader from './HeaderHook';
import { Search, SlidersHorizontal } from 'lucide-react';

const Header = ({ openModal, setPokeModal, showLogo = true, isMenuMode = false }) => {
  const {
    modalFilterOpen,
    query,
    searchList,
    onQueryChange,
    openFilterModal,
    closeFilterModal,
    handleSetPokedetails,
    isLoading,
  } = useHeader({ openModal, setPokeModal });

  const theme = useTheme();

  if (isMenuMode) {
    // Mode menu déroulant responsive
    return (
      <Stack
        component="div"
        direction="column"
        spacing={{ xs: 2, sm: 3 }}
        sx={{
          color: theme.palette.text.secondary,
          width: '100%',
          minWidth: { xs: '280px', sm: '350px' },
        }}
      >
        {/* Searchbar responsive */}
        <Box sx={{ position: 'relative', width: '100%' }}>
          <Stack
            direction="row"
            alignItems="center"
            sx={{
              p: { xs: '1px 2px', sm: '2px 4px' },
              width: '100%',
              border: `2px solid ${theme.palette.text.secondary}`,
              borderRadius: '8px',
            }}
          >
            <IconButton sx={{ p: { xs: '6px', sm: '10px' }, color: 'inherit' }} aria-label="search">
              <Search size={20} />
            </IconButton>
            <InputBase
              sx={{ 
                ml: 1, 
                flex: 1, 
                color: 'inherit',
                fontSize: { xs: '14px', sm: '16px' }
              }}
              placeholder="Search a specific Pokémon !"
              value={query}
              onChange={onQueryChange}
              inputProps={{ 'aria-label': 'search a specific pokemon' }}
            />
          </Stack>

          {/* Résultats de recherche */}
          {query?.length > 0 && (
            <Paper
              sx={{
                position: 'absolute',
                width: '100%',
                bgcolor: theme.palette.background.paper,
                color: theme.palette.text.primary,
                borderRadius: '8px',
                maxHeight: { xs: '150px', sm: '200px' },
                overflowY: 'scroll',
                zIndex: 10000,
                boxShadow: 3,
                mt: 1,
              }}
            >
              {isLoading && query?.length > 0 ? (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: { xs: 1, sm: 2 },
                    height: { xs: '60px', sm: '80px' },
                  }}
                >
                  <Box sx={{ width: { xs: '24px', sm: '30px' }, height: { xs: '24px', sm: '30px' } }}>
                    <LocalLoading color={theme.palette.primary.main} />
                  </Box>
                </Box>
              ) : (
                <List dense>
                  {searchList.map((poke) => (
                    <ListItemButton
                      key={poke.name}
                      onClick={() => handleSetPokedetails(poke)}
                      sx={{
                        textTransform: 'capitalize',
                        '&:hover': {
                          fontWeight: 'bold',
                          backgroundColor: theme.palette.action.hover,
                        },
                      }}
                    >
                      <ListItemText primary={poke.displayName || poke.name} />
                    </ListItemButton>
                  ))}
                </List>
              )}
            </Paper>
          )}
        </Box>

        {/* Filtres intégrés directement */}
        <Stack direction="column" spacing={{ xs: 1.5, sm: 2 }}>
          {/* Settings */}
          <Box>
            <Typography 
              variant="h6" 
              component="h3" 
              sx={{ 
                mb: { xs: 1, sm: 2 },
                fontSize: { xs: '1.1rem', sm: '1.25rem' }
              }}
            >
              Settings
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              gap: { xs: 0.5, sm: 1 }, 
              justifyContent: 'flex-start',
              flexWrap: 'wrap'
            }}>
              <LanguageSelector />
              <ThemeToggle />
            </Box>
          </Box>

          <Divider sx={{ my: { xs: 1, sm: 1.5 } }} />

          {/* Region Filter */}
          <Box sx={{ px: { xs: 0, sm: 0 } }}>
            <RegionFilter closeFilterModal={() => {}} />
          </Box>

          <Divider sx={{ my: { xs: 1, sm: 1.5 } }} />

          {/* Filters */}
          <Box>
            <Typography 
              variant="h6" 
              component="h3"
              sx={{
                fontSize: { xs: '1.1rem', sm: '1.25rem' }
              }}
            >
              Filters
            </Typography>
            {/* <TypeFilter closeFilterModal={() => {}} /> */}
          </Box>
        </Stack>
      </Stack>
    );
  }

  // Mode header classique
  return (
    <Stack
      component="header"
      direction="row"
      spacing={2}
      alignItems="center"
      sx={{
        color: theme.palette.text.secondary,
        width: '100%',
        justifyContent: 'center',
        zIndex: 1,
      }}
    >
      {showLogo && (
        <Box component="img" src={logo} alt="pokedex" sx={{ width: 240 }} />
      )}

      <Box sx={{ position: 'relative' }}>
        <Stack
          direction="row"
          alignItems="center"
          sx={{
            p: '2px 4px',
            width: 384,
            border: `2px solid ${theme.palette.text.secondary}`,
            borderRadius: '8px',
          }}
        >
          <IconButton sx={{ p: '10px', color: 'inherit' }} aria-label="search">
            <Search />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1, color: 'inherit' }}
            placeholder="Search a specific Pokémon !"
            value={query}
            onChange={onQueryChange}
            inputProps={{ 'aria-label': 'search a specific pokemon' }}
          />
        </Stack>

        {query?.length > 0 && (
          <Paper
            sx={{
              position: 'absolute',
              width: '100%',
              bgcolor: theme.palette.background.paper,
              color: theme.palette.text.primary,
              borderRadius: '8px',
              maxHeight: '300px',
              overflowY: 'scroll',
              zIndex: 10000,
              boxShadow: 3,
            }}
          >
            {isLoading && query?.length > 0 ? (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 2,
                  height: '100px',
                }}
              >
                <Box sx={{ width: '40px', height: '40px' }}>
                  <LocalLoading color={theme.palette.primary.main} />
                </Box>
              </Box>
            ) : (
              <List dense>
                {searchList.map((poke) => (
                  <ListItemButton
                    key={poke.name}
                    onClick={() => handleSetPokedetails(poke)}
                    sx={{
                      textTransform: 'capitalize',
                      '&:hover': {
                        fontWeight: 'bold',
                        backgroundColor: theme.palette.action.hover,
                      },
                    }}
                  >
                    <ListItemText primary={poke.displayName || poke.name} />
                  </ListItemButton>
                ))}
              </List>
            )}
          </Paper>
        )}
      </Box>

      <IconButton
        onClick={openFilterModal}
        sx={{ color: 'inherit' }}
        aria-label="filters"
      >
        <SlidersHorizontal />
      </IconButton>

      <Dialog
        maxWidth="sm"
        open={modalFilterOpen}
        onClose={closeFilterModal}
        aria-labelledby="filter-modal-title"
        PaperProps={{
          sx: {
            p: 3,
            borderRadius: '12px',
            width: '100%',
            position: 'relative',
          },
        }}
      >
        <Grid container direction="column" spacing={2}>
          <Grid
            item
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant="h6" component="h2">
              Settings
            </Typography>

            <Box sx={{ display: 'flex' }}>
              <LanguageSelector />
              <ThemeToggle />
            </Box>
          </Grid>

          <Divider />

          <Grid item>
            <Box sx={{ mt: 2 }}>
              <RegionFilter closeFilterModal={closeFilterModal} />
            </Box>
          </Grid>

          <Divider />

          <Grid item>
            <Typography id="filter-modal-title" variant="h6" component="h2">
              Filters
            </Typography>
            {/* <TypeFilter closeFilterModal={closeFilterModal} /> */}
          </Grid>
        </Grid>
      </Dialog>
    </Stack>
  );
};

export default Header;
