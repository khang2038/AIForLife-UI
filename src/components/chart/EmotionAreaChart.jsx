import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import ReactApexChart from 'react-apexcharts';

import { range } from 'lodash';

// chart options
const areaChartOptions = {
  chart: {
    height: 450,
    type: 'area',
    toolbar: {
      show: false
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth',
    width: 2
  },
  grid: {
    strokeDashArray: 0
  }
};

// ==============================|| INCOME AREA CHART ||============================== //

export default function EmotionAreaChart({ slot, data }) {
  const theme = useTheme();

  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;

  const [options, setOptions] = useState(areaChartOptions);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [theme.palette.primary.main, theme.palette.primary[700]],
      xaxis: {
      categories: slot === 'month' ? range(1, 12) : ['Hai', 'Ba', 'Tư', 'Năm', 'Sáu', 'Bảy', 'CN'],
      labels: {
        style: {
        colors: Array(slot === 'month' ? 11 : 7).fill(secondary)
        }
      },
      axisBorder: {
        show: true,
        color: line
      },
      tickAmount: slot === 'month' ? 11 : 7
      },
      yaxis: {
      labels: {
        style: {
        colors: [secondary]
        }
      }
      },
      grid: {
      borderColor: line
      }
    }));
  }, [primary, secondary, line, theme, slot, data]);

  const [series, setSeries] = useState([
    {
      name: 'Sale',
      data: [0, 86, 28, 115, 48, 210, 136]
    },
    {
      name: 'Hỗ trợ',
      data: [0, 43, 14, 56, 24, 105, 68]
    }
  ]);

  useEffect(() => {
    setSeries([
      {
        name: 'Sale',
        data: slot === 'month' ? [76, 85, 101, 98, 87, 105, 91, 114, 94, 86, 115, 35] : [31, 40, 28, 51, 42, 109, 100]
      },
      {
        name: 'Hỗ trợ',
        data: slot === 'month' ? [110, 60, 150, 35, 60, 36, 26, 45, 65, 52, 53, 41] : [11, 32, 45, 32, 34, 52, 41]
      }
    ]);
  }, [slot]);

  return <ReactApexChart options={options} series={series} type="area" height={450} />;
}

EmotionAreaChart.propTypes = { slot: PropTypes.string, data: PropTypes.array };
