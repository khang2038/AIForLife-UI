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
import IconButton from '@mui/material/IconButton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import chunk_1 from 'assets/audio/chunk_1.wav';
import chunk_2 from 'assets/audio/chunk_2.wav';
import chunk_3 from 'assets/audio/chunk_3.wav';
import chunk_4 from 'assets/audio/chunk_4.wav';

// project import
import Dot from 'components/@extended/Dot';

const headCells = [
  {
    id: 'duration',
    align: 'left',
    disablePadding: false,
    label: 'Thời lượng'
  },
  {
    id: 'text',
    align: 'left',
    disablePadding: true,
    label: 'Đoạn Văn'
  },
  {
    id: 'file',
    align: 'right',
    disablePadding: false,
    label: 'File Âm Thanh'
  },
  {
    id: 'emotionByAudio',
    align: 'left',
    disablePadding: false,
    label: 'Cảm xúc theo âm thanh'
  },
  {
    id: 'emotionByText',
    align: 'right',
    disablePadding: false,
    label: 'Cảm xúc theo nội dung'
  },
  {
    id: 'action',
    align: 'right',
    disablePadding: false,
    label: 'Thao tác'
  }
];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function CallTableHead() {
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

function CallStatus({ status }) {
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

export default function CallAnalizeTable({ details }) {
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
          <CallTableHead />
          <TableBody>
            {details?.reviewSpeechDetailObject?.predictions_details?.map((row, index) => {
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  hover
                  role="checkbox"
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  tabIndex={-1}
                  key={index + index}
                >
                  <TableCell component="th" id={labelId} scope="row">
                    <Link color="secondary"> {row?.duration}</Link>
                  </TableCell>
                  <TableCell align="right">{details?.segmentAnalysisObject?.detail?.[index]?.text}</TableCell>
                  <TableCell>{row.file}</TableCell>
                  <TableCell align="right">{row.emotion}</TableCell>
                  <TableCell align="right">{details?.segmentAnalysisObject?.detail?.[index]?.sentiment}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="success"
                      aria-label={`Call ${row.fullName}`}
                      onClick={() => {
                        let audioFile;
                        switch (index) {
                          case 0:
                            audioFile = chunk_1;
                            break;
                          case 1:
                            audioFile = chunk_2;
                            break;
                          case 2:
                            audioFile = chunk_3;
                            break;
                          case 3:
                            audioFile = chunk_4;
                            break;
                          default:
                            audioFile = chunk_1;
                            break;
                        }

                        const ringtone = new Audio(audioFile);
                        ringtone.play();
                      }}
                    >
                      <PlayArrowIcon />
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

CallTableHead.propTypes = { order: PropTypes.any, orderBy: PropTypes.string };

CallStatus.propTypes = { status: PropTypes.number };
