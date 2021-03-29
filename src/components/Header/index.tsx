import logo from '../../assets/tdsa_logotipo.png';
import * as Styles from './styles';

interface Props {
    onOpenNewTransactionModal: () => void;
}

export function Header({ onOpenNewTransactionModal }: Props) {

    return (
        <Styles.Container>
            <Styles.Content>
                <img src={logo} alt="dt money" />
                <button type="button" onClick={onOpenNewTransactionModal}>
                    Novo Post
                </button>
            </Styles.Content>
        </Styles.Container>
    )
}