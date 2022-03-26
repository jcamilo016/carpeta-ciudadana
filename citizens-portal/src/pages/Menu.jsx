import React, {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import SwipeableViews from 'react-swipeable-views';
import {Box, Container, Tab, Tabs, useTheme} from "@mui/material";
import {TabPanel, DocumentsList, UploadFileForm, PageLoading} from "../components";
import {LoginContext} from "../contexts/LoginContext";

function Menu() {
    const theme = useTheme();
    const [value, setValue] = useState(0);
    const { isLogged } = useContext(LoginContext);
    const navigate = useNavigate();
    
    useEffect(()=> {
        if(!isLogged) {
            navigate("/");
        }
    }, [isLogged, navigate])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    return (
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <Tabs value={value} onChange={handleChange} centered>
                <Tab label="Lista de documentos" />
                <Tab label="Cargar nuevo documento" />
            </Tabs>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel value={value} index={0} dir={theme.direction}>
                    <Container maxWidth="80%">
                        {isLogged ? (
                            <DocumentsList />
                        ) : (
                            <PageLoading />
                        )}
                    </Container>
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    <Container maxWidth="80%">
                        <UploadFileForm />
                    </Container>
                </TabPanel>
            </SwipeableViews>
        </Box>
    );
}

export default Menu;