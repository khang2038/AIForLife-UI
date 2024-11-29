import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

// material-ui
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project import
import MainCard from 'components/MainCard';
import EmotionAreaChart from '../../chart/EmotionAreaChart';

// ==============================|| DEFAULT - UNIQUE VISITOR ||============================== //

export default function ConversationEmotionCard({ data }) {
  const [slot, setSlot] = useState('sentence');
  const [textScores, setTextScores] = useState([]);
  const [speechScores, setSpeechScores] = useState([]);

  useEffect(() => {
    if (data) {
      const textData = data?.segmentAnalysisObject?.detail || []; // Sai trong database, trường đúng là segmentAnalysisDetailObject
      const speechData = data?.reviewSpeechDetailObject?.predictions_details || [];

      setTextScores(textData.map((item) => (item?.percentPositive || 0) + (item?.percentNormal || 0)));
      setSpeechScores(speechData.map((item) => item?.probabilityPositive || 0));
    }
  }, [data]);

  return (
    <>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <Typography variant="h5">Thống kê cuộc gọi theo mục tiêu</Typography>
        </Grid>
        <Grid item>
          <Stack direction="row" alignItems="center" spacing={0}>
            <Button
              size="small"
              onClick={() => setSlot('week')}
              color={slot === 'week' ? 'primary' : 'secondary'}
              variant={slot === 'week' ? 'outlined' : 'text'}
            >
              Tuần Này
            </Button>
            <Button
              size="small"
              onClick={() => setSlot('month')}
              color={slot === 'month' ? 'primary' : 'secondary'}
              variant={slot === 'month' ? 'outlined' : 'text'}
            >
              Tháng này
            </Button>
          </Stack>
        </Grid>
      </Grid>
      <MainCard content={false} sx={{ mt: 1.5 }}>
        <Box sx={{ pt: 1, pr: 2 }}>
          <EmotionAreaChart slot={slot} data1={textScores} title1="Content" data2={speechScores} title2="Speech" />
        </Box>
      </MainCard>
    </>
  );
}

ConversationEmotionCard.propTypes = { data: PropTypes.object };
