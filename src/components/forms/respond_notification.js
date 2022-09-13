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
    console.log(value.toString('html'));
  };

  useEffect(() => {
    const importModule = async () => {
      const mod = await import('react-rte');
      setValue(
        mod.createValueFromString(
          `   
          <h1 style="font-family:Roboto Slab,Helvetica,Arial,sans-serif ;">Lorem, ipsum dolor.</h1>
          <p style="font-size: 17px; color:#777; font-family:Roboto Slab,Helvetica,Arial,sans-serif ;">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia ipsum a nesciunt officia error beatae rem, possimus accusantium corporis similique eligendi veniam eveniet harum inventore nihil itaque iure eum adipisci.</p>
          <div style="text-align: center; margin: 80px 0;">
              <button style="background-color: #cf3339; padding:5px 25px; border: solid #cf3339; border-radius: 8px; color:#fff">6666</button>
          </div>
          <p style="font-size: 17px; color:#777; font-family:Roboto Slab,Helvetica,Arial,sans-serif ;">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia ipsum a nesciunt officia error beatae rem, possimus accusantium corporis similique eligendi veniam eveniet harum inventore nihil itaque iure eum adipisci.</p>
    `,
          'html'
        )
      );
    };
    importModule();
  }, []);

  function onSubmit(e) {
    e.preventDefault();
    console.log(edit);

    setShowLoader(true);

    axios({
      method: 'POST',
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/notification`,
      headers: {
        'x-auth-token': process.env.NEXT_PUBLIC_ADMIN_JWT
      },
      data: {
        user: user,
        email: email,
        message: `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
            </head>
            <body>
                <div style="max-width: 600px; margin:auto">
                    <div style="text-align:center; margin-bottom: 70px;">
                        <img style="width: 50%;" src="https://housing.designer-dev.com/image-10.png" alt="VIRTUZONE">
                    </div>
                    <hr>

${value.toString('html')}

                 
                </div>
                
                <footer style="max-width: 600px; margin:auto; text-align: center;">
                    <hr>
                    <div style="text-align:center; margin-bottom: 15px;">
                        <img style="width: 50%;" src="https://housing.designer-dev.com/image-10.png" alt="VIRTUZONE">
                    </div>

                            <div style="display: flex; justify-content:space-around; max-width:300px; margin: auto; gap:30px">
                        <div style="    display: flex;align-items: center;justify-content: center;">
                            <img style="width: 100%;" src="https://housing.designer-dev.com/App-Store-icon.png" alt="VIRTUZONE">
                        </div>
                        <div style="    display: flex;align-items: center;justify-content: center;">
                            <img style="width: 100%;" src="https://housing.designer-dev.com/Playstore-icon.png" alt="VIRTUZONE">
                        </div>
                        <div style="display: flex;align-items: center;justify-content: center;">
                            <img style="width: 100%;" src="https://housing.designer-dev.com/webicon.png" alt="VIRTUZONE">
                        </div>
                    </div>
                    <p style="font-size: 12px; color:#999;">580 California St., Suite 400,</p>
                    <p style="font-size: 12px; color:#999;">San Francisco, CA, 94104</p>
                    <p style="font-size: 12px; color:#999;">Unsubscribe   Privacy Policy   Terms of Service</p>
                    <p style="font-size: 12px; color:#999;">© 2022 Academia.</p>
        ​
                </footer>
            </body>
        </html>


`.toString()
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
