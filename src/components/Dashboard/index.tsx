import * as Styles from './styles';
import { TableComponent } from '../Table';

interface Props {
    onOpenNewModal: (type: 'create' | 'edit', id?: number) => void;
}

export function Dashboard({ onOpenNewModal }: Props) {
    return (
        <Styles.Container>
            <TableComponent onOpenNewModal={onOpenNewModal} />
        </Styles.Container>
    )
}