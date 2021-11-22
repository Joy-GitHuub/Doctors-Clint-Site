import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as NavLink } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth'

const Navigation = () => {

    const { user, logOut } = useAuth();
    console.log(user);

    const handleLogOut = () => {
        logOut();

    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <NavLink to='/'>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                    </NavLink>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Doctors Portal
                    </Typography>
                    <NavLink style={{ textDecoration: 'none', color: 'white' }} to='/appointment'>
                        <Button color="inherit">Appointment</Button>
                    </NavLink>
                    {
                        user?.email ?

                            <Button onClick={handleLogOut} color="inherit">Logout</Button>

                            :
                            <NavLink style={{ textDecoration: 'none', color: 'white' }} to='/login'>
                                <Button color="inherit">Login</Button>
                            </NavLink>
                    }

                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Navigation;