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
import { useRouter } from 'next/router';

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

const UserTable = ({
  setImage,
  data,
  buttonName,
  buttonURL,
  buttonPurpose,
  setEdit,
  setId,
  setData
}) => {
  var i = 0;
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [filters, setFilters] = useState({
    status: null
  });

  const router = useRouter();

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
        title="Users"
      />
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">#</TableCell>
              <TableCell align="center">Client Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Country Code</TableCell>
              <TableCell align="center">Mobile</TableCell>
              <TableCell align="center">Nationality</TableCell>
              <TableCell align="center">Date Of Birth</TableCell>
              <TableCell align="center">Passport Details</TableCell>
              <TableCell align="center">Role</TableCell>
              {buttonName && <TableCell align="center">View</TableCell>}
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((el) => (
              <TableRow hover>
                <TableCell align="center">
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    color="text.primary"
                    gutterBottom
                    noWrap
                  >
                    {++i}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    color="text.primary"
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
                    color="text.primary"
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
                    color="text.primary"
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
                    color="text.primary"
                    gutterBottom
                    noWrap
                  >
                    {el.mobile}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    color="text.primary"
                    gutterBottom
                    noWrap
                  >
                    {el.nationality}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    color="text.primary"
                    gutterBottom
                    noWrap
                  >
                    {el.dateOfBirth}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    color="text.primary"
                    gutterBottom
                    noWrap
                  >
                    {el.passportDetails}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    color="text.primary"
                    gutterBottom
                    noWrap
                  >
                    {el.role}
                  </Typography>
                </TableCell>

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
                        setEdit(true);
                        setId(el._id);
                        setData(el);
                      }}
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
    </Card>
  );
};

export default UserTable;
