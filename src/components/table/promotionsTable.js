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
import countries from '../../data/countries.json';
import moment from 'moment';
import axios from 'axios';
import Modal from '../modal'
import ConfirmationModal from '../confirmationBox';
import ModalNoClose from '../modal/modalNoClose';


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

const PromotionsTable = ({
  setImage,
  setImageTitle,
  data,
  buttonName,
  buttonURL,
  buttonPurpose,
  setEdit,
  setId,
  setData,
  setShouldUpdate,
  shouldUpdate
}) => {
  var i = 0;
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [id, setID] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filters, setFilters] = useState({
    status: null
  });

  const router = useRouter();

  const deleteRecord = (id) => {
    axios({
      method: 'DELETE',
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/deletePromotions?id=${id}`
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
        title="Promotions"
      />
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">#</TableCell>
              <TableCell align="center">Link</TableCell>
              <TableCell align="center">Image</TableCell>
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
                    gutterBottom
                    noWrap
                  >
                    {el.link}
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

                <TableCell align="center">
                  <Tooltip title="View Promotion" arrow>
                    <Button
                      sx={{ margin: 1 }}
                      onClick={() => {
                        setImage(el.image)
                        setImageTitle('Promotion - ' + el.link)
                      }}
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
                        color: theme.palette.error.main
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
                      onClick={() => {
                        setShowModal(true)
                        setID(el._id)
                        // deleteRecord(el._id);
                      }}
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
          <ConfirmationModal executeFunction={() => deleteRecord(id)} setShowModal={setShowModal} />
        }
      />


    </Card>
  );
};

export default PromotionsTable;
