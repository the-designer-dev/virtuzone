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
function AddImmigrationCard() {
  const [issueDate, setIssueDate] = useState(null);
  const [expiryDate, setExpiryDate] = useState(null);
  const [allEmails, setAllEmails] = useState([]);
  const [ID, setID] = useState(null);
  const [name, setName] = useState(null);
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

    form.append('office-lease-agreement', file);
    form.append('user', ID);
    form.append('dateOfIssue', issueDate);
    form.append('expiryDate', expiryDate);

    axios({
      method: 'POST',
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/officeleaseagreements`,
      headers: {
        'Content-Type': 'multipart/form-data',
        'x-auth-token': process.env.NEXT_PUBLIC_ADMIN_JWT
      },
      data: form
    });
  }

  return (
    <>
      <Head>
        <title>Add Establishment/Immigration Card - Virtuzone</title>
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
              <CardHeader title="Add Office Lease Agreement" />
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
                        console.log(newValue);
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

export default AddImmigrationCard;
