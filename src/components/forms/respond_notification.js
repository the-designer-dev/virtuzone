import { useEffect, useState } from 'react';
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
import dynamic from 'next/dynamic';
const RichTextEditor = dynamic(() => import('react-rte'), { ssr: false });
function RespondNotification({
  setOpen,
  setEdit,
  edit,
  id,
  data,
  setId,
  setShouldUpdate,

  shouldUpdate
}) {
  const [ShowLoader, setShowLoader] = useState(false);
  const [ShowSuccessModal, setShowSuccessModal] = useState(false);
  const [ShowFailureModal, setShowFailureModal] = useState(false);
  const [image, setImage] = useState(data ? data.image : null);
  const [link, setLink] = useState(data ? data.link : null);
  const [email, setEmail] = useState(data ? data.user?.email : null);
  const [user, setUser] = useState(data ? data.user?._id : null);

  const [value, setValue] = useState(null);

  const handleOnChange = (value) => {
    setValue(value);
  };

  useEffect(() => {
    const importModule = async () => {
      const mod = await import('react-rte');
      setValue(mod.createEmptyValue());
    };
    importModule();
  }, []);

  function onSubmit(e) {
    e.preventDefault();
    console.log(edit);

    setShowLoader(true);
    console.log(value.toString('html').toString());

    axios({
      method: 'POST',
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/notification`,
      headers: {
        'x-auth-token': process.env.NEXT_PUBLIC_ADMIN_JWT
      },
      data: {
        user: user,
        email: email,
        message: value.toString('html').toString()
      }
    })
      .then((res) => {
        setShowLoader(false);
        if (res.status === 200) {
          setShowSuccessModal(true);
        }
      })
      .catch((err) => {
        setShowLoader(false);
        setShowFailureModal(true);
      });
  }

  return (
    <>
      <Head>
        <title>Respond To Notification</title>
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
              <CardHeader title="Respond To Notification" />
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
                      value={email}
                      id="outlined-required"
                      label="To"
                      placeholder="To"
                      readonly="readonly"
                      InputLabelProps={{
                        shrink: true
                      }}
                    />

                    {value !== null && (
                      <RichTextEditor value={value} onChange={handleOnChange} />
                    )}

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
        setEdit={() => {}}
        setData={() => {}}
      >
        <SuccessModal
          executeFunction={() => {
            setShouldUpdate(!shouldUpdate);
            setOpen(false);
            setEdit(false);
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

export default RespondNotification;
