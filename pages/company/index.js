import { Button, Container, Grid, Typography } from '@mui/material';
import Head from 'next/head';
import { useState } from 'react';
import SidebarLayout from 'src/layouts/SidebarLayout';
import Modal from '../../src/components/modal';
import AddCompany from '../../src/components/forms/add_company';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import CompanyTable from '../../src/components/table/companyTable';
import { useEffect } from 'react';
import axios from 'axios';
import DisplayImage from '../../src/components/displayImage/displayImage';
import ImageModal from '../../src/components/modal/imageModal';
import { useRouter } from 'next/router';

function Company() {
  const [open, setOpen] = useState(false);
  const [allData, SetAllData] = useState([]);
  const [image, setImage] = useState(null);
  const [imageTitle, setImageTitle] = useState(null);
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
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/company`,
      headers: {
        'x-auth-token': process.env.NEXT_PUBLIC_ADMIN_JWT
      }
    }).then((res) => {
      SetAllData(res.data.company);
    });
  }, [shouldUpdate]);
  return (
    <>
      <Head>
        <title>Company - Virtuzone</title>
      </Head>

      <PageTitleWrapper>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h3" component="h3" gutterBottom>
              Company
            </Typography>
          </Grid>
          <Grid item>
            {/* <Button
              onClick={() => setOpen(!open)}
              sx={{ mt: { xs: 2, md: 0 } }}
              variant="contained"
              startIcon={<AddTwoToneIcon fontSize="small" />}
            >
              Add Company
            </Button> */}
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
            <CompanyTable
              data={allData}
              setEdit={setEdit}
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
                <AddCompany
                  setImage={setImage}
                  setImageTitle={setImageTitle}
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
              setImageTitle={setImageTitle}
              children={<DisplayImage image={image} title={imageTitle} />}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

Company.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default Company;
