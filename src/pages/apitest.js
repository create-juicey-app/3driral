import React, { useState } from 'react';
import {Box, Button, Stack} from '@mui/joy';
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

const ApiTest = () => {
    const [data, setData] = useState(null);
    const [status, setStatus] = useState('Idle');
    const [error, setError] = useState(null);

    const fetchData = async () => {
        setStatus('Sending');
        try {
            const response = await axios.get('/api/database');
            setData(response.data);
            setStatus('Getting');
        } catch (error) {
            console.error('Error fetching data', error);
            setStatus('Error');
            setError(error);
        }
    };

    return (
        <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            sx={{ height: '100vh', pt: '35%' }}
        >
            <Box>
                {status === 'Sending' && <CircularProgress />}
                {status === 'Error' && <ErrorIcon />}
                {status === 'Getting' && <CheckCircleIcon />}
            </Box>
            {error && <div>Error: {JSON.stringify(error)}</div>}
            {data && <div>{JSON.stringify(data)}</div>}
            <Button variant="solid" onClick={fetchData} startIcon={<CloudDownloadIcon />}>
                Call API
            </Button>
        </Stack>
    );
};

export default ApiTest;
