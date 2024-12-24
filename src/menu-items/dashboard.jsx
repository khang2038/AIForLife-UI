// assets
import { DashboardOutlined, UploadOutlined } from '@ant-design/icons';

// icons
const icons = {
  DashboardOutlined,
  UploadOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'group-dashboard',
  title: 'Điều hướng',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Bảng điều khiển',
      type: 'item',
      url: '/dashboard/default',
      icon: icons.DashboardOutlined,
      breadcrumbs: false
    },
    {
      id: 'import-file',
      title: 'Nhập File',
      type: 'item',
      url: '/import-file',
      icon: icons.UploadOutlined,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
