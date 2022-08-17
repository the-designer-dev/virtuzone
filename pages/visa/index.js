import { Button, Container, Grid, Typography } from '@mui/material';
import Head from 'next/head';
import { useState } from 'react';
import SidebarLayout from 'src/layouts/SidebarLayout';
import Modal from 'src/components/modal';
import AddVisa from 'src/components/forms/add_visa';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import CompanyTable from 'src/components/table/companyTable';
import { useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

function Company() {
  const [allData, SetAllData] = useState([]);
  const [image, setImage] = useState(null);
  const [shouldUpdate, setShouldUpdate] = useState(null);
  const [company, setCompany] = useState(null);

  const [edit, setEdit] = useState(null);
  const [id, setId] = useState(null);
  const [data, setData] = useState(null);
  const [open, setOpen] = useState(false);

  const router = useRouter();
  useEffect(() => {
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
          <Grid item xs={12}>
            <Typography variant="h3" component="h3" gutterBottom>
              Company
            </Typography>
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
              setCompany={setCompany}
              buttonName={'View Visas'}
              buttonURL={'visa/visas'}
              buttonPurpose={'View employees against this company'}
              buttonName2={'Add Visa'}
              buttonPurpose2={'Add Visa in this company'}
              setOpen={setOpen}
              setEdit={setEdit}
              setId={setId}
              actions={true}
              setData={setData}
            />

            <Modal
              open={open}
              setOpen={setOpen}
              setEdit={setEdit}
              setData={setData}
              edit={edit}
              children={
                <AddVisa
                  edit={edit}
                  data={data}
                  company={company}
                  employee={id}
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
