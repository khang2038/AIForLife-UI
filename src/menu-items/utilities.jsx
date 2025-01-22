// assets
import {
  AppstoreAddOutlined,
  AntDesignOutlined,
  BarcodeOutlined,
  BgColorsOutlined,
  FontSizeOutlined,
  LoadingOutlined
} from '@ant-design/icons';

// icons
const icons = {
  FontSizeOutlined,
  BgColorsOutlined,
  BarcodeOutlined,
  AntDesignOutlined,
  LoadingOutlined,
  AppstoreAddOutlined
};

// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const utilities = {
  id: 'utilities',
  title: 'Tiện ích',
  type: 'group',
  children: [
    {
      id: 'util-typography',
      title: 'Teacher',
      type: 'item',
      url: '/typography',
      icon: icons.FontSizeOutlined
    },
    {
      id: 'util-color',
      title: 'Style',
      type: 'item',
      url: '/color',
      icon: icons.BgColorsOutlined
    },
  ]
};

export default utilities;
