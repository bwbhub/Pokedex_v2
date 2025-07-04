import { Dialog, IconButton } from '@mui/material';
import { X } from 'lucide-react';

import { bgColors } from '../../utils/color';
import { usePokedetails } from '../../context/Pokedetails';
import TopCard from './TopCard/TopCard';
import BotCard from './BotCard/BotCard';

const DetailsModal = ({ closeModal, openModal }) => {
  const { pokeDetails, pokeSpecies } = usePokedetails();

  const imgUrl =
    pokeDetails?.sprites?.other?.['official-artwork']?.front_default;
  const mainType = pokeDetails?.types[0]?.type?.name;
  const color = bgColors[mainType];

  return (
    <Dialog
      open={openModal}
      maxWidth="xs"
      onClose={() => closeModal(false)}
      sx={{
        '& .MuiDialog-paper': {
          height: '700px',
          width: '100%',
          maxHeight: 'none',
          borderRadius: '24px',
          overflow: 'hidden',
          position: 'relative',
          backgroundColor: '#363636',
        },
      }}
    >
      <IconButton
        onClick={() => closeModal(false)}
        sx={{
          position: 'absolute',
          right: '16px',
          top: '16px',
          color: '#fff',
        }}
      >
        <X />
      </IconButton>
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
