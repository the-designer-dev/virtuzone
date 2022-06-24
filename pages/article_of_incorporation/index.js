import { Button, Container, Grid, Typography } from '@mui/material';
import Head from 'next/head';
import { useState } from 'react';
import SidebarLayout from 'src/layouts/SidebarLayout';
import Modal from '../../src/components/modal';
import AddArticleOfIncorporation from '../../src/components/forms/add_article_of_incorporation';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import ArticleOfIncorporationTable from '../../src/components/table/articleOfIncorporationTable';
import { useEffect } from 'react';
import axios from 'axios';

function ArticleOfIncorporation() {
  const [open, setOpen] = useState(false);
  const [allData, SetAllData] = useState([]);
  useEffect(() => {
    axios({
      method: 'GET',
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/articlesofincorporation`,
      headers: {
        'x-auth-token': process.env.NEXT_PUBLIC_ADMIN_JWT
      }
    }).then((res) => {
      console.log(res.data);
      SetAllData(res.data.agreements);
    });
  }, []);
  return (
    <>
      <Head>
        <title>Article of Incorporation - Virtuzone</title>
      </Head>

      <PageTitleWrapper>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h3" component="h3" gutterBottom>
              Article of Incorporation
            </Typography>
          </Grid>
          <Grid item>
            <Button
              onClick={() => setOpen(!open)}
              sx={{ mt: { xs: 2, md: 0 } }}
              variant="contained"
              startIcon={<AddTwoToneIcon fontSize="small" />}
            >
              Add Article of Incorporation
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
            <ArticleOfIncorporationTable data={allData} />
            <Modal
              open={open}
              setOpen={setOpen}
              children={<AddArticleOfIncorporation />}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

ArticleOfIncorporation.getLayout = (page) => (
  <SidebarLayout>{page}</SidebarLayout>
);

export default ArticleOfIncorporation;
