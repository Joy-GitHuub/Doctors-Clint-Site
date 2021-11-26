import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Doctor from './Doctor/Doctor';

const Doctors = () => {
    const [doctors, setDoctors] = useState([]);


    useEffect(() => {
        const url = `http://localhost:5000/doctors`;
        fetch(url)
            .then(res => res.json())
            .then(data => setDoctors(data))
    }, [doctors])
    return (
        <div>
            <h3>Our Doctors: {doctors.length}</h3>


            <Grid container spacing={2}>
                {
                    doctors.map(doctor => <Doctor key={doctor._id}
                        doctor={doctor}
                    ></Doctor>)

                }

            </Grid>

        </div>
    );
};

export default Doctors;