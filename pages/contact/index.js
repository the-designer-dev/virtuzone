import { Button, Container, Grid, Typography } from '@mui/material';
import Head from 'next/head';
import { useState } from 'react';
import SidebarLayout from 'src/layouts/SidebarLayout';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { useEffect } from 'react';
import AddContact from '../../src/components/forms/add_contact';
import axios from 'axios';

function Client() {
  const [open, setOpen] = useState(false);
  const [allData, SetAllData] = useState([]);
  const [shouldUpdate, setShouldUpdate] = useState(false);
  const [edit, setEdit] = useState(null);
  const [id, setId] = useState(null);
  const [data, setData] = useState(null);
  useEffect(() => {
    setOpen(false);
    setEdit(false);
    axios({
      method: 'GET',
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/contact`,
      headers: {
        'x-auth-token': process.env.NEXT_PUBLIC_ADMIN_JWT
      }
    }).then((res) => {
      SetAllData(res.data.contact);
      setData(res.data.contact.length > 0 ? res.data.contact[0] : null);
    });
  }, [shouldUpdate]);
  return (
    <>
      <Head>
        <title>Contact - Virtuzone</title>
      </Head>

      <PageTitleWrapper>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h3" component="h3" gutterBottom>
              Contact
            </Typography>
          </Grid>
          {/* <Grid item>
            <Button
              onClick={() => setOpen(!open)}
              sx={{ mt: { xs: 2, md: 0 } }}
              variant="contained"
              startIcon={<AddTwoToneIcon fontSize="small" />}
            >
              Add Client
            </Button>
          </Grid> */}
        </Grid>
      </PageTitleWrapper>
      <Container sx={{ mt: 3 }} maxWidth="xl">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <AddContact data={data} />
            {/* <ClientTable
              data={allData}
              buttonName={'View/Add Company'}
              buttonURL={'company'}
              buttonPurpose={'View or Add companies against this user'}
              setEdit={setEdit}
              setId={setId}
              setData={setData}
              setShouldUpdate={setShouldUpdate}
              shouldUpdate={shouldUpdate}
            />
            <Modal
              open={open}
              setOpen={setOpen}
              setEdit={setEdit}
              setData={setData}
              edit={edit}
              children={
                <AddClient
                  edit={edit}
                  id={id}
                  data={data}
                  shouldUpdate={shouldUpdate}
                  setShouldUpdate={setShouldUpdate}
                />
              }
            /> */}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

Client.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default Client;
