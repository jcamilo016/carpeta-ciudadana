import {useFormik} from "formik";
import {useNavigate} from "react-router-dom";
import {InputAdornment, Link, TextField} from "@mui/material";
import FaceIcon from "@mui/icons-material/Face";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import LoadingButton from "@mui/lab/LoadingButton";
import LoginIcon from "@mui/icons-material/Login";


function LoginForm() {
    const navigate = useNavigate();

    const showSignUpForm = () => navigate("/signup");

    const formik = useFormik({
        initialValues: {
            citizenId: "",
            password: "",
        },
        onSubmit: () => {
        },
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
                                <FaceIcon/>
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    id="password"
                    label="Contraseña"
                    onChange={formik.handleChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <VpnKeyIcon/>
                            </InputAdornment>
                        ),
                    }}
                />
                <LoadingButton
                    variant="contained"
                    size="large"
                    className="create-button"
                    type="submit"
                    startIcon={<LoginIcon/>}
                    loadingPosition="start"
                    loading={false}>
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