import React from "react";
import {Card, CardContent, CardMedia, Typography} from "@mui/material";
import MaleImage from "../static/styles/images/user_male.svg";

function CitizenCard({id, name, address, email}) {
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
        </Card>
    );
}

export default CitizenCard;