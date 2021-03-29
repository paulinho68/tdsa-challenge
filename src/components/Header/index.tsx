import logo from '../../assets/tdsa_logotipo.png';
import * as Styles from './styles';

interface Props {
    onOpenNewModal: () => void;
}

export function Header({ onOpenNewModal }: Props) {

    return (
        <Styles.Container>
            <Styles.Content>
                <img src={logo} alt="dt money" />
                <button type="button" onClick={onOpenNewModal}>
                    Novo Post
                </button>
            </Styles.Content>
        </Styles.Container>
    )
}