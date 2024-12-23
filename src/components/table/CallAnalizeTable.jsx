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
import chunk_1_Hung from 'assets/audio/chunk_1_Hung.wav';
import chunk_1_Khang from 'assets/audio/chunk_1_Khang.wav';
import chunk_1_Phong from 'assets/audio/chunk_1_Phong.wav';
import chunk_1_Vinh from 'assets/audio/chunk_1_Vinh.wav';
import chunk_2_Hung from 'assets/audio/chunk_2_Hung.wav';
import chunk_2_Khang from 'assets/audio/chunk_2_Khang.wav';
import chunk_2_Phong from 'assets/audio/chunk_2_Phong.wav';
import chunk_2_Vinh from 'assets/audio/chunk_2_Vinh.wav';
import chunk_3_Hung from 'assets/audio/chunk_3_Hung.wav';
import chunk_3_Khang from 'assets/audio/chunk_3_Khang.wav';
import chunk_3_Phong from 'assets/audio/chunk_3_Phong.wav';
import chunk_3_Vinh from 'assets/audio/chunk_3_Vinh.wav';
import chunk_4_Hung from 'assets/audio/chunk_4_Hung.wav';
import chunk_4_Khang from 'assets/audio/chunk_4_Khang.wav';
import chunk_4_Phong from 'assets/audio/chunk_4_Phong.wav';
import chunk_4_Vinh from 'assets/audio/chunk_4_Vinh.wav';
import { Chip } from '@mui/material';

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

              const isPositiveAudioEmotion = row.emotion === 'Thân Thiện' || row.emotion === 'Vui Vẻ';
              const isNegativeAudioEmotion = row.emotion === 'Mệt Mỏi' || row.emotion === 'Cáu Giận';
              const isNegativeTextSentiment = details?.segmentAnalysisObject?.detail?.[index]?.sentiment === 'Tiêu cực';
              const isPositiveTextSentiment = details?.segmentAnalysisObject?.detail?.[index]?.sentiment === 'Tích cực';

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
                  <TableCell align="right">
                    <Chip
                      label={row.emotion}
                      sx={{
                        backgroundColor: isNegativeAudioEmotion ? '#FF8080' : isPositiveAudioEmotion ? '#80FF80' : '#80C7FF',
                        color: '#000'
                      }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Chip
                      label={details?.segmentAnalysisObject?.detail?.[index]?.sentiment}
                      sx={{
                        backgroundColor: isNegativeTextSentiment ? '#FF8080' : isPositiveTextSentiment ? '#80FF80' : '#80C7FF',
                        color: '#000'
                      }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="success"
                      aria-label={`Call ${row.fullName}`}
                      onClick={() => {
                        let audioFile;
                        const fileName = row.file.replace('.wav', '');

                        switch (fileName) {
                          case 'chunk_1_Hung':
                            audioFile = chunk_1_Hung;
                            break;
                          case 'chunk_1_Khang':
                            audioFile = chunk_1_Khang;
                            break;
                          case 'chunk_1_Phong':
                            audioFile = chunk_1_Phong;
                            break;
                          case 'chunk_1_Vinh':
                            audioFile = chunk_1_Vinh;
                            break;
                          case 'chunk_2_Hung':
                            audioFile = chunk_2_Hung;
                            break;
                          case 'chunk_2_Khang':
                            audioFile = chunk_2_Khang;
                            break;
                          case 'chunk_2_Phong':
                            audioFile = chunk_2_Phong;
                            break;
                          case 'chunk_2_Vinh':
                            audioFile = chunk_2_Vinh;
                            break;
                          case 'chunk_3_Hung':
                            audioFile = chunk_3_Hung;
                            break;
                          case 'chunk_3_Khang':
                            audioFile = chunk_3_Khang;
                            break;
                          case 'chunk_3_Phong':
                            audioFile = chunk_3_Phong;
                            break;
                          case 'chunk_3_Vinh':
                            audioFile = chunk_3_Vinh;
                            break;
                          case 'chunk_4_Hung':
                            audioFile = chunk_4_Hung;
                            break;
                          case 'chunk_4_Khang':
                            audioFile = chunk_4_Khang;
                            break;
                          case 'chunk_4_Phong':
                            audioFile = chunk_4_Phong;
                            break;
                          case 'chunk_4_Vinh':
                            audioFile = chunk_4_Vinh;
                            break;
                          default:
                            audioFile = chunk_1_Hung;
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
