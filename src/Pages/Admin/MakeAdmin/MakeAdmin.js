import { Alert, Button, TextField } from '@mui/material';
import React, { useState } from 'react';

const MakeAdmin = () => {

    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState(false);

    const handleOnBlur = e => {
        setEmail(e.target.value);
    }

    const handleAdminSubmit = e => {
        e.preventDefault();

        const user = { email }
        const url = `http://localhost:5000/users/admin`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    setSuccess(true);
                }
                console.log(data)
            })
    }



    return (
        <div>
            <form onSubmit={handleAdminSubmit}>
                <TextField id="standard-basic"
                    onBlur={handleOnBlur}
                    label="Enter Email" variant="standard"
                    sx={{ width: '75%' }}
                />
                <Button type='submit' variant='contained'>Admin</Button>
            </form>
            {success && <Alert severity='success'>Make Admin SuccessFully</Alert>}
        </div>
    );
};

export default MakeAdmin;