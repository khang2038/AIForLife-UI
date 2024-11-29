// material-ui
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// project import
import MainCard from 'components/MainCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
// import MonthlyBarChart from 'components/chart/MonthlyBarChart';
import EmotionDonutChart from 'components/chart/EmotionDonutChart';
import ConversationEmotionCard from 'components/cards/statistics/ConversationEmotionCard';
import CallAnalizeTable from 'components/table/CallAnalizeTable';

// assets
import { getDetails } from 'services/detailsService';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

export default function CallDetails() {
  const { id } = useParams();

  const [details, setDetails] = useState({ emotions: [1, 2] });
  const [positiveText, setPositiveText] = useState(0);
  const [positiveSpeech, setPositiveSpeech] = useState(0);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await getDetails(id);
        const fetchedDetails = response.data;
        setDetails(fetchedDetails);

        const conclusion = fetchedDetails?.segmentAnalysisObject?.conclusion; // Sửa đúng trường
        setPositiveText(conclusion['Tích cực'] + conclusion['Bình thường']);

        setPositiveSpeech(fetchedDetails?.reviewPercentageSpeechObject?.overview_percentage?.positive_percentage);
      } catch (error) {
        console.error('Error fetching details:', error);
      }
    };

    fetchDetails();
  }, [id]);
  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* row 1 */}
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h5">Tổng quan Cuộc gọi</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Nhân viên" count={details?.fullNameEmployee}  extra="35,000" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Thời gian cuộc gọi" count={details?.durationFile} percentage={70.5} extra="8,900" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce
          title="Điểm số giọng nói"
          count={positiveSpeech + '/100'}
          percentage={27.4}
          isLoss
          color="warning"
          extra="1,943"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce
          title="Điểm số nội dung"
          count={positiveText + '/100'}
          percentage={27.4}
          isLoss
          color="warning"
          extra="$20,395"
        />
      </Grid>

      <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />

      {/* row 2 */}
      <Grid item xs={12} md={7} lg={8}>
        <ConversationEmotionCard data={details} />
      </Grid>
      <Grid item xs={12} md={5} lg={4}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Thành phần cảm xúc</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          {/* <Box sx={{ p: 3, pb: 1 }}>
            <Stack spacing={2}>
              <Typography variant="h6" color="text.secondary">
                This Week Statistics
              </Typography>
              <Typography variant="h3">$7,650</Typography>
            </Stack>
          </Box> */}
          <EmotionDonutChart data={details?.reviewSpeechObject?.emotion_percentages} />
        </MainCard>
      </Grid>

      <Grid item xs={12}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Phân tích cuộc gọi</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <CallAnalizeTable details={details} />
        </MainCard>
      </Grid>
    </Grid>
  );
}
