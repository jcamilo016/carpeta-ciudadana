import React from "react";
import {Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import MaleImage from "../static/styles/images/user_male.svg";
import LoadingButton from "@mui/lab/LoadingButton";
import LogoutIcon from '@mui/icons-material/Logout';
import {useNavigate} from "react-router-dom";

function CitizenCard({id, name, address, email}) {
    const navigate = useNavigate();

    return (
        <Card sx={{maxWidth: 400}} elevation={5}>
            <CardMedia
                component="img"
                alt="user image"
                image={MaleImage}
                className="media"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {id}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {`Nombre: ${name}`}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {`Dirección: ${address}`}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {`Email: ${email}`}
                </Typography>
            </CardContent>
            <CardActions>
                <LoadingButton
                    variant="outlined"
                    startIcon={<LogoutIcon />}
                    onClick={() => navigate("/")}
                    loadingPosition="start"
                    loading={false} >
                    Salir
                </LoadingButton>
            </CardActions>
        </Card>
    );
}

export default CitizenCard;