import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import Head from 'next/head';
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
  Button
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function AddClient({ shouldUpdate, setShouldUpdate }) {
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState([]);
  const [countryCode, setCountryCode] = useState([]);
  const [mobile, setMobile] = useState([]);
  const [nationality, setNationality] = useState([]);
  const [dateOfBirth, setDateOfBirth] = useState([]);
  const [passportDetails, setPassportDetails] = useState([]);
  const [role, setRole] = useState(false);

  function onSubmit(e) {
    e.preventDefault();
    const form = new FormData();

    axios({
      method: 'POST',
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/user`,
      headers: {
        'x-auth-token': process.env.NEXT_PUBLIC_ADMIN_JWT
      },
      data: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        countryCode: countryCode,
        mobile: mobile,
        nationality: nationality,
        dateOfBirth: dateOfBirth,
        passportDetails: passportDetails,
        role: role === false ? 'owner' : 'admin'
      }
    }).then((res) => {
      if (res.status === 200) {
        setShouldUpdate(!shouldUpdate);
      }
    });
  }

  return (
    <>
      <Head>
        <title>Add Client - Virtuzone</title>
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
              <CardHeader title="Add Client" />
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
                        setFirstName(e.target.value);
                      }}
                      value={firstName}
                      id="outlined-required"
                      label="First Name"
                      placeholder="First Name"
                    />
                    <TextField
                      required
                      id="outlined-read-only"
                      label="Last Name"
                      placeholder="Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />

                    <TextField
                      required
                      id="outlined-read-only"
                      label="Email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                      required
                      id="outlined-read-only"
                      label="Country Code"
                      placeholder="Country Code"
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                    />
                    <TextField
                      required
                      id="outlined-read-only"
                      label="Mobile"
                      placeholder="Mobile"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                    />
                    <TextField
                      required
                      id="outlined-read-only"
                      label="Nationality"
                      placeholder="Nationality"
                      value={nationality}
                      onChange={(e) => setNationality(e.target.value)}
                    />

                    <DatePicker
                      label="Date Of Birth"
                      value={dateOfBirth}
                      onChange={(newValue) => {
                        setDateOfBirth(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />

                    <TextField
                      required
                      id="outlined-read-only"
                      label="Passport Details"
                      placeholder="Passport Details"
                      value={passportDetails}
                      onChange={(e) => setPassportDetails(e.target.value)}
                    />

                    <Box
                      sx={{
                        margin: '9px',
                        display: 'flex',
                        justifyContent: 'flex-end'
                      }}
                      component={'div'}
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={role}
                            onChange={(e) => setRole(e.target.checked)}
                          />
                        }
                        label="Admin"
                      />
                      <Button type="submit" sx={{ margin: 1 }}>
                        Submit
                      </Button>
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
