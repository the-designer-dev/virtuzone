import { Button, Container, Grid, Typography } from '@mui/material';
import Head from 'next/head';
import { useState } from 'react';
import SidebarLayout from 'src/layouts/SidebarLayout';
import Modal from '../../src/components/modal';
import AddClient from '../../src/components/forms/add_client';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import ClientTable from '../../src/components/table/clientTable';
import { useEffect } from 'react';
import axios from 'axios';

function Client() {
  const [open, setOpen] = useState(false);
  const [allData, SetAllData] = useState([]);
  const [shouldUpdate, setShouldUpdate] = useState(null);

  useEffect(() => {
    setOpen(false);
    axios({
      method: 'GET',
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/alluser`,
      headers: {
        'x-auth-token': process.env.NEXT_PUBLIC_ADMIN_JWT
      }
    }).then((res) => {
      console.log(res.data);
      SetAllData(res.data.user);
    });
  }, [shouldUpdate]);
  return (
    <>
      <Head>
        <title>Client - Virtuzone</title>
      </Head>

      <PageTitleWrapper>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item xs={12}>
            <Typography variant="h3" component="h3" gutterBottom>
              Client
            </Typography>
          </Grid>
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
            <ClientTable
              data={allData}
              buttonName={'View/Add Company'}
              buttonURL={'visa'}
              buttonPurpose={'View or Add companies against this user'}
            />
            <Modal
              open={open}
              setOpen={setOpen}
              children={
                <AddClient
                  shouldUpdate={shouldUpdate}
                  setShouldUpdate={setShouldUpdate}
                />
              }
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

Client.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default Client;
