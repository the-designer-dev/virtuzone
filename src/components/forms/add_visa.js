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
function AddVisa({ shouldUpdate, setShouldUpdate }) {
  const [allEmails, setAllEmails] = useState([]);
  const [issueDate, setIssueDate] = useState(null);
  const [expiryDate, setExpiryDate] = useState(null);
  const [ID, setID] = useState(null);
  const [name, setName] = useState(null);
  const [companyName, setCompanyName] = useState(null);
  const [visaApplicant, setVisaApplicant] = useState(null);
  const [visaUID, setVisaUID] = useState(null);
  const [visaType, setVisaType] = useState(null);
  const [jobTitle, setJobTitle] = useState(null);
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
    for (const key of Object.keys(file)) {
      form.append('visa', file[key]);
    }
    form.append('user', ID);
    form.append('visaApplicant', visaApplicant);
    form.append('visaUID', visaUID);
    form.append('visaType', visaType);
    form.append('jobTitle', jobTitle);
    form.append('dateOfIssue', issueDate);
    form.append('expiryDate', expiryDate);

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
      }
    });
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
                      required
                      select
                      onChange={(e) => {
                        setName(JSON.parse(e.target.value).name);
                        setCompanyName(JSON.parse(e.target.value).companyName);
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
                            companyName: el.companyName,
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
                      id="outlined-number"
                      value={companyName}
                      label="Company Name"
                      InputProps={{
                        readOnly: true
                      }}
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                    <TextField
                      id="outlined-password-input"
                      label="VISA Applicant"
                      onChange={(e) => setVisaApplicant(e.target.value)}
                      placeholder="VISA Applicant"
                    />
                    <TextField
                      required
                      id="outlined-read-only-input"
                      label="Visa UID"
                      onChange={(e) => {
                        setVisaUID(e.target.value);
                      }}
                      placeholder="Visa UID"
                    />
                    <TextField
                      required
                      id="outlined-required"
                      label="Visa Type"
                      onChange={(e) => {
                        setVisaType(e.target.value);
                      }}
                      placeholder="Visa Type"
                    />
                    <TextField
                      required
                      id="outlined-required"
                      label="Job Title"
                      onChange={(e) => {
                        setJobTitle(e.target.value);
                      }}
                      placeholder="Job Title"
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
                      onChange={(e) => setFile(e.target.files)}
                      InputLabelProps={{
                        shrink: true
                      }}
                      inputProps={{ multiple: true }}
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

export default AddVisa;
