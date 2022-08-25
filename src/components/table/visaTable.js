import { useState } from 'react';
import {
  Tooltip,
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Select,
  Typography,
  useTheme,
  CardHeader,
  Button
} from '@mui/material';

import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import moment from 'moment';
import axios from 'axios';
import ModalNoClose from '../modal/modalNoClose';
import ConfirmationModal from '../confirmationBox';

const applyFilters = (cryptoOrders, filters) => {
  //   return cryptoOrders.filter((cryptoOrder) => {
  //     let matches = true;
  //     if (filters.status && cryptoOrder.status !== filters.status) {
  //       matches = false;
  //     }
  //     return matches;
  //   });
};

const applyPagination = (cryptoOrders, page, limit) => {
  //   return cryptoOrders.slice(page * limit, page * limit + limit);
};

const VisaTable = ({ setImage, data, setEdit, setData, shouldUpdate, setShouldUpdate }) => {
  var i = 0;
  const [id, setID] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [filters, setFilters] = useState({
    status: null
  });

  const deleteRecord = (id) => {
    axios({
      method: 'DELETE',
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/visa?id=${id}`,
      headers: {
        'x-auth-token': process.env.NEXT_PUBLIC_ADMIN_JWT
      }
    }).then((res) => {
      setShouldUpdate(!shouldUpdate);
    });
  };

  const handleStatusChange = (e) => {
    let value = null;

    if (e.target.value !== 'all') {
      value = e.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      status: value
    }));
  };

  const handlePageChange = (_event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
  };

  const filteredData = applyFilters(data, filters);
  const paginatedData = applyPagination(filteredData, page, limit);
  const theme = useTheme();

  return (
    <Card>
      <CardHeader
        action={
          <Box width={150}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Status</InputLabel>
              <Select
                value={filters.status || 'all'}
                onChange={handleStatusChange}
                label="Status"
                autoWidth
              >
                {/* {statusOptions.map((statusOption) => (
                  <MenuItem key={statusOption.id} value={statusOption.id}>
                    {statusOption.name}
                  </MenuItem>
                ))} */}
              </Select>
            </FormControl>
          </Box>
        }
        title="Visa"
      />
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Passport No</TableCell>
              <TableCell>Passport Issue</TableCell>
              <TableCell>Passport Expiry</TableCell>
              <TableCell>Passport Country</TableCell>
              <TableCell>Entry Permit Issued</TableCell>
              <TableCell>Visa UID</TableCell>
              <TableCell>Residency Visa Issued</TableCell>
              <TableCell>Emirates Id Issued</TableCell>
              <TableCell>Passport</TableCell>
              <TableCell>Entry Permit</TableCell>
              <TableCell>Residency Visa</TableCell>
              <TableCell>Emirates Id</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data && data.map((el) => (
              <TableRow hover>
                <TableCell>
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    gutterBottom
                    noWrap
                  >
                    {++i}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    gutterBottom
                    noWrap
                  >
                    {el.firstName} {el.lastName}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    gutterBottom
                    noWrap
                  >
                    {el.passportNo}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    gutterBottom
                    noWrap
                  >
                    {moment(el.passportIssue).format('DD MMMM YYYY')}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    gutterBottom
                    noWrap
                  >
                    {moment(el.passportExpiry).format('DD MMMM YYYY')}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    gutterBottom
                    noWrap
                  >
                    {el.passportCountry}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    gutterBottom
                    noWrap
                  >
                    {el.entryPermitIssued ? 'Yes' : 'No'}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    gutterBottom
                    noWrap
                  >
                    {el.visaUID}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    gutterBottom
                    noWrap
                  >
                    {el.residencyVisaIssued ? 'Yes' : 'No'}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    gutterBottom
                    noWrap
                  >
                    {el.emiratesIdIssued ? 'Yes' : 'No'}
                  </Typography>
                </TableCell>

                <TableCell align="center">
                  <Tooltip title="View Issued License" arrow>
                    <Button
                      onClick={() => setImage(el.passport)}
                      sx={{ margin: 1 }}
                      variant="contained"
                    >
                      View
                    </Button>
                  </Tooltip>
                </TableCell>
                <TableCell align="center">
                  <Tooltip title="View Issued License" arrow>
                    <Button
                      onClick={() => setImage(el.entryPermit)}
                      sx={{ margin: 1 }}
                      variant="contained"
                    >
                      View
                    </Button>
                  </Tooltip>
                </TableCell>
                <TableCell align="center">
                  <Tooltip title="View Issued License" arrow>
                    <Button
                      onClick={() => setImage(el.residencyVisa)}
                      sx={{ margin: 1 }}
                      variant="contained"
                    >
                      View
                    </Button>
                  </Tooltip>
                </TableCell>
                <TableCell align="center">
                  <Tooltip title="View Issued License" arrow>
                    <Button
                      onClick={() => setImage(el.emiratesId)}
                      sx={{ margin: 1 }}
                      variant="contained"
                    >
                      View
                    </Button>
                  </Tooltip>
                </TableCell>
                <TableCell align="right">
                  <Tooltip title="Edit" arrow>
                    <IconButton
                      sx={{
                        '&:hover': {
                          background: theme.colors.primary.lighter
                        },
                        color: theme.palette.primary.main
                      }}
                      onClick={() => {
                        setEdit(true);
                        setData(el);
                      }}
                      color="inherit"
                      size="small"
                    >
                      <EditTwoToneIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete" arrow>
                    <IconButton
                      sx={{
                        '&:hover': { background: theme.colors.error.lighter },
                        color: theme.palette.error.main
                      }}
                      onClick={() => {
                        setShowModal(true);
                        setID(el._id);
                        // deleteRecord(el._id);
                      }}
                      color="inherit"
                      size="small"
                    >
                      <DeleteTwoToneIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={10}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
      <ModalNoClose
        setOpen={setShowModal}
        open={showModal}
        children={
          <ConfirmationModal
            executeFunction={() => deleteRecord(id)}
            setShowModal={setShowModal}
          />
        }
      />
    </Card>
  );
};

export default VisaTable;
