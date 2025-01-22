// assets
import { DashboardOutlined, UploadOutlined, ProfileOutlined } from '@ant-design/icons';

// icons
const icons = {
  DashboardOutlined,
  UploadOutlined,
  ProfileOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'group-dashboard',
  title: 'Điều hướng',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard/default',
      icon: icons.DashboardOutlined,
      breadcrumbs: false
    },
    {
      id: 'import-file',
      title: 'Curriculum',
      type: 'item',
      url: '/import-file',
      icon: icons.ProfileOutlined,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
