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
import { useRouter } from 'next/router';
import axios from 'axios';

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

const CompanyTable = ({
  data,
  setCompany,
  setOpen,
  buttonName,
  buttonURL,
  buttonPurpose,
  setEdit,
  setId,
  setData,
  buttonName2,
  buttonPurpose2,
  actions,
  setShouldUpdate,
  shouldUpdate
}) => {
  var i = 0;
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [filters, setFilters] = useState({
    status: null
  });

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

  const deleteRecord = (id) => {
    axios({
      method: 'DELETE',
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/company?id=${id}`,
      headers: {
        'x-auth-token': process.env.NEXT_PUBLIC_ADMIN_JWT
      }
    }).then((res) => {
      setShouldUpdate(!shouldUpdate);
    });
  };

  const router = useRouter();
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
        title="Company Table"
      />
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Owner</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>License No </TableCell>
              <TableCell>License Code</TableCell>
              <TableCell>Jurisdiction</TableCell>
              <TableCell>Establishment Date </TableCell>
              <TableCell>Issue Date </TableCell>
              <TableCell>Expiry Date</TableCell>
              <TableCell>Activities</TableCell>
              <TableCell align="center">View</TableCell>
              {buttonName2 && <TableCell align="center">Add</TableCell>}
              {!actions && <TableCell align="right">Actions</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.map((el) => (
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
                      {el.owner.firstName} {el.owner.lastName}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      gutterBottom
                      noWrap
                    >
                      {el.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      gutterBottom
                      noWrap
                    >
                      {el.licenseNo}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      gutterBottom
                      noWrap
                    >
                      {el.licenseCode}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      gutterBottom
                      noWrap
                    >
                      {el.judiciary?.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      gutterBottom
                      noWrap
                    >
                      {el.establishmentDate &&
                        moment(el.establishmentDate).format('DD MMMM YYYY')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      gutterBottom
                      noWrap
                    >
                      {el.issueDate &&
                        moment(el.issueDate).format('DD MMMM YYYY')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      gutterBottom
                      noWrap
                    >
                      {el.expiryDate &&
                        moment(el.expiryDate).format('DD MMMM YYYY')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      gutterBottom
                      noWrap
                    >
                      {el.activities &&
                        el.activities.map((activity, index) => {
                          return (
                            <p key={activity.id}>
                              {activity.name}{' '}
                              {index < el.activities.length - 1 ? ', ' : ''}
                            </p>
                          );
                        })}
                    </Typography>
                  </TableCell>

                  {!buttonName && (
                    <TableCell align="center">
                      <Tooltip title={'Add New Company'} arrow>
                        <Button
                          onClick={() => {
                            setOpen(true);
                            setId(el.owner._id);
                          }}
                          sx={{ margin: 1 }}
                          variant="contained"
                        >
                          New Company
                        </Button>
                      </Tooltip>
                    </TableCell>
                  )}
                  {buttonName && (
                    <TableCell align="center">
                      <Tooltip title={buttonPurpose} arrow>
                        <Button
                          onClick={() => {
                            router.push(`/${buttonURL}/${el._id}`);
                          }}
                          sx={{ margin: 1 }}
                          variant="contained"
                        >
                          {buttonName}
                        </Button>
                      </Tooltip>
                    </TableCell>
                  )}
                  {buttonName2 && (
                    <TableCell align="center">
                      <Tooltip title={buttonPurpose2} arrow>
                        <Button
                          onClick={() => {
                            setCompany(el._id);
                            setOpen(true);
                          }}
                          sx={{ margin: 1 }}
                          variant="contained"
                        >
                          {buttonName2}
                        </Button>
                      </Tooltip>
                    </TableCell>
                  )}
                  {!actions && (
                    <TableCell align="right">
                      <Tooltip title="Edit" arrow>
                        <IconButton
                          sx={{
                            '&:hover': {
                              background: theme.colors.primary.lighter
                            },
                            color: theme.palette.primary.main
                          }}
                          color="inherit"
                          size="small"
                          onClick={() => {
                            console.log(el);
                            setEdit(true);
                            setId(el.owner._id);
                            setData(el);
                          }}
                        >
                          <EditTwoToneIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete" arrow>
                        <IconButton
                          sx={{
                            '&:hover': {
                              background: theme.colors.error.lighter
                            },
                            color: theme.palette.error.main
                          }}
                          onClick={() => deleteRecord(el._id)}
                          color="inherit"
                          size="small"
                        >
                          <DeleteTwoToneIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  )}
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
    </Card>
  );
};

export default CompanyTable;
