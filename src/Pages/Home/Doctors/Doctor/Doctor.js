import { Grid } from '@mui/material';
import React from 'react';

const Doctor = ({ doctor }) => {
    return (
        <Grid item xs={12} sm={6} md={4} sx={{ mb: 5 }}>
            <h3>{doctor.name}</h3>
            <img width='100' height='150' src={`data:image/png;base64,${doctor.image}`} alt="" />
        </Grid>
    );
};

export default Doctor;