import Modal from 'react-modal';
import * as Styles from './styles';
import closeImg from '../../assets/fechar.svg';
import { FormEvent, useState } from 'react';

interface Props {
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewModal({ isOpen, onRequestClose }: Props) {
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState('');

    async function handleCreate(e: FormEvent) {
        e.preventDefault();

        setTitle('');
        setAmount(0);
        setCategory('');

        onRequestClose();
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
            <Styles.Container onSubmit={(e) => handleCreate(e)}>
                <h2>Cadastrar Transação</h2>
                <input
                    type="text"
                    placeholder="Título"
                    value={title}
                    onChange={(e) => { setTitle(e.target.value) }}
                />

                <input
                    type="number"
                    placeholder="Valor"
                    value={amount}
                    onChange={(e) => { setAmount(Number(e.target.value)) }}
                />
                <input
                    type="text"
                    placeholder="Categoria"
                    value={category}
                    onChange={(e) => { setCategory(e.target.value) }}
                />
                <button type="submit">Cadastrar</button>
            </Styles.Container>
        </Modal>
    )
}