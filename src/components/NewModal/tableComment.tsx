import * as Styles from './styles';
import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    makeStyles,
} from '@material-ui/core';
import { usePosts } from '../../hooks/usePosts';

const useStyles = makeStyles({
    table: {
        minWidth: 100,
    },
});


interface DataProps {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
}

interface Props {
    postId: number;
}

export function TableComment({ postId }: Props) {
    const [rows, setRows] = useState<DataProps[] | []>([]);
    const classes = useStyles();
    const { comments } = usePosts();

    useEffect(() => {
        const newComments = comments.filter(comment => comment.postId === postId);
        setRows(newComments);
    }, [comments]);

    return (
        <Styles.Container>
            <TableContainer component={Paper} >
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row: DataProps) => (
                            <React.Fragment key={row.id}>
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        {row.id}
                                    </TableCell>
                                    <TableCell>
                                        {row.name}
                                    </TableCell>
                                    <TableCell>
                                        {row.email}
                                    </TableCell>
                                </TableRow>
                            </React.Fragment>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Styles.Container>
    )
}