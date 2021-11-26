import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router'
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import CheckoutForm from './CheckoutForm';

const Payment = () => {
    const { appointmentID } = useParams();
    const [appointment, setAppointments] = useState({});

    const stripePromise = loadStripe('pk_test_51Jx2r1HvqpQ5rXOhYUxsHwzuyeZGAYfo4pngrmEJNjffJa3hfLuRDA97wIGfokKevRviQvqzsziJcnXV6zNQTNwu00puFFgcXl');

    useEffect(() => {
        fetch(`http://localhost:5000/appointmetns/${appointmentID}`)
            .then(res => res.json())
            .then(data => setAppointments(data))
    }, [appointmentID])

    return (
        <div>
            <h2>Please Pay for: {appointment.patientName} for {appointment.serviceName}</h2>
            <h4>Pay: ${appointment.price}</h4>

            {appointment?.price && <Elements stripe={stripePromise}>
                <CheckoutForm
                    appointment={appointment}
                />
            </Elements>}
        </div>
    );
};

export default Payment;

/*
1. install stripe and stripe-react
2. Set Publishable Key
3. Elements
4. CheckOut Form
------------------
5. Create Payment Method


*/