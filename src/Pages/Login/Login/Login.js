import { Alert, Button, CircularProgress, Container, Grid, TextField } from '@mui/material';
import React, { useState } from 'react';
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import login from '../../../images/login.png'

const Login = () => {

    const [loginData, setLoginData] = useState({});
    const { user, logingUser, isLoading, authError } = useAuth();
    const location = useLocation();
    const history = useHistory();

    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...loginData };
        newLoginData[field] = value;
        setLoginData(newLoginData);
        console.log(newLoginData);
    }

    const handleLoginSubmit = e => {
        logingUser(loginData.email, loginData.password, location, history);
        e.preventDefault();
    }

    return (
        <Container sx={{ my: 5 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    {!isLoading && <form onSubmit={handleLoginSubmit}>
                        <TextField
                            sx={{ width: '75%', m: 1 }}
                            id="standard-basic"
                            label="Your Email"
                            name="email"
                            onBlur={handleOnBlur}
                            variant="standard" />
                        <TextField
                            sx={{ width: '75%', m: 1 }}
                            id="standard-basic"
                            label="Your Password"
                            type="password"
                            name="password"
                            onBlur={handleOnBlur}
                            variant="standard" />

                        <Button sx={{ width: '75%', m: 1 }} type="submit" variant="contained">Login</Button>
                        <NavLink
                            style={{ textDecoration: 'none' }}
                            to="/register">
                            <Button variant="text">New User? Please Register</Button>
                        </NavLink>

                    </form>}

                    {
                        isLoading && <CircularProgress />
                    }

                    {
                        user?.email && <Alert severity="success">User Login SuccessFully — check it out!</Alert>

                    }
                    {
                        authError && <Alert severity="error">{authError}  — check it out!</Alert>

                    }


                </Grid>
                <Grid item xs={12} md={6}>
                    <img src={login} style={{ width: '100%' }} alt="" />
                </Grid>
            </Grid>
        </Container>


    );
};

export default Login;