import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import Head from 'next/head';
import styles from '../../css/addClient.module.css';
import countries from '../../data/countries.json';
import {
  Grid,
  Container,
  Card,
  CardHeader,
  Divider,
  CardContent,
  Box,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  MenuItem,
  Typography
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ReactFlagsSelect from 'react-flags-select';
import dynamic from 'next/dynamic';

function AddClient({ data }) {

  const [id, setId] = useState(data ? data._id : null);
  const [address, setAddress] = useState(data ? data.address : null);
  const [email, setEmail] = useState(data ? data.email : null);
  const [mobile, setMobile] = useState(data ? data.phoneNumber : null);
  console.log(data)
  function onSubmit(e) {
    e.preventDefault();

    axios({
      method: 'PUT',
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/contact?id=${data._id}`,
      headers: {
        'x-auth-token': process.env.NEXT_PUBLIC_ADMIN_JWT
      },
      data: {
        address: address,
        email: email,
        phoneNumber: mobile
      }
    })
      .then((res) => {
        console.log(res);
        alert(res.data.message);
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  }

  useEffect(() => {
    setAddress(data?.address);
    setEmail(data?.email);
    setMobile(data?.phoneNumber);
  }, [data]);

  return (
    <>
      <Head>
        <title>Add Contact - Virtuzone</title>
      </Head>
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
              <CardHeader title="Add Contact" />
              <Divider />
              <CardContent>
                <Box
                  onSubmit={(e) => onSubmit(e)}
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' }
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <div>
                    <TextField
                      required
                      onChange={(e) => {
                        setAddress(e.target.value);
                      }}
                      value={address}
                      id="outlined-required"
                      label="Address"
                      multiline
                      InputLabelProps={{
                        shrink: true
                      }}
                      fullWidth
                      sx={{ '&.MuiTextField-root': { width: '100%' } }}
                      placeholder="Address"
                    />

                    <TextField
                      required
                      id="outlined-read-only"
                      label="Email"
                      placeholder="Email"
                      value={email}
                      InputLabelProps={{
                        shrink: true
                      }}
                      onChange={(e) => setEmail(e.target.value)}
                    />

                    <TextField
                      required
                      id="outlined-read-only"
                      label="Mobile"
                      placeholder="Mobile"
                      value={mobile}
                      InputLabelProps={{
                        shrink: true
                      }}
                      onChange={(e) => setMobile(e.target.value)}
                    />

                    <Box>
                      <Box
                        sx={{
                          margin: '9px',
                          display: 'flex',
                          justifyContent: 'flex-end'
                        }}
                        component={'div'}
                      >
                        {/* <FormControlLabel
                          control={
                            <Checkbox
                              checked={notify}
                              onChange={(e) => setNotify(e.target.checked)}
                            />
                          }
                          label="Notify"
                        /> */}
                        <Button type="submit" sx={{ margin: 1 }}>
                          Submit
                        </Button>
                      </Box>
                    </Box>
                  </div>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default AddClient;
