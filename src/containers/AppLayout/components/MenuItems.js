import React from 'react'
import { Menu } from 'antd'
import { HomeOutlined, DashboardOutlined, DesktopOutlined, ReconciliationOutlined, ReconciliationFilled, 
  ShopOutlined, AppstoreOutlined, SettingOutlined, PieChartOutlined, LogoutOutlined, 
  LaptopOutlined, UsergroupAddOutlined } from '@ant-design/icons'
import { PROCUREMENT_ROUTE, QUOTATION_ROUTE } from '../../../util/routes';
import * as authService from '../../../services/api/auth'
//const { NavLink } = Menu
import { NavLink } from 'react-router-dom'

const MenuItems = (props) => {
  return (
    <React.Fragment>
      <Menu.Item key="/app">
            <NavLink to="/app">
              <HomeOutlined />
              <span>Home</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="/app/dashboard">
            <NavLink to="/app/dashboard">
              <DashboardOutlined />
              <span>Dashboard</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="/app/my-requests">
            <NavLink to="/app/my-requests">
              <DashboardOutlined />
              <span>My Requests</span>
            </NavLink>
          </Menu.Item>
          <Menu.SubMenu key="/app/requests" icon={<DesktopOutlined/>} title="Request Mgmt">
            <Menu.Item key="/app/requests/endorse">
              <NavLink to="/app/requests/endorse">
                <span>Endorse</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="/app/requests/approve">
              <NavLink to="/app/requests/approve">
                <span>Approve</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="/app/requests/assign-supplier">
              <NavLink to="/app/requests/assign-supplier">
                Assign Supplier
              </NavLink>
            </Menu.Item>
            <Menu.Item key="/app/requests">
              <NavLink to="/app/requests">
                Requests
              </NavLink>
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.Item key={PROCUREMENT_ROUTE} icon={<ReconciliationFilled />}>
            <NavLink to={`${PROCUREMENT_ROUTE}`}>
              <span>Procurements</span>
            </NavLink>
          </Menu.Item>
          <Menu.SubMenu key="/app/stores" title="Store" icon={<ShopOutlined />}>
            <Menu.Item key="/app/stores/local-purchase-orders">
              <NavLink to="/app/stores/local-purchase-orders">
                Local Purchase Orders
              </NavLink>
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.Item key="/app/departments">
            <NavLink to="/app/departments">
              <AppstoreOutlined />
              <span>Departments</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="/app/suppliers">
            <NavLink to="/app/suppliers">
              <LaptopOutlined />
              <span>Suppliers</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="8">
            <NavLink to="/app/employees">
              <UsergroupAddOutlined />
              <span>User Management</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="9">
            <NavLink to="/app/store-list">
              <ShopOutlined />
              <span>Store List</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="/app/settings" icon={<SettingOutlined />}>
            <NavLink to="/app/settings">
              <span>Settings</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="/app/reports" icon={<PieChartOutlined />}>
            <NavLink to="/app/reports">
              <span>Reports</span>
            </NavLink>
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item key="11" icon={<LogoutOutlined />}
            danger 
            onClick={()=> {
              authService.signOut()
            }}
          >
            Logout
          </Menu.Item>
    </React.Fragment>
  )
}

export default MenuItems