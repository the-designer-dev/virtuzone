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
  MenuItem,
  CircularProgress
} from '@mui/material';
import ModalNoClose from '../modal/modalNoClose';
import SuccessModal from '../successBox';
import FailureModal from '../failureBox';

function AddMainland({ shouldUpdate, setShouldUpdate, edit, data }) {
  const [ShowLoader, setShowLoader] = useState(false);
  const [ShowSuccessModal, setShowSuccessModal] = useState(false);
  const [ShowFailureModal, setShowFailureModal] = useState(false);
  const [emirates, setEmirates] = useState(data ? data.name : null);
  console.log(data);
  function onSubmit(e) {
    e.preventDefault();
    if (edit !== true) {
      setShowLoader(true)
      axios({
        method: 'POST',
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/emirates`,
        headers: {
          'x-auth-token': process.env.NEXT_PUBLIC_ADMIN_JWT
        },
        data: { name: emirates }
      }).then((res) => {
        setShowLoader(false)
        if (res.status === 200) {
          setShowSuccessModal(true)
        }
      }).catch((err) => {
        setShowLoader(false)
        setShowFailureModal(true)
      });
    } else {
      setShowLoader(true)
      axios({
        method: 'PUT',
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/emirates?id=${data._id}`,
        headers: {
          'x-auth-token': process.env.NEXT_PUBLIC_ADMIN_JWT
        },
        data: { name: emirates }
      }).then((res) => {
        setShowLoader(false)
        if (res.status === 200) {
          setShowSuccessModal(true)
        }
      }).catch((err) => {
        setShowLoader(false)
        setShowFailureModal(true)
      });
    }
  }

  return (
    <>
      <Head>
        <title>Add Emirates - Virtuzone</title>
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
              <CardHeader title="Add Emirates" />
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
                      label="Emirates"
                      value={emirates}
                      onChange={(e) => setEmirates(e.target.value)}
                    />

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
      <ModalNoClose
        setOpen={setShowSuccessModal}
        open={ShowSuccessModal}
        setEdit={() => { }}
        setData={() => { }}
      >
        <SuccessModal executeFunction={() => {
          setShouldUpdate(!shouldUpdate);
        }} setShowSuccessModal={setShowSuccessModal} />
      </ModalNoClose>

      <ModalNoClose
        setOpen={setShowFailureModal}
        open={ShowFailureModal}
        setEdit={() => { }}
        setData={() => { }}
      >
        <FailureModal setShowFailureModal={setShowFailureModal} />
      </ModalNoClose>


      <ModalNoClose
        setOpen={() => { }}
        open={ShowLoader}
        setEdit={() => { }}
        setData={() => { }}
      >
        <CircularProgress />
      </ModalNoClose>

    </>
  );
}

export default AddMainland;
