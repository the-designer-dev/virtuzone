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
  MenuItem,
  Checkbox,
  FormControlLabel,
  Button
} from '@mui/material';

function AddSalaryCertificate({ shouldUpdate, setShouldUpdate }) {
  const [allEmails, setAllEmails] = useState([]);
  const [ID, setID] = useState(null);
  const [name, setName] = useState(null);
  const [file, setFile] = useState(null);
  const [visa, setVisa] = useState(null);
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
    form.append('user', ID);
    form.append('visa', visa);
    form.append('salary-certificate', file);

    axios({
      method: 'POST',
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/salarycertificate`,
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
        <title>Add Salary Certificate - Virtuzone</title>
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
              <CardHeader title="Add Salary Certificate" />
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
                      id="outlined-read-only"
                      label="Visa Type"
                      value={visa}
                      onChange={(e) => setVisa(e.target.value)}
                      select
                      required
                    >
                      <MenuItem value={'diplomatic'}>Diplomatic</MenuItem>
                      <MenuItem value={'commercial'}>Commercial</MenuItem>
                      <MenuItem value={'student'}>Student</MenuItem>
                      <MenuItem value={'work'}>Work</MenuItem>
                    </TextField>
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

export default AddSalaryCertificate;
