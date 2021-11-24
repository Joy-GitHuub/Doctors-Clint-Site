import React from 'react';
import Grid from '@mui/material/Grid';
import DatePicker from './../../Shared/DatePicker/DatePicker'
import Appointments from '../Appointments/Appointments';

const DashboardHome = () => {
    const [date, setDate] = React.useState(new Date())
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={4} sm={12}>
                <DatePicker
                    date={date}
                    setDate={setDate}
                ></DatePicker>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
                <Appointments
                    date={date}
                    setDate={setDate}
                ></Appointments>
            </Grid>
        </Grid>
    );
};

export default DashboardHome;