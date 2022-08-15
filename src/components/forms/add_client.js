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
  Button
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ReactFlagsSelect from 'react-flags-select';

function AddClient({ shouldUpdate, setShouldUpdate, edit, id, data }) {
  const [firstName, setFirstName] = useState(data ? data.firstName : null);
  const [lastName, setLastName] = useState(data ? data.lastName : null);
  const [email, setEmail] = useState(data ? data.email : null);
  const [countryCode, setCountryCode] = useState(data ? data.countryCode : []);
  const [mobile, setMobile] = useState(data ? data.mobile : []);
  const [nationality, setNationality] = useState(data ? data.nationality : []);
  const [dateOfBirth, setDateOfBirth] = useState(
    data ? data.dateOfBirth : null
  );
  const [passportDetails, setPassportDetails] = useState(
    data ? data.passportDetails : []
  );
  const [role, setRole] = useState(data ? data.role : false);

  function onSubmit(e) {
    e.preventDefault();

    if (edit !== true) {
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
          isVerified: false,
          passportDetails: passportDetails,
          role: 'owner'
        }
      }).then((res) => {
        setShouldUpdate(!shouldUpdate);
      });
    } else {
      axios({
        method: 'PUT',
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/user?id=${id}`,
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
          isVerified: false,
          role: 'owner'
        }
      }).then((res) => {
        setShouldUpdate(!shouldUpdate);
      });
    }
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
                    <ReactFlagsSelect
                      className={styles.country_dropdown}
                      searchable
                      placeholder={'Select Nationality'}
                      searchPlaceholder="Search Countries"
                      selected={countryCode}
                      fullWidth={false}
                      onSelect={(code) => {
                        setNationality(
                          countries.find((el) => el.code === code).name
                        );
                        setCountryCode(code);
                        console.log(countries.find((el) => el.code === code));
                      }}
                    />

                    <TextField
                      required
                      id="outlined-read-only"
                      label="Country Code"
                      placeholder="Country Code"
                      InputProps={{
                        readOnly: true
                      }}
                      value={countryCode}
                    />
                    <TextField
                      required
                      id="outlined-read-only"
                      label="Mobile"
                      placeholder="Mobile"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                    />
                    <DatePicker
                      label="Date Of Birth"
                      value={dateOfBirth}
                      onChange={(newValue) => {
                        setDateOfBirth(newValue.format());
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                    {/* <TextField
                      required
                      id="outlined-read-only"
                      label="Passport Details"
                      placeholder="Passport Details"
                      value={passportDetails}
                      onChange={(e) => setPassportDetails(e.target.value)}
                    /> */}
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
                        label="Notify"
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
