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
      const textData = data?.segmentAnalysisObject?.detail || [];
      const speechData = data?.reviewSpeechDetailObject?.predictions_details || []

      setTextScores(textData.map((item) => ((item?.percentPositive || 0) + (item?.percentNormal || 0)).toFixed(2)));
      setSpeechScores(speechData.map((item) => item?.probabilityPositive.toFixed(2) || 0));
    }
  }, [data]);

  return (
    <>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <Typography variant="h5">Phân tích cảm xúc tích cực theo thời gian</Typography>
        </Grid>
        <Grid item>
          <Stack direction="row" alignItems="center" spacing={0}>
            <Button
              size="small"
              onClick={() => setSlot('paragraph')}
              color={slot === 'paragraph' ? 'primary' : 'secondary'}
              variant={slot === 'paragraph' ? 'outlined' : 'text'}
            >
              Theo đoạn
            </Button>
            <Button
              size="small"
              onClick={() => setSlot('sentence')}
              color={slot === 'sentence' ? 'primary' : 'secondary'}
              variant={slot === 'sentence' ? 'outlined' : 'text'}
            >
              Theo câu
            </Button>
          </Stack>
        </Grid>
      </Grid>
      <MainCard content={false} sx={{ mt: 1.5 }}>
        <Box sx={{ pt: 1, pr: 2 }}>
          <EmotionAreaChart slot={slot} data1={textScores} title1="Nội dung" data2={speechScores} title2="Giọng nói" />
        </Box>
      </MainCard>
    </>
  );
}

ConversationEmotionCard.propTypes = { data: PropTypes.object };
