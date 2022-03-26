import {useContext, useEffect} from "react";
import {LoginContext} from "../contexts/LoginContext";
import {UseGet} from "../hooks";
import {Link, TableBody, Table, styled, TableContainer, TableHead, TableRow, Paper} from "@mui/material";
import {CitizenCard, PageLoading} from "./index";
import LoadingButton from "@mui/lab/LoadingButton";
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Swal from 'sweetalert2';

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
    const [apiDocAuthentication, resDocAuthentication] = UseGet("citizens");

    useEffect(() =>{
        apiCall(`/files/${citizen?.id}`);
    }, [apiCall, citizen]);

    const onSuccessAuthentication = () => {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Documento autenticado exitosamente',
            showConfirmButton: false,
            timer: 2000
        });
    }

    const onErrorAuthentication = () => {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Documento autenticado exitosamente',
            showConfirmButton: false,
            timer: 2000
        });
    }

    const authenticate = (fileName) => {
        apiDocAuthentication(`/authenticateDocument/${citizen.id}/${fileName}/${fileName}`, onSuccessAuthentication, onErrorAuthentication);
    }

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
                                        <div className="authentication-section">
                                            <StyledTableCell>
                                                <LoadingButton
                                                    variant="contained"
                                                    size="large"
                                                    className="create-button"
                                                    startIcon={<CheckCircleIcon />}
                                                    loadingPosition="start"
                                                    onClick={() => authenticate(row.name)}
                                                    loading={resDocAuthentication.loading}>
                                                    Autenticar
                                                </LoadingButton>
                                            </StyledTableCell>
                                        </div>
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