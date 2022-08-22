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

function AddActivity({ shouldUpdate, setShouldUpdate, edit, data }) {
  const [activity, setActivity] = useState(data ? data.name : null);
  const [jurisdiction, setJurisdiction] = useState(
    data ? data.mainland_id._id : null
  );
  const [allJurisdictions, setAllJurisdictions] = useState([]);
  const [notify, setNotify] = useState(false);
  useEffect(() => {
    console.log(data);
    axios({
      method: 'GET',
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/mainland`,
      headers: {
        'x-auth-token': process.env.NEXT_PUBLIC_ADMIN_JWT
      }
    }).then((res) => {
      setAllJurisdictions(res.data.mainland);
    });
  }, []);

  function onSubmit(e) {
    e.preventDefault();

    if (edit !== true) {
      axios({
        method: 'POST',
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/activity`,
        headers: {
          'x-auth-token': process.env.NEXT_PUBLIC_ADMIN_JWT
        },
        data: {
          name: activity,
          mainland_id: jurisdiction
        }
      }).then((res) => {
        if (res.status === 200) {
          setShouldUpdate(!shouldUpdate);
        }
      });
    } else {
      axios({
        method: 'PUT',
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/activity?id=${data._id}`,
        headers: {
          'x-auth-token': process.env.NEXT_PUBLIC_ADMIN_JWT
        },
        data: {
          name: activity,
          mainland_id: jurisdiction
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
        <title>Add Activity - Virtuzone</title>
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
              <CardHeader title="Add Activity" />
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
                      label="Activity"
                      value={activity}
                      onChange={(e) => setActivity(e.target.value)}
                    />
                    <TextField
                      required
                      select
                      onChange={(e) => {
                        setJurisdiction(e.target.value);
                      }}
                      id="outlined-required"
                      label="Jurisdiction"
                      placeholder="Select Jurisdiction"
                      value={jurisdiction}
                    >
                      {allJurisdictions?.map((el) => (
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

export default AddActivity;
