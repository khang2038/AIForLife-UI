import React, { useState } from 'react';
import { Grid, Typography, Box, Button, IconButton, Stack, CircularProgress } from '@mui/material';
import { CloudUpload, FileDownload, Clear } from '@mui/icons-material';
import { importFile } from '../../services/importFileService';
import { Pie, Bar } from 'react-chartjs-2';
import 'chart.js/auto';

// ==============================|| IMPORT FILE PAGE ||============================== //

export default function ImportFilePage() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [result, setResult] = useState();  
  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  const handleImport = async () => {
    if (!file) {
      setStatus('Chưa chọn tệp để import');
      return;
    }

    setLoading(true);
    setStatus('');

    try {
      console.log(file);
      const _result = await importFile(file);
      setResult(_result);
    } catch (error) {
      setStatus('Đã xảy ra lỗi khi import tệp');
      console.error('Error importing file:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle file clear
  const handleClearFile = () => {
    setFile(null);
    setStatus('');
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

      {/* Status Message */}
      <Grid item xs={12}>
        {/* {status && (
          <Box sx={{ padding: 2, backgroundColor: status.includes('thành công') ? 'success.light' : 'error.light', borderRadius: 1 }}>
            <Typography variant="body1" color={status.includes('thành công') ? 'success.main' : 'error.main'}>
              {status}
            </Typography>
          </Box>
        )} */}
        <AnalysisCharts importResult={result}/>
      </Grid>
    </Grid>
  );
}

function AnalysisCharts({ importResult }) {
  if (!importResult) {
    return (
      <Typography variant="body1" color="error">
        Chưa có dữ liệu để phân tích.
      </Typography>
    );
  }
  const { emotion_percentages, overview_percentage, predictions_details } = importResult;

  // Dữ liệu cho biểu đồ tròn (Phân bổ cảm xúc)
  const pieData = {
    labels: Object.keys(emotion_percentages),
    datasets: [
      {
        data: Object.values(emotion_percentages),
        backgroundColor: ['#4caf50', '#ff5722', '#03a9f4'], // Tùy chỉnh màu
        hoverBackgroundColor: ['#66bb6a', '#ff7043', '#29b6f6']
      }
    ]
  };

  // Dữ liệu cho biểu đồ thanh (Tổng quan cảm xúc)
  const barData = {
    labels: ['Tích cực', 'Tiêu cực'],
    datasets: [
      {
        label: 'Tỷ lệ (%)',
        data: [overview_percentage.positive_percentage, overview_percentage.negative_percentage],
        backgroundColor: ['#4caf50', '#f44336'], // Tích cực: xanh lá, Tiêu cực: đỏ
        borderWidth: 1
      }
    ]
  };

  return (
    <Grid container spacing={4}>
      {/* Tiêu đề */}
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>
          Phân Tích Kết Quả Import
        </Typography>
      </Grid>

      {/* Biểu đồ tròn */}
      <Grid item xs={12} md={6}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            Phân Bổ Cảm Xúc
          </Typography>
          <Pie data={pieData} />
        </Box>
      </Grid>

      {/* Biểu đồ thanh */}
      <Grid item xs={12} md={6}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            Tổng Quan Cảm Xúc
          </Typography>
          <Bar data={barData} options={{ indexAxis: 'y' }} />
        </Box>
      </Grid>

      {/* Chi tiết dự đoán */}
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Chi Tiết Dự Đoán
        </Typography>
        {predictions_details.map((detail, index) => (
          <Box key={index} sx={{ mb: 2, p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
            <Typography variant="body1">
              <strong>File:</strong> {detail.file}
            </Typography>
            <Typography variant="body1">
              <strong>Cảm Xúc:</strong> {detail.emotion}
            </Typography>
            <Typography variant="body1">
              <strong>Thời lượng:</strong> {detail.duration.toFixed(2)} giây
            </Typography>
            <Typography variant="body1">
              <strong>Xác suất tích cực:</strong> {detail.probability_positive.toFixed(2)}%
            </Typography>
            <Typography variant="body1">
              <strong>Xác suất tiêu cực:</strong> {detail.probability_negative.toFixed(2)}%
            </Typography>
          </Box>
        ))}
      </Grid>
    </Grid>
  );
}
