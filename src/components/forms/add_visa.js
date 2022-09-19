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
  MenuItem,
  Checkbox,
  FormControlLabel,
  Button,
  CircularProgress
} from '@mui/material';
import { CompanyContext } from 'src/contexts/CompanyContext';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from 'react';
import axios from 'axios';
import styles from '../../css/addClient.module.css';
import { useEffect } from 'react';
import { useContext } from 'react';
import ReactFlagsSelect from 'react-flags-select';
import countries from '../../data/countries.json';
import ModalNoClose from '../modal/modalNoClose';
import SuccessModal from '../successBox';
import FailureModal from '../failureBox';
import dynamic from 'next/dynamic';
const RichTextEditor = dynamic(() => import('react-rte'), { ssr: false });
function AddVisa({
  setOpen,
  shouldUpdate,
  setShouldUpdate,
  company,
  data,
  edit
}) {
  console.log(data)
  const [notify, setNotify] = useState(false);

  const [value, setValue] = useState(null);
  const [message, setMessage] = useState(null);
  const [ShowLoader, setShowLoader] = useState(false);
  const [ShowSuccessModal, setShowSuccessModal] = useState(false);
  const [ShowFailureModal, setShowFailureModal] = useState(false);
  const [firstName, setFirstName] = useState(data ? data.firstName : null);
  const [lastName, setLastName] = useState(data ? data.lastName : null);
  const [passportNo, setPassportNo] = useState(data ? data.passportNo : null);
  const [passportIssue, setPassportIssue] = useState(
    data ? data.passportIssue : null
  );
  const [passportExpiry, setPassportExpiry] = useState(
    data ? data.passportExpiry : null
  );
  const [passportCountry, setPassportCountry] = useState(
    data ? data.passportCountry : null
  );

  const [countryCode, setCountryCode] = useState(
    data ? data.countryCode : null
  );

  const [entryPermitIssued, setEntryPermitIssued] = useState(
    data ? data.entryPermitIssued : false
  );
  const [visaUID, setVisaUID] = useState(data ? data.visaUID : null);
  const [residencyVisaIssued, setResidencyVisaIssued] = useState(
    data ? data.residencyVisaIssued : false
  );
  const [emiratesIdIssued, setEmiratesIdIssued] = useState(
    data ? data.emiratesIdIssued : false
  );
  const [emiratesId, setEmiratesId] = useState(data ? data.emiratesId : null);
  const [passport, setPassport] = useState(data ? data.passport : null);
  const [entryPermit, setEntryPermit] = useState(
    data ? data.entryPermit : null
  );
  const [residencyVisa, setResidencyVisa] = useState(
    data ? data.residencyVisa : null
  );
  console.log(company);

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
      setValue(mod.createValueFromString(
        `   
        <h1 style="font-family:Roboto Slab,Helvetica,Arial,sans-serif ;">Dear ${firstName} ${lastName}</h1>
        <p style="font-size: 17px; color:#777; font-family:Roboto Slab,Helvetica,Arial,sans-serif ;">You can now access, view and share your UAE visa anywhere and anytime with just a touch on your smartphone. Head over to the VZ Mobile App and log in to get started.</p>
        
       <p style="font-size: 17px; font-weight: 600; color:#777; font-family:Roboto Slab,Helvetica,Arial,sans-serif ;"> <strong>Kind regards, <br>The Virtuzone Team </strong></p> 
  `,
        'html'
      ));
    };
    importModule();
  }, []);

  function onSubmit(e) {
    e.preventDefault();
    const form = new FormData();

    if (passport) {
      for (const key of Object.keys(passport)) {
        form.append('passport', passport[key]);
      }
    }
    if (entryPermit) {
      for (const key of Object.keys(entryPermit)) {
        form.append('entryPermit', entryPermit[key]);
      }
    }
    if (residencyVisa) {
      for (const key of Object.keys(residencyVisa)) {
        form.append('residencyVisa', residencyVisa[key]);
      }
    }
    if (emiratesId) {
      for (const key of Object.keys(emiratesId)) {
        form.append('emiratesId', emiratesId[key]);
      }
    }
    form.append('firstName', firstName);
    form.append('lastName', lastName);
    form.append('company', company);
    form.append('passportNo', passportNo);
    form.append('passportIssue', passportIssue);
    form.append('passportExpiry', passportExpiry);
    form.append('passportCountry', passportCountry);
    form.append('countryCode', countryCode);
    form.append('entryPermitIssued', entryPermitIssued);
    form.append('visaUID', visaUID);
    form.append('residencyVisaIssued', residencyVisaIssued);
    form.append('emiratesIdIssued', emiratesIdIssued);
    form.append('notify', notify);
    form.append('message', `
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

${value.toString('html').toString()}

             
            </div>
            
            <footer style="max-width: 600px; margin:auto; text-align: center;">
            <hr>
            <div style="text-align:center; margin-bottom: 15px; margin-top: 70px;">
                <img style="width: 50%;" src="https://housing.designer-dev.com/image-10.png" alt="VIRTUZONE">
            </div>

            <div style="display: flex; justify-content:space-around; max-width:300px; margin: auto; gap:30px">
                <div style="    display: flex;align-items: center;justify-content: center; padding: 0 15px;">
                    <img style="width: 100%;" src="https://housing.designer-dev.com/App-Store-icon.png" alt="VIRTUZONE">
                </div>
                <div style="    display: flex;align-items: center;justify-content: center; padding: 0 15px;">
                    <img style="width: 100%;" src="https://housing.designer-dev.com/Playstore-icon.png" alt="VIRTUZONE">
                </div>
                <div style="display: flex;align-items: center;justify-content: center; padding: 0 15px;">
                    <img style="width: 100%;" src="https://housing.designer-dev.com/webicon.png" alt="VIRTUZONE">
                </div>
            </div>
            <p style="font-size: 12px; color:#999;">VIRTUZONE LLC UAE FZ | 2022</p>


        </footer>
        </body>
    </html>


`.toString()
    );
    // form.append('employee', employee);
    if (!edit) {
      setShowLoader(true);
      axios({
        method: 'POST',
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/visa`,
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-auth-token': process.env.NEXT_PUBLIC_ADMIN_JWT
        },
        data: form
      })
        .then((res) => {
          setShowLoader(false);
          if (res.status === 200) {
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
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/visa?id=${data._id}`,
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-auth-token': process.env.NEXT_PUBLIC_ADMIN_JWT
        },
        data: form
      })
        .then((res) => {
          setShowLoader(false);
          if (res.status === 200) {
            setShowSuccessModal(true);
            setOpen(false);
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
        <title>Add Visa - Virtuzone</title>
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
              <CardHeader title="Add Visa" />
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
                      id="outlined-password-input"
                      label="First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="First Name"
                    />
                    <TextField
                      id="outlined-password-input"
                      label="Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Last Name"
                    />
                    <TextField
                      id="outlined-password-input"
                      label="Passport No"
                      value={passportNo}
                      onChange={(e) => setPassportNo(e.target.value)}
                      placeholder="Passport No"
                    />

                    <DatePicker
                      label="Passport Issue"
                      value={passportIssue}
                      onChange={(newValue) => {
                        setPassportIssue(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                    <DatePicker
                      label="Passport Expiry"
                      value={passportExpiry}
                      onChange={(newValue) => {
                        setPassportExpiry(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />

                    {/* <TextField
                      required
                      id="outlined-required"
                      label="Passport Country"
                      value={passportCountry}
                      onChange={(e) => {
                        setPassportCountry(e.target.value);
                      }}
                      placeholder="Passport Country"
                    /> */}

                    <ReactFlagsSelect
                      className={styles.country_dropdown}
                      searchable
                      placeholder={'Passport Country'}
                      searchPlaceholder="Passport Country"
                      selected={countryCode}
                      fullWidth={false}
                      onSelect={(code) => {
                        setPassportCountry(
                          countries.find((el) => el.code === code).name
                        );
                        setCountryCode(code);
                        console.log(countries.find((el) => el.code === code));
                      }}
                    />

                    <TextField
                      required
                      id="outlined-required"
                      label="Visa UID"
                      value={visaUID}
                      onChange={(e) => {
                        setVisaUID(e.target.value);
                      }}
                      placeholder="Visa UID"
                    />

                    <TextField
                      id="outlined-search"
                      label="Passport"
                      onChange={(e) => setPassport(e.target.files)}
                      InputLabelProps={{
                        shrink: true
                      }}
                      inputProps={{ multiple: true }}
                      type={'file'}
                    />
                    <Box sx={{ display: 'flex' }}>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          width: 'fit-content'
                        }}
                      >
                        {entryPermitIssued && (
                          <TextField
                            id="outlined-search"
                            label="Entry Permit"
                            onChange={(e) => setEntryPermit(e.target.files)}
                            InputLabelProps={{
                              shrink: true
                            }}
                            inputProps={{ multiple: true }}
                            type={'file'}
                          />
                        )}
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={entryPermitIssued}
                              onChange={(e) =>
                                setEntryPermitIssued(e.target.checked)
                              }
                            />
                          }
                          label="Entry Permit Issued"
                        />
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          width: 'fit-content'
                        }}
                      >
                        {residencyVisaIssued && (
                          <TextField
                            id="outlined-search"
                            label="Residency Visa"
                            onChange={(e) => setResidencyVisa(e.target.files)}
                            InputLabelProps={{
                              shrink: true
                            }}
                            inputProps={{ multiple: true }}
                            type={'file'}
                          />
                        )}

                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={residencyVisaIssued}
                              onChange={(e) =>
                                setResidencyVisaIssued(e.target.checked)
                              }
                            />
                          }
                          label="Residency Visa Issued"
                        />
                      </Box>

                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          width: 'fit-content'
                        }}
                      >
                        {emiratesIdIssued && (
                          <TextField
                            sx={{
                              opacity: emiratesIdIssued ? '100%' : '0%',
                              transition: 'opacity 0.5s'
                            }}
                            id="outlined-search"
                            label="Emirates Id"
                            onChange={(e) => setEmiratesId(e.target.files)}
                            InputLabelProps={{
                              shrink: true
                            }}
                            inputProps={{ multiple: true }}
                            type={'file'}
                          />
                        )}

                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={emiratesIdIssued}
                              onChange={(e) =>
                                setEmiratesIdIssued(e.target.checked)
                              }
                            />
                          }
                          label="Emirates Id Issued"
                        />
                      </Box>
                    </Box>
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
            setShouldUpdate(!shouldUpdate);
            setOpen(false);
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

export default AddVisa;
