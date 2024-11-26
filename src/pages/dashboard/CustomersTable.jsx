import PropTypes from 'prop-types';
// material-ui
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { getCustomers } from 'services/customersService';
import IconButton from '@mui/material/IconButton';
import PhoneIcon from '@mui/icons-material/Phone';

// project import
import Dot from 'components/@extended/Dot';
import { useEffect, useState } from 'react';

const headCells = [
  {
    id: 'callHistoryId',
    align: 'left',
    disablePadding: false,
    label: 'ID'
  },
  {
    id: 'fullName',
    align: 'left',
    disablePadding: true,
    label: 'Tên Khách Hàng.'
  },
  {
    id: 'phoneNumber',
    align: 'right',
    disablePadding: false,
    label: 'Số Điện Thoại'
  },
  {
    id: 'typeStatus',
    align: 'left',
    disablePadding: false,
    label: 'Trạng Thái'
  },
  {
    id: 'typeTask',
    align: 'right',
    disablePadding: false,
    label: 'Loại Công Việc'
  },
  {
    id: 'action',
    align: 'right',
    disablePadding: false,
    label: 'Thao tác'
  }
];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function OrderTableHead() {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell key={headCell.id} align={headCell.align} padding={headCell.disablePadding ? 'none' : 'normal'}>
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function OrderStatus({ status }) {
  let color;
  let title;

  switch (status) {
    case 'Chưa thực hiện':
      color = 'warning';
      title = 'Chưa thực hiện';
      break;
    case 'Đã thực hiện':
      color = 'success';
      title = 'Đã thực hiện';
      break;
    case 'Lỗi':
      color = 'error';
      title = 'Lỗi';
      break;
    default:
      color = 'primary';
      title = 'Không';
  }

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Dot color={color} />
      <Typography>{title}</Typography>
    </Stack>
  );
}

// ==============================|| ORDER TABLE ||============================== //

export default function CustomersTable() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const customers = await getCustomers();
        setCustomers(customers.data);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };

    fetchCustomers();
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
          <OrderTableHead />
          <TableBody>
            {customers?.map((row, index) => {
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
                  <TableCell>{row.fullName}</TableCell>
                  <TableCell align="right">{row.phoneNumber}</TableCell>
                  <TableCell>
                    <OrderStatus status={row.typeStatus} />
                  </TableCell>
                  <TableCell align="right">{row.typeTask}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="success"
                      aria-label={`Call ${row.fullName}`}
                      onClick={() => console.log(`Calling ${row.phoneNumber}`)}
                    >
                      <PhoneIcon />
                    </IconButton>
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

OrderStatus.propTypes = { status: PropTypes.number };
