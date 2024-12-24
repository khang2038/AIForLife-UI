import React, { useState } from 'react';
import { Grid, Typography, Box, Button, IconButton, Stack, CircularProgress } from '@mui/material';
import { CloudUpload, FileDownload, Clear } from '@mui/icons-material';

// ==============================|| IMPORT FILE PAGE ||============================== //

export default function ImportFilePage() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  // Handle file upload
  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  // Handle file import (simulating with loading)
  const handleImport = () => {
    if (!file) {
      setStatus('Chưa chọn tệp để import');
      return;
    }

    setLoading(true);
    setStatus('');
    setTimeout(() => {
      setLoading(false);
      setStatus('Import thành công!');
    }, 2000); // Simulating import time
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
          <Button
            variant="contained"
            component="label"
            sx={{ padding: 2 }}
            startIcon={<FileDownload />}
          >
            Chọn Tệp
            <input
              type="file"
              hidden
              accept=".csv, .xlsx, .xls, .txt"
              onChange={handleFileUpload}
            />
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
        {status && (
          <Box sx={{ padding: 2, backgroundColor: status.includes('thành công') ? 'success.light' : 'error.light', borderRadius: 1 }}>
            <Typography variant="body1" color={status.includes('thành công') ? 'success.main' : 'error.main'}>
              {status}
            </Typography>
          </Box>
        )}
      </Grid>
    </Grid>
  );
}
