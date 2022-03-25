import {useState} from "react";
import {useFormik} from "formik";
import {IconButton, InputAdornment, TextField} from '@mui/material';
import FaceIcon from "@mui/icons-material/Face";
import AccountCircle from '@mui/icons-material/AccountCircle';
import PhoneIcon from '@mui/icons-material/Phone';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import {Visibility, VisibilityOff} from "@mui/icons-material";

function RegisterForm() {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword(!showPassword);

    const formik = useFormik({
        initialValues: {
            citizenId: "",
            name: "",
            address: "",
            operatorId: "",
            operatorName: "",
            password: "",
        },
        onSubmit: () => {},
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
                                <FaceIcon />
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
                                <AccountCircle />
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
                                <PhoneIcon />
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
                                <AlternateEmailIcon />
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
                                <AlternateEmailIcon />
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
            </form>
        </div>
    )
}

export default RegisterForm;