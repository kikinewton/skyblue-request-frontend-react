import React from 'react'
import { Menu, Layout, Dropdown } from 'antd'
import "../../../styles/layout.less"
import * as authService from '../../../services/api/auth'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined,
  DashboardOutlined,
  AppstoreOutlined,
  UsergroupAddOutlined,
  SettingOutlined,
  PieChartOutlined,
  LogoutOutlined,
  DesktopOutlined,
  ShopOutlined,
  ReconciliationOutlined,
  UserOutlined,
  AccountBookOutlined,
  SendOutlined
} from '@ant-design/icons';
import { NavLink, useLocation } from 'react-router-dom';
import { PROCUREMENT_ROUTE } from '../../../util/routes';
import { FUNCTIONAL_ROLES } from '../../../util/constants';
import { EMPLOYEE_ROLE } from '../../../util/datas';
//import { HOME_ROUTE, LOGIN_ROUTE } from '../../../util/routes';

const CollapsibleLayout = (props) => {
  const [collapsed, setCollapsed] = React.useState(false)
  const { Header, Sider, Content, Footer } = Layout
  const location = useLocation()
  const { currentUser } = props

  const toggle = () => {
    setCollapsed(!collapsed)
  }

  const handleMenuClick = () => {
    console.log('menu click')
  }

  const profileMenu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1" icon={<LogoutOutlined />} onClick={()=> authService.signOut()}>
        Logout
      </Menu.Item>
    </Menu>
  )

  return (
    <Layout className="bs-layout">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        {/* <div className="bs-logo" /> */}
        <div style={{color: '#fff', padding: '10px 0px 10px 20px', marginBottom: 10}}>
          <img width="30" height="40" src="https://www.blueskies.com/wp-content/uploads/2017/10/logo-01.png" alt="" loading="eager" />
          <span>Blueskies</span>
        </div>
        
        <Menu 
          theme="dark" 
          style={{height: "100vh"}}
          mode="inline"
          defaultSelectedKeys={["/app"]}
          selectedKeys={[location.pathname]}
        >
          <Menu.Item key="/app">
            <NavLink to="/app">
              <HomeOutlined />
              <span>Home</span>
            </NavLink>
          </Menu.Item>
          {authService.userHasAnyRole(currentUser.role, FUNCTIONAL_ROLES.dashboardRoles) &&   
            <Menu.Item key="/app/dashboard">
              <NavLink to="/app/dashboard">
                <DashboardOutlined />
                <span>Dashboard</span>
              </NavLink>
            </Menu.Item>
          }
          <Menu.Item key="/app/my-requests">
            <NavLink to="/app/my-requests">
              <SendOutlined />
              <span>My Requests</span>
            </NavLink>
          </Menu.Item>
          {authService.userHasAnyRole(currentUser.role, FUNCTIONAL_ROLES.requestMenu) && 
            <Menu.SubMenu key="/app/requests" icon={<DesktopOutlined/>} title="Request Mgmt">
              {authService.userHasAnyRole(currentUser.role, [EMPLOYEE_ROLE.ROLE_HOD]) && 
                <Menu.Item key="/app/requests/endorse">
                  <NavLink to="/app/requests/endorse">
                    <span>Endorse</span>
                  </NavLink>
                </Menu.Item>
              }
              {authService.userHasAnyRole(currentUser.role, [EMPLOYEE_ROLE.ROLE_GENERAL_MANAGER]) && 
                <Menu.Item key="/app/requests/approve">
                  <NavLink to="/app/requests/approve">
                    <span>Approve</span>
                  </NavLink>
                </Menu.Item>
              }
            </Menu.SubMenu>
          }
          {authService.userHasAnyRole(currentUser.role, [EMPLOYEE_ROLE.ROLE_PROCUREMENT_OFFICER]) && 
            <Menu.SubMenu key={PROCUREMENT_ROUTE} icon={<ReconciliationOutlined />} title="Procurement">
              <Menu.Item key={`${PROCUREMENT_ROUTE}/suppliers`}>
                <NavLink to={`${PROCUREMENT_ROUTE}/suppliers`}>
                  Suppliers
                </NavLink>
              </Menu.Item>
              <Menu.Item key={`${PROCUREMENT_ROUTE}/assign-suppliers`}>
                <NavLink to={`${PROCUREMENT_ROUTE}/assign-suppliers`}>
                  Assign Supplier
                </NavLink>
              </Menu.Item>
              <Menu.Item key={`${PROCUREMENT_ROUTE}/attach-document`}>
                <NavLink to={`${PROCUREMENT_ROUTE}/attach-document`}>
                  Add Quotation
                </NavLink>
              </Menu.Item>
              <Menu.Item key={`${PROCUREMENT_ROUTE}/add-local-purchase-order`}>
                <NavLink to={`${PROCUREMENT_ROUTE}/add-local-purchase-order`}>
                  Create LPO
                </NavLink>
              </Menu.Item>
              <Menu.Item key={`${PROCUREMENT_ROUTE}/local-purchase-orders`}>
                <NavLink to={`${PROCUREMENT_ROUTE}/local-purchase-orders`}>
                  Local Purchase Orders
                </NavLink>
              </Menu.Item>
              <Menu.Item key={`${PROCUREMENT_ROUTE}/request-categories`}>
                <NavLink to={`${PROCUREMENT_ROUTE}/request-categories`}>
                  Request Categories
                </NavLink>
              </Menu.Item>
            </Menu.SubMenu>
          }
          {authService.userHasAnyRole(currentUser.role, [EMPLOYEE_ROLE.ROLE_STORE_OFFICER]) && 
            <Menu.SubMenu key="/app/stores" title="Store" icon={<ShopOutlined />}>
              <Menu.Item key="/app/stores/local-purchase-orders">
                <NavLink to="/app/stores/local-purchase-orders">
                  Local Purchase Orders
                </NavLink>
              </Menu.Item>
              <Menu.Item key="/app/stores/receive-items">
                <NavLink to="/app/stores/receive-items">
                  Receive Goods
                </NavLink>
              </Menu.Item>
            </Menu.SubMenu>
          }
          {authService.userHasAnyRole(currentUser.role, [EMPLOYEE_ROLE.ROLE_ACCOUNT_OFFICER, EMPLOYEE_ROLE.ROLE_CHIEF_ACCOUNT_OFFICER]) && 
            <Menu.SubMenu key="/app/account" title="Accounts" icon={<AccountBookOutlined />}>
              <Menu.Item key="/app/account/goods-receive-notes">
                <NavLink to="/app/account/goods-receive-notes">
                  Make Payment
                </NavLink>
              </Menu.Item>
              <Menu.Item key="/app/account/payments">
                <NavLink to="/app/account/payments">
                  Payments
                </NavLink>
              </Menu.Item>
            </Menu.SubMenu>
          }
          <Menu.SubMenu key="/app/audit" title="Audit" icon={<AccountBookOutlined />}>
            <Menu.Item key="/app/audit/approve-payment">
              <NavLink to="/app/audit/approve-payment">
                Approve Payments
              </NavLink>
            </Menu.Item>
            <Menu.Item key="/app/audit/payments">
              <NavLink to="/app/audit/payments">
                Payments
              </NavLink>
            </Menu.Item>
          </Menu.SubMenu>
          {authService.userHasAnyRole(currentUser.role, FUNCTIONAL_ROLES.listDepartmentsRoles) && 
            <Menu.Item key="/app/departments">
              <NavLink to="/app/departments">
                <AppstoreOutlined />
                <span>Departments</span>
              </NavLink>
            </Menu.Item>
          }
          {authService.userHasAnyRole(currentUser.role, FUNCTIONAL_ROLES.listUserRoles) && 
            <Menu.Item key="/app/employees">
              <NavLink to="/app/employees">
                <UsergroupAddOutlined />
                <span>User Management</span>
              </NavLink>
            </Menu.Item>
          }
          <Menu.Item key="/app/settings" icon={<SettingOutlined />}>
            <NavLink to="/app/settings">
              <span>Settings</span>
            </NavLink>
          </Menu.Item>
          {authService.userHasAnyRole(currentUser.role, FUNCTIONAL_ROLES.report) && 
            <Menu.Item key="/app/reports" icon={<PieChartOutlined />}>
              <NavLink to="/app/reports">
                <span>Reports</span>
              </NavLink>
            </Menu.Item>
          }
          <Menu.Item key="11" icon={<LogoutOutlined />}
            danger 
            onClick={()=> {
              authService.signOut()
            }}
          >
            Logout
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="bs-site-layout">
        <Header className="bs-site-layout-background" style={{ padding: 0 }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'bs-trigger',
            onClick: toggle,
          })}
          <div 
            style={{float: 'right', marginRight: 10, display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', 
            alignItems: 'center', cursor: 'pointer', height: '100%'}}
          >
            {/* <UserOutlined /> <span>{currentUser.fullName}</span> */}
            <Dropdown.Button overlay={profileMenu} placement="bottomLeft" icon={<UserOutlined />}>
              {currentUser.fullName}
            </Dropdown.Button>
          </div>
          
        </Header>
        <Content
          className="bs-site-layout-content"
          style={{
            margin: '24px 16px',
            padding: 10,
            minHeight: 380
          }}
        >
          {props.children}
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Blueskies Procurement Application ©2021 Created by Tech-Bridge
        </Footer>
      </Layout>
    </Layout>
  )
}

export default CollapsibleLayout