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
  Button,
  CircularProgress
} from '@mui/material';
import ModalNoClose from '../modal/modalNoClose';
import SuccessModal from '../successBox';
import FailureModal from '../failureBox';

function AddSupportService({ shouldUpdate, setShouldUpdate, edit, id, data }) {
  const [ShowLoader, setShowLoader] = useState(false);
  const [name, setName] = useState(data ? data.name : null);
  const [ShowSuccessModal, setShowSuccessModal] = useState(false);
  const [ShowFailureModal, setShowFailureModal] = useState(false);
  const [description, setDescription] = useState(
    data ? data.description : null
  );

  const handleOnChange = (value) => {
    setValue(value);
    if (event.onChange) {
      onChange(value.toString('html'));
    }
    setMessage(value.toString('html'));
  };

  function onSubmit(e) {
    e.preventDefault();

    if (edit !== true) {
      setShowLoader(true)
      axios({
        method: 'POST',
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/supportServices`,
        headers: {
          'x-auth-token': process.env.NEXT_PUBLIC_ADMIN_JWT
        },
        data: {
          name: name,
          description: description
        }
      })
        .then((res) => {
          setShowLoader(false)
          setShowSuccessModal(true)
        })
        .catch((err) => {
          setShowLoader(false)
          setShowFailureModal(true)
        });
    } else {
      setShowLoader(true)
      axios({
        method: 'PUT',
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/supportServices?id=${id}`,
        headers: {
          'x-auth-token': process.env.NEXT_PUBLIC_ADMIN_JWT
        },
        data: {
          name: name,
          description: description
        }
      })
        .then((res) => {
          setShowLoader(false)
          setShowSuccessModal(true)
        })
        .catch((err) => {
          setShowLoader(false)
          setShowFailureModal(true)
        });
    }
  }

  return (
    <>
      <Head>
        <title>Add Support Service - Virtuzone</title>
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
              <CardHeader title="Add Support Service" />
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
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                      value={name}
                      id="outlined-required"
                      label="Service Name"
                      placeholder="Service Name"
                    />

                    <TextField
                      required
                      multiline
                      id="outlined-read-only"
                      label="Service Description"
                      placeholder="Service Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />

                    <Box>
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
        <SuccessModal executeFunction={() => { setShouldUpdate(!shouldUpdate); }} setShowSuccessModal={setShowSuccessModal} />
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

export default AddSupportService;
