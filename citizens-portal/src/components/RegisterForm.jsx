import {useState} from "react";
import {useFormik} from "formik";
import {UsePost} from "../hooks";
import {Alert, IconButton, InputAdornment, TextField} from '@mui/material';
import FaceIcon from "@mui/icons-material/Face";
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import HomeIcon from '@mui/icons-material/Home';
import BadgeIcon from '@mui/icons-material/Badge';
import LoadingButton from "@mui/lab/LoadingButton";
import PinIcon from '@mui/icons-material/Pin';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import Swal from 'sweetalert2';

function RegisterForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [apiCall, response] = UsePost("/register", "citizens");
    const navigate = useNavigate();

    const handleClickShowPassword = () => setShowPassword(!showPassword);

    const redirectToLogin = () => {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Ciudadano registrado exitosamente',
            showConfirmButton: false,
            timer: 1500
        });
        navigate("/");
    };

    const onSubmitHandler = async (payload) => {
        await apiCall(payload, redirectToLogin);
    };

    const formik = useFormik({
        initialValues: {
            citizenId: "",
            name: "",
            address: "",
            email: "",
            operatorId: "",
            operatorName: "",
            password: "",
        },
        onSubmit: onSubmitHandler,
    });

    return (
        <div>
            <div>
                <h3>Ingrese los siguientes datos</h3>
            </div>
            <form onSubmit={formik.handleSubmit} className="login-form-container">
                <TextField
                    id="citizenId"
                    label="Identificación"
                    onChange={formik.handleChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <PinIcon />
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    id="name"
                    label="Nombre del ciudadano"
                    onChange={formik.handleChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <FaceIcon />
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    id="address"
                    label="Dirección"
                    onChange={formik.handleChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <HomeIcon />
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    id="email"
                    label="E-mail"
                    onChange={formik.handleChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AlternateEmailIcon />
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    id="operatorId"
                    label="Id Operador"
                    onChange={formik.handleChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <PinIcon />
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    id="operatorName"
                    label="Nombre del operador"
                    onChange={formik.handleChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <BadgeIcon />
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    id="password"
                    label="Contraseña"
                    onChange={formik.handleChange}
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
                {(response.error) && (
                    <Alert severity="error">{`${response.error}`}</Alert>
                )}
                <LoadingButton
                    variant="contained"
                    size="large"
                    className="create-button"
                    type="submit"
                    startIcon={<FactCheckIcon/>}
                    loadingPosition="start"
                    loading={response.loading}>
                    Registrarse
                </LoadingButton>
            </form>
        </div>
    )
}

export default RegisterForm;