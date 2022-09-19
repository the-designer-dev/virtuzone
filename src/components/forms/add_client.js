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
  Typography,
  CircularProgress
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ReactFlagsSelect from 'react-flags-select';
import dynamic from 'next/dynamic';
import ModalNoClose from '../modal/modalNoClose';
import SuccessModal from '../successBox';
import FailureModal from '../failureBox';
const RichTextEditor = dynamic(() => import('react-rte'), { ssr: false });

function AddClient({ shouldUpdate, setShouldUpdate, edit, id, data }) {
  const [ShowLoader, setShowLoader] = useState(false);
  const [ShowSuccessModal, setShowSuccessModal] = useState(false);
  const [ShowFailureModal, setShowFailureModal] = useState(false);
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
  const [message, setMessage] = useState(null);

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
      setValue(
        mod.createValueFromString(
          `   
          <h1 style="font-family:Roboto Slab,Helvetica,Arial,sans-serif ;">Lorem, ipsum dolor.</h1>
          <p style="font-size: 17px; color:#777; font-family:Roboto Slab,Helvetica,Arial,sans-serif ;">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia ipsum a nesciunt officia error beatae rem, possimus accusantium corporis similique eligendi veniam eveniet harum inventore nihil itaque iure eum adipisci.</p>
          <div style="text-align: center; margin: 80px 0;">
              <button style="background-color: #cf3339; padding:5px 25px; border: solid #cf3339; border-radius: 8px; color:#fff">6666</button>
          </div>
          <p style="font-size: 17px; color:#777; font-family:Roboto Slab,Helvetica,Arial,sans-serif ;">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia ipsum a nesciunt officia error beatae rem, possimus accusantium corporis similique eligendi veniam eveniet harum inventore nihil itaque iure eum adipisci.</p>
    `,
          'html'
        )
      );
    };
    importModule();
  }, []);

  function onSubmit(e) {
    e.preventDefault();

    if (edit !== true) {
      setShowLoader(true);
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
          isVerified: true,
          passportDetails: passportDetails,
          notify: notify,
          message: `
          <!DOCTYPE html>
          <html lang="en">
              <head>
                  <meta charset="UTF-8">
                  <meta http-equiv="X-UA-Compatible" content="IE=edge">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <title>Document</title>
              </head>
              <body>
                  <div style="max-width: 600px; margin:auto">
                      <div style="text-align:center; margin-bottom: 70px;">
                          <img style="width: 50%;" src="https://housing.designer-dev.com/image-10.png" alt="VIRTUZONE">
                      </div>
                      <hr>
  
  ${value.toString('html')}
  
                   
                  </div>
                  
                  <footer style="max-width: 600px; margin:auto; text-align: center;">
                      <hr>
                      <div style="text-align:center; margin-bottom: 15px;">
                          <img style="width: 50%;" src="https://housing.designer-dev.com/image-10.png" alt="VIRTUZONE">
                      </div>
  
                      <div style="display: flex; justify-content:space-around; max-width:300px; margin: auto; gap:30px">
                          <div style=" display: flex;align-items: center;justify-content: center; padding: 0 15px">
                              <img style="width: 100%;" src="https://housing.designer-dev.com/App-Store-icon.png" alt="VIRTUZONE">
                          </div>
                          <div style="    display: flex;align-items: center;justify-content: center;  padding: 0 15px">
                              <img style="width: 100%;" src="https://housing.designer-dev.com/Playstore-icon.png" alt="VIRTUZONE">
                          </div>
                          <div style="display: flex;align-items: center;justify-content: center;  padding: 0 15px">
                              <img style="width: 100%;" src="https://housing.designer-dev.com/webicon.png" alt="VIRTUZONE">
                          </div>
                      </div>
                      <p style="font-size: 12px; color:#999;">580 California St., Suite 400,</p>
                      <p style="font-size: 12px; color:#999;">San Francisco, CA, 94104</p>
                      <p style="font-size: 12px; color:#999;">Unsubscribe   Privacy Policy   Terms of Service</p>
                      <p style="font-size: 12px; color:#999;">© 2022 Academia.</p>
          ​
                  </footer>
              </body>
          </html>
  
  
  `.toString(),
          role: 'owner'
        }
      })
        .then((res) => {
          if (res.status === 200) {
            setShowLoader(false);
            setShowSuccessModal(true);
          }
        })
        .catch((err) => {
          setShowLoader(false);
          setShowFailureModal(true);
        });
    } else {
      setShowLoader(true);
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
          isVerified: true,
          role: 'owner'
        }
      })
        .then((res) => {
          if (res.status === 200) {
            setShowLoader(false);
            setShowSuccessModal(true);
          }
        })
        .catch((err) => {
          setShowLoader(false);
          setShowFailureModal(true);
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
      <ModalNoClose
        setOpen={setShowSuccessModal}
        open={ShowSuccessModal}
        setEdit={() => { }}
        setData={() => { }}
      >
        <SuccessModal
          executeFunction={() => {
            window.location = '/company';
          }}
          setShowSuccessModal={setShowSuccessModal}
        />
      </ModalNoClose>

      <ModalNoClose
        setOpen={setShowFailureModal}
        open={ShowFailureModal}
        setEdit={() => { }}
        setData={() => { }}
      >
        <FailureModal setShowFailureModal={setShowFailureModal} />
      </ModalNoClose>

      <ModalNoClose
        setOpen={() => { }}
        open={ShowLoader}
        setEdit={() => { }}
        setData={() => { }}
      >
        <CircularProgress />
      </ModalNoClose>
    </>
  );
}

export default AddClient;
