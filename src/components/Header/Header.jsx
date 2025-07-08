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
  useTheme as useMuiTheme,
} from '@mui/material';
import LocalLoading from '../Loaders/LocalLoading';
import logo from '../../assets/logo.png';
import LanguageSelector from '../LanguageSelector/LanguageSelector';
import ThemeToggle from '../ThemeToggle/ThemeToggle';

// import TypeFilter from '../filters/TypeFilter';
// import RegionFilter from '../filters/RegionFilter';
import useHeader from './HeaderHook';
import { Search, SlidersHorizontal } from 'lucide-react';

const Header = ({ openModal, setPokeModal }) => {
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

  const muiTheme = useMuiTheme();

  return (
    <Stack
      component="header"
      direction="row"
      spacing={2}
      alignItems="center"
      sx={{
        color: muiTheme.palette.text.secondary,
        width: '100%',
        justifyContent: 'center',
        zIndex: 1,
      }}
    >
      <Box component="img" src={logo} alt="pokedex" sx={{ width: 240 }} />

      <Box sx={{ position: 'relative' }}>
        <Stack
          direction="row"
          alignItems="center"
          sx={{
            p: '2px 4px',
            width: 384,
            border: `2px solid ${muiTheme.palette.text.secondary}`,
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

        {query.length > 0 && (
          <Paper
            sx={{
              position: 'absolute',
              width: '100%',
              bgcolor: muiTheme.palette.background.paper,
              color: muiTheme.palette.text.primary,
              borderRadius: '8px',
              maxHeight: '300px',
              overflowY: 'scroll',
              zIndex: 10000,
              boxShadow: 3,
            }}
          >
            {isLoading && query.length > 0 ? (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 2,
                  height: '100px'
                }}
              >
                <Box sx={{ width: '40px', height: '40px' }}>
                  <LocalLoading color={muiTheme.palette.primary.main} />
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
                        backgroundColor: muiTheme.palette.action.hover,
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
        maxWidth="xs"
        open={modalFilterOpen}
        onClose={closeFilterModal}
        aria-labelledby="filter-modal-title"
        PaperProps={{
          sx: {
            p: 3,
            borderRadius: '12px',
          },
        }}
      >
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Typography variant="h6" component="h2">
              Settings
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1">Theme</Typography>
              <Box sx={{ mt: 1, mb: 2 }}>
                <ThemeToggle />
              </Box>
            </Box>
          </Grid>

          <Divider />

          <Grid item>
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1">Language</Typography>
              <Box sx={{ mt: 1, mb: 2 }}>
                <LanguageSelector />
              </Box>
            </Box>
          </Grid>

          <Divider />

          <Grid item>
            <Typography id="filter-modal-title" variant="h6" component="h2">
              Filters
            </Typography>
            {/* <TypeFilter closeFilterModal={closeFilterModal} /> */}
            {/* <RegionFilter closeFilterModal={closeFilterModal} /> */}
          </Grid>
        </Grid>
      </Dialog>
    </Stack>
  );
};

export default Header;
