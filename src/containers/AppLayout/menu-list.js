import { AppstoreOutlined, BankOutlined, DashboardOutlined, FunnelPlotOutlined, GroupOutlined, HomeOutlined, PieChartOutlined, ReconciliationOutlined, SettingOutlined, ShopOutlined, ShoppingOutlined, UserSwitchOutlined, WalletOutlined } from '@ant-design/icons';
import { MenuProps } from 'antd';
import React from 'react';
import { NavLink } from 'react-router-dom';



function getItem(
  label,
  key,
  icon,
  children,
  type,
) {
  return {
    key,
    icon,
    children,
    label,
    type,
  }
}


export const items = [
  getItem(<NavLink to='/'>HOME</NavLink>, '/', <HomeOutlined/>),
  getItem(<NavLink to='/dashboard'>DASHBOARD</NavLink>, 'dashboard', <DashboardOutlined/>),
  getItem(<NavLink to='/dashboard'>MY REQUESTS</NavLink>, 'my-requests', <DashboardOutlined/>),
  getItem('REQUESTS', 'requests', <ReconciliationOutlined/>, [
    getItem(<NavLink to='/inventory/products'>Products</NavLink>, 'inventory/products', <ShopOutlined/>),
    getItem(<NavLink to='/inventory/product-categories'>Categories</NavLink>, 'inventory/product-categories', <GroupOutlined/>),
    getItem(<NavLink to='/inventory/skus'>Unit of Measurement</NavLink>, 'inventory/skus', <FunnelPlotOutlined/>)
  ]),
  getItem('Reports', 'reports', <PieChartOutlined/>, [
    getItem(<NavLink to='/reports/sales'>Sales Report</NavLink>, '/reports/sales', <ShoppingOutlined/>),
    getItem(<NavLink to='/reports/purchase'>Purchase Report</NavLink>, '/reports/purchases', <BankOutlined/>),
    getItem(<NavLink to='/reports/financial'>Financial Report</NavLink>, '/reports/financial', <WalletOutlined/>)
  ]),
  getItem(<NavLink to='/users'>User Management</NavLink>, '/users', <UserSwitchOutlined/>),
  getItem(<NavLink to='/settings'>System Settings</NavLink>, '/settings', <SettingOutlined/>)
]