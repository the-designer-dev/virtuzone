import { Button, Container, Grid, Typography } from '@mui/material';
import Head from 'next/head';
import { useState } from 'react';
import SidebarLayout from 'src/layouts/SidebarLayout';
import Modal from '../../src/components/modal';
import AddLicense from '../../src/components/forms/add_license';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import TradeLicenseTable from '../../src/components/table/tradeLicenseTable';
import { useEffect } from 'react';
import axios from 'axios';

function TradeLicense() {
  const [open, setOpen] = useState(false);
  const [allLicenses, SetAllLicenses] = useState([]);
  useEffect(() => {
    axios({
      method: 'GET',
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/gettradelicense`,
      headers: {
        'x-auth-token': process.env.NEXT_PUBLIC_ADMIN_JWT
      }
    }).then((res) => SetAllLicenses(res.data.tradeLicense));
  }, []);
  return (
    <>
      <Head>
        <title>Add License - Virtuzone</title>
      </Head>

      <PageTitleWrapper>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h3" component="h3" gutterBottom>
              Trade Licenses
            </Typography>
          </Grid>
          <Grid item>
            <Button
              onClick={() => setOpen(!open)}
              sx={{ mt: { xs: 2, md: 0 } }}
              variant="contained"
              startIcon={<AddTwoToneIcon fontSize="small" />}
            >
              Add Trade License
            </Button>
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
            <TradeLicenseTable data={allLicenses} />
            <Modal open={open} setOpen={setOpen} children={<AddLicense />} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

TradeLicense.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default TradeLicense;
