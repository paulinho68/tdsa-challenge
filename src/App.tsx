import { Header } from './components/Header';
import { NewModal } from './components/NewModal';
import { Dashboard } from './components/Dashboard';
import { GlobalStyle } from './styles/global';
import { useState } from 'react';

import Modal from 'react-modal';

Modal.setAppElement('#root');

export function App() {
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);


  function handleOpenNewModal() {
    setIsNewModalOpen(true);
  }

  function handleCloseNewModal() {
    setIsNewModalOpen(false);
  }

  return (
    <>
      <Header onOpenNewModal={handleOpenNewModal} />
      <Dashboard />
      <NewModal isOpen={isNewModalOpen} onRequestClose={handleCloseNewModal} />
      <GlobalStyle />
    </>
  );
}
