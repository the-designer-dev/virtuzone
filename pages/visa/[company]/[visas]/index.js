import { Button, Container, Grid, Typography } from '@mui/material';
import Head from 'next/head';
import { useState } from 'react';
import SidebarLayout from 'src/layouts/SidebarLayout';
import Modal from '../../../../src/components/modal';
import AddVisa from '../../../../src/components/forms/add_visa';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import VisaTable from '../../../../src/components/table/visaTable';
import { useEffect } from 'react';
import axios from 'axios';
import ImageModal from '../../../../src/components/modal/imageModal';
import DisplayImage from '../../../../src/components/displayImage/displayImage';

function Visa() {
  const [open, setOpen] = useState(false);
  const [allData, SetAllData] = useState([]);
  const [image, setImage] = useState(null);
  const [shouldUpdate, setShouldUpdate] = useState(null);

  useEffect(() => {
    setOpen(false);
    axios({
      method: 'GET',
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/visa`,
      headers: {
        'x-auth-token': process.env.NEXT_PUBLIC_ADMIN_JWT
      }
    }).then((res) => {
      SetAllData(res.data.visa);
    });
  }, [shouldUpdate]);
  return (
    <>
      <Head>
        <title>Visa - Virtuzone</title>
      </Head>

      <PageTitleWrapper>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h3" component="h3" gutterBottom>
              Visa
            </Typography>
          </Grid>
          <Grid item>
            <Button
              onClick={() => setOpen(!open)}
              sx={{ mt: { xs: 2, md: 0 } }}
              variant="contained"
              startIcon={<AddTwoToneIcon fontSize="small" />}
            >
              Add Visa
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
            <VisaTable setImage={setImage} data={allData} />
            <Modal
              open={open}
              setOpen={setOpen}
              children={
                <AddVisa
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

Visa.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default Visa;
