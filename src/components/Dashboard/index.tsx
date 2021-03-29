import * as Styles from './styles';
import { TransactionsTable } from '../TransactionsTable';

export function Dashboard() {
    return (
        <Styles.Container>
            <TransactionsTable />
        </Styles.Container>
    )
}