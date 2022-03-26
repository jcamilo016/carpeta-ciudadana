import {styled} from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useContext, useEffect} from "react";
import {LoginContext} from "../contexts/LoginContext";
import {UseGet} from "../hooks";
import {Grid, Skeleton, Link} from "@mui/material";

const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#1976d2",
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({theme}) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function DocumentsList() {
    const { citizen } = useContext(LoginContext);
    const [apiCall, response] = UseGet("documents");

    useEffect(() =>{
        apiCall(`/files/${citizen?.id}`);
    }, []);

    console.log(response);

    return (
        <div>
            <div>
                <h2>{`Bienvenid@ ${citizen.name} al sistema carpeta ciudadana`}</h2>
            </div>
            <div>
                <h4>Estos son sus documentos:</h4>
            </div>
            {response.data && (
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 700}} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Nombre</StyledTableCell>
                                <StyledTableCell>Tamaño (Kb)</StyledTableCell>
                                <StyledTableCell />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {response.data.map((row) => (
                                <StyledTableRow key={row.name}>
                                    <StyledTableCell component="th" scope="row">
                                        {row.name}
                                    </StyledTableCell>
                                    <StyledTableCell>{row.size / 1000}</StyledTableCell>
                                    <StyledTableCell><Link href={row.url}>Link de descarga</Link></StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
            {response.loading && (
                <Grid container spacing={1} justifyContent="center" sx={{marginTop: "25px"}} direction="column" alignItems="center">
                    <Grid item>
                        <Skeleton variant="rectangular" width={700} height={40} />
                    </Grid>
                    <Grid item>
                        <Skeleton variant="rectangular" width={700} height={40} />
                    </Grid>
                    <Grid item>
                        <Skeleton variant="rectangular" width={700} height={40} />
                    </Grid>
                    <Grid item>
                        <Skeleton variant="rectangular" width={700} height={40} />
                    </Grid>
                    <Grid item>
                        <Skeleton variant="rectangular" width={700} height={40} />
                    </Grid>
                    <Grid item>
                        <Skeleton variant="rectangular" width={700} height={40} />
                    </Grid>
                    <Grid item>
                        <Skeleton variant="rectangular" width={700} height={40} />
                    </Grid>
                    <Grid item>
                        <Skeleton variant="rectangular" width={700} height={40} />
                    </Grid>
                    <Grid item>
                        <Skeleton variant="rectangular" width={700} height={40} />
                    </Grid>
                </Grid>
            )}
        </div>
    )
}

export default DocumentsList;