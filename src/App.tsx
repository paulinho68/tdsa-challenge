import { Header } from './components/Header';
import { NewModal } from './components/NewModal';
import { Dashboard } from './components/Dashboard';
import { GlobalStyle } from './styles/global';
import { useState } from 'react';


import Modal from 'react-modal';
import { PostsProvider } from './hooks/usePosts';

import "../node_modules/noty/lib/noty.css";
import "../node_modules/noty/lib/themes/mint.css";

Modal.setAppElement('#root');

export function App() {
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [typeNewModal, setTypeNewModal] = useState<'create' | 'edit'>('create');


  function handleOpenNewModal(type: 'create' | 'edit') {
    setTypeNewModal(type);
    setIsNewModalOpen(true);
  }

  function handleCloseNewModal() {
    setIsNewModalOpen(false);
  }

  return (
    <PostsProvider>
      <Header onOpenNewModal={handleOpenNewModal} />
      <Dashboard />
      <NewModal isOpen={isNewModalOpen} onRequestClose={handleCloseNewModal} type={typeNewModal} />
      <GlobalStyle />
    </PostsProvider>
  );
}
