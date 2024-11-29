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
    height: 325,
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

export default function EmotionAreaChart({ slot, data1, title1, data2, title2 }) {
  const theme = useTheme();

  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;

  const [options, setOptions] = useState(areaChartOptions);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [theme.palette.primary.main, theme.palette.primary[700]],
      xaxis: {
        categories: range(1, data1?.length, 1), // start, end, step
        labels: {
          style: {
            colors: Array(data1?.length).fill(secondary)
          }
        },
        axisBorder: {
          show: true,
          color: line
        },
        // tickAmount: slot === 'month' ? 11 : 7
        tickAmount: data1?.length
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
  }, [theme, slot, data1, data2]);

  const [series, setSeries] = useState([]);

  useEffect(() => {
    setSeries([
      {
        name: title1,
        // data: slot === 'month' ? [76, 85, 101, 98, 87, 105, 91, 114, 94, 86, 115, 35] : [31, 40, 28, 51, 42, 109, 100]
        data: data1
      },
      {
        name: title2,
        // data: slot === 'month' ? [110, 60, 150, 35, 60, 36, 26, 45, 65, 52, 53, 41] : [11, 32, 45, 32, 34, 52, 41]
        data: data2
      }
    ]);
  }, [slot, data1, data2]);

  return <ReactApexChart options={options} series={series} type="area" height={325} />;
}

EmotionAreaChart.propTypes = {
  slot: PropTypes.string,
  data1: PropTypes.array,
  title1: PropTypes.string,
  data2: PropTypes.array,
  title2: PropTypes.string
};
