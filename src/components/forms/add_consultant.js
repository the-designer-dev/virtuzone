import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import Head from 'next/head';
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
  Typography,
  Select
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ReactFlagsSelect from 'react-flags-select';
import dynamic from 'next/dynamic';
const RichTextEditor = dynamic(() => import('react-rte'), { ssr: false });

function AddConsultant({ shouldUpdate, setShouldUpdate, edit, id, data }) {
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

  const [languages, setLanguages] = useState(null);
  const [value, setValue] = useState(null);

  const LANGUAGES = [
    'Mandarin Chinese',
    'Spanish',
    'English',
    'Hindi/Urdu',
    'Arabic',
    'Bengali',
    'Portuguese',
    'Russian',
    'Japanese',
    'German',
    'Javanese',
    'Punjabi',
    'Wu',
    'French',
    'Telugu',
    'Vietnamese',
    'Marathi',
    'Korean',
    'Tamil',
    'Italian',
    'Turkish',
    'Cantonese/Yue'
  ];

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
        <title>Add Consultant - Virtuzone</title>
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
              <CardHeader title="Add Consultant" />
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

                    <Select
                      select
                      required
                      id="outlined-read-only"
                      label="Languages"
                      placeholder="Languages"
                      value={languages}
                      maxWidth
                      onChange={(e) => setLanguages(e.target.value)}
                    >
                      {LANGUAGES.map((el) => (
                        <MenuItem value={el}>
                          <Typography variant="body2">{el}</Typography>
                        </MenuItem>
                      ))}
                    </Select>

                    <TextField
                      required
                      type={'file'}
                      id="outlined-read-only"
                      label="Picture"
                      placeholder="Picture"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
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

export default AddConsultant;