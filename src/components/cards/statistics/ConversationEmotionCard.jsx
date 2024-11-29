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
          <Typography variant="h5">Conversation Emotion Timeline</Typography>
        </Grid>
        <Grid item>
          <Stack direction="row" alignItems="center" spacing={0}>
            <Button
              size="small"
              onClick={() => setSlot('paragraph')}
              color={slot === 'paragraph' ? 'primary' : 'secondary'}
              variant={slot === 'paragraph' ? 'outlined' : 'text'}
            >
              Paragraph
            </Button>
            <Button
              size="small"
              onClick={() => setSlot('sentence')}
              color={slot === 'sentence' ? 'primary' : 'secondary'}
              variant={slot === 'sentence' ? 'outlined' : 'text'}
            >
              Sentence
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
