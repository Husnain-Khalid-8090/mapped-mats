import React from "react";
import '../authLayout/authLayout.scss';
import {Box, Grid, Typography} from "@mui/material";
import loginImage from "../../../assets/images/login-rafiki.png";
import Container from "@mui/material/Container";


const AuthLayout = ({children}) => {
    return (
        <Container
            maxWidth="xl"
            sx={{
                display: "flex",
                alignItems: "center",
            }}
        >
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={{ bgcolor: "#fff", height: "100vh" }}
            >
                <Grid item md={4} sx={{ bgcolor: "$primary", height: "100%" }}>
                    <Box
                        className={"loginContainer"}
                        px={3}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Typography variant="body1" gutterBottom>
                            Mapped Mats
                        </Typography>
                        <img src={loginImage} />
                        <Typography variant="body1" gutterBottom>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                            aliquet id eros id Sed ipsum orci, condimentum vitae odio u.
                        </Typography>
                    </Box>
                </Grid>
                <Grid
                    item
                    md={8}
                    sx={{ height: "90%", display: "flex", alignItems: "center" }}
                >
                    {children}
                </Grid>

            </Grid>

        </Container>
    );
};

export default AuthLayout;