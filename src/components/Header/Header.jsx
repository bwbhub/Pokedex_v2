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
} from '@mui/material';
import logo from '../../assets/logo.png';

// import TypeFilter from '../filters/TypeFilter';
// import RegionFilter from '../filters/RegionFilter';
import useHeader from './HeaderHook';
import { Search, SlidersHorizontal } from 'lucide-react';

const Header = ({ openModal }) => {
  const {
    modalFilterOpen,
    query,
    searchList,
    onQueryChange,
    openFilterModal,
    closeFilterModal,
    handleSetPokedetails,
  } = useHeader({ openModal });

  return (
    <Stack
      component="header"
      direction="row"
      spacing={2}
      alignItems="center"
      sx={{ color: '#ACACAC', width: '100%', justifyContent: 'center', zIndex:1 }}
    >
      <Box component="img" src={logo} alt="pokedex" sx={{ width: 240 }} />

      <Box sx={{ position: 'relative' }}>
        <Stack
          direction="row"
          alignItems="center"
          sx={{
            p: '2px 4px',
            width: 384,
            border: '2px solid #ACACAC',
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
              bgcolor: '#2b2b2b',
              color: 'inherit',
              zIndex: 20,
              borderRadius: '8px',
              maxHeight: "300px",
              overflowY: "scroll"
            }}
          >
            <List dense>
              {searchList
                .filter((poke) => poke?.name?.toLowerCase().includes(query.toLowerCase()))
                .map((poke) => (
                  <ListItemButton
                    key={poke.name}
                    onClick={() => handleSetPokedetails(poke)}
                    sx={{
                      textTransform: 'capitalize',
                      '&:hover': {
                        fontWeight: 'bold',
                        backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      },
                    }}
                  >
                    <ListItemText primary={poke.name} />
                  </ListItemButton>
                ))}
            </List>
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
      >
        <Grid >
          <Typography id="filter-modal-title" variant="h6" component="h2">
            Filters
          </Typography>
          {/* <TypeFilter closeFilterModal={closeFilterModal} /> */}
          {/* <RegionFilter closeFilterModal={closeFilterModal} /> */}
        </Grid>
      </Dialog>
    </Stack>
  );
};

export default Header;
