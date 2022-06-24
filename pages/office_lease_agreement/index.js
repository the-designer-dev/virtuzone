import { Button, Container, Grid, Typography } from '@mui/material';
import Head from 'next/head';
import { useState } from 'react';
import SidebarLayout from 'src/layouts/SidebarLayout';
import Modal from '../../src/components/modal';
import AddOfficeLease from '../../src/components/forms/add_office_lease';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import OfficeLeaseAgreementTable from '../../src/components/table/officeLeaseAgreementTable';
import { useEffect } from 'react';
import axios from 'axios';

function OfficeLeaseAgreement() {
  const [open, setOpen] = useState(false);
  const [allAgreements, SetAllAgreements] = useState([]);
  useEffect(() => {
    axios({
      method: 'GET',
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/officeleaseagreements`,
      headers: {
        'x-auth-token': process.env.NEXT_PUBLIC_ADMIN_JWT
      }
    }).then((res) => {
      console.log(res.data);
      SetAllAgreements(res.data.agreements);
    });
  }, []);
  return (
    <>
      <Head>
        <title>Office Lease Agreement - Virtuzone</title>
      </Head>

      <PageTitleWrapper>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h3" component="h3" gutterBottom>
              Office Lease Agreement
            </Typography>
          </Grid>
          <Grid item>
            <Button
              onClick={() => setOpen(!open)}
              sx={{ mt: { xs: 2, md: 0 } }}
              variant="contained"
              startIcon={<AddTwoToneIcon fontSize="small" />}
            >
              Add Office Lease Agreement
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
            <OfficeLeaseAgreementTable data={allAgreements} />
            <Modal
              open={open}
              setOpen={setOpen}
              children={<AddOfficeLease />}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

OfficeLeaseAgreement.getLayout = (page) => (
  <SidebarLayout>{page}</SidebarLayout>
);

export default OfficeLeaseAgreement;
