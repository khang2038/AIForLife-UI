// assets
import { LoginOutlined, UploadOutlined, ProfileOutlined } from '@ant-design/icons';

// icons
const icons = {
  LoginOutlined,
  UploadOutlined,
  ProfileOutlined
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const pages = {
  id: 'authentication',
  title: 'Xác thực',
  type: 'group',
  children: [
    {
      id: 'login1',
      title: 'Authentication',
      type: 'item',
      url: '/login',
      icon: icons.LoginOutlined,
      target: true
    },
    {
      id: 'register1',
      title: 'Register',
      type: 'item',
      url: '/register',
      icon: icons.UploadOutlined,
      target: true
    }
  ]
};

export default pages;
