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
const RichTextEditor = dynamic(() => import('react-rte'), { ssr: false });

function AddClient({ shouldUpdate, setShouldUpdate, edit, id, data }) {
  const [firstName, setFirstName] = useState(data ? data.firstName : null);
  const [lastName, setLastName] = useState(data ? data.lastName : null);
  const [email, setEmail] = useState(data ? data.email : null);
  const [countryCode, setCountryCode] = useState(data ? data.countryCode : []);
  const [dialCode, setDialCode] = useState(null);
  const [mobile, setMobile] = useState(data ? data.mobile : []);
  const [nationality, setNationality] = useState(data ? data.nationality : []);
  const [dateOfBirth, setDateOfBirth] = useState(
    data ? data.dateOfBirth : null
  );
  const [passportDetails, setPassportDetails] = useState(
    data ? data.passportDetails : 'sasd'
  );
  const [notify, setNotify] = useState(false);

  const [value, setValue] = useState(null);

  const handleOnChange = (value) => {
    setValue(value);
    if (event.onChange) {
      onChange(value.toString('html'));
    }
    setMessage(value.toString('html'));
  };

  useEffect(() => {
    const importModule = async () => {
      const mod = await import('react-rte');
      setValue(mod.createEmptyValue());
    };
    importModule();
  }, []);

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
          dialCode: dialCode,
          mobile: mobile,
          nationality: nationality,
          dateOfBirth: dateOfBirth,
          isVerified: false,
          passportDetails: passportDetails,
          role: 'owner'
        }
      })
        .then((res) => {
          console.log(res);
          alert(res.data.message);
          window.location = "/company";
          setShouldUpdate(!shouldUpdate);
        })
        .catch((err) => {
          err.response ? alert(err.response?.data?.message) : console.log(err);
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
      })
        .then((res) => {
          console.log(res);
          alert(res.data.message);
          setShouldUpdate(!shouldUpdate);
        })
        .catch((err) => {
          console.log(err);
          alert(err);
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
                      select
                      required
                      id="outlined-read-only"
                      label="Country Code"
                      placeholder="Country Code"
                      value={dialCode}
                      maxWidth
                      onChange={(e) => setDialCode(e.target.value)}
                    >
                      {countries.map((el) => (
                        <MenuItem value={el.dialCode}>
                          <Box
                            sx={{
                              display: 'flex',
                              width: '100%',

                              flexWrap: 'nowrap',
                              alignItems: 'center'
                            }}
                          >
                            <img
                              src={el.image}
                              style={{ width: '100%', maxWidth: '30px' }}
                            />
                            <Box
                              sx={{
                                display: 'flex',
                                width: '100%',
                                flexWrap: 'nowrap',
                                paddingLeft: '10px',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                              }}
                            >
                              <Typography variant="body1">
                                {el.name.length > 11
                                  ? el.name.substring(0, 11) + '...'
                                  : el.name}
                              </Typography>
                              <Typography variant="body2">
                                {el.dialCode}
                              </Typography>
                            </Box>
                          </Box>
                        </MenuItem>
                      ))}
                    </TextField>
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

                    <Box>
                      {notify && (
                        <RichTextEditor
                          value={value}
                          onChange={handleOnChange}
                        />
                      )}
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
                              checked={notify}
                              onChange={(e) => setNotify(e.target.checked)}
                            />
                          }
                          label="Notify"
                        />
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
