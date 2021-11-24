import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import useAuth from './../../../hooks/useAuth'

const Appointments = ({ date, setDate }) => {
    const { user } = useAuth();
    const [appointments, setAppointments] = useState([])

    useEffect(() => {
        const url = `http://localhost:5000/userAppointment?email=${user.email}&date=${date.toLocaleDateString()}`
        fetch(url)
            .then(res => res.json())
            .then(data => setAppointments(data))
    }, [date, user.email])
    return (
        <div>
            {/* <h4>Appointments {appointments.length}</h4> */}

            {<TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Patient Name</TableCell>
                            <TableCell align="center">Email</TableCell>
                            <TableCell align="center">Service </TableCell>
                            <TableCell align="right">Price&nbsp;($)</TableCell>
                            <TableCell align="center">Time&nbsp;(T)</TableCell>
                            <TableCell align="right">Action&nbsp;(A)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {appointments.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.patientName}
                                </TableCell>
                                <TableCell align="center">{row.email}</TableCell>
                                <TableCell align="center">{row.serviceName}</TableCell>
                                <TableCell align="right">{row.fat}</TableCell>
                                <TableCell align="center">{row.time}</TableCell>
                                <TableCell align="right">{row.protein}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>}
        </div>
    );
};

export default Appointments;