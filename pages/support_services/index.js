import { Button, Container, Grid, Typography } from '@mui/material';
import Head from 'next/head';
import { useState } from 'react';
import SidebarLayout from 'src/layouts/SidebarLayout';
import Modal from '../../src/components/modal';
import AddSupportService from '../../src/components/forms/add_support_service';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import SupportServicesTable from '../../src/components/table/supportServicesTable';
import { useEffect } from 'react';
import axios from 'axios';
import DisplayImage from '../../src/components/displayImage/displayImage';
import ImageModal from '../../src/components/modal/imageModal';

function SupportServices() {
  const [open, setOpen] = useState(false);
  const [allData, SetAllData] = useState([]);
  const [shouldUpdate, setShouldUpdate] = useState(false);
  const [edit, setEdit] = useState(null);
  const [id, setId] = useState(null);
  const [data, setData] = useState(null);
  const [image, setImage] = useState(null);
  const [imageTitle, setImageTitle] = useState(null);
  useEffect(() => {
    setOpen(false);
    setEdit(false);
    setData(null);
    axios({
      method: 'GET',
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/supportServices`,
      headers: {
        'x-auth-token': process.env.NEXT_PUBLIC_ADMIN_JWT
      }
    }).then((res) => {
      console.log(res.data);
      SetAllData(res.data.supportServices);
    });
  }, [shouldUpdate]);
  return (
    <>
      <Head>
        <title>Client - Virtuzone</title>
      </Head>

      <PageTitleWrapper>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h3" component="h3" gutterBottom>
              All Support Services
            </Typography>
          </Grid>
          <Grid item>
            <Button
              onClick={() => setOpen(!open)}
              sx={{ mt: { xs: 2, md: 0 } }}
              variant="contained"
              startIcon={<AddTwoToneIcon fontSize="small" />}
            >
              Add Support Service
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
            <SupportServicesTable
              data={allData}
              buttonName={'View Requests'}
              buttonURL={'company'}
              buttonPurpose={'View requests for this support service'}
              setEdit={setEdit}
              setId={setId}
              setImageTitle={setImageTitle}
              setData={setData}
              setImage={setImage}
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
                <AddSupportService
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
              setImageTitle={setImageTitle}
              children={<DisplayImage image={image} title={imageTitle} />}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

SupportServices.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default SupportServices;
