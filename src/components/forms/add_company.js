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
  Select,
  CircularProgress
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
import SuccessModal from '../successBox';
import BasicModal from '../../components/modal';
import ModalNoClose from '../modal/modalNoClose';
import FailureModal from '../failureBox';

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

function AddCompany({
  comp,
  shouldUpdate,
  setShouldUpdate,
  edit,
  id,
  data,
  setImage,
  setImageTitle
}) {
  const [ShowLoader, setShowLoader] = useState(false);
  const [open, setOpen] = useState(false);
  const [ShowSuccessUpdateModal, setShowSuccessUpdateModal] = useState(false);
  const [ShowSuccessModal, setShowSuccessModal] = useState(false);
  const [ShowFailureModal, setShowFailureModal] = useState(false);
  const [shareholderEdit, setShareholderEdit] = useState(null);
  const [shareholderData, setShareholderData] = useState(null);
  const [tradeLicenseNotify, setTradeLicenseNotify] = useState(false);
  const [establishmentCardNotify, setEstablishmentCardNotify] = useState(false);
  const [officeLeaseAgreementNotify, setOfficeLeaseAgreementNotify] =
    useState(false);
  const [articleOfIncorporationNotify, setArticleOfIncorporationNotify] =
    useState(false);
  const [incorporationCertificateNotify, setIncorporationCertificateNotify] =
    useState(false);
  const [shareCertificateNotify, setShareCertificateNotify] = useState(false);
  const [immigrationCardNotify, setImmigrationCardNotify] = useState(false);

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
    data
      ? data.establishmentDate !== undefined
        ? data.establishmentDate
        : null
      : null
  );
  const [issueDate, setIssueDate] = useState(
    data ? (data.issueDate !== undefined ? data.issueDate : null) : null
  );
  const [expiryDate, setExpiryDate] = useState(
    data ? (data.expiryDate !== undefined ? data.expiryDate : null) : null
  );

  const [issueDateOfficeLease, setIssueDateOfficeLease] = useState(
    data
      ? data.officeLeaseIssue !== undefined
        ? data.officeLeaseIssue
        : null
      : null
  );
  const [expiryDateOfficeLease, setExpiryDateOfficeLease] = useState(
    data
      ? data.officeLeaseExpiry !== undefined
        ? data.officeLeaseExpiry
        : null
      : null
  );
  const [activities, setActivities] = useState(null);
  const [activity, setActivity] = useState(
    data ? data.activities.map((el) => el._id) : null
  );

  const [establishmentCardNo, setEstablishmentCardNo] = useState(
    data
      ? data?.establishmentCard[data.establishmentCard.length - 1]
          ?.establishmentCardNo
      : null
  );
  const [expiryDateTradeLicense, setExpiryDateTradeLicense] = useState(
    data ? data.expiryDateTradeLicense : null
  );
  const [establishmentDateTradeLicense, setEstablishmentDateTradeLicense] =
    useState(data ? data.establishmentDateTradeLicense : null);
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

  const [
    establismentDateEstablismentCard,
    setEstablismentDateEstablismentCard
  ] = useState(
    data
      ? data?.establishmentCard[data.establishmentCard.length - 1]
          ?.establismentDateEstablismentCard !== undefined
        ? data?.establishmentCard[data.establishmentCard.length - 1]
            ?.establismentDateEstablismentCard
        : null
      : null
  );
  const [issueDateEstablismentCard, setIssueDateEstablismentCard] = useState(
    data
      ? data?.establishmentCard[data.establishmentCard.length - 1]
          ?.issueDateEstablismentCard !== undefined
        ? data?.establishmentCard[data.establishmentCard.length - 1]
            ?.issueDateEstablismentCard
        : null
      : null
  );
  const [expiryDateEstablismentCard, setExpiryDateEstablismentCard] = useState(
    data
      ? data?.establishmentCard[data.establishmentCard.length - 1]
          ?.expiryDateEstablismentCard !== undefined
        ? data?.establishmentCard[data.establishmentCard.length - 1]
            ?.expiryDateEstablismentCard
        : null
      : null
  );
  const [officeLease, setOfficeLease] = useState(
    data ? data.officeLeaseAgreement : []
  );
  const [articleOfIncorporation, setArticleOfIncorporation] = useState(
    data ? data.articleOfIncoporation : []
  );
  const [incorporationCertificate, setIncorporationCertificate] = useState(
    data ? data.incorporationCertificate : []
  );
  const [shareCertificate, setShareCertificate] = useState(
    data ? data.shareCertificate : []
  );
  const [immigrationCard, setImmigrationCard] = useState(
    data ? data.immigrationCard : []
  );

  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [value, setValue] = useState(null);
  const [tradeLicenseMessage, setTradeLicenseMessage] = useState(null);
  const [establishmentCardMessage, setEstablishmentCardMessage] =
    useState(null);
  const [officeLeaseMessage, setOfficeLeaseMessage] = useState(null);
  const [articleMessage, setArticleMessage] = useState(null);
  const [incorporationMessage, setIncorporatiionMessage] = useState(null);
  const [shareCertificateMessage, setShareCertificateMessage] = useState(null);
  const [immigrationCardMessage, setImmigrationCardMessage] = useState(null);
  const [activityOpen, setActivityOpen] = useState(false);

  const handleOnChange = (value) => {
    setValue(value);
  };

  const handleTradeLicenseOnChange = (value) => {
    setTradeLicenseMessage(value);
  };

  const handleEstablishmentOnChange = (value) => {
    setEstablishmentCardMessage(value);
  };

  const handleOfficeLeaseOnChange = (value) => {
    setOfficeLeaseMessage(value);
  };

  const handleArticleOfIncorporationOnChange = (value) => {
    setArticleMessage(value);
  };

  const handleIncorporationCertificateOnChange = (value) => {
    setIncorporatiionMessage(value);
  };

  const handleShareCertificateOnChange = (value) => {
    setShareCertificateMessage(value);
  };

  const handleImmigrationCardOnChange = (value) => {
    setImmigrationCardMessage(value);
  };

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setTabValue(index);
  };

  useEffect(() => {
    // console.log('data');
    console.log(
      data?.establishmentCard[data.establishmentCard.length - 1]
        ?.issueDateEstablismentCard === null
    );
    if (data?.judiciary) {
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
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/mainland`,
      headers: {
        'x-auth-token': process.env.NEXT_PUBLIC_ADMIN_JWT
      }
    }).then((res) => {
      setJudiciaries(res.data.mainland);
    });

    const importModule = async () => {
      const mod = await import('react-rte');
      setEstablishmentCardMessage(mod.createEmptyValue());
      setOfficeLeaseMessage(mod.createEmptyValue());
      setArticleMessage(mod.createEmptyValue());
      setIncorporatiionMessage(mod.createEmptyValue());
      setShareCertificateMessage(mod.createEmptyValue());
      setImmigrationCardMessage(mod.createEmptyValue());
      setTradeLicenseMessage(mod.createEmptyValue());
    };

    importModule();
  }, [id]);

  function onSubmit(e) {
    e.preventDefault();
    const form = new FormData();
    form.append('owner', id);
    form.append('name', name);
    form.append('licenseNo', licenseNo);
    form.append('licenseCode', licenseCode);
    form.append('judiciary', judiciary);
    form.append('establishmentDate', establishmentDate);
    form.append('establishmentCardNo', establishmentCardNo);
    form.append(
      'establismentDateEstablismentCard',
      establismentDateEstablismentCard
    );
    form.append('issueDateEstablismentCard', issueDateEstablismentCard);
    form.append('expiryDateEstablismentCard', expiryDateEstablismentCard);
    form.append('issueDate', issueDate);
    form.append('expiryDate', expiryDate);
    form.append('activities', activity);
    form.append('code', code);
    form.append('dateOfIssue', issueDate);

    if (tradeLicense.length > 0 && tradeLicense[0] instanceof File) {
      for (const key of Object.keys(tradeLicense)) {
        form.append('tradelicense', tradeLicense[key]);
      }
    }

    if (officeLease.length > 0 && officeLease[0] instanceof File) {
      for (const key of Object.keys(officeLease)) {
        form.append('officeLease', officeLease[key]);
      }
    }

    if (shareCertificate.length > 0 && shareCertificate[0] instanceof File) {
      for (const key of Object.keys(shareCertificate)) {
        form.append('shareCertificate', shareCertificate[key]);
      }
    }

    if (
      articleOfIncorporation.length > 0 &&
      articleOfIncorporation[0] instanceof File
    ) {
      for (const key of Object.keys(articleOfIncorporation)) {
        form.append('articleOfIncorporation', articleOfIncorporation[key]);
      }
    }

    if (
      incorporationCertificate.length > 0 &&
      incorporationCertificate[0] instanceof File
    ) {
      for (const key of Object.keys(incorporationCertificate)) {
        form.append('incorporationCertificate', incorporationCertificate[key]);
      }
    }
    console.log(establishmentCard);
    if (establishmentCard.length > 0 && establishmentCard[0] instanceof File) {
      for (const key of Object.keys(establishmentCard)) {
        form.append('establishmentCard', establishmentCard[key]);
      }
    }

    if (immigrationCard.length > 0 && immigrationCard[0] instanceof File) {
      for (const key of Object.keys(immigrationCard)) {
        form.append('immigrationCard', immigrationCard[key]);
      }
    }

    form.append('officeLeaseIssue', issueDateOfficeLease);

    form.append('officeLeaseExpiry', expiryDateOfficeLease);

    form.append('shareHolder', JSON.stringify(shareHolders));

    form.append('message', message);

    form.append('tradeLicenseNotify', tradeLicenseNotify);
    form.append('establishmentCardNotify', establishmentCardNotify);
    form.append('officeLeaseAgreementNotify', officeLeaseAgreementNotify);
    form.append('articleOfIncorporationNotify', articleOfIncorporationNotify);
    form.append(
      'incorporationCertificateNotify',
      incorporationCertificateNotify
    );
    form.append('shareCertificateNotify', shareCertificateNotify);
    form.append('immigrationCardNotify', immigrationCardNotify);
    form.append('immigrationCardNotify', immigrationCardNotify);
    form.append(
      'tradeLicenseMessage',
      tradeLicenseMessage.toString('html').toString()
    );
    form.append(
      'establishmentCardMessage',
      establishmentCardMessage.toString('html').toString()
    );
    form.append(
      'officeLeaseMessage',
      officeLeaseMessage.toString('html').toString()
    );
    form.append('articleMessage', articleMessage.toString('html').toString());
    form.append(
      'incorporationMessage',
      incorporationMessage.toString('html').toString()
    );
    form.append(
      'shareCertificateMessage',
      shareCertificateMessage.toString('html').toString()
    );
    form.append(
      'immigrationCardMessage',
      immigrationCardMessage.toString('html').toString()
    );

    if (edit !== true) {
      setShowLoader(true);
      axios({
        method: 'POST',
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/company`,
        headers: {
          'Content-Type': 'multipart/form-data',

          'x-auth-token': process.env.NEXT_PUBLIC_ADMIN_JWT
        },
        data: form
      })
        .then((res) => {
          if (res.status === 200) {
            setShowLoader(false);
            setShowSuccessUpdateModal(true);
          }
        })
        .catch((err) => {
          setShowLoader(false);
          setShowFailureModal(true);
        });
    } else {
      setShowLoader(true);
      axios({
        method: 'PUT',
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/company?id=${data._id}`,
        headers: {
          'x-auth-token': process.env.NEXT_PUBLIC_ADMIN_JWT
        },
        data: form
      })
        .then((res) => {
          setShowLoader(false);
          if (res.status === 200) {
            setShowSuccessUpdateModal(true);
          }
        })
        .catch((err) => {
          setShowLoader(false);
          setShowFailureModal(true);
        });
    }
  }

  function onSubmit1(e) {
    e.preventDefault();
    const form = new FormData();
    form.append('owner', id);
    form.append('name', name);
    form.append('licenseNo', licenseNo);
    form.append('licenseCode', licenseCode);
    form.append('judiciary', judiciary);
    form.append('establishmentDate', establishmentDate);
    form.append('establishmentCardNo', establishmentCardNo);
    form.append(
      'establismentDateEstablismentCard',
      establismentDateEstablismentCard
    );
    form.append('issueDateEstablismentCard', issueDateEstablismentCard);
    form.append('expiryDateEstablismentCard', expiryDateEstablismentCard);

    form.append('issueDate', issueDate);
    form.append('expiryDate', expiryDate);
    form.append('activities', activity);
    form.append('code', code);
    form.append('dateOfIssue', issueDate);

    if (tradeLicense.length > 0 && tradeLicense[0] instanceof File) {
      for (const key of Object.keys(tradeLicense)) {
        form.append('tradelicense', tradeLicense[key]);
      }
    }

    if (officeLease.length > 0 && officeLease[0] instanceof File) {
      for (const key of Object.keys(officeLease)) {
        form.append('officeLease', officeLease[key]);
      }
    }

    if (shareCertificate.length > 0 && shareCertificate[0] instanceof File) {
      for (const key of Object.keys(shareCertificate)) {
        form.append('shareCertificate', shareCertificate[key]);
      }
    }

    if (
      articleOfIncorporation.length > 0 &&
      articleOfIncorporation[0] instanceof File
    ) {
      for (const key of Object.keys(articleOfIncorporation)) {
        form.append('articleOfIncorporation', articleOfIncorporation[key]);
      }
    }

    if (
      incorporationCertificate.length > 0 &&
      incorporationCertificate[0] instanceof File
    ) {
      for (const key of Object.keys(incorporationCertificate)) {
        form.append('incorporationCertificate', incorporationCertificate[key]);
      }
    }
    console.log(establishmentCard);
    if (establishmentCard.length > 0 && establishmentCard[0] instanceof File) {
      for (const key of Object.keys(establishmentCard)) {
        form.append('establishmentCard', establishmentCard[key]);
      }
    }

    if (immigrationCard.length > 0 && immigrationCard[0] instanceof File) {
      for (const key of Object.keys(immigrationCard)) {
        form.append('immigrationCard', immigrationCard[key]);
      }
    }

    form.append('officeLeaseIssue', issueDate);

    form.append('officeLeaseExpiry', expiryDate);

    form.append('shareHolder', JSON.stringify(shareHolders));

    form.append('message', message);

    form.append('tradeLicenseNotify', tradeLicenseNotify);
    form.append('establishmentCardNotify', establishmentCardNotify);
    form.append('officeLeaseAgreementNotify', officeLeaseAgreementNotify);
    form.append('articleOfIncorporationNotify', articleOfIncorporationNotify);
    form.append(
      'incorporationCertificateNotify',
      incorporationCertificateNotify
    );
    form.append('shareCertificateNotify', shareCertificateNotify);
    form.append('immigrationCardNotify', immigrationCardNotify);

    form.append(
      'tradeLicenseMessage',
      tradeLicenseMessage.toString('html').toString()
    );
    form.append(
      'establishmentCardMessage',
      establishmentCardMessage.toString('html').toString()
    );
    form.append(
      'officeLeaseMessage',
      officeLeaseMessage.toString('html').toString()
    );
    form.append('articleMessage', articleMessage.toString('html').toString());
    form.append(
      'incorporationMessage',
      incorporationMessage.toString('html').toString()
    );
    form.append(
      'shareCertificateMessage',
      shareCertificateMessage.toString('html').toString()
    );
    form.append(
      'immigrationCardMessage',
      immigrationCardMessage.toString('html').toString()
    );

    if (edit !== true) {
      setShowLoader(true);
      axios({
        method: 'POST',
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/company`,
        headers: {
          'Content-Type': 'multipart/form-data',

          'x-auth-token': process.env.NEXT_PUBLIC_ADMIN_JWT
        },
        data: form
      })
        .then((res) => {
          setShowLoader(false);
          if (res.status === 200) {
            setShowSuccessModal(true);
          }
        })
        .catch((err) => {
          setShowLoader(false);
          setShowFailureModal(true);
        });
    } else {
      setShowLoader(true);
      console.log(data);
      axios({
        method: 'PUT',
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/company?id=${data._id}`,
        headers: {
          'x-auth-token': process.env.NEXT_PUBLIC_ADMIN_JWT
        },
        data: form
      })
        .then((res) => {
          if (res.status === 200) {
            setShowLoader(false);
            setShowSuccessModal(true);
          }
        })
        .catch((err) => {
          setShowLoader(false);
          setShowFailureModal(true);
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
                          open={activityOpen}
                          onClose={() => setActivityOpen(false)}
                          onOpen={() => setActivityOpen(true)}
                          onChange={(e) => {
                            console.log(e.target.value);
                            setActivity(
                              typeof e.target.value === 'string'
                                ? e.target.value.split(',')
                                : e.target.value
                            );
                          }}
                        >
                          <Button
                            onClick={() => {
                              setActivityOpen(false);
                            }}
                            sx={{ width: '100%' }}
                          >
                            Close
                          </Button>
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
                          inputProps={{ multiple: true }}
                          onChange={(e) => {
                            // console.log(e.target.files[0]);
                            setTradeLicense(e.target.files);
                          }}
                          InputLabelProps={{
                            shrink: true
                          }}
                          type={'file'}
                        />
                        <Tooltip title={'View File'} arrow>
                          <Button
                            onClick={() => {
                              setImage(
                                data?.tradeLicense[
                                  data?.tradeLicense.length - 1
                                ]?.file
                              );

                              setImageTitle('Trade License - ' + data?.name);
                            }}
                            sx={{ margin: 1, height: '53.5px' }}
                            disabled={
                              data?.tradeLicense.length === 0 ||
                              data?.tradeLicense[data?.tradeLicense.length - 1]
                                ?.file.length === 0
                            }
                            variant="contained"
                          >
                            View File
                          </Button>
                        </Tooltip>

                        <Box>
                          {tradeLicenseNotify && tradeLicenseMessage && (
                            <RichTextEditor
                              value={tradeLicenseMessage}
                              onChange={handleTradeLicenseOnChange}
                            />
                          )}
                          <Box
                            sx={{
                              margin: '9px',
                              display: 'flex',
                              justifyContent: 'flex-end'
                            }}
                            component={'div'}
                          >
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={tradeLicenseNotify}
                                  onChange={(e) =>
                                    setTradeLicenseNotify(e.target.checked)
                                  }
                                />
                              }
                              label="Notify"
                            />
                            {/* <Button type="submit" sx={{ margin: 1 }}>
                              Submit
                            </Button> */}
                          </Box>
                        </Box>
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
                          id="outlined-read-only-input"
                          label="Establishment Card No"
                          value={establishmentCardNo}
                          onChange={(e) =>
                            setEstablishmentCardNo(e.currentTarget.value)
                          }
                          placeholder="Establishment Card Number"
                          // type={'number'}
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
                          onChange={(newValue) =>
                            setEstablismentDateEstablismentCard(newValue)
                          }
                          value={establismentDateEstablismentCard}
                          renderInput={(params) => <TextField {...params} />}
                        />
                        <DatePicker
                          label="Establishment Card Issue Date "
                          value={issueDateEstablismentCard}
                          onChange={(newValue) =>
                            setIssueDateEstablismentCard(newValue)
                          }
                          renderInput={(params) => <TextField {...params} />}
                        />
                        <DatePicker
                          label="Establishment Card Expiry Date"
                          value={expiryDateEstablismentCard}
                          onChange={(newValue) =>
                            setExpiryDateEstablismentCard(newValue)
                          }
                          renderInput={(params) => <TextField {...params} />}
                        />
                        <TextField
                          id="outlined-search"
                          label="Scan File"
                          inputProps={{ multiple: true }}
                          onChange={(e) => {
                            console.log(e.target.files);
                            setEstablishmentCard(e.target.files);
                          }}
                          InputLabelProps={{
                            shrink: true
                          }}
                          type={'file'}
                        />

                        <Tooltip title={'View File'} arrow>
                          <Button
                            onClick={() => {
                              setImage(
                                data?.establishmentCard[
                                  data?.establishmentCard.length - 1
                                ]?.file
                              );
                              setImageTitle(
                                'Establishment Card - ' + data?.name
                              );
                            }}
                            sx={{ margin: 1, height: '53.5px' }}
                            disabled={
                              data?.establishmentCard.length === 0 ||
                              data?.establishmentCard[
                                data?.establishmentCard.length - 1
                              ]?.file.length === 0
                            }
                            variant="contained"
                          >
                            View File
                          </Button>
                        </Tooltip>

                        <Box>
                          {establishmentCardNotify &&
                            establishmentCardMessage && (
                              <RichTextEditor
                                value={establishmentCardMessage}
                                onChange={handleEstablishmentOnChange}
                              />
                            )}
                          <Box
                            sx={{
                              margin: '9px',
                              display: 'flex',
                              justifyContent: 'flex-end'
                            }}
                            component={'div'}
                          >
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={establishmentCardNotify}
                                  onChange={(e) =>
                                    setEstablishmentCardNotify(e.target.checked)
                                  }
                                />
                              }
                              label="Notify"
                            />
                            {/* <Button type="submit" sx={{ margin: 1 }}>
                              Submit
                            </Button> */}
                          </Box>
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
                          value={issueDateOfficeLease}
                          onChange={(newValue) =>
                            setIssueDateOfficeLease(newValue)
                          }
                          renderInput={(params) => <TextField {...params} />}
                        />
                        <DatePicker
                          label="Expiry Date"
                          value={expiryDateOfficeLease}
                          onChange={(newValue) =>
                            setExpiryDateOfficeLease(newValue)
                          }
                          renderInput={(params) => <TextField {...params} />}
                        />

                        <TextField
                          id="outlined-search"
                          label="Scan File"
                          inputProps={{ multiple: true }}
                          onChange={(e) => {
                            console.log(e.target.files);
                            setOfficeLease(e.target.files);
                          }}
                          InputLabelProps={{
                            shrink: true
                          }}
                          type={'file'}
                        />
                        <Tooltip title={'View File'} arrow>
                          <Button
                            onClick={() => {
                              setImage(
                                data?.officeLeaseAgreement[
                                  data?.officeLeaseAgreement.length - 1
                                ]?.file
                              );

                              setImageTitle(
                                'Office Lease Agreement - ' + data?.name
                              );
                            }}
                            sx={{ margin: 1, height: '53.5px' }}
                            disabled={
                              data?.officeLeaseAgreement.length === 0 ||
                              data?.officeLeaseAgreement[
                                data?.officeLeaseAgreement.length - 1
                              ]?.file.length === 0
                            }
                            variant="contained"
                          >
                            View File
                          </Button>
                        </Tooltip>

                        <Box>
                          {officeLeaseAgreementNotify && officeLeaseMessage && (
                            <RichTextEditor
                              value={officeLeaseMessage}
                              onChange={handleOfficeLeaseOnChange}
                            />
                          )}
                          <Box
                            sx={{
                              margin: '9px',
                              display: 'flex',
                              justifyContent: 'flex-end'
                            }}
                            component={'div'}
                          >
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={officeLeaseAgreementNotify}
                                  onChange={(e) =>
                                    setOfficeLeaseAgreementNotify(
                                      e.target.checked
                                    )
                                  }
                                />
                              }
                              label="Notify"
                            />
                            {/* <Button type="submit" sx={{ margin: 1 }}>
                              Submit
                            </Button> */}
                          </Box>
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
                          inputProps={{ multiple: true }}
                          onChange={(e) => {
                            console.log(e.target.files);
                            setArticleOfIncorporation(e.target.files);
                          }}
                          InputLabelProps={{
                            shrink: true
                          }}
                          type={'file'}
                        />
                        <Tooltip title={'View File'} arrow>
                          <Button
                            onClick={() => {
                              setImage(
                                data?.articleOfIncoporation[
                                  data?.articleOfIncoporation.length - 1
                                ]?.file
                              );

                              setImageTitle(
                                'Article Of Incorporation - ' + data?.name
                              );
                            }}
                            sx={{ margin: 1, height: '53.5px' }}
                            disabled={
                              data?.articleOfIncoporation.length === 0 ||
                              data?.articleOfIncoporation[
                                data?.articleOfIncoporation.length - 1
                              ]?.file.length === 0
                            }
                            variant="contained"
                          >
                            View File
                          </Button>
                        </Tooltip>

                        <Box>
                          {articleOfIncorporationNotify && articleMessage && (
                            <RichTextEditor
                              value={articleMessage}
                              onChange={handleArticleOfIncorporationOnChange}
                            />
                          )}
                          <Box
                            sx={{
                              margin: '9px',
                              display: 'flex',
                              justifyContent: 'flex-end'
                            }}
                            component={'div'}
                          >
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={articleOfIncorporationNotify}
                                  onChange={(e) =>
                                    setArticleOfIncorporationNotify(
                                      e.target.checked
                                    )
                                  }
                                />
                              }
                              label="Notify"
                            />
                            {/* <Button type="submit" sx={{ margin: 1 }}>
                              Submit
                            </Button> */}
                          </Box>
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
                          inputProps={{ multiple: true }}
                          onChange={(e) => {
                            // console.log(e.target.files[0]);
                            setIncorporationCertificate(e.target.files);
                          }}
                          InputLabelProps={{
                            shrink: true
                          }}
                          type={'file'}
                        />
                        <Tooltip title={'View File'} arrow>
                          <Button
                            onClick={() => {
                              setImage(
                                data?.incorporationCertificate[
                                  data?.incorporationCertificate.length - 1
                                ]?.file
                              );

                              setImageTitle(
                                'Incorporation Certificate - ' + data?.name
                              );
                            }}
                            sx={{ margin: 1, height: '53.5px' }}
                            disabled={
                              data?.incorporationCertificate.length === 0 ||
                              data?.incorporationCertificate[
                                data?.incorporationCertificate.length - 1
                              ]?.file.length === 0
                            }
                            variant="contained"
                          >
                            View File
                          </Button>
                        </Tooltip>

                        <Box>
                          {incorporationCertificateNotify &&
                            incorporationMessage && (
                              <RichTextEditor
                                value={incorporationMessage}
                                onChange={
                                  handleIncorporationCertificateOnChange
                                }
                              />
                            )}
                          <Box
                            sx={{
                              margin: '9px',
                              display: 'flex',
                              justifyContent: 'flex-end'
                            }}
                            component={'div'}
                          >
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={incorporationCertificateNotify}
                                  onChange={(e) =>
                                    setIncorporationCertificateNotify(
                                      e.target.checked
                                    )
                                  }
                                />
                              }
                              label="Notify"
                            />
                            {/* <Button type="submit" sx={{ margin: 1 }}>
                              Submit
                            </Button> */}
                          </Box>
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
                          inputProps={{ multiple: true }}
                          onChange={(e) => {
                            // console.log(e.target.files[0]);
                            setShareCertificate(e.target.files);
                          }}
                          InputLabelProps={{
                            shrink: true
                          }}
                          type={'file'}
                        />
                        <Tooltip title={'View File'} arrow>
                          <Button
                            onClick={() => {
                              setImage(
                                data?.shareCertificate[
                                  data?.shareCertificate.length - 1
                                ]?.file
                              );

                              setImageTitle(
                                'Share Certificate - ' + data?.name
                              );
                            }}
                            sx={{ margin: 1, height: '53.5px' }}
                            disabled={
                              data?.shareCertificate.length === 0 ||
                              data?.shareCertificate[
                                data?.shareCertificate.length - 1
                              ]?.file.length === 0
                            }
                            variant="contained"
                          >
                            View File
                          </Button>
                        </Tooltip>

                        <Box>
                          {shareCertificateNotify &&
                            shareCertificateMessage && (
                              <RichTextEditor
                                value={shareCertificateMessage}
                                onChange={handleShareCertificateOnChange}
                              />
                            )}
                          <Box
                            sx={{
                              margin: '9px',
                              display: 'flex',
                              justifyContent: 'flex-end'
                            }}
                            component={'div'}
                          >
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={shareCertificateNotify}
                                  onChange={(e) =>
                                    setShareCertificateNotify(e.target.checked)
                                  }
                                />
                              }
                              label="Notify"
                            />
                            {/* <Button type="submit" sx={{ margin: 1 }}>
                              Submit
                            </Button> */}
                          </Box>
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
                          inputProps={{ multiple: true }}
                          onChange={(e) => {
                            // console.log(e.target.files[0]);
                            setImmigrationCard(e.target.files);
                          }}
                          InputLabelProps={{
                            shrink: true
                          }}
                          type={'file'}
                        />
                        <Tooltip title={'View File'} arrow>
                          <Button
                            onClick={() => {
                              setImage(
                                data?.immigrationCard[
                                  data?.immigrationCard.length - 1
                                ]?.file
                              );
                              setImageTitle('Immigration Card - ' + data?.name);
                            }}
                            sx={{ margin: 1, height: '53.5px' }}
                            disabled={
                              data?.immigrationCard.length === 0 ||
                              data?.immigrationCard[
                                data?.immigrationCard.length - 1
                              ]?.file.length === 0
                            }
                            variant="contained"
                          >
                            View File
                          </Button>
                        </Tooltip>

                        <Box>
                          {immigrationCardNotify && immigrationCardMessage && (
                            <RichTextEditor
                              value={immigrationCardMessage}
                              onChange={handleImmigrationCardOnChange}
                            />
                          )}
                          <Box
                            sx={{
                              margin: '9px',
                              display: 'flex',
                              justifyContent: 'flex-end'
                            }}
                            component={'div'}
                          >
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={immigrationCardNotify}
                                  onChange={(e) =>
                                    setImmigrationCardNotify(e.target.checked)
                                  }
                                />
                              }
                              label="Notify"
                            />
                            {/* <Button type="submit" sx={{ margin: 1 }}>
                              Submit
                            </Button> */}
                          </Box>
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
                <Button onClick={(e) => onSubmit1(e)} sx={{ margin: 1 }}>
                  Save
                </Button>
                <Button onClick={(e) => onSubmit(e)} sx={{ margin: 1 }}>
                  Save & Close
                </Button>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>

      <ModalNoClose
        setOpen={setShowSuccessModal}
        open={ShowSuccessModal}
        setEdit={() => {}}
        setData={() => {}}
      >
        <SuccessModal
          executeFunction={() => {}}
          setShowSuccessModal={setShowSuccessModal}
        />
      </ModalNoClose>

      <ModalNoClose
        setOpen={setShowSuccessUpdateModal}
        open={ShowSuccessUpdateModal}
        setEdit={() => {}}
        setData={() => {}}
      >
        <SuccessModal
          executeFunction={() => {
            setShouldUpdate(!shouldUpdate);
          }}
          setShowSuccessModal={setShowSuccessModal}
        />
      </ModalNoClose>

      <ModalNoClose
        setOpen={setShowFailureModal}
        open={ShowFailureModal}
        setEdit={() => {}}
        setData={() => {}}
      >
        <FailureModal setShowFailureModal={setShowFailureModal} />
      </ModalNoClose>

      <ModalNoClose
        setOpen={() => {}}
        open={ShowLoader}
        setEdit={() => {}}
        setData={() => {}}
      >
        <CircularProgress />
      </ModalNoClose>
    </>
  );
}

export default AddCompany;
