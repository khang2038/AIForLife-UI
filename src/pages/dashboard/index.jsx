import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// project import
import MainCard from 'components/MainCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import SaleReportCard from 'components/cards/statistics/SaleReportCard';
import OrdersTable from 'components/table/OrdersTable';
import CustomersTable from 'components/table/CustomersTable';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

export default function DashboardDefault() {
  const navigate = useNavigate();

  useEffect(() => {
    const intervalId = setInterval(() => {
      toast.error(
        <div>
          <Typography variant="body1">Có cuộc gọi tiêu cực đang xuất hiện!</Typography>
          <button
            onClick={() => navigate('/call-details/a9805456-113e-48bc-865d-cd057d28f986')}
            style={{
              marginTop: '8px',
              padding: '8px 16px',
              backgroundColor: '#f28b82',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Xem chi tiết
          </button>
        </div>,
        {
          position: 'top-right',
          autoClose: 3000,
          closeOnClick: false,
          draggable: false,
        }
      );
    }, 15000);

    return () => clearInterval(intervalId);
  }, [navigate]);

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <ToastContainer />
      {/* row 1 */}
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h5">Tổng quan</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Số lượng cuộc gọi đã hoàn thành" count="4,42,236" percentage={59.3} extra="35,000" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Số lượng cuộc gọi chưa hoàn thành" count="78,250" percentage={70.5} extra="8,900" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce
          title="Số lượng cuộc gọi đã được phân tích"
          count="18,800"
          percentage={27.4}
          isLoss
          color="warning"
          extra="1,943"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce
          title="Số lượng cuộc gọi chưa phân tích"
          count="35,078"
          percentage={27.4}
          isLoss
          color="warning"
          extra="20,395"
        />
      </Grid>

      <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />
      {/* row 4 */}
      <Grid item xs={12} md={12} lg={12}>
        <SaleReportCard />
      </Grid>
      <Grid item xs={12}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Danh sách khách hàng</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <CustomersTable />
        </MainCard>
      </Grid>

      {/* row 2 */}
      {/* <Grid item xs={12} md={7} lg={8}>
        <ConversationEmotionCard />
      </Grid>
      <Grid item xs={12} md={5} lg={4}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Báo cáo phân tích chất lượng cuộc gọi</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <Box sx={{ p: 3, pb: 0 }}>
            <Stack spacing={2}>
              <Typography variant="h6" color="text.secondary">
                Thống kê
              </Typography>
              <Typography variant="h3">Tuần này</Typography>
            </Stack>
          </Box>
          <MonthlyBarChart />
        </MainCard>
      </Grid> */}
      {/* row 3 */}
      <Grid item xs={12}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Các cuộc gọi đã hoàn thành</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <OrdersTable />
        </MainCard>
      </Grid>
    </Grid>
  );
}
