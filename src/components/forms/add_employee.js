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
  Button
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function AddEmployee({ id, shouldUpdate, setShouldUpdate }) {
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [mobile, setMobile] = useState(null);
  const [company, setCompany] = useState(null);

  useEffect(() => {
    if (id !== undefined) {
      axios({
        method: 'GET',
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/company?id=${id}`,
        headers: {
          'x-auth-token': process.env.NEXT_PUBLIC_ADMIN_JWT
        }
      }).then((res) => {
        setCompany(res.data.company[0].name);
      });
    }
  }, [id]);

  function onSubmit(e) {
    e.preventDefault();

    axios({
      method: 'POST',
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/employee`,
      headers: {
        'x-auth-token': process.env.NEXT_PUBLIC_ADMIN_JWT
      },
      data: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        mobile: mobile,
        company: id
      }
    }).then((res) => {
      if (res.status === 200) {
        setShouldUpdate(!shouldUpdate);
      }
    });
  }

  return (
    <>
      <Head>
        <title>Add Employee - Virtuzone</title>
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
              <CardHeader title="Add Employee" />
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
                      id="outlined-read-only"
                      label="Company"
                      placeholder="Company"
                      value={company}
                      InputProps={{
                        readOnly: true
                      }}
                      InputLabelProps={{
                        shrink: true
                      }}
                    />

                    <TextField
                      required
                      id="outlined-read-only"
                      label="First Name"
                      placeholder="First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
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
                    <TextField
                      required
                      id="outlined-read-only"
                      label="Mobile"
                      placeholder="Mobile"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                    />

                    <Box
                      sx={{
                        margin: '9px',
                        display: 'flex',
                        justifyContent: 'flex-end'
                      }}
                      component={'div'}
                    >
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

export default AddEmployee;
