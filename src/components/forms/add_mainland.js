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

function AddMainland({ shouldUpdate, setShouldUpdate, edit, data }) {
  const [mainland, setMainland] = useState(data ? data.name : null);
  const [emirates, setEmirates] = useState(data ? data.emirates_id._id : null);
  const [allEmirates, setAllEmirates] = useState([]);
  const [notify, setNotify] = useState(false);

  useEffect(() => {
    console.log(data);
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

    if (edit !== true) {
      axios({
        method: 'POST',
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/mainland`,
        headers: {
          'x-auth-token': process.env.NEXT_PUBLIC_ADMIN_JWT
        },
        data: {
          name: mainland,
          emirates_id: emirates
        }
      }).then((res) => {
        if (res.status === 200) {
          setShouldUpdate(!shouldUpdate);
        }
      });
    } else {
      axios({
        method: 'PUT',
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/mainland?id=${data._id}`,
        headers: {
          'x-auth-token': process.env.NEXT_PUBLIC_ADMIN_JWT
        },
        data: {
          name: mainland,
          emirates_id: emirates
        }
      }).then((res) => {
        if (res.status === 200) {
          setShouldUpdate(!shouldUpdate);
        }
      });
    }
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
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                    <TextField
                      required
                      select
                      onChange={(e) => {
                        console.log(e.target.value);
                        setEmirates(e.target.value);
                      }}
                      id="outlined-required"
                      label="Emirates"
                      placeholder="Select Emirates"
                      value={emirates}
                    >
                      {allEmirates?.map((el) => (
                        <MenuItem value={el._id} key={el.name}>
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
                      {/* <FormControlLabel control={<Checkbox />} label="Notify" /> */}
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
