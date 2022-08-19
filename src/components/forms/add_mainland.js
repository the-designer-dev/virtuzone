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
  Checkbox,
  FormControlLabel,
  Button,
  MenuItem
} from '@mui/material';

function AddMainland({ shouldUpdate, setShouldUpdate }) {
  const [mainland, setMainland] = useState(null);
  const [emirates, setEmirates] = useState(null);
  const [allEmirates, setAllEmirates] = useState([]);
  const [notify, setNotify] = useState(false);
  useEffect(() => {
    axios({
      method: 'GET',
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/emirates`,
      headers: {
        'x-auth-token': process.env.NEXT_PUBLIC_ADMIN_JWT
      }
    }).then((res) => {
      setAllEmirates(res.data.emirates);
      console.log(res.data.emirates);
    });
  }, []);

  function onSubmit(e) {
    e.preventDefault();
    const form = new FormData();
    form.append('name', mainland);
    form.append('emirates_id', emirates);

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
        <title>Add Jurisdiction - Virtuzone</title>
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
              <CardHeader title="Add Jurisdiction" />
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
                      id="outlined-read-only"
                      label="Jurisdiction"
                      value={mainland}
                      onChange={(e) => setMainland(e.target.value)}
                    />
                    <TextField
                      required
                      select
                      onChange={(e) => {
                        setEmirates(JSON.parse(e.target.value).id);
                      }}
                      id="outlined-required"
                      label="Emirates"
                      placeholder="Select Emirates"
                    >
                      {allEmirates.map((el) => (
                        <MenuItem
                          value={JSON.stringify({
                            name: el.name,
                            id: el._id
                          })}
                          key={el.name}
                        >
                          {el.name}
                        </MenuItem>
                      ))}
                    </TextField>

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

export default AddMainland;
