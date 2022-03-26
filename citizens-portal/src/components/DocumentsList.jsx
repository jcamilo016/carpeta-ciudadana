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
import {Link} from "@mui/material";
import {CitizenCard, PageLoading} from "./index";
import LoadingButton from "@mui/lab/LoadingButton";
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

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
    }, [apiCall, citizen]);

    return (
        <div>
            <div className="documents-list-header-container">
                <h2>{`Bienvenid@ ${citizen.name} al sistema carpeta ciudadana`}</h2>
                <h4>Estos son sus documentos:</h4>
            </div>
            <div className="documents-list-content-container">
                <CitizenCard {...citizen}/>
                {response.data && (
                    <TableContainer component={Paper}>
                        <Table sx={{minWidth: 700}} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Nombre</StyledTableCell>
                                    <StyledTableCell>Tamaño (Kb)</StyledTableCell>
                                    <StyledTableCell />
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
                                        <StyledTableCell>
                                            <LoadingButton
                                                variant="contained"
                                                size="large"
                                                className="create-button"
                                                startIcon={<CloudDownloadIcon />}
                                                loadingPosition="start"
                                                loading={false}>
                                                    <Link href={row.url} color="inherit" underline="none">Descargar</Link>
                                            </LoadingButton>
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            <LoadingButton
                                                variant="contained"
                                                size="large"
                                                className="create-button"
                                                startIcon={<CheckCircleIcon />}
                                                loadingPosition="start"
                                                loading={false}>
                                                <Link href={row.url} color="inherit" underline="none">Autenticar</Link>
                                            </LoadingButton>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
                {response.loading && (
                    <PageLoading />
                )}
            </div>
        </div>
    )
}

export default DocumentsList;