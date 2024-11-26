import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';

// third-party
import ReactApexChart from 'react-apexcharts';

// chart options
const options = {
  labels: ['Vui', 'Buồn', 'Giận', 'Mệt'],
  plotOptions: {
    pie: {
      size: 180
    }
  },
  dataLabels: {
    enabled: false
  }
};

// ==============================|| MONTHLY BAR CHART ||============================== //

export default function EmotionDonutChart(isPie = false, sx) {
  const theme = useTheme();
  console.log(isPie);
  // const { primary, secondary } = theme.palette.text;
  // const info = theme.palette.info.light;

  const [series, setSeries] = useState([44, 55, 13, 33]);

  return (
    <Box id="chart" sx={{ bgcolor: 'transparent', ...sx }}>
      <ReactApexChart type={isPie ? 'pie' : 'donut'} series={series} options={options} />
    </Box>
  );
}
