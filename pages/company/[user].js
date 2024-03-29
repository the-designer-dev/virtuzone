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
  const [shouldUpdate, setShouldUpdate] = useState(null);
  const router = useRouter();
  const { user } = router.query;
  const [edit, setEdit] = useState(null);
  const [id, setId] = useState(null);
  const [data, setData] = useState(null);
  useEffect(() => {
    setOpen(false);
    setEdit(false);
    setData(null);
    if (user !== undefined) {
      axios({
        method: 'GET',
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/company?owner=${user}`,
        headers: {
          'x-auth-token': process.env.NEXT_PUBLIC_ADMIN_JWT
        }
      }).then((res) => {
        SetAllData(res.data.company);
      });
    }
  }, [user, shouldUpdate]);
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
            <Button
              onClick={() => setOpen(!open)}
              sx={{ mt: { xs: 2, md: 0 } }}
              variant="contained"
              startIcon={<AddTwoToneIcon fontSize="small" />}
            >
              Add Company
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
            <CompanyTable
              setImage={setImage}
              data={allData}
              buttonName={'View/Add Employees'}
              buttonURL={'employees/'}
              buttonPurpose={'View or Add employees against this company'}
              setEdit={setEdit}
              setId={setId}
              setData={setData}
            />
            <Modal
              open={open}
              setOpen={setOpen}
              setEdit={setEdit}
              setData={setData}
              edit={edit}
              children={
                <AddCompany
                  edit={edit}
                  id={user}
                  comp={id}
                  data={data}
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

Company.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default Company;
