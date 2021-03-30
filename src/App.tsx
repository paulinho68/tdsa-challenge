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
  const [postId, setPostId] = useState(0);
  const [typeNewModal, setTypeNewModal] = useState<'create' | 'edit'>('create');


  function handleOpenNewModal(type: 'create' | 'edit', id?: number) {
    setTypeNewModal(type);
    setIsNewModalOpen(true);
    if (!!id) {
      setPostId(id);
    } else {
      setPostId(0);
    }
  }

  function handleCloseNewModal() {
    setIsNewModalOpen(false);
  }

  return (
    <PostsProvider>
      <Header onOpenNewModal={handleOpenNewModal} />
      <Dashboard onOpenNewModal={handleOpenNewModal} />
      <NewModal isOpen={isNewModalOpen} onRequestClose={handleCloseNewModal} type={typeNewModal} postId={postId} />
      <GlobalStyle />
    </PostsProvider>
  );
}
