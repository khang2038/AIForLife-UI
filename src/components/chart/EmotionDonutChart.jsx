import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';

// third-party
import ReactApexChart from 'react-apexcharts';

// ==============================|| MONTHLY BAR CHART ||============================== //

export default function EmotionDonutChart(data, isPie = false, sx) {

  const [series, setSeries] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    if (data?.data) {
      setSeries(Object.values(data.data));
      setLabels(Object.keys(data.data));
    }
  }, [data]);

  const options = {
    labels: labels,
    colors: labels.map((label) => {
      if (label === 'Mệt Mỏi' || label === 'Cáu Giận') return '#FF6666';
      if (label === 'Vui Vẻ') return '#FFD700';
      if (label === 'Thân Thiện') return '#32CD32';
      return '#00FFFF';
    }),
    plotOptions: {
      pie: {
        size: 180
      }
    },
    dataLabels: {
      enabled: true
    },
    legend: {
      position: 'bottom'
    }
  };

  console.log(isPie);

  // const { primary, secondary } = theme.palette.text;
  // const info = theme.palette.info.light;

  return (
    <Box id="chart" sx={{ py: 4, bgcolor: 'transparent', ...sx }}>
      <ReactApexChart type={isPie ? 'pie' : 'donut'} series={series} options={options} />
    </Box>
  );
}
