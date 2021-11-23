import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button, TextField } from '@mui/material';
import swal from 'sweetalert';
import useAuth from '../../../hooks/useAuth';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const BookingModal = ({ openBooking, handleBookingClose, booking, date }) => {

    const { name, time } = booking;
    const { user } = useAuth();
    const initialInfo = { patientName: user.displayName, email: user.email, phoneNumber: '' }

    // Send Data Database
    const [bookingInfo, setBookingInfo] = useState(initialInfo);

    const handleOnBlur = e => {

        const field = e.target.name;
        const value = e.target.value;
        const newInfo = { ...bookingInfo };
        newInfo[field] = value;

        setBookingInfo(newInfo)
    }

    // Submit Data
    const handleBookSubmit = (e) => {


        e.preventDefault();

        swal({
            title: "Are you sure?",
            text: "Once Booking, You Sure Add This Booking !!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willConfim) => {
                if (willConfim) {
                    swal("Poof! Your Booking SuccussFully", {
                        icon: "success",

                    });

                } else {
                    swal("Your Booking Cancle!");
                    return
                }
                // Collect Data
                const appointment = {
                    ...bookingInfo,
                    time,
                    serviceName: name,
                    date: date.toLocaleDateString()
                }
                // Send To the Server
                const url = `http://localhost:5000/userAppointment`
                fetch(url, {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(appointment)
                }).then(res => res.json())
                    .then(data => {
                        if (data.insertedId) {
                            // SuccessFully message

                            handleBookingClose();
                        }
                    })


            });



    }

    return (


        <Modal
            open={openBooking}
            onClose={handleBookingClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {name}
                </Typography>
                <form onSubmit={handleBookSubmit}>


                    <TextField
                        disabled
                        sx={{ width: '90%', m: 1 }}
                        id="outlined-size-small"
                        defaultValue={time}
                        size="small"
                    />
                    <TextField
                        name='patientName'
                        onBlur={handleOnBlur}
                        sx={{ width: '90%', m: 1 }}
                        id="outlined-size-small"
                        defaultValue={user.displayName}
                        size="small"
                    />
                    <TextField
                        name='email'
                        onBlur={handleOnBlur}
                        sx={{ width: '90%', m: 1 }}
                        id="outlined-size-small"
                        defaultValue={user.email}
                        size="small"
                    />
                    <TextField
                        name='phoneNumber'
                        onBlur={handleOnBlur}
                        sx={{ width: '90%', m: 1 }}
                        id="outlined-size-small"
                        placeholder='Phone Number'
                        required
                        size="small"
                    />
                    <TextField
                        disabled
                        sx={{ width: '90%', m: 1 }}
                        id="outlined-size-small"
                        defaultValue={date.toDateString()}
                        size="small"
                    />
                    <Button type='submit' variant='contained'>Booking Done</Button>

                </form>

            </Box>
        </Modal>

    );
};

export default BookingModal;