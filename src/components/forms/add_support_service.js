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
  CircularProgress,
  Typography
} from '@mui/material';
import ModalNoClose from '../modal/modalNoClose';
import SuccessModal from '../successBox';
import FailureModal from '../failureBox';
import { SketchPicker } from 'react-color';

function AddSupportService({ shouldUpdate, setShouldUpdate, edit, id, data }) {
  const [ShowLoader, setShowLoader] = useState(false);
  const [name1, setName1] = useState(data ? data.name1 : null);
  const [name2, setName2] = useState(data ? data.name2 : null);
  const [circleColor, setCircleColor] = useState(
    data ? data.circleColor : '#000'
  );
  const [cardColor, setCardColor] = useState(data ? data.cardColor : '#000');
  const [ShowSuccessModal, setShowSuccessModal] = useState(false);
  const [ShowFailureModal, setShowFailureModal] = useState(false);
  const [image, setImage] = useState(data ? data.image : null);

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
    const form = new FormData();

    form.append('name1', name1);
    form.append('name2', name2);
    form.append('description', description);
    form.append('cardColor', cardColor);
    form.append('circleColor', circleColor);
    form.append('supportServiceIcon', image);
    if (edit !== true) {
      setShowLoader(true);
      axios({
        method: 'POST',
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/supportServices`,
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-auth-token': process.env.NEXT_PUBLIC_ADMIN_JWT
        },
        data: form
      })
        .then((res) => {
          setShowLoader(false);
          setShowSuccessModal(true);
        })
        .catch((err) => {
          setShowLoader(false);
          setShowFailureModal(true);
        });
    } else {
      setShowLoader(true);
      axios({
        method: 'PUT',
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/supportServices?id=${id}`,
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-auth-token': process.env.NEXT_PUBLIC_ADMIN_JWT
        },
        data: form
      })
        .then((res) => {
          setShowLoader(false);
          setShowSuccessModal(true);
        })
        .catch((err) => {
          setShowLoader(false);
          setShowFailureModal(true);
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
                        setName1(e.target.value);
                      }}
                      value={name1}
                      id="outlined-required"
                      label="Service Name (Bold)"
                      placeholder="Service Name (Bold)"
                    />

                    <TextField
                      required
                      onChange={(e) => {
                        setName2(e.target.value);
                      }}
                      value={name2}
                      id="outlined-required"
                      label="Service Name Part 2"
                      placeholder="Service Name Part 2"
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

                    <Box sx={{ width: '100%', display: 'flex' }}>
                      <Box
                        sx={{
                          width: '100%',
                          height: '360px',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center'
                        }}
                      >
                        <Typography variant="p">Circle Color</Typography>
                        <SketchPicker
                          color={circleColor}
                          onChangeComplete={(color) => {
                            setCircleColor(color.hex);
                          }}
                        />
                      </Box>
                      <Box
                        sx={{
                          width: '100%',
                          height: '360px',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center'
                        }}
                      >
                        <Typography variant="p">Card Color</Typography>
                        <SketchPicker
                          color={cardColor}
                          onChangeComplete={(color) => {
                            setCardColor(color.hex);
                          }}
                        />
                      </Box>
                    </Box>
                    <TextField
                      id="outlined-search"
                      label="Icon"
                      onChange={(e) => setImage(e.target.files[0])}
                      InputLabelProps={{
                        shrink: true
                      }}
                      type={'file'}
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
        setEdit={() => {}}
        setData={() => {}}
      >
        <SuccessModal
          executeFunction={() => {
            setShouldUpdate(!shouldUpdate);
          }}
          setShowSuccessModal={setShowSuccessModal}
        />
      </ModalNoClose>

      <ModalNoClose
        setOpen={setShowFailureModal}
        open={ShowFailureModal}
        setEdit={() => {}}
        setData={() => {}}
      >
        <FailureModal setShowFailureModal={setShowFailureModal} />
      </ModalNoClose>

      <ModalNoClose
        setOpen={() => {}}
        open={ShowLoader}
        setEdit={() => {}}
        setData={() => {}}
      >
        <CircularProgress />
      </ModalNoClose>
    </>
  );
}

export default AddSupportService;
