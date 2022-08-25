import { Button, Container, Grid, Typography } from '@mui/material';
import Head from 'next/head';
import { useState } from 'react';
import SidebarLayout from 'src/layouts/SidebarLayout';
import Modal from 'src/components/modal';
import AddVisa from 'src/components/forms/add_visa';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import VisaTable from 'src/components/table/visaTable';
import { useEffect } from 'react';
import axios from 'axios';
import ImageModal from 'src/components/modal/imageModal';
import DisplayImage from 'src/components/displayImage/displayImage';
import { useRouter } from 'next/router';
function Visa() {
  const [imageTitle, setImageTitle] = useState(null);
  const [open, setOpen] = useState(false);
  const [allData, SetAllData] = useState([]);
  const [image, setImage] = useState(null);
  const [shouldUpdate, setShouldUpdate] = useState(null);
  const [edit, setEdit] = useState(false);
  const [visaId, setId] = useState(null);
  const [data, setData] = useState(null);
  const router = useRouter();
  const { company } = router.query;
  console.log(edit);
  useEffect(() => {
    setOpen(false);
    setEdit(false);
    setData(null);
    if (company) {
      axios({
        method: 'GET',
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/visa?company=${company}`,
        headers: {
          'x-auth-token': process.env.NEXT_PUBLIC_ADMIN_JWT
        }
      }).then((res) => {
        SetAllData(res.data.visa);
      });
    }
  }, [company, shouldUpdate]);
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
          {/* <Grid item>
            <Button
              onClick={() => setOpen(!open)}
              sx={{ mt: { xs: 2, md: 0 } }}
              variant="contained"
              startIcon={<AddTwoToneIcon fontSize="small" />}
            >
              Add Visa
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
            <VisaTable
              setImage={setImage}
              setImageTitle={setImageTitle}
              data={allData}
              setEdit={setEdit}
              setId={setId}
              setData={setData}
              shouldUpdate={shouldUpdate}
              setShouldUpdate={setShouldUpdate}
            />
            <Modal
              open={open}
              setOpen={setOpen}
              setEdit={setEdit}
              setData={setData}
              edit={edit}
              children={
                <AddVisa
                  company={company}
                  edit={edit}
                  data={data}
                  setOpen={setOpen}
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

Visa.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default Visa;
