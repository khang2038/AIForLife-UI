import React, { useState } from 'react';
import { Grid, Typography, Box, Button, IconButton, Stack, CircularProgress } from '@mui/material';
import { CloudUpload, FileDownload, Clear } from '@mui/icons-material';
import { importFile } from '../../services/importFileService';
import { Pie, Bar } from 'react-chartjs-2';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import EmotionAreaChart from '../../components/chart/EmotionAreaChart';
import EmotionDonutChart from 'components/chart/EmotionDonutChart';
import MainCard from 'components/MainCard';
import 'chart.js/auto';

export default function ImportFilePage() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState();
  const [textScores, setTextScores] = useState([]);
  const [speechScores, setSpeechScores] = useState([]);

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  const handleImport = async () => {
    if (!file) {
      return;
    }

    setLoading(true);
    try {
      const _result = await importFile(file);
      console.log(_result);
      setResult(_result);
      const speechData = _result?.api_1_result?.predictions_details;
      console.log(speechData);


      setSpeechScores(speechData?.map((item) => item?.probability_positive?.toFixed(2) || 0));
    } catch (error) {
      console.error('Error importing file:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClearFile = () => {
    setFile(null);
    setResult(null);
  };

  return (
    <Grid container spacing={4}>
      {/* Header */}
      <Grid item xs={12}>
        <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center' }}>
          <CloudUpload sx={{ mr: 1 }} /> Tải lên và Import File
        </Typography>
      </Grid>

      {/* File Upload Section */}
      <Grid item xs={12} sm={6}>
        <Box sx={{ textAlign: 'center', padding: 3, border: '1px dashed', borderRadius: 2 }}>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Chọn tệp để tải lên
          </Typography>
          <Button variant="contained" component="label" sx={{ padding: 2 }} startIcon={<FileDownload />}>
            Chọn Tệp
            <input type="file" hidden accept=".csv, .xlsx, .xls, .txt" onChange={handleFileUpload} />
          </Button>
        </Box>
        {file && (
          <Box sx={{ marginTop: 2 }}>
            <Typography variant="body1">
              <strong>Tệp đã chọn:</strong> {file.name}
            </Typography>
            <Stack direction="row" spacing={2} sx={{ marginTop: 2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleImport}
                startIcon={loading ? <CircularProgress size={20} /> : <CloudUpload />}
                disabled={loading}
              >
                {loading ? 'Đang tải...' : 'Import'}
              </Button>
              <IconButton color="error" onClick={handleClearFile}>
                <Clear />
              </IconButton>
            </Stack>
          </Box>
        )}
      </Grid>
      {/* Analysis Section */}
      {result && (
        <Grid container spacing={2} mt={2} ml={3}>
          <Grid item xs={12}>
          <Grid item xs={12} sx={{ mb: -2.25, display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="h5">Tổng quan phân tích file</Typography>
          </Grid>
        </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <AnalyticEcommerce title="Thời gian" count={result.api_1_result.original_duration} percentage={70.5} extra="8,900" />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <AnalyticEcommerce
              title="Điểm số giọng nói"
              count={result.api_1_result?.overview_percentage?.positive_percentage + '/100'}
              percentage={27.4}
              isLoss
              color="warning"
              extra="1,943"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <AnalyticEcommerce
              title="Điểm số nội dung"
              count={'65' + '/100'}
              percentage={27.4}
              isLoss
              color="warning"
              extra="$20,395"
            />
          </Grid>

          <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />
          <Grid item xs={12} md={7} lg={8}>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <Typography variant="h5">Phân tích cảm xúc tích cực theo thời gian</Typography>
              </Grid>
            </Grid>
            <MainCard content={false} sx={{ mt: 1.5 }}>
              <Box sx={{ pt: 1, pr: 2 }}>
                <EmotionAreaChart slot={null} data1={[31, 40, 28, 51, 42, 109, 100]} title1="Nội dung" data2={speechScores} title2="Giọng nói" />
              </Box>
            </MainCard>
          </Grid>
          <Grid item xs={12} md={5} lg={4}>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <Typography variant="h5">Thành phần cảm xúc theo âm thanh</Typography>
              </Grid>
              <Grid item />
            </Grid>
            <MainCard sx={{ mt: 2 }} content={false}>
              <EmotionDonutChart data={result.api_1_result.emotion_percentages} />
            </MainCard>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}
