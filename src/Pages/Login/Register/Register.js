import { Alert, Button, CircularProgress, Container, Grid, TextField } from '@mui/material';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import login from '../../../images/login.png'


const Register = () => {
    const [registerData, setRegisterData] = useState({});

    const { user, registerUser, isLoading, authError } = useAuth();

    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...registerData };
        newLoginData[field] = value;
        setRegisterData(newLoginData);
        console.log(newLoginData);
    }

    // const handleOnBlur = e => {
    //     const field = e.target.name;
    //     const value = e.target.value;
    //     const newLoginData = { ...loginData };
    //     newLoginData[field] = value;
    //     setLoginData(newLoginData);
    // }

    const handleLoginSubmit = e => {

        if (registerData.password !== registerData.password2) {
            alert('Password Not Match')
            return;
        }
        registerUser(registerData.email, registerData.password,)

        e.preventDefault();
    }

    return (
        <Container sx={{ my: 5 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    {!isLoading &&
                        <form onSubmit={handleLoginSubmit}>
                            <TextField
                                sx={{ width: '75%', m: 1 }}
                                id="standard-basic"
                                label="Your Name"
                                name="name"
                                onBlur={handleOnBlur}
                                variant="standard" />

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

                            <TextField
                                sx={{ width: '75%', m: 1 }}
                                id="standard-basic"
                                label="ReType Your Password"
                                type="password"
                                name="password2"
                                onBlur={handleOnBlur}
                                variant="standard" />

                            <Button sx={{ width: '75%', m: 1 }} type="submit" variant="contained">Register</Button>
                            <NavLink
                                style={{ textDecoration: 'none' }}
                                to="/login">
                                <Button variant="text"><span style={{ marginRight: 7 }}>Already Register Please Login! </span>     <span style={{ color: 'blue' }}> <u>CLick Here</u> </span></Button>
                            </NavLink>

                        </form>
                    }
                    {
                        isLoading && <CircularProgress />
                    }

                    {
                        user?.email && <Alert severity="success">User Created SuccessFully — check it out!</Alert>

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

export default Register;