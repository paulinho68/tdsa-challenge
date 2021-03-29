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
    makeStyles
} from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const useStyles = makeStyles({
    table: {
        minWidth: 400,
    },
});

interface DataProps {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export function TableComponent() {
    const classes = useStyles();
    const [data, setData] = useState<DataProps[]>([]);
    const [open, setOpen] = useState(false);
    const [postOpenId, setPostOpenId] = useState(0);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(json => {
                setData(json);
            })
    }, []);

    return (
        <Styles.Container>
            <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row) => (
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
                                                    <Typography variant="h6" gutterBottom component="div">Content</Typography>
                                                    <Table size="small" aria-label="purchases">
                                                        <TableBody>
                                                            <TableRow key={row.id}>
                                                                <TableCell align="right">
                                                                    {row.body}
                                                                </TableCell>
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
            </TableContainer>
        </Styles.Container>
    )
}