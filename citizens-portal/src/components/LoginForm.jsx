import {useContext, useState} from "react";
import {useFormik} from "formik";
import {useNavigate} from "react-router-dom";
import {UsePost} from "../hooks";
import {InputAdornment, Link, TextField, Alert, IconButton} from "@mui/material";
import {LoginContext} from "../contexts/LoginContext";
import PinIcon from '@mui/icons-material/Pin';
import LoadingButton from "@mui/lab/LoadingButton";
import LoginIcon from "@mui/icons-material/Login";
import {Visibility, VisibilityOff} from "@mui/icons-material";

function LoginForm() {
    const { setLogin } = useContext(LoginContext);
    const [showPassword, setShowPassword] = useState(false);
    const [apiCall, response] = UsePost("/validate","citizens");

    const handleClickShowPassword = () => setShowPassword(!showPassword);

    const navigate = useNavigate();

    const showSignUpForm = () => navigate("/signup");

    const redirectToPortal = (data) => {
        setLogin({isLogged: true, citizen: data});
        navigate("/portal");
    };

    const onSubmitHandler = async (payload) => {
        await apiCall(payload, redirectToPortal);
    };

    const formik = useFormik({
        initialValues: {
            citizenId: "",
            password: "",
        },
        onSubmit: onSubmitHandler,
    });

    return (
        <div>
            <div>
                <h2>
                    Carpeta Ciudadana
                </h2>
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
                    startIcon={<LoginIcon/>}
                    loadingPosition="start"
                    loading={response.loading}>
                    Ingresar
                </LoadingButton>
            </form>
            <div>
                <Link className="sign-up-container" onClick={showSignUpForm}>
                    Usuario nuevo? Regístrese
                </Link>
            </div>
        </div>
    )
}

export default LoginForm;