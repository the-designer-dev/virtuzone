import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Typography, Grid, Card, Container, CardContent, Divider, CardHeader } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
const SuccessModal = ({ setShowSuccessModal, executeFunction }) => {

    const onSubmit = async (e) => {
        e.preventDefault()
        await executeFunction()
        setShowSuccessModal(false)
    }
    return (

        <Container sx={{ mt: 2 }} maxWidth="lg">
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="stretch"
                spacing={3}
                sx={{ minWidth: 300 }}
            >
                <Grid item xs={12}>
                    <Card>
                        <Divider />
                        <CardContent>
                            {/* <Box sx={{ width: '100px', margin: 'auto' }}>
                                <HighlightOffIcon sx={{ color: 'red', width: '100%', height: '100%' }} />
                            </Box> */}
                            <Box
                                onSubmit={(e) => onSubmit(e)}
                                component="form"
                                sx={{
                                    '& .MuiTextField-root': { m: 1, width: '25ch' }, display: 'flex', flexDirection: "column", alignItems: "center", padding: '20px'
                                }}
                                noValidate
                                autoComplete="off"
                            >
                                <img alt="Success" width={210} height={180} src="/static/images/icons/success.png" />

                                <Typography variant='h4' sx={{ display: 'flex', justifyContent: "center", margin: "20px 0", color: 'green' }}>
                                    Success
                                </Typography>

                                <Typography sx={{ fontSize: 15, fontWeight: 500, display: 'flex', justifyContent: "center", margin: "0px 0" }}>
                                    Details have been saved successfully.
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
                                        <Button type='submit' sx={{ margin: 1, backgroundColor: '#cf3339', color: '#fff' }}>Close</Button>
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



export default SuccessModal;