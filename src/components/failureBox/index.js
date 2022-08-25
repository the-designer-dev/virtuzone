import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Typography, Grid, Card, Container, CardContent, Divider, CardHeader } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
const FailureModal = ({ setShowFailureModal, }) => {

    const onSubmit = async (e) => {
        e.preventDefault()
        setShowFailureModal(false)
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
                                <img alt="Failed!" width={180} height={180} src="/static/images/icons/failure.png" />

                                <Typography variant='h3' sx={{ display: 'flex', justifyContent: "center", margin: "20px 0", color: 'red' }}>
                                    Failed!
                                </Typography>

                                <Typography sx={{ fontSize: 15, fontWeight: 500, display: 'flex', justifyContent: "center", margin: "0px 0" }}>
                                    Make sure to fill all required feilds.
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
                                        <Button onClick={() => setShowFailureModal(false)} type='button' sx={{ margin: 1, backgroundColor: '#000000', color: '#fff' }}>Close</Button>

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



export default FailureModal;