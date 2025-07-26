import React, { createContext, useContext, useState } from 'react';

// Créer le contexte pour la gestion globale des modals
const ModalContext = createContext();

// Hook personnalisé pour utiliser le contexte modal
export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

// Provider pour le contexte modal
export const ModalProvider = ({ children }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = (pokemonData) => {
    setModalOpen(pokemonData);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const value = {
    modalOpen,
    openModal,
    closeModal,
  };

  return (
    <ModalContext.Provider value={value}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContext;
