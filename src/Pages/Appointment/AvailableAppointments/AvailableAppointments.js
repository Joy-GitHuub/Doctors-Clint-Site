import { Container, Grid, Typography } from '@mui/material';
import React from 'react';
import Bookings from '../Bookings/Bookings';

const bookings = [
    {
        id: 1,
        name: 'Teeth Orthodonics',
        time: '08.00 AM - 09.00 AM',
        space: 10,
    },
    {
        id: 2,
        name: 'Cosmetic Dentistry',
        time: '09.00 AM - 10.00 AM',
        space: 8,
    },
    {
        id: 3,
        name: 'Teeth Cleaning',
        time: '10.00 AM - 11.00 AM',
        space: 9,
    },
    {
        id: 4,
        name: 'Cavity Protection',
        time: '11.00 AM - 12.00 PM',
        space: 5,
    },
    {
        id: 5,
        name: 'Pediatric Dental',
        time: '06.00 PM - 07.00 PM',
        space: 10,
    },
    {
        id: 6,
        name: 'Oral Surgery',
        time: '07.00 PM - 08.00 PM',
        space: 10,
    },
]

const AvailableAppointments = ({ date }) => {



    return (

        <Container>
            <Typography sx={{ mb: 5, fontWeight: 'bolder' }} variant='h5'>Available Appointments <span style={{ color: '#09EBA2' }}>{date.toDateString()}</span></Typography>

            <Grid container spacing={2} sx={{ mb: 5 }}>

                {
                    bookings.map(booking => <Bookings
                        key={booking.id}
                        date={date}
                        booking={booking}
                    ></Bookings>)
                }

            </Grid>
        </Container >

    );
};

export default AvailableAppointments;