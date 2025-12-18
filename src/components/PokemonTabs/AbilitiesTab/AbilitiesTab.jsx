import React, { useState, useMemo, useEffect } from 'react';
import { 
  Grid, 
  Typography, 
  FormControl, 
  Select, 
  MenuItem, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Chip,
  Box,
  ToggleButton,
  ToggleButtonGroup
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';
import useAbilitiesTab from './useAbilitiesTab';
import pokeApi from '../../../api/modules/pokedex.api';
import PokemonTypeChip from '../../PokemonTypeChip/PokemonTypeChip';
import LocalLoading from '../../Loaders/LocalLoading';

/**
 * Composant affichant les attaques d'un Pokémon
 * @param {Object} props - Les propriétés du composant
 * @param {Object} props.pokeInfo - Les données du Pokémon
 */
const AbilitiesTab = ({ pokeInfo }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [selectedGeneration, setSelectedGeneration] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('level-up');
  const [moveDetails, setMoveDetails] = useState({});
  const [machineNumbers, setMachineNumbers] = useState({});
  const [isLoadingMoves, setIsLoadingMoves] = useState(false);
  
  // Game version to generation mapping
  const versionToGeneration = {
    'red-blue': 'generation1',
    'yellow': 'generation1',
    'gold-silver': 'generation2',
    'crystal': 'generation2',
    'ruby-sapphire': 'generation3',
    'emerald': 'generation3',
    'firered-leafgreen': 'generation3',
    'diamond-pearl': 'generation4',
    'platinum': 'generation4',
    'heartgold-soulsilver': 'generation4',
    'black-white': 'generation5',
    'black-2-white-2': 'generation5',
    'x-y': 'generation6',
    'omega-ruby-alpha-sapphire': 'generation6',
    'sun-moon': 'generation7',
    'ultra-sun-ultra-moon': 'generation7',
    'lets-go-pikachu-lets-go-eevee': 'generation7',
    'sword-shield': 'generation8',
    'brilliant-diamond-shining-pearl': 'generation8',
    'legends-arceus': 'generation8',
    'scarlet-violet': 'generation9'
  };
  
  // Learning method mapping
  const methodMapping = {
    'level-up': 'Montée de niveau',
    'machine': 'CT/CS',
    'tutor': 'Donneur de capacités',
    'egg': 'Reproduction'
  };
  
  // Get translated generation name
  const getGenerationName = (generationKey) => {
    return t(`generations.${generationKey}`);
  };
  
  // Extract and process moves data
  const { generations, movesByMethod } = useMemo(() => {
    if (!pokeInfo?.moves) return { generations: [], movesByMethod: {} };
    
    const generationsSet = new Set();
    const movesByMethod = {
      'level-up': [],
      'machine': [],
      'tutor': [],
      'egg': []
    };
    
    pokeInfo.moves.forEach(moveData => {
      moveData.version_group_details.forEach(versionDetail => {
        const version = versionDetail.version_group.name;
        const generation = versionToGeneration[version];
        
        // Skip if generation is undefined (version not mapped)
        if (!generation) return;
        
        generationsSet.add(generation);
        
        const method = versionDetail.move_learn_method.name;
        const moveInfo = {
          name: moveData.move.name,
          level: versionDetail.level_learned_at,
          method: method,
          version: version,
          generation: generation
        };
        
        // Categorize moves by method
        if (movesByMethod[method]) {
          movesByMethod[method].push(moveInfo);
        }
      });
    });
    
    // Sort moves by method-specific criteria
    Object.keys(movesByMethod).forEach(method => {
      if (method === 'level-up') {
        movesByMethod[method].sort((a, b) => a.level - b.level);
      } else {
        movesByMethod[method].sort((a, b) => a.name.localeCompare(b.name));
      }
    });
    
    // Sort generations and filter out undefined
    const sortedGenerations = Array.from(generationsSet)
      .filter(gen => gen !== undefined)
      .sort((a, b) => {
        const genOrder = ['generation1', 'generation2', 'generation3', 'generation4', 'generation5', 'generation6', 'generation7', 'generation8', 'generation9'];
        return genOrder.indexOf(a) - genOrder.indexOf(b);
      });
    
    return {
      generations: sortedGenerations,
      movesByMethod: movesByMethod
    };
  }, [pokeInfo]);
  
  // Set default generation to the latest one available
  useEffect(() => {
    if (generations.length > 0 && selectedGeneration === '') {
      setSelectedGeneration(generations[generations.length - 1]);
    }
  }, [generations, selectedGeneration]);
  
  // Filter moves based on selected generation and method, remove duplicates
  const filteredMoves = useMemo(() => {
    if (!selectedGeneration || !selectedMethod) return [];
    
    const methodMoves = movesByMethod[selectedMethod] || [];
    const generationMoves = methodMoves.filter(move => move.generation === selectedGeneration);
    
    // Remove duplicates by keeping the best move for each unique move name
    const uniqueMoves = new Map();
    generationMoves.forEach(move => {
      const existing = uniqueMoves.get(move.name);
      if (!existing) {
        uniqueMoves.set(move.name, move);
      } else if (selectedMethod === 'level-up' && move.level < existing.level) {
        // For level-up, keep the lowest level
        uniqueMoves.set(move.name, move);
      }
    });
    
    const result = Array.from(uniqueMoves.values());
    return selectedMethod === 'level-up' 
      ? result.sort((a, b) => a.level - b.level)
      : result.sort((a, b) => a.name.localeCompare(b.name));
  }, [movesByMethod, selectedGeneration, selectedMethod]);
  
  // Fetch move details for translations and types based on filtered moves
  useEffect(() => {
    const fetchMoveDetails = async () => {
      const uniqueMoves = [...new Set(filteredMoves.map(move => move.name))];
      const details = { ...moveDetails }; // Keep existing details
      
      console.log('Fetching details for moves:', uniqueMoves);
      
      // Fetch details for moves we don't have yet
      const movesToFetch = uniqueMoves.filter(moveName => !details[moveName]);
      
      if (movesToFetch.length === 0) {
        setIsLoadingMoves(false);
        return;
      }
      
      setIsLoadingMoves(true);
      console.log('Need to fetch:', movesToFetch);
      
      // Use Promise.allSettled to handle failures gracefully
      const promises = movesToFetch.map(async (moveName) => {
        try {
          const { response } = await pokeApi.getMove({ moveName });
          if (response) {
            // Fetch machine number if it's a machine move
            let machineInfo = null;
            if (response.machines && response.machines.length > 0) {
              // Get the machine entry for the selected generation
              let machineEntry = response.machines.find(machine => {
                // Try to match generation based on version group
                return machine.version_group && versionToGeneration[machine.version_group.name] === selectedGeneration;
              });
              
              // If no exact match, search through all machines for this generation
              if (!machineEntry) {
                for (const machine of response.machines) {
                  if (machine.version_group && versionToGeneration[machine.version_group.name] === selectedGeneration) {
                    machineEntry = machine;
                    break;
                  }
                }
              }
              
              // Fallback to latest if still no match
              if (!machineEntry) {
                machineEntry = response.machines[response.machines.length - 1];
              }
              
              if (machineEntry?.machine?.url) {
                try {
                  const machineResponse = await fetch(machineEntry.machine.url);
                  const machineData = await machineResponse.json();
                  
                  // Extract TM/HM number from item name (e.g., "tm13" -> "CT13")
                  if (machineData.item?.name) {
                    const itemName = machineData.item.name;
                    if (itemName.startsWith('tm')) {
                      const tmNumber = itemName.replace('tm', '');
                      machineInfo = `CT${tmNumber.padStart(2, '0')}`;
                    } else if (itemName.startsWith('hm')) {
                      const hmNumber = itemName.replace('hm', '');
                      machineInfo = `CS${hmNumber.padStart(2, '0')}`;
                    }
                  }
                } catch (machineError) {
                  console.error(`Error fetching machine data for ${moveName}:`, machineError);
                }
              }
            }
            
            return {
              moveName,
              data: {
                type: response.type?.name || 'unknown',
                names: response.names || [],
                power: response.power,
                accuracy: response.accuracy,
                pp: response.pp
              },
              machineInfo
            };
          }
        } catch (error) {
          console.error(`Error fetching move ${moveName}:`, error);
          return {
            moveName,
            data: {
              type: 'unknown',
              names: [],
              power: null,
              accuracy: null,
              pp: null
            }
          };
        }
      });
      
      const results = await Promise.allSettled(promises);
      
      const newMachineNumbers = { ...machineNumbers };
      
      results.forEach((result) => {
        if (result.status === 'fulfilled' && result.value) {
          details[result.value.moveName] = result.value.data;
          if (result.value.machineInfo) {
            newMachineNumbers[result.value.moveName] = result.value.machineInfo;
          }
        }
      });
      
      setMachineNumbers(newMachineNumbers);
      
      setMoveDetails(details);
      setIsLoadingMoves(false);
    };
    
    if (filteredMoves.length > 0) {
      fetchMoveDetails();
    } else {
      setIsLoadingMoves(false);
    }
  }, [filteredMoves, selectedGeneration, selectedMethod, moveDetails, machineNumbers]);
  
  // Set loading when generation or method changes, but only if we need to fetch new data
  useEffect(() => {
    if (selectedGeneration && selectedMethod) {
      const uniqueMoves = [...new Set(filteredMoves.map(move => move.name))];
      const movesToFetch = uniqueMoves.filter(moveName => !moveDetails[moveName]);
      
      // Only show loading if we actually need to fetch new moves
      if (movesToFetch.length > 0) {
        setIsLoadingMoves(true);
      } else {
        setIsLoadingMoves(false);
      }
    }
  }, [selectedGeneration, selectedMethod, filteredMoves, moveDetails]);
  
  const handleGenerationChange = (event) => {
    setSelectedGeneration(event.target.value);
  };
  
  const handleMethodChange = (event, newMethod) => {
    if (newMethod !== null) {
      setSelectedMethod(newMethod);
    }
  };
  
  const formatMoveName = (name) => {
    return name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };
  
  const getMoveTranslation = (moveName) => {
    const moveDetail = moveDetails[moveName];
    if (moveDetail?.names) {
      const frenchName = moveDetail.names.find(n => n.language.name === 'fr');
      if (frenchName) return frenchName.name;
    }
    return formatMoveName(moveName);
  };
  


  return (
    <>
      <Typography variant="h6" sx={{ mb: 2 }}>Attaques</Typography>
      
      {/* Generation Selector */}
      <Box sx={{ mb: 3 }}>
        <FormControl sx={{ minWidth: 200 }}>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
            Génération:
          </Typography>
          <Select
            value={selectedGeneration}
            onChange={handleGenerationChange}
            size="small"
            sx={{
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(0, 0, 0, 0.23)',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(0, 0, 0, 0.87)',
              },
            }}
          >
            {generations.map(generation => (
              <MenuItem key={generation} value={generation}>
                {getGenerationName(generation)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      
      {/* Learning Method Toggle */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
          Méthode d'apprentissage:
        </Typography>
        <ToggleButtonGroup
          value={selectedMethod}
          exclusive
          onChange={handleMethodChange}
          size="small"
          sx={{
            '& .MuiToggleButton-root': {
              textTransform: 'none',
              fontSize: '0.875rem',
              px: 2,
              py: 0.5
            }
          }}
        >
          <ToggleButton value="level-up">
            Montée de niveau
          </ToggleButton>
          <ToggleButton value="machine">
            CT/CS
          </ToggleButton>
          <ToggleButton value="tutor">
            Donneur de capacités
          </ToggleButton>
          <ToggleButton value="egg">
            Reproduction
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      
      {/* Moves Table */}
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
        Attaques - {methodMapping[selectedMethod]}:
      </Typography>
      
      {isLoadingMoves ? (
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          minHeight: 200,
          mb: 3
        }}>
          <Box sx={{ width: '60px', height: '60px' }}>
            <LocalLoading color={theme.palette.primary.main} />
          </Box>
        </Box>
      ) : filteredMoves.length > 0 ? (
        <TableContainer 
          component={Paper} 
          sx={{ 
            mb: 3,
            maxHeight: 400,
            '& .MuiTableCell-head': {
              backgroundColor: theme.palette.background.paper,
              fontWeight: 'bold',
              position: 'sticky',
              top: 0,
              zIndex: 10,
              borderBottom: `2px solid ${theme.palette.divider}`,
              color: theme.palette.text.primary
            }
          }}
        >
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>Attaque</TableCell>
                {selectedMethod === 'level-up' && <TableCell>Niveau</TableCell>}
                {selectedMethod === 'machine' && <TableCell>CT/CS</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredMoves.map((move, index) => (
                <TableRow 
                  key={`${move.name}-${move.level}-${move.version}-${index}`}
                  sx={{ 
                    '&:nth-of-type(odd)': { 
                      backgroundColor: 'rgba(0, 0, 0, 0.02)' 
                    },
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.04)'
                    }
                  }}
                >
                  <TableCell>
                    <PokemonTypeChip 
                      type={moveDetails[move.name]?.type || 'unknown'}
                      fontSize="12px"
                      sx={{ maxWidth: '80px' }}
                    />
                  </TableCell>
                  <TableCell sx={{ textTransform: 'capitalize' }}>
                    {getMoveTranslation(move.name)}
                  </TableCell>
                  {selectedMethod === 'level-up' && (
                    <TableCell sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                      {move.level === 0 ? 'Évolution' : move.level}
                    </TableCell>
                  )}
                  {selectedMethod === 'machine' && (
                    <TableCell sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                      {machineNumbers[move.name] || '?'}
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography sx={{ mb: 3, fontStyle: 'italic', color: 'text.secondary' }}>
          Aucune attaque {methodMapping[selectedMethod].toLowerCase()} pour {getGenerationName(selectedGeneration)}.
        </Typography>
      )}
    </>
  );
};

export default AbilitiesTab;
