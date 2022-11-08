import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import Head from 'next/head';
import countries from '../../data/countries.json';
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
  Typography,
  Select,
  CircularProgress
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ReactFlagsSelect from 'react-flags-select';
import dynamic from 'next/dynamic';
import ModalNoClose from '../modal/modalNoClose';
import SuccessModal from '../successBox';
import FailureModal from '../failureBox';
const RichTextEditor = dynamic(() => import('react-rte'), { ssr: false });

function AddConsultant({
  setImage,
  shouldUpdate,
  setShouldUpdate,
  edit,
  id,
  data
}) {
  const [ShowLoader, setShowLoader] = useState(false);
  const [ShowSuccessModal, setShowSuccessModal] = useState(false);
  const [ShowFailureModal, setShowFailureModal] = useState(false);
  const [firstName, setFirstName] = useState(data ? data.firstName : null);
  const [lastName, setLastName] = useState(data ? data.lastName : null);
  const [file, setFile] = useState(null);
  const [language, setlanguage] = useState(data ? data.language : null);

  const [notify, setNotify] = useState(false);

  const [value, setValue] = useState(null);

  const handleOnChange = (value) => {
    setValue(value);
    if (event.onChange) {
      onChange(value.toString('html'));
    }
    setMessage(value.toString('html'));
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

    const form = new FormData();

    form.append('picture', file);
    form.append('firstName', firstName);
    form.append('lastName', lastName);
    form.append('language', language);

    if (edit !== true) {
      setShowLoader(true);
      axios({
        method: 'POST',
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/consultant`,
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
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/consultant?id=${id}`,
        headers: {
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
        <title>Add Consultant - Virtuzone</title>
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
              <CardHeader title="Add Consultant" />
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
                        setFirstName(e.target.value);
                      }}
                      value={firstName}
                      id="outlined-required"
                      label="First Name"
                      placeholder="First Name"
                    />
                    <TextField
                      required
                      id="outlined-read-only"
                      label="Last Name"
                      placeholder="Last Name"
                      value={lastName}
                      onChange={(e) => {
                        setLastName(e.target.value);
                      }}
                    />

                    <TextField
                      required
                      id="outlined-read-only"
                      label="Designation"
                      placeholder="Designation"
                      value={language}
                      onChange={(e) => {
                        setlanguage(e.target.value);
                      }}
                    />

                    <TextField
                      required
                      type={'file'}
                      id="outlined-read-only"
                      label="Picture"
                      placeholder="Picture"
                      InputLabelProps={{
                        shrink: true
                      }}
                      onChange={(e) => setFile(e.target.files[0])}
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

export default AddConsultant;
