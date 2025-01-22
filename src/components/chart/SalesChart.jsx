import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project import
import MainCard from 'components/MainCard';

// third-party
import ReactApexChart from 'react-apexcharts';

// chart options
const columnChartOptions = {
  chart: {
    type: 'bar',
    height: 430,
    toolbar: {
      show: false
    }
  },
  plotOptions: {
    bar: {
      columnWidth: '30%',
      borderRadius: 4
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    show: true,
    width: 8,
    colors: ['transparent']
  },
  xaxis: {
    categories: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11']
  },
  yaxis: {
    title: {
      text: ''
    }
  },
  fill: {
    opacity: 1
  },
  tooltip: {
    y: {
      formatter(val) {
        return `${val}`;
      }
    }
  },
  legend: {
    show: false
  },
  responsive: [
    {
      breakpoint: 600,
      options: {
        yaxis: {
          show: false
        }
      }
    }
  ]
};

const initialSeries = [
  {
    name: 'Students feel bored',
    data: [18, 9, 35, 14, 42, 24, 17, 12, 35, 27, 22]
  },
  {
    name: 'Students feel interested',
    data: [200, 95, 140, 150, 168, 150, 200, 150, 170, 200, 168]
  }
];

// ==============================|| SALES COLUMN CHART ||============================== //

export default function SalesChart() {
  const theme = useTheme();

  const [legend, setLegend] = useState({
    income: true,
    cos: true
  });

  const { income, cos } = legend;

  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;

  const error = theme.palette.error.main;
  const primaryMain = theme.palette.primary.main;
  const successDark = theme.palette.success.dark;

  const [series, setSeries] = useState(initialSeries);

  const handleLegendChange = (event) => {
    setLegend({ ...legend, [event.target.name]: event.target.checked });
  };

  const xsDown = useMediaQuery(theme.breakpoints.down('sm'));
  const [options, setOptions] = useState(columnChartOptions);

  useEffect(() => {
    if (income && cos) {
      setSeries(initialSeries);
    } else if (income) {
      setSeries([
        {
          name: 'Students feel bored',
          data: [18, 9, 35, 14, 42, 24, 17, 12, 35, 27, 22]
        }
      ]);
    } else if (cos) {
      setSeries([
        {
          name: 'Students feel interested',
          data: [200, 95, 140, 150, 168, 150, 200, 150, 170, 200, 168]
        }
      ]);
    } else {
      setSeries([]);
    }
  }, [income, cos]);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: !(income && cos) && cos ? [primaryMain] : [error, primaryMain],
      xaxis: {
        labels: {
          style: {
            colors: [secondary, secondary, secondary, secondary, secondary, secondary]
          }
        }
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
      },
      plotOptions: {
        bar: {
          columnWidth: xsDown ? '60%' : '30%'
        }
      }
    }));
  }, [primary, secondary, line, primaryMain, successDark, income, cos, xsDown]);

  return (
    <MainCard sx={{ mt: 1 }} content={false}>
      <Box sx={{ p: 2.5, pb: 0 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack spacing={1.5}>
            <Typography variant="h6" color="secondary">
              Number of classes
            </Typography>
            <Typography variant="h4">5,204,860</Typography>
          </Stack>
          <FormControl component="fieldset">
            <FormGroup row>
              <FormControlLabel
                control={<Checkbox color="error" checked={income} onChange={handleLegendChange} name="income" />}
                label="Students feel bored"
              />
              <FormControlLabel
                control={<Checkbox checked={cos} onChange={handleLegendChange} name="cos" />}
                label="Students feel interested"
              />
            </FormGroup>
          </FormControl>
        </Stack>
        <Box id="chart" sx={{ bgcolor: 'transparent' }}>
          <ReactApexChart options={options} series={series} type="bar" height={360} />
        </Box>
      </Box>
    </MainCard>
  );
}
