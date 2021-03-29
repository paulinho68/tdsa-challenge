import * as Styles from './styles';
import React, { useEffect, useState } from 'react';
import {
    Box,
    Collapse,
    IconButton,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    makeStyles,
    TablePagination
} from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { usePosts } from '../../hooks/usePosts';

const useStyles = makeStyles({
    table: {
        minWidth: 100,
    },
});

interface DataProps {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export function TableComponent() {
    const [rows, setRows] = useState<DataProps[] | []>([]);
    const classes = useStyles();
    const { data } = usePosts();
    const [open, setOpen] = useState(false);
    const [postOpenId, setPostOpenId] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(0);

    const ChangeRowsPerPage = (min: number, max: number) => {
        const newData: DataProps[] = [];
        if (!!data) {
            for (let i = min; i <= max; i++) {
                if (!!data[i - 1]) {
                    newData.push(data[i - 1]);
                }
            }

            setRows(newData);
        }
    }

    const handleChangePage = (event: unknown, newPage: number) => {
        const min = rowsPerPage * newPage + 1;
        const max = rowsPerPage * (newPage + 1);

        setPage(newPage);
        ChangeRowsPerPage(min, max);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        ChangeRowsPerPage(0, parseInt(event.target.value));
        setPage(0);
    };

    useEffect(() => {
        ChangeRowsPerPage(0, rowsPerPage);
    }, [data, rowsPerPage]);

    return (
        <Styles.Container>
            <TableContainer component={Paper} >
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows && rows.map((row: DataProps) => (
                            <React.Fragment key={row.id}>
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        {row.id}
                                    </TableCell>
                                    <TableCell>
                                        {row.title}
                                    </TableCell>
                                    <TableCell>
                                        <IconButton aria-label="expand row" size="small" onClick={() => { setOpen(!open); setPostOpenId(row.id) }}>
                                            {open && postOpenId === row.id ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                                {postOpenId === row.id ? (
                                    <TableRow>
                                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                            <Collapse in={open} timeout="auto">
                                                <Box margin={1}>
                                                    <Table size="small" aria-label="purchases">
                                                        <TableBody>
                                                            <TableRow key={row.id}>
                                                                <Styles.SubColumn colSpan={4}>
                                                                    <Typography variant="h6" gutterBottom component="div">#{row.id} {row.title}</Typography>
                                                                    {row.body}
                                                                </Styles.SubColumn>
                                                                <Styles.SubColumn>
                                                                    <div>
                                                                        <button onClick={() => console.log(row.id)}>Editar</button>
                                                                        <button onClick={() => console.log(row.id)}>Excluir</button>
                                                                    </div>
                                                                </Styles.SubColumn>
                                                            </TableRow>
                                                        </TableBody>
                                                    </Table>
                                                </Box>
                                            </Collapse>
                                        </TableCell>
                                    </TableRow>
                                ) : null}
                            </React.Fragment>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </TableContainer>
        </Styles.Container>
    )
}