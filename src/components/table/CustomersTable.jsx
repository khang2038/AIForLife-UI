import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// material-ui
import {
  Link,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Avatar
} from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import CallEndIcon from '@mui/icons-material/CallEnd';

// project import
import Dot from 'components/@extended/Dot';
import { getCustomers } from 'services/customersService';

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
  const [open, setOpen] = useState(false);
  const [openCalling, setOpenCalling] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [callTime, setCallTime] = useState(0);

  useEffect(() => {
    let timer;
    if (openCalling) {
      timer = setInterval(() => {
        setCallTime((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [openCalling]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const handleOpen = (customer) => {
    setSelectedCustomer(customer);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedCustomer(null);
  };

  const handleCall = () => {
    setOpen(false);
    setOpenCalling(true);
  };

  const handleEndCall = () => {
    setOpenCalling(false);
    setCallTime(0);
  };

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
                    <IconButton color="success" aria-label={`Call ${row.fullName}`} onClick={() => handleOpen(row)}>
                      <PhoneIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Gọi điện thoại</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có muốn gọi tới số <strong>{selectedCustomer?.phoneNumber}</strong> của <strong>{selectedCustomer?.fullName}</strong> không?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Hủy
          </Button>
          <Button onClick={handleCall} color="primary" autoFocus>
            Gọi
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openCalling} onClose={handleEndCall} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontSize: '1.5rem', textAlign: 'center' }}>Đang gọi...</DialogTitle>
        <DialogContent sx={{ textAlign: 'center', padding: '24px' }}>
          {/* Avatar với hiệu ứng sóng tỏa */}
          <Box
            sx={{
              position: 'relative',
              display: 'inline-block',
              marginBottom: 2,
              mt: 10,
              width: 120, // Tăng kích thước Avatar
              height: 120
            }}
          >
            <Avatar
              src="/path-to-avatar.jpg"
              sx={{
                width: '100%',
                height: '100%',
                margin: '0 auto',
                zIndex: 2,
                position: 'relative'
              }}
            />
            {/* Sóng tỏa quanh avatar */}
            <Box
              className="wave-effect"
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: '50%',
                backgroundColor: 'rgba(63, 81, 181, 0.3)',
                animation: 'wave-animation 2s infinite',
                zIndex: 1
              }}
            />
          </Box>

          {/* Tên và số điện thoại */}
          <Typography variant="h6">{selectedCustomer?.fullName}</Typography>
          <Typography variant="body2" color="text.secondary">
            {selectedCustomer?.phoneNumber}
          </Typography>

          {/* Thời gian gọi */}
          <Typography variant="h6" sx={{ marginTop: 2, fontWeight: 'bold' }}>
            Thời gian: {formatTime(callTime)}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleEndCall}
            color="error"
            startIcon={<CallEndIcon />}
            variant="contained"
            fullWidth
            sx={{ padding: '12px 0', fontSize: '1rem' }} // Tăng kích thước nút
          >
            Kết thúc
          </Button>
        </DialogActions>

        {/* CSS cho hiệu ứng sóng */}
        <style>
          {`
      @keyframes wave-animation {
        0% {
          transform: scale(1);
          opacity: 1;
        }
        100% {
          transform: scale(2.5);
          opacity: 0;
        }
      }
      .wave-effect {
        animation: wave-animation 2s infinite;
      }
    `}
        </style>
      </Dialog>
    </Box>
  );
}

OrderTableHead.propTypes = { order: PropTypes.any, orderBy: PropTypes.string };

OrderStatus.propTypes = { status: PropTypes.number };
