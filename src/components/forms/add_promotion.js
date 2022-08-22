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
  Button
} from '@mui/material';
function AddPromotion({
  setOpen,
  setEdit,
  edit,
  data,
  setShouldUpdate,
  shouldUpdate
}) {
  const [image, setImage] = useState(data ? data.image : null);
  const [link, setLink] = useState(data ? data.link : null);

  function onSubmit(e) {
    e.preventDefault();
    console.log(edit);
    if (edit !== true) {
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
        if (res.status === 200) {
          setShouldUpdate(!shouldUpdate);
          setOpen(false);
        }
      });
    } else {
      const form = new FormData();
      form.append('image', image);
      form.append('link', link);
      axios({
        method: 'PUT',
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/updatePromotions?id=${data._id}`,
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-auth-token': process.env.NEXT_PUBLIC_ADMIN_JWT
        },
        data: form
      }).then((res) => {
        if (res.status === 200) {
          setShouldUpdate(!shouldUpdate);
          setEdit(false);
          setOpen(false);
        }
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
    </>
  );
}

export default AddPromotion;
