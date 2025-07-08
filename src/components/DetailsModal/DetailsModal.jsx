import { Dialog, useTheme } from '@mui/material';

import { usePokedetails } from '../../context/Pokedetails';
import TopCard from './TopCard/TopCard';
import BotCard from './BotCard/BotCard';

const DetailsModal = ({ closeModal, openModal }) => {
  const { pokeDetails, pokeSpecies } = usePokedetails();
  const theme = useTheme();

  const imgUrl =
    pokeDetails?.sprites?.other?.['official-artwork']?.front_default;
  const mainType = pokeDetails?.types[0]?.type?.name;
  const color = theme.palette.pokemon.background[mainType];

  return (
    <Dialog
      open={openModal}
      maxWidth="xs"
      onClose={() => closeModal(false)}
      sx={{
        '& .MuiDialog-paper': {
          height: '820px',
          width: '100%',
          maxHeight: 'none',
          borderRadius: '24px',
          overflow: 'hidden',
          position: 'relative',
          backgroundColor: color,
          backgroundImage: 'none',
        },
      }}
    >
      <TopCard
        pokeInfo={pokeDetails}
        species={pokeSpecies}
        color={color}
        imgUrl={imgUrl}
      />
      <BotCard
        selectedPokeInfos={pokeDetails}
        pokeDetails={pokeSpecies}
        color={color}
        imgUrl={imgUrl}
      />
    </Dialog>
  );
};

export default DetailsModal;
