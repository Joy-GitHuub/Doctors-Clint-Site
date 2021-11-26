import { Button, Input, TextField } from '@mui/material';
import React, { useState } from 'react';

const AddDoctor = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState(false);
    const [image, setImage] = useState(null);

    console.log(name, email);

    const handleSubmit = e => {

        e.preventDefault();
        if (!image) {
            return;
        }
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('image', image);


        fetch(`http://localhost:5000/doctors`, {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(result => {
                if (result.insertedId) {
                    setSuccess('Doctors added SuccessFUlly');
                }
                console.log('Success:', result);
            })
            .catch(error => {
                console.error('Error:', error);
            })

    }

    return (
        <div>
            <h2>This is Add Doctors</h2>

            <form onSubmit={handleSubmit}>
                <TextField sx={{ width: '50%' }}
                    label='Name'
                    required
                    onBlur={e => setName(e.target.value)}
                    variant='standard'
                />
                <br />
                <br />
                <TextField sx={{ width: '50%' }}
                    label='Email'
                    required
                    onBlur={e => setEmail(e.target.value)}
                    variant='standard'
                />
                <br />
                <Input accept="image/*"
                    onChange={e => setImage(e.target.files[0])}
                    type="file"
                />

                <br />
                <Button variant="contained" type='submit'>
                    Add Doctors
                </Button>

            </form>
            {
                success && <p style={{ color: 'green' }}>{success}</p>
            }
        </div>
    );
};

export default AddDoctor;