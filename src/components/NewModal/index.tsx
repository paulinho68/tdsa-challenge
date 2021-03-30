import Modal from 'react-modal';
import * as Styles from './styles';
import closeImg from '../../assets/fechar.svg';
import Noty from 'noty';

import { useState } from 'react';
import { FormComment } from './formComment';
import { FormPost } from './formPost';

interface Props {
    isOpen: boolean;
    type: 'create' | 'edit';
    onRequestClose: () => void;
}


export function NewModal({ isOpen, onRequestClose, type }: Props) {
    const [continueWithModalOpen, setContinueWithModalOpen] = useState(false);
    const [showSecondForm, setShowSecondForm] = useState(false);

    const Notify = (text: string, type: Noty.Type) => {
        new Noty({
            text,
            type,
            timeout: 4000,
            progressBar: true
        }).show();
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >
            <button type="button" onClick={onRequestClose} className="react-modal-close">
                <img src={closeImg} alt="Fechar Modal" />
            </button>
            <Styles.Container>
                <h2>{type === 'create' ? 'Create Post' : 'Edit Post'}</h2>
                <FormPost
                    Notify={Notify}
                    continueWithModalOpen={continueWithModalOpen}
                    onRequestClose={onRequestClose}
                    setContinueWithModalOpen={setContinueWithModalOpen}
                    setShowSecondForm={setShowSecondForm}
                    showSecondForm={showSecondForm}
                />
                {showSecondForm ? (
                    <FormComment
                        type={type}
                        Notify={Notify}
                        continueWithModalOpen={continueWithModalOpen}
                        onRequestClose={onRequestClose}
                        setContinueWithModalOpen={setContinueWithModalOpen}
                        setShowSecondForm={setShowSecondForm}
                    />
                ) : null}
            </Styles.Container>
        </Modal >
    )
}