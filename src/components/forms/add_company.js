import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import Head from 'next/head';
import {
  Grid,
  Container,
  Card,
  CardHeader,
  Divider,
  CardContent,
  Box,
  TextField,
  Typography,
  Button,
  MenuItem,
  FormControlLabel,
  Checkbox,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Tooltip,
  IconButton,
  Select
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import dynamic from 'next/dynamic';
import countries from '../../data/countries.json';
import AddShareHolder from './add_shareholder';
import Modal from '../../components/modal';
import moment from 'moment';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
const RichTextEditor = dynamic(() => import('react-rte'), { ssr: false });

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`
  };
}

function AddCompany({ comp, shouldUpdate, setShouldUpdate, edit, id, data }) {
  const [open, setOpen] = useState(false);
  const [shareholderEdit, setShareholderEdit] = useState(null);
  const [shareholderData, setShareholderData] = useState(null);

  const [firstName, setFirstName] = useState(
    data ? data.owner.firstName : null
  );
  const [lastName, setLastName] = useState(data ? data.owner.lastName : null);
  const [name, setName] = useState(data ? data.name : null);
  const [licenseNo, setLicenseNo] = useState(data ? data.licenseNo : null);
  const [licenseCode, setLicenseCode] = useState(
    data ? data.licenseCode : null
  );
  const [judiciaries, setJudiciaries] = useState(null);
  const [judiciary, setJudiciary] = useState(data ? data.judiciary?._id : null);
  const [establishmentDate, setEstablishmentDate] = useState(
    data ? data.establishmentDate : null
  );
  const [issueDate, setIssueDate] = useState(data ? data.issueDate : null);
  const [expiryDate, setExpiryDate] = useState(data ? data.expiryDate : null);
  const [activities, setActivities] = useState(null);
  const [activity, setActivity] = useState(
    data ? data.activities.map((el) => el._id) : null
  );

  const [issueDateTradeLicense, setIssueDateTradeLicense] = useState(null);
  const [expiryDateTradeLicense, setExpiryDateTradeLicense] = useState(null);
  const [establishmentDateTradeLicense, setEstablishmentDateTradeLicense] =
    useState(null);
  const [license, setLicense] = useState(null);
  const [code, setCode] = useState(null);
  const [tradeLicensejudiciary, setTradeLicensejudiciary] = useState(null);

  const [establishmentCard, setEstablishmentCard] = useState(
    data ? data.establishmentCard : []
  );
  const [tradeLicense, setTradeLicense] = useState(
    data ? data.tradeLicense : []
  );
  const [message, setMessage] = useState(null);
  const [shareHolders, setShareHolders] = useState(
    data ? data.shareHolder : []
  );

  const [issueDateOfficeLease, setIssueDateOfficeLease] = useState(null);
  const [expiryDateOfficeLease, setExpiryDateOfficeLease] = useState(null);
  const [officeLease, setOfficeLease] = useState(data ? data.officeLease : []);
  const [articleOfIncorporation, setArticleOfIncorporation] = useState(
    data ? data.articleOfIncorporation : []
  );
  const [incorporationCertificate, setIncorporationCertificate] = useState(
    data ? data.incorporationCertificate : []
  );
  const [shareCertificate, setShareCertificate] = useState(
    data ? data.shareCertificate : null
  );
  const [immigrationCard, setImmigrationCard] = useState(
    data ? data.immigrationCard : null
  );

  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [value, setValue] = useState(null);

  const handleOnChange = (value) => {
    setValue(value);
    if (event.onChange) {
      onChange(value.toString('html'));
    }
    setMessage(value.toString('html'));
  };

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setTabValue(index);
  };

  useEffect(() => {
    console.log(data);
    if (data.judiciary) {
      axios({
        method: 'GET',
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/activity?id=${data.judiciary?.id}`,
        headers: {
          'x-auth-token': process.env.NEXT_PUBLIC_ADMIN_JWT
        }
      })
        .then((res) => {
          setActivities(res.data.activity);
        })
        .catch((err) => {
          setActivity(null);
        });
    }
    if (id !== undefined) {
      axios({
        method: 'GET',
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/user?id=${id}`,
        headers: {
          'x-auth-token': process.env.NEXT_PUBLIC_ADMIN_JWT
        }
      }).then((res) => {
        setFirstName(res.data.user.firstName);
        setLastName(res.data.user.lastName);
      });
    }
    axios({
      method: 'GET',
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/emirates`,
      headers: {
        'x-auth-token': process.env.NEXT_PUBLIC_ADMIN_JWT
      }
    }).then((res) => {
      setJudiciaries(res.data.emirates);
    });

    const importModule = async () => {
      const mod = await import('react-rte');
      setValue(mod.createEmptyValue());
    };
    importModule();
  }, [id]);

  function onSubmit(e) {
    e.preventDefault();
    console.log(activity);
    const form = new FormData();
    form.append('owner', id);
    form.append('name', name);
    form.append('licenseNo', licenseNo);
    form.append('licenseCode', licenseCode);
    form.append('judiciary', judiciary);
    form.append('establishmentDate', establishmentDate);
    form.append('issueDate', issueDate);
    form.append('expiryDate', expiryDate);
    form.append('activities', activity);
    form.append('code', code);
    form.append('dateOfIssue', issueDate);
    tradeLicense.length > 0 &&
      tradeLicense[0] instanceof File &&
      form.append('tradelicense', tradeLicense);
    officeLease.length > 0 &&
      officeLease[0] instanceof File &&
      form.append('officeLease', officeLease);
    shareCertificate.length > 0 &&
      shareCertificate[0] instanceof File &&
      form.append('shareCertificate', shareCertificate);
    articleOfIncorporation.length > 0 &&
      articleOfIncorporation[0] instanceof File &&
      form.append('articleOfIncorporation', articleOfIncorporation);
    incorporationCertificate.length > 0 &&
      incorporationCertificate[0] instanceof File &&
      form.append('incorporationCertificate', incorporationCertificate);
    establishmentCard.length > 0 &&
      establishmentCard[0] instanceof File &&
      form.append('establishmentCard', establishmentCard);
    form.append('officeLeaseIssue', issueDate);
    form.append('officeLeaseExpiry', expiryDate);
    immigrationCard.length > 0 &&
      immigrationCard[0] instanceof File &&
      form.append('immigrationCard', immigrationCard);
    form.append('shareHolder', JSON.stringify(shareHolders));
    form.append('message', message);

    if (edit !== true) {
      axios({
        method: 'POST',
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/company`,
        headers: {
          'Content-Type': 'multipart/form-data',

          'x-auth-token': process.env.NEXT_PUBLIC_ADMIN_JWT
        },
        data: form
      }).then((res) => {
        if (res.status === 200) {
          setShouldUpdate(!shouldUpdate);
        }
      });
    } else {
      console.log(data);
      axios({
        method: 'PUT',
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/company?id=${data._id}`,
        headers: {
          'x-auth-token': process.env.NEXT_PUBLIC_ADMIN_JWT
        },
        data: form
      }).then((res) => {
        if (res.status === 200) {
          setShouldUpdate(!shouldUpdate);
        }
      });
    }
  }

  function onJudiciaryChange(e) {
    setJudiciary(e.target.value);
    axios({
      method: 'GET',
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/activity?id=${e.target.value}`,
      headers: {
        'x-auth-token': process.env.NEXT_PUBLIC_ADMIN_JWT
      }
    })
      .then((res) => {
        setActivity([]);
        setActivities(res.data.activity);
      })
      .catch((err) => {
        setActivities([]);
        setActivity(null);
      });
  }
  return (
    <>
      <Head>
        <title>Add Company - Virtuzone</title>
      </Head>

      <Container sx={{ mt: 2 }} maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <Card>
              <CardHeader title="Add Company" />
              <Divider />
              <Tabs
                variant={'scrollable'}
                scrollButtons
                allowScrollButtonsMobile
                sx={{
                  justifyContent: 'center',
                  margin: '20px',
                  '& .MuiTabs-scroller': { flexGrow: '0' }
                }}
                value={tabValue}
                onChange={handleChange}
                textColor="inherit"
                indicatorColor="primary"
              >
                <Tab label="Trade License Details" {...a11yProps(0)} />
                <Tab label="Establishment Card" {...a11yProps(1)} />
                <Tab label="Office Lease Agreement" {...a11yProps(2)} />
                <Tab label="Article of Incorporation" {...a11yProps(3)} />
                <Tab label="Incorporation Certificate" {...a11yProps(4)} />
                <Tab label="Share Certificate" {...a11yProps(5)} />
                <Tab label="Immigration Card" {...a11yProps(6)} />
                <Tab label="Share Holders" {...a11yProps(7)} />
              </Tabs>

              <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={tabValue}
                onChangeIndex={handleChangeIndex}
              >
                <TabPanel value={tabValue} index={0} dir={theme.direction}>
                  <CardContent>
                    <Box
                      onSubmit={(e) => onSubmit(e)}
                      component="form"
                      sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' }
                      }}
                      noValidate
                      autoComplete="off"
                    >
                      <div>
                        <TextField
                          required
                          value={`${firstName} ${lastName}`}
                          id="outlined-required"
                          label="PIC"
                          placeholder="PIC"
                          InputProps={{
                            readOnly: true
                          }}
                          InputLabelProps={{
                            shrink: true
                          }}
                        />

                        <TextField
                          required
                          id="outlined-read-only"
                          label="Name"
                          placeholder="Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />

                        <TextField
                          required
                          id="outlined-read-only"
                          label="License No"
                          placeholder="License No"
                          value={licenseNo}
                          onChange={(e) => setLicenseNo(e.target.value)}
                        />
                        <TextField
                          required
                          id="outlined-read-only"
                          label="License Code"
                          placeholder="License Code"
                          value={licenseCode}
                          onChange={(e) => setLicenseCode(e.target.value)}
                        />
                        <TextField
                          required
                          id="outlined-read-only"
                          select
                          label="Jurisdiction"
                          placeholder="Jurisdiction"
                          value={judiciary}
                          onChange={(e) => onJudiciaryChange(e)}
                        >
                          {judiciaries &&
                            judiciaries.map((el) => (
                              <MenuItem value={el._id} key={el.name}>
                                {el.name}
                              </MenuItem>
                            ))}
                        </TextField>
                        <DatePicker
                          label="Establishment Date"
                          value={establishmentDate}
                          onChange={(newValue) => {
                            setEstablishmentDate(newValue);
                          }}
                          renderInput={(params) => <TextField {...params} />}
                        />
                        <DatePicker
                          label="Date of issue"
                          value={issueDate}
                          onChange={(newValue) => {
                            setIssueDate(newValue);
                          }}
                          renderInput={(params) => <TextField {...params} />}
                        />
                        <DatePicker
                          label="Expiry Date"
                          value={expiryDate}
                          onChange={(newValue) => {
                            setExpiryDate(newValue);
                          }}
                          renderInput={(params) => <TextField {...params} />}
                        />
                        <Select
                          required
                          select
                          multiple
                          id="outlined-read-only"
                          // label="Activities"
                          placeholder="Activities"
                          input={<TextField label="Activities" />}
                          value={activity}
                          onChange={(e) => {
                            console.log(e.target.value);
                            setActivity(
                              typeof e.target.value === 'string'
                                ? e.target.value.split(',')
                                : e.target.value
                            );
                          }}
                        >
                          {activities &&
                            activities.map((el) => (
                              <MenuItem value={el._id} key={el.name}>
                                {el.name}
                              </MenuItem>
                            ))}
                        </Select>
                        <TextField
                          id="outlined-search"
                          label="Scan File"
                          onChange={(e) => {
                            // console.log(e.target.files[0]);
                            setTradeLicense(e.target.files);
                          }}
                          InputLabelProps={{
                            shrink: true
                          }}
                          type={'file'}
                        />
                        {console.log(data)}
                        <Tooltip title={'View File'} arrow>
                          <Button
                            onClick={() => {
                              setImage(data?.tradeLicense);
                              setImageOpen(true);
                            }}
                            sx={{ margin: 1 }}
                            disabled={data?.tradeLicense.length === 0}
                            variant="contained"
                          >
                            View File
                          </Button>
                        </Tooltip>
                        <Box
                          sx={{
                            margin: '9px',
                            display: 'flex',
                            justifyContent: 'flex-end'
                          }}
                          component={'div'}
                        ></Box>
                      </div>
                    </Box>
                  </CardContent>
                </TabPanel>
                <TabPanel value={tabValue} index={1} dir={theme.direction}>
                  <CardContent>
                    <Box
                      onSubmit={(e) => onSubmit(e)}
                      component="form"
                      sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' }
                      }}
                      noValidate
                      autoComplete="off"
                    >
                      <div>
                        <TextField
                          id="outlined-password-input"
                          label="License No"
                          onChange={(e) => setLicense(e.target.value)}
                          value={licenseNo}
                          InputProps={{
                            readOnly: true
                          }}
                          placeholder="License Number"
                        />
                        <TextField
                          id="outlined-read-only-input"
                          label="Code"
                          InputProps={{
                            readOnly: true
                          }}
                          value={licenseCode}
                          placeholder="Code"
                        />
                        <TextField
                          required
                          select
                          InputProps={{
                            readOnly: true
                          }}
                          id="outlined-required"
                          label="Jurisdiction"
                          placeholder="Jurisdiction"
                          value={judiciary}
                        >
                          {judiciaries &&
                            judiciaries.map((el) => (
                              <MenuItem value={el._id} key={el.name}>
                                {el.name}
                              </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                          id="outlined-number"
                          value={name}
                          InputProps={{
                            readOnly: true
                          }}
                          label="Company Name"
                          placeholder="Company Name"
                        />
                        <DatePicker
                          label="Establishment Date"
                          value={establishmentDate}
                          readOnly={true}
                          renderInput={(params) => <TextField {...params} />}
                        />
                        <DatePicker
                          label="Date of issue"
                          value={issueDate}
                          readOnly={true}
                          renderInput={(params) => <TextField {...params} />}
                        />
                        <DatePicker
                          label="Expiry Date"
                          value={expiryDate}
                          readOnly={true}
                          renderInput={(params) => <TextField {...params} />}
                        />
                        <TextField
                          id="outlined-search"
                          label="Scan File"
                          onChange={(e) => {
                            console.log(e.target.files[0]);
                            setEstablishmentCard(e.target.files[0]);
                          }}
                          InputLabelProps={{
                            shrink: true
                          }}
                          type={'file'}
                        />
                        <Tooltip title={'View File'} arrow>
                          <Button
                            onClick={() => {
                              setImage(data?.establishmentCard);
                              setImageOpen(true);
                            }}
                            sx={{ margin: 1 }}
                            disabled={data?.establishmentCard.length === 0}
                            variant="contained"
                          >
                            View File
                          </Button>
                        </Tooltip>
                        <Box
                          sx={{
                            margin: '9px',
                            display: 'flex',
                            justifyContent: 'flex-end'
                          }}
                          component={'div'}
                        >
                          <FormControlLabel
                            control={<Checkbox />}
                            label="Notify"
                          />
                        </Box>
                      </div>
                    </Box>
                  </CardContent>
                </TabPanel>
                <TabPanel value={tabValue} index={2} dir={theme.direction}>
                  <CardContent>
                    <Box
                      onSubmit={(e) => onSubmit(e)}
                      component="form"
                      sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' }
                      }}
                      noValidate
                      autoComplete="off"
                    >
                      <div>
                        <DatePicker
                          label="Date of issue"
                          value={issueDate}
                          readOnly={true}
                          renderInput={(params) => <TextField {...params} />}
                        />
                        <DatePicker
                          label="Expiry Date"
                          value={expiryDate}
                          readOnly={true}
                          renderInput={(params) => <TextField {...params} />}
                        />
                        <TextField
                          id="outlined-search"
                          label="Scan File"
                          onChange={(e) => setOfficeLease(e.target.files[0])}
                          InputLabelProps={{
                            shrink: true
                          }}
                          type={'file'}
                        />
                        <Box
                          sx={{
                            margin: '9px',
                            display: 'flex',
                            justifyContent: 'flex-end'
                          }}
                          component={'div'}
                        >
                          <FormControlLabel
                            control={<Checkbox />}
                            label="Notify"
                          />
                        </Box>
                      </div>
                    </Box>
                  </CardContent>{' '}
                </TabPanel>
                <TabPanel value={tabValue} index={3} dir={theme.direction}>
                  <CardContent>
                    <Box
                      onSubmit={(e) => onSubmit(e)}
                      component="form"
                      sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' }
                      }}
                      noValidate
                      autoComplete="off"
                    >
                      <div>
                        <TextField
                          id="outlined-search"
                          label="Scan File"
                          onChange={(e) =>
                            setArticleOfIncorporation(e.target.files[0])
                          }
                          InputLabelProps={{
                            shrink: true
                          }}
                          type={'file'}
                        />
                        <RichTextEditor
                          value={value}
                          onChange={handleOnChange}
                        />
                        <Box
                          sx={{
                            margin: '9px',
                            display: 'flex',
                            justifyContent: 'flex-end'
                          }}
                          component={'div'}
                        >
                          <FormControlLabel
                            control={<Checkbox />}
                            label="Notify"
                          />
                        </Box>
                      </div>
                    </Box>
                  </CardContent>
                </TabPanel>
                <TabPanel value={tabValue} index={4} dir={theme.direction}>
                  <CardContent>
                    <Box
                      onSubmit={(e) => onSubmit(e)}
                      component="form"
                      sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' }
                      }}
                      noValidate
                      autoComplete="off"
                    >
                      <div>
                        <TextField
                          id="outlined-search"
                          label="Scan File"
                          onChange={(e) =>
                            setIncorporationCertificate(e.target.files[0])
                          }
                          InputLabelProps={{
                            shrink: true
                          }}
                          type={'file'}
                        />
                        <Box
                          sx={{
                            margin: '9px',
                            display: 'flex',
                            justifyContent: 'flex-end'
                          }}
                          component={'div'}
                        >
                          <FormControlLabel
                            control={<Checkbox />}
                            label="Notify"
                          />
                        </Box>
                      </div>
                    </Box>
                  </CardContent>
                </TabPanel>
                <TabPanel value={tabValue} index={5} dir={theme.direction}>
                  <CardContent>
                    <Box
                      onSubmit={(e) => onSubmit(e)}
                      component="form"
                      sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' }
                      }}
                      noValidate
                      autoComplete="off"
                    >
                      <div>
                        <TextField
                          id="outlined-search"
                          label="Scan File"
                          onChange={(e) =>
                            setShareCertificate(e.target.files[0])
                          }
                          InputLabelProps={{
                            shrink: true
                          }}
                          type={'file'}
                        />
                        <Box
                          sx={{
                            margin: '9px',
                            display: 'flex',
                            justifyContent: 'flex-end'
                          }}
                          component={'div'}
                        >
                          <FormControlLabel
                            control={<Checkbox />}
                            label="Notify"
                          />
                        </Box>
                      </div>
                    </Box>
                  </CardContent>
                </TabPanel>
                <TabPanel value={tabValue} index={6} dir={theme.direction}>
                  <CardContent>
                    <Box
                      onSubmit={(e) => onSubmit(e)}
                      component="form"
                      sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' }
                      }}
                      noValidate
                      autoComplete="off"
                    >
                      <div>
                        <DatePicker
                          label="Date of issue"
                          value={issueDate}
                          onChange={(newValue) => {
                            setIssueDate(newValue);
                          }}
                          renderInput={(params) => <TextField {...params} />}
                        />
                        <DatePicker
                          label="Expiry Date"
                          value={expiryDate}
                          onChange={(newValue) => {
                            console.log(newValue);
                            setExpiryDate(newValue);
                          }}
                          renderInput={(params) => <TextField {...params} />}
                        />
                        <TextField
                          id="outlined-search"
                          label="Scan File"
                          onChange={(e) =>
                            setImmigrationCard(e.target.files[0])
                          }
                          InputLabelProps={{
                            shrink: true
                          }}
                          type={'file'}
                        />
                        <Box
                          sx={{
                            margin: '9px',
                            display: 'flex',
                            justifyContent: 'flex-end'
                          }}
                          component={'div'}
                        >
                          <FormControlLabel
                            control={<Checkbox />}
                            label="Notify"
                          />
                        </Box>
                      </div>
                    </Box>
                  </CardContent>
                </TabPanel>
                <TabPanel value={tabValue} index={7} dir={theme.direction}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      padding: '0px 16px'
                    }}
                  >
                    <Button variant="contained" onClick={() => setOpen(true)}>
                      Add Stake-Holder
                    </Button>
                  </Box>
                  <CardContent>
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell align="center">#</TableCell>
                            <TableCell align="center">Name</TableCell>
                            <TableCell align="center">Email</TableCell>
                            <TableCell align="center">Country Code</TableCell>
                            <TableCell align="center">Mobile</TableCell>
                            <TableCell align="center">Nationality</TableCell>
                            <TableCell align="center">Date Of Birth</TableCell>
                            <TableCell align="center">Actions</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {shareHolders &&
                            shareHolders.map((el, i) => {
                              console.log(el);
                              return (
                                <TableRow hover>
                                  <TableCell align="center">
                                    <Typography
                                      variant="body1"
                                      fontWeight="bold"
                                      gutterBottom
                                      noWrap
                                    >
                                      {i + 1}
                                    </Typography>
                                  </TableCell>
                                  <TableCell align="center">
                                    <Typography
                                      variant="body1"
                                      fontWeight="bold"
                                      gutterBottom
                                      noWrap
                                    >
                                      {el.firstName} {el.lastName}
                                    </Typography>
                                  </TableCell>
                                  <TableCell align="center">
                                    <Typography
                                      variant="body1"
                                      fontWeight="bold"
                                      gutterBottom
                                      noWrap
                                    >
                                      {el.email}
                                    </Typography>
                                  </TableCell>
                                  <TableCell align="center">
                                    <Typography
                                      variant="body1"
                                      fontWeight="bold"
                                      gutterBottom
                                      noWrap
                                    >
                                      {el.countryCode}
                                    </Typography>
                                  </TableCell>
                                  <TableCell align="center">
                                    <Typography
                                      variant="body1"
                                      fontWeight="bold"
                                      gutterBottom
                                      noWrap
                                    >
                                      {el.mobile}
                                    </Typography>
                                  </TableCell>
                                  <TableCell align="center">
                                    <div
                                      style={{
                                        display: 'flex',
                                        flexWrap: 'nowrap',
                                        alignItems: 'center',
                                        justifyContent: 'space-between'
                                      }}
                                    >
                                      <img
                                        style={{
                                          width: '100%',
                                          maxWidth: '30px'
                                        }}
                                        src={
                                          countries.find(
                                            (ele) => ele.name === el.nationality
                                          )
                                            ? countries.find(
                                                (ele) =>
                                                  ele.name === el.nationality
                                              ).image
                                            : ''
                                        }
                                      />
                                      <Typography
                                        variant="body1"
                                        fontWeight="bold"
                                        gutterBottom
                                        noWrap
                                      >
                                        {el.nationality}
                                      </Typography>
                                    </div>
                                  </TableCell>
                                  <TableCell align="center">
                                    <Typography
                                      variant="body1"
                                      fontWeight="bold"
                                      gutterBottom
                                      noWrap
                                    >
                                      {moment(el.dateOfBirth).format(
                                        'DD MMMM YYYY'
                                      )}
                                    </Typography>
                                  </TableCell>

                                  <TableCell align="right">
                                    <Tooltip title="Edit" arrow>
                                      <IconButton
                                        sx={{
                                          '&:hover': {
                                            background:
                                              theme.colors.primary.lighter
                                          },
                                          color: theme.palette.error.main
                                        }}
                                        color="inherit"
                                        size="small"
                                        onClick={() => {
                                          setShareholderEdit(true);
                                          setShareholderData(el);
                                        }}
                                      >
                                        <EditTwoToneIcon fontSize="small" />
                                      </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Delete" arrow>
                                      <IconButton
                                        sx={{
                                          '&:hover': {
                                            background:
                                              theme.colors.error.lighter
                                          },
                                          color: theme.palette.error.main
                                        }}
                                        color="inherit"
                                        size="small"
                                      >
                                        <DeleteTwoToneIcon fontSize="small" />
                                      </IconButton>
                                    </Tooltip>
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </CardContent>
                  <Modal
                    open={open}
                    setOpen={setOpen}
                    setEdit={setShareholderEdit}
                    setData={setShareholderData}
                    edit={shareholderEdit}
                    children={
                      <AddShareHolder
                        shareHolders={shareHolders}
                        setShareHolders={setShareHolders}
                        setOpen={setOpen}
                        setEdit={setShareholderEdit}
                        edit={shareholderEdit}
                        data={shareholderData}
                      />
                    }
                  />
                </TabPanel>
              </SwipeableViews>
              <Box
                sx={{
                  margin: '9px',
                  display: 'flex',
                  justifyContent: 'flex-end'
                }}
                component={'div'}
              >
                <Button onClick={(e) => onSubmit(e)} sx={{ margin: 1 }}>
                  Submit
                </Button>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default AddCompany;
