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
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ConstructionOutlined } from '@mui/icons-material';

function AddCompany({ id, shouldUpdate, setShouldUpdate }) {
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [name, setName] = useState(null);
  const [licenseNo, setLicenseNo] = useState(null);
  const [licenseCode, setLicenseCode] = useState(null);
  const [judiciaries, setJudiciaries] = useState(null);
  const [judiciary, setJudiciary] = useState(null);
  const [establishmentDate, setEstablishmentDate] = useState(null);
  const [issueDate, setIssueDate] = useState(null);
  const [expiryDate, setExpiryDate] = useState(null);
  const [activities, setActivities] = useState(null);
  const [activity, setActivity] = useState(null);

  useEffect(() => {
    if (id !== undefined) {
      axios({
        method: 'GET',
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/user?id=${id}`,
        headers: {
          'x-auth-token': process.env.NEXT_PUBLIC_ADMIN_JWT
        }
      }).then((res) => {
        setFirstName(res.data.user.firstName);
        setLastName(res.data.user.lastName);
      });
    }
    axios({
      method: 'GET',
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/emirates`,
      headers: {
        'x-auth-token': process.env.NEXT_PUBLIC_ADMIN_JWT
      }
    }).then((res) => {
      setJudiciaries(res.data.emirates);
    });
  }, [id]);

  function onSubmit(e) {
    e.preventDefault();
    axios({
      method: 'POST',
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/company`,
      headers: {
        'x-auth-token': process.env.NEXT_PUBLIC_ADMIN_JWT
      },
      data: {
        owner: id,
        name: name,
        licenseNo: licenseNo,
        licenseCode: licenseCode,
        judiciary: judiciary,
        establishmentDate: establishmentDate,
        issueDate: issueDate,
        expiryDate: expiryDate,
        activities: activity
      }
    }).then((res) => {
      if (res.status === 200) {
        setShouldUpdate(!shouldUpdate);
      }
    });
  }

  function onJudiciaryChange(e) {
    setJudiciary(e.target.value);
    axios({
      method: 'GET',
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/activity?id=${e.target.value}`,
      headers: {
        'x-auth-token': process.env.NEXT_PUBLIC_ADMIN_JWT
      }
    })
      .then((res) => {
        setActivity(null);
        setActivities(res.data.activity);
      })
      .catch((err) => {
        setActivities([]);
        setActivity(null);
      });
  }
  return (
    <>
      <Head>
        <title>Add Company - Virtuzone</title>
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
              <CardHeader title="Add Company" />
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
                      value={`${firstName} ${lastName}`}
                      id="outlined-required"
                      label="Owner"
                      placeholder="Owner"
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
                      label="Name"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />

                    <TextField
                      required
                      id="outlined-read-only"
                      label="License No"
                      placeholder="License No"
                      value={licenseNo}
                      onChange={(e) => setLicenseNo(e.target.value)}
                    />
                    <TextField
                      required
                      id="outlined-read-only"
                      label="License Code"
                      placeholder="License Code"
                      value={licenseCode}
                      onChange={(e) => setLicenseCode(e.target.value)}
                    />
                    <TextField
                      required
                      id="outlined-read-only"
                      select
                      label="Judiciary"
                      placeholder="Judiciary"
                      value={judiciary}
                      onChange={(e) => onJudiciaryChange(e)}
                    >
                      {judiciaries &&
                        judiciaries.map((el) => (
                          <MenuItem value={el._id} key={el.name}>
                            {el.name}
                          </MenuItem>
                        ))}
                    </TextField>
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
                      required
                      select
                      id="outlined-read-only"
                      label="Activities"
                      placeholder="Activities"
                      value={activity}
                      onChange={(e) => setActivity(e.target.value)}
                    >
                      {activities &&
                        activities.map((el) => (
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

export default AddCompany;
