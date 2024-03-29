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
import ImageModal from '../../src/components/modal/imageModal';
import DisplayImage from '../../src/components/displayImage/displayImage';

function OfficeLeaseAgreement() {
  const [open, setOpen] = useState(false);
  const [allAgreements, SetAllAgreements] = useState([]);
  const [image, setImage] = useState(null);
  const [edit, setEdit] = useState(null);
  const [data, setData] = useState(null);
  const [id, setId] = useState(null);
  const [shouldUpdate, setShouldUpdate] = useState(null);

  useEffect(() => {
    setOpen(false);
    setEdit(false);
    setData(null);
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
  }, [shouldUpdate]);
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
            <OfficeLeaseAgreementTable
              setImage={setImage}
              setEdit={setEdit}
              setId={setId}
              setData={setData}
              data={allAgreements}
            />
            <Modal
              open={open}
              setOpen={setOpen}
              setEdit={setEdit}
              setData={setData}
              edit={edit}
              children={
                <AddOfficeLease
                  edit={edit}
                  id={id}
                  data={data}
                  shouldUpdate={shouldUpdate}
                  setShouldUpdate={setShouldUpdate}
                />
              }
            />
            <ImageModal
              image={image}
              setImage={setImage}
              children={<DisplayImage image={image} />}
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
