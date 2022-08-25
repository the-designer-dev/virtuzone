import { useState } from 'react';
import axios from 'axios';
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
import FailureModal from '../failureBox';
import SuccessModal from '../successBox';
function AddPromotion({
  setOpen,
  setEdit,
  edit,
  data,
  setShouldUpdate,
  shouldUpdate
}) {
  const [ShowLoader, setShowLoader] = useState(false);
  const [ShowSuccessModal, setShowSuccessModal] = useState(false);
  const [ShowFailureModal, setShowFailureModal] = useState(false);
  const [image, setImage] = useState(data ? data.image : null);
  const [link, setLink] = useState(data ? data.link : null);

  function onSubmit(e) {
    e.preventDefault();
    console.log(edit);
    if (edit !== true) {
      setShowLoader(true)
      const form = new FormData();
      form.append('promotion', image);
      form.append('link', link);

      axios({
        method: 'POST',
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/Promotions`,
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-auth-token': process.env.NEXT_PUBLIC_ADMIN_JWT
        },
        data: form
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
      const form = new FormData();
      form.append('promotion', image);
      form.append('link', link);
      axios({
        method: 'PUT',
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/Promotions?id=${data._id}`,
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-auth-token': process.env.NEXT_PUBLIC_ADMIN_JWT
        },
        data: form
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
        <title>Add Promotion - Virtuzone</title>
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
              <CardHeader title="Add Promotion" />
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
                        setLink(e.target.value);
                      }}
                      value={link}
                      id="outlined-required"
                      label="Link"
                      placeholder="Link"
                    />

                    <TextField
                      id="outlined-search"
                      label="Scan File"
                      onChange={(e) => setImage(e.target.files[0])}
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
        <SuccessModal executeFunction={() => { setShouldUpdate(!shouldUpdate); setOpen(false); setEdit(false) }} setShowSuccessModal={setShowSuccessModal} />

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

export default AddPromotion;
