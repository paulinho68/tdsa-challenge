import logo from '../../assets/tdsa_logotipo.png';
import * as Styles from './styles';

interface Props {
    onOpenNewModal: (type: 'create' | 'edit', id?: number) => void;
}

export function Header({ onOpenNewModal }: Props) {

    return (
        <Styles.Container>
            <Styles.Content>
                <img src={logo} alt="dt money" />
                <button type="button" onClick={() => onOpenNewModal('create')}>
                    New Post
                </button>
            </Styles.Content>
        </Styles.Container>
    )
}