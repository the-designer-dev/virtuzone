import { Button, Container, Grid, Typography } from '@mui/material';
import Head from 'next/head';
import { useState } from 'react';
import SidebarLayout from 'src/layouts/SidebarLayout';
import Modal from '../../src/components/modal';
import AddConsultant from '../../src/components/forms/add_consultant';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import ConsultantsTable from '../../src/components/table/consultantTable';
import { useEffect } from 'react';
import axios from 'axios';
import DisplayImage from '../../src/components/displayImage/displayImage';
import ImageModal from '../../src/components/modal/imageModal';
import { useRouter } from 'next/router';

function Consultants() {
  const [open, setOpen] = useState(false);
  const [allData, SetAllData] = useState([]);
  const [image, setImage] = useState(null);
  const [shouldUpdate, setShouldUpdate] = useState(null);
  const router = useRouter();
  const [edit, setEdit] = useState(null);
  const [id, setId] = useState(null);
  const [user, setUser] = useState(null);
  const [data, setData] = useState(null);
  useEffect(() => {
    setOpen(false);
    setEdit(false);
    setData(null);

    axios({
      method: 'GET',
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/consultant`,
      headers: {
        'x-auth-token': process.env.NEXT_PUBLIC_ADMIN_JWT
      }
    }).then((res) => {
      SetAllData(res.data.consultant);
    });
  }, [shouldUpdate]);
  return (
    <>
      <Head>
        <title>Consultants - Virtuzone</title>
      </Head>

      <PageTitleWrapper>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h3" component="h3" gutterBottom>
              Consultants
            </Typography>
          </Grid>
          <Grid item>
            <Button
              onClick={() => setOpen(!open)}
              sx={{ mt: { xs: 2, md: 0 } }}
              variant="contained"
              startIcon={<AddTwoToneIcon fontSize="small" />}
            >
              Add Consultant
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
            <ConsultantsTable
              data={allData}
              setEdit={setEdit}
              setImage={setImage}
              setId={setUser}
              setData={setData}
              setShouldUpdate={setShouldUpdate}
              shouldUpdate={shouldUpdate}
              setOpen={setOpen}
            />
            <Modal
              open={open}
              setOpen={setOpen}
              setEdit={setEdit}
              setData={setData}
              edit={edit}
              children={
                <AddConsultant
                  setImage={setImage}
                  edit={edit}
                  comp={id}
                  id={user}
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

Consultants.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default Consultants;
