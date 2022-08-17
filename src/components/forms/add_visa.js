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
  Button
} from '@mui/material';
import { CompanyContext } from 'src/contexts/CompanyContext';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useContext } from 'react';
function AddVisa({
  setOpen,
  shouldUpdate,
  setShouldUpdate,
  company,
  data,
  edit
}) {
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
  const [entryPermitIssued, setEntryPermitIssued] = useState(
    data ? data.entryPermitIssued : null
  );
  const [visaUID, setVisaUID] = useState(data ? data.visaUID : null);
  const [residencyVisaIssued, setResidencyVisaIssued] = useState(
    data ? data.residencyVisaIssued : null
  );
  const [emiratesIdIssued, setEmiratesIdIssued] = useState(
    data ? data.emiratesIdIssued : null
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
    form.append('entryPermitIssued', entryPermitIssued);
    form.append('visaUID', visaUID);
    form.append('residencyVisaIssued', residencyVisaIssued);
    form.append('emiratesIdIssued', emiratesIdIssued);
    // form.append('employee', employee);
    if (!edit) {
      axios({
        method: 'POST',
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/visa`,
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-auth-token': process.env.NEXT_PUBLIC_ADMIN_JWT
        },
        data: form
      }).then((res) => {
        if (res.status === 200) {
          setShouldUpdate(!shouldUpdate);
          setOpen(false);
        }
      });
    } else {
      axios({
        method: 'PUT',
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/visa?id=${data._id}`,
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-auth-token': process.env.NEXT_PUBLIC_ADMIN_JWT
        },
        data: form
      }).then((res) => {
        if (res.status === 200) {
          setShouldUpdate(!shouldUpdate);
          setOpen(false);
        }
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

                    <TextField
                      required
                      id="outlined-required"
                      label="Passport Country"
                      value={passportCountry}
                      onChange={(e) => {
                        setPassportCountry(e.target.value);
                      }}
                      placeholder="Passport Country"
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

                    {emiratesIdIssued && (
                      <TextField
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
                          checked={entryPermitIssued}
                          onChange={(e) =>
                            setEntryPermitIssued(e.target.checked)
                          }
                        />
                      }
                      label="Entry Permit Issued"
                    />

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

                    <Box
                      sx={{
                        margin: '9px',
                        display: 'flex',
                        justifyContent: 'flex-end'
                      }}
                      component={'div'}
                    >
                      <FormControlLabel control={<Checkbox />} label="Notify" />
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

export default AddVisa;
