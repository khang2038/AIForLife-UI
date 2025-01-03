import PropTypes from 'prop-types';
// material-ui
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import React from 'react';
import { getAllDetails } from 'services/detailsService';
import { useNavigate } from 'react-router-dom';

function createData(callHistoryId, fullNameEmployee, task, predictOverview, duration) {
  return { callHistoryId, fullNameEmployee, task, predictOverview, duration };
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}


function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'callHistoryId',
    align: 'left',
    disablePadding: false,
    label: 'Mã cuộc gọi'
  },
  {
    id: 'fullNameEmployee',
    align: 'left',
    disablePadding: true,
    label: 'Nhân viên'
  },
  {
    id: 'typeTask',
    align: 'left',
    disablePadding: false,
    label: 'Mục tiêu'
  },
  {
    id: 'predictOverview',
    align: 'left',
    disablePadding: true,
    label: 'Đánh giá'
  },
  {
    id: 'durationFile',
    align: 'left',
    disablePadding: false,
    label: 'Thời gian cuộc gọi'
  },
  {
    id: 'action',
    align: 'right',
    disablePadding: false,
    label: 'Hành động'
  }
];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function OrderTableHead({ order, orderBy }) {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

// ==============================|| ORDER TABLE ||============================== //

export default function OrderTable() {
  const order = 'asc';
  const orderBy = 'callHistoryId';
  const navigate = useNavigate();
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    const fetchData = async () => {
      const response = await getAllDetails();
      const newData = response.data.map((item) => {
        const row = createData(item.callHistoryId, item.fullNameEmployee, item.typeTask, item.predictOverview, item.durationFile);
        return row;
      });
      setData(newData);
    };
    fetchData();
  }, []);

  return (
    <Box>
      <TableContainer
        sx={{
          width: '100%',
          overflowX: 'auto',
          position: 'relative',
          display: 'block',
          maxWidth: '100%',
          '& td, & th': { whiteSpace: 'nowrap' }
        }}
      >
        <Table aria-labelledby="tableTitle">
          <OrderTableHead order={order} orderBy={orderBy} />
          <TableBody>
            {stableSort(data, getComparator(order, orderBy)).map((row, index) => {
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  hover
                  role="checkbox"
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  tabIndex={-1}
                  key={row.callHistoryId}
                >
                  <TableCell component="th" id={labelId} scope="row">
                    <Link color="secondary"> {row.callHistoryId}</Link>
                  </TableCell>
                  <TableCell align="left">{row.fullNameEmployee}</TableCell>
                  <TableCell align="left">{row.task}</TableCell>
                  <TableCell align="left">
                    <Button
                      variant="outlined"
                      color={row.predictOverview === 'Tiêu cực' ? 'error' : 'success' }
                      onClick={() => console.log('Clicked row:', row.callHistoryId)}
                      style={{ textTransform: 'none' }}
                    >
                      {row.predictOverview}
                    </Button>
                  </TableCell>
                  <TableCell align="left">{row.duration}s</TableCell>
                  <TableCell align="right">
                    <Link
                      color="secondary"
                      onClick={() => navigate('/call-details/' + row.callHistoryId)}
                      style={{ cursor: 'pointer' }}
                    >
                      Xem chi tiết
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

OrderTableHead.propTypes = { order: PropTypes.any, orderBy: PropTypes.string };
