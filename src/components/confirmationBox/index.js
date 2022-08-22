import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Typography, Grid, Card, Container, CardContent, Divider, CardHeader } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
const ConfirmationModal = ({ setShowModal, executeFunction }) => {

    const onSubmit = async (e) => {
        e.preventDefault()
        await executeFunction()
        setShowModal(false)
    }
    return (

        <Container sx={{ mt: 2 }} maxWidth="lg">
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="stretch"
                spacing={3}
            >
                <Grid item xs={12}>
                    <Card>
                        <CardHeader title="Confirmation" />
                        <Divider />
                        <CardContent>
                            {/* <Box sx={{ width: '100px', margin: 'auto' }}>
                                <HighlightOffIcon sx={{ color: 'red', width: '100%', height: '100%' }} />
                            </Box> */}
                            <Box
                                onSubmit={(e) => onSubmit(e)}
                                component="form"
                                sx={{
                                    '& .MuiTextField-root': { m: 1, width: '25ch' }
                                }}
                                noValidate
                                autoComplete="off"
                            >

                                <Typography variant='h3'>
                                    Are you sure you want to delete this record?
                                </Typography>
                                <div>
                                    <Box
                                        sx={{
                                            margin: '9px',
                                            display: 'flex',
                                            justifyContent: 'flex-end'
                                        }}
                                        component={'div'}
                                    >
                                        <Button onClick={() => setShowModal(false)} type='button' sx={{ margin: 1 }}>No</Button>
                                        <Button type='submit' sx={{ margin: 1 }}>Yes</Button>

                                    </Box>
                                </div>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container >
    );
};



export default ConfirmationModal;