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

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
function AddLicense({ shouldUpdate, setShouldUpdate }) {
  const [establishmentDate, setEstablishmentDate] = useState(null);
  const [issueDate, setIssueDate] = useState(null);
  const [expiryDate, setExpiryDate] = useState(null);
  const [allEmails, setAllEmails] = useState([]);
  const [ID, setID] = useState(null);
  const [name, setName] = useState(null);
  const [license, setLicense] = useState(null);
  const [code, setCode] = useState(null);
  const [judiciary, setJudiciary] = useState(null);
  const [companyName, setCompanyName] = useState(null);
  const [file, setFile] = useState(null);
  const [notify, setNotify] = useState(false);
  useEffect(() => {
    axios({
      method: 'GET',
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/user`,
      headers: {
        'x-auth-token': process.env.NEXT_PUBLIC_ADMIN_JWT
      }
    }).then((res) => {
      setAllEmails(res.data.user);
      console.log(res.data.user);
    });
  }, []);

  function onSubmit(e) {
    e.preventDefault();
    const form = new FormData();

    console.log(ID);
    form.append('trade-license', file);
    form.append('user', ID);
    form.append('licenseNo', license);
    form.append('code', code);
    form.append('companyName', companyName);
    form.append('judiciary', judiciary);
    form.append('establishmentDate', establishmentDate);
    form.append('dateOfIssue', issueDate);
    form.append('expiryDate', expiryDate);
    form.append('request', 'pending');

    axios({
      method: 'POST',
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/uploadtradelicense`,
      headers: {
        'Content-Type': 'multipart/form-data',
        'x-auth-token': process.env.NEXT_PUBLIC_ADMIN_JWT
      },
      data: form
    }).then((res) => {
      if (res.status === 200) {
        setShouldUpdate(!shouldUpdate);
      }
    });
  }

  return (
    <>
      <Head>
        <title>Add License - Virtuzone</title>
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
              <CardHeader title="Add trade License" />
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
                      select
                      onChange={(e) => {
                        setName(JSON.parse(e.target.value).name);
                        setID(JSON.parse(e.target.value).id);
                      }}
                      id="outlined-required"
                      label="Client Email"
                      placeholder="Select User"
                    >
                      {allEmails.map((el) => (
                        <MenuItem
                          value={JSON.stringify({
                            name: `${el.firstName} ${el.lastName}`,
                            id: el._id
                          })}
                          key={el.email}
                        >
                          {el.email}
                        </MenuItem>
                      ))}
                    </TextField>
                    <TextField
                      id="outlined-read-only"
                      label="Name"
                      value={name}
                      InputProps={{
                        readOnly: true
                      }}
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                    <TextField
                      id="outlined-password-input"
                      label="License No"
                      onChange={(e) => setLicense(e.target.value)}
                      value={license}
                      placeholder="License Number"
                    />
                    <TextField
                      id="outlined-read-only-input"
                      label="Code"
                      onChange={(e) => {
                        setCode(e.target.value);
                      }}
                      placeholder="Code"
                    />
                    <TextField
                      required
                      select
                      id="outlined-required"
                      label="Judiciary"
                      onChange={(e) => {
                        setJudiciary(e.target.value);
                      }}
                      placeholder="--Select--"
                    >
                      <MenuItem key={'option.value'} value={'option.value'}>
                        {'option.label'}
                      </MenuItem>
                    </TextField>
                    <TextField
                      id="outlined-number"
                      onChange={(e) => {
                        setCompanyName(e.target.value);
                      }}
                      label="Company Name"
                      placeholder="Company Name"
                    />
                    <DatePicker
                      label="Establishment Date"
                      value={establishmentDate}
                      onChange={(newValue) => {
                        setEstablishmentDate(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                    <DatePicker
                      label="Date of issue"
                      value={issueDate}
                      onChange={(newValue) => {
                        setIssueDate(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                    <DatePicker
                      label="Expiry Date"
                      value={expiryDate}
                      onChange={(newValue) => {
                        setExpiryDate(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                    <TextField
                      id="outlined-search"
                      label="Scan File"
                      onChange={(e) => setFile(e.target.files[0])}
                      InputLabelProps={{
                        shrink: true
                      }}
                      type={'file'}
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

export default AddLicense;
