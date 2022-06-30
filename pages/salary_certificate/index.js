import { Button, Container, Grid, Typography } from '@mui/material';
import Head from 'next/head';
import { useState } from 'react';
import SidebarLayout from 'src/layouts/SidebarLayout';
import Modal from '../../src/components/modal';
import AddSalaryCertificate from '../../src/components/forms/add_salary_certificate';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import SalaryCertificateTable from '../../src/components/table/salaryCertificateTable';
import { useEffect } from 'react';
import axios from 'axios';
import DisplayImage from '../../src/components/displayImage/displayImage';
import ImageModal from '../../src/components/modal/imageModal';

function SalaryCertificate() {
  const [open, setOpen] = useState(false);
  const [allData, SetAllData] = useState([]);
  const [image, setImage] = useState(null);
  const [shouldUpdate, setShouldUpdate] = useState(null);

  useEffect(() => {
    setOpen(false);
    axios({
      method: 'GET',
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/salarycertificate`,
      headers: {
        'x-auth-token': process.env.NEXT_PUBLIC_ADMIN_JWT
      }
    }).then((res) => {
      SetAllData(res.data.salaryCertificate);
    });
  }, [shouldUpdate]);
  return (
    <>
      <Head>
        <title>Salary Ceritifcate - Virtuzone</title>
      </Head>

      <PageTitleWrapper>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h3" component="h3" gutterBottom>
              Salary Ceritifcate
            </Typography>
          </Grid>
          <Grid item>
            <Button
              onClick={() => setOpen(!open)}
              sx={{ mt: { xs: 2, md: 0 } }}
              variant="contained"
              startIcon={<AddTwoToneIcon fontSize="small" />}
            >
              Add Salary Ceritifcate
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
            <SalaryCertificateTable setImage={setImage} data={allData} />
            <Modal
              open={open}
              setOpen={setOpen}
              children={
                <AddSalaryCertificate
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

SalaryCertificate.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default SalaryCertificate;
