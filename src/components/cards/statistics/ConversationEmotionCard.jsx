import PropTypes from 'prop-types';
import { useState } from 'react';

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

export default function ConversationEmotionCard({ emotions }) {
  const [slot, setSlot] = useState('sentence');

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
          <EmotionAreaChart slot={slot} data={emotions} />
        </Box>
      </MainCard>
    </>
  );
}

ConversationEmotionCard.propTypes = { emotions: PropTypes.object };