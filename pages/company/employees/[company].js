import { Button, Container, Grid, Typography } from '@mui/material';
import Head from 'next/head';
import { useState } from 'react';
import SidebarLayout from 'src/layouts/SidebarLayout';
import Modal from '../../../src/components/modal';
import AddEmployee from '../../../src/components/forms/add_employee';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import EmployeesTable from '../../../src/components/table/employeesTable';
import { useEffect } from 'react';
import axios from 'axios';
import DisplayImage from '../../../src/components/displayImage/displayImage';
import ImageModal from '../../../src/components/modal/imageModal';
import { useRouter } from 'next/router';

function Employees() {
  const [open, setOpen] = useState(false);
  const [allData, SetAllData] = useState([]);
  const [image, setImage] = useState(null);
  const [shouldUpdate, setShouldUpdate] = useState(null);
  const [edit, setEdit] = useState(null);
  const [id, setId] = useState(null);
  const [data, setData] = useState(null);
  const router = useRouter();
  const { company } = router.query;
  useEffect(() => {
    setOpen(false);
    setEdit(false);
    setData(null);
    if (company !== undefined) {
      axios({
        method: 'GET',
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/employee?company=${company}`,
        headers: {
          'x-auth-token': process.env.NEXT_PUBLIC_ADMIN_JWT
        }
      }).then((res) => {
        SetAllData(res.data.employee);
      });
    }
  }, [company, shouldUpdate]);
  return (
    <>
      <Head>
        <title>Employees - Virtuzone</title>
      </Head>

      <PageTitleWrapper>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h3" component="h3" gutterBottom>
              Employees - {allData.length > 0 ? allData[0].company.name : ''}
            </Typography>
          </Grid>
          <Grid item>
            <Button
              onClick={() => setOpen(!open)}
              sx={{ mt: { xs: 2, md: 0 } }}
              variant="contained"
              startIcon={<AddTwoToneIcon fontSize="small" />}
            >
              Add Employee
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
            <EmployeesTable
              setImage={setImage}
              data={allData}
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
                <AddEmployee
                  edit={edit}
                  id={id}
                  data={data}
                  comp={company}
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

Employees.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default Employees;
