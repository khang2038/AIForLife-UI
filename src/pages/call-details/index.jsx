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
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from '@mui/material';

// assets
import { getDetails } from 'services/detailsService';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

export default function CallDetails() {
  const { id } = useParams();

  const [details, setDetails] = useState({ emotions: [1, 2] });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await getDetails(id);
        const fetchedDetails = response.data;
        setDetails(fetchedDetails);
      } catch (error) {
        console.error('Error fetching details:', error);
      }
    };

    fetchDetails();
  }, [id]);
  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* row 1 */}
      <Grid item xs={12} sx={{ mb: -2.25, display: 'flex', alignItems: 'center', gap: 1 }}>
        <IconButton color="secondary" onClick={() => navigate('/dashboard/default')} sx={{ p: 0 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5">Tổng quan Cuộc gọi</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Nhân viên" count={details?.fullNameEmployee} extra="35,000" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Thời gian cuộc gọi" count={details?.durationFile} percentage={70.5} extra="8,900" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce
          title="Điểm số giọng nói"
          count={details.reviewPercentageSpeechObject?.overview_percentage?.positive_percentage + '/100'}
          percentage={27.4}
          isLoss
          color="warning"
          extra="1,943"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce
          title="Điểm số nội dung"
          count={
            details.segmentAnalysisDetailObject?.conclusion['Tích cực'] +
            details.segmentAnalysisDetailObject?.conclusion['Bình thường'] +
            '/100'
          }
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
            <Typography variant="h5">Thành phần cảm xúc theo âm thanh</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
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
