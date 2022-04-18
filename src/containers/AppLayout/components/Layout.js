import React, { useEffect } from 'react'
import { Menu, Layout, Dropdown, Col, Row, notification } from 'antd'
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
  ShopOutlined,
  ReconciliationOutlined,
  UserOutlined,
  SendOutlined,
  ShoppingCartOutlined,
  ProfileOutlined,
  WalletOutlined,
} from '@ant-design/icons';
import { NavLink, useLocation, useRouteMatch } from 'react-router-dom';
import { PROCUREMENT_ROUTE } from '../../../util/routes';
import { FUNCTIONAL_ROLES } from '../../../util/constants';
import { EMPLOYEE_ROLE } from '../../../util/datas';
import PropTypes from "prop-types" 
//const logo = require("../../../assets/logo.png")
import logo from "../../../assets/logo512.png"
import NotificationBadge from '../../../shared/NotificationBadge';
//import { HOME_ROUTE, LOGIN_ROUTE } from '../../../util/routes';

const CollapsibleLayout = (props) => {
  const [collapsed, setCollapsed] = React.useState(false)
  const { Header, Sider, Content, Footer } = Layout
  const [key, setKey] = React.useState("home")
  const location = useLocation()
  const { currentUser, notifications, fetchNotifications } = props
  const { path } = useRouteMatch()

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

  const handleMenuChange = (value) => {
    setKey(value)
  }

  useEffect(() => {
    fetchNotifications();
  }, [])

  React.useEffect(()=> {
    console.log("pathname", location.pathname)
    const { pathname } = location
    if(pathname.includes("/app/my-requests")) {
      setKey("my-requests")
    } else if(pathname.includes("/app/dashboard")) {
      setKey("dashboard")
    } else if(pathname.includes("/app/departments")) {
      setKey("department")
    } else if(pathname.includes("/app/employees")) {
      setKey("employee")
    } else if(pathname.includes("/app/settings")) {
      setKey("setting")
    } else if(pathname.includes("/app/request-items")) {
      setKey("request")
    } else if(pathname.includes("/app/petty-cash")) {
      setKey("petty-cash")
    } else if(pathname.includes("/app/float")) {
      setKey("float")
    } else if(pathname.includes("/app/local-purchase-orders")) {
      setKey("/app/local-purchase-orders")
    } else if(pathname.includes("/app/procurement/create-quotation")) {
      setKey("/app/procurement/create-quotation")
    } else if(pathname.includes("/app/suppliers")) {
      setKey("/app/suppliers")
    }  else if(pathname.includes("/app/quotations")) {
      setKey("/app/quotations")
    } else if(pathname.includes("/app/procurement/assign-suppliers")) {
      setKey("assign-suppliers")
    } else if(pathname.includes("/app/procurement/rfqs")) {
      setKey("procurement/rfqs")
    } else if(pathname.includes("/app/procurement/request-categories")) {
      setKey("procurement/request-categories")
    } else if(pathname.includes("/app/store")) {
      setKey("/app/store")
    } else if(pathname.includes("/app/grn")) {
      setKey("/app/grn")
    } else if(pathname.includes("/app/account/goods-receive-notes")) {
      setKey("/app/account/goods-receive-notes")
    } else if(pathname.includes("/app/account")) {
      setKey("/app/account")
    }  else if(pathname.includes("/app/payments")) {
      setKey("/app/payments")
    } else if(pathname.includes("/app/reports")) {
      setKey("/app/reports")
    }
    else {
      setKey("home")
    }
  }, [key])

  return (
    <Layout className="bs-layout">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        {/* <div className="bs-logo" /> */}
        <div style={{color: '#fff', padding: '10px 0px 10px 20px', marginBottom: 10}}>
          {/* <img width="30" height="40" src="https://www.blueskies.com/wp-content/uploads/2017/10/logo-01.png" alt="" loading="eager" /> */}
          {/* <img width="30" height="40" src="logo512.png" alt="logo"/> */}
          <img width="30" height="40" src={logo} alt="company_logo" />
          <span>Blueskies</span>
        </div>
        
        <Menu
          theme="dark" 
          style={{height: "100vh", overflowY: "auto"}}
          mode="inline"
          defaultSelectedKeys={["/app"]}
          selectedKeys={[key]}
          forceSubMenuRender={true}
          onClick={(value) => setKey(value)}
          defaultOpenKeys={["procurement"]}
          onChange={handleMenuChange}
        >
          <Menu.Item key="home">
            <NavLink to="/app">
              <HomeOutlined />
              <span>Home</span>
            </NavLink>
          </Menu.Item>
          {authService.userHasAnyRole(currentUser.role, FUNCTIONAL_ROLES.dashboardRoles) &&   
            <Menu.Item key="dashboard">
              <NavLink to="/app/dashboard">
                <DashboardOutlined />
                <span>Dashboard</span>
              </NavLink>
            </Menu.Item>
          }
          {authService.userHasAnyRole(currentUser.role, [EMPLOYEE_ROLE.ROLE_REGULAR]) && (
            <>
              <Menu.Item key="my-requests">
                <NavLink to="/app/my-requests">
                  <SendOutlined />
                  <span>My Requests</span>
                </NavLink>
              </Menu.Item>
            </>
          )}
          {authService.userHasAnyRole(currentUser.role, [EMPLOYEE_ROLE.ROLE_HOD, EMPLOYEE_ROLE.ROLE_GENERAL_MANAGER, EMPLOYEE_ROLE.ROLE_ADMIN]) && (
            <>
              <Menu.Item key="request">
                <NavLink to="/app/request-items">
                  <ReconciliationOutlined />
                  <span>Item requests</span>
                </NavLink>
              </Menu.Item>
              <Menu.Item key="petty-cash">
                <NavLink to="/app/petty-cash">
                  <ReconciliationOutlined />
                  <span>Petty cash requests</span>
                </NavLink>
              </Menu.Item>
            </>
          )}
          {authService.userHasAnyRole(currentUser.role, [EMPLOYEE_ROLE.ROLE_HOD, EMPLOYEE_ROLE.ROLE_GENERAL_MANAGER, EMPLOYEE_ROLE.ROLE_AUDITOR]) && (
            <>
              <Menu.Item key="float">
                <NavLink to="/app/float">
                  <ReconciliationOutlined />
                  <span>Float requests</span>
                </NavLink>
              </Menu.Item>
            </>
          )}
          {authService.userHasAnyRole(currentUser.role, [EMPLOYEE_ROLE.ROLE_CHIEF_ACCOUNT_OFFICER,
           EMPLOYEE_ROLE.ROLE_GENERAL_MANAGER, EMPLOYEE_ROLE.ROLE_ACCOUNT_OFFICER, 
            EMPLOYEE_ROLE.ROLE_AUDITOR, EMPLOYEE_ROLE.ROLE_FINANCIAL_MANAGER]) && (
              <Menu.Item key="/app/payments">
                <NavLink to="/app/payments">
                  <WalletOutlined />
                  <span>Payments</span>
                </NavLink>
              </Menu.Item>
           )}
          {authService.userHasAnyRole(currentUser.role, [EMPLOYEE_ROLE.ROLE_HOD, EMPLOYEE_ROLE.ROLE_GENERAL_MANAGER, 
            EMPLOYEE_ROLE.ROLE_STORE_OFFICER, EMPLOYEE_ROLE.ROLE_PROCUREMENT_MANAGER]) && (
            <Menu.Item key="/app/grn">
              <NavLink to="/app/grn">
                <ShopOutlined />
                <span>Goods Receive Note</span>
              </NavLink>
            </Menu.Item>
          )}
          {authService.userHasAnyRole(currentUser.role, 
            [EMPLOYEE_ROLE.ROLE_PROCUREMENT_OFFICER, EMPLOYEE_ROLE.ROLE_PROCUREMENT_MANAGER]) && 
            <Menu.SubMenu
              key="procurement"
              icon={<ReconciliationOutlined />} 
              title="Procurement"
            >
              <Menu.Item key="assign-suppliers">
                <NavLink to={`${PROCUREMENT_ROUTE}/assign-suppliers`}>
                  {notifications.assignSupplierProcurement ? (
                    <NotificationBadge count={notifications.assignSupplierProcurement}>
                      Assign Supplier
                    </NotificationBadge>
                  ) : (<span>Assign Supplier</span>)}
                </NavLink>
              </Menu.Item>
              <Menu.Item key={`procurement/rfqs`}>
                <NavLink to={`${PROCUREMENT_ROUTE}/rfqs`}>
                  RFQs
                </NavLink>
              </Menu.Item>
              <Menu.Item key={`procurement/request-categories`}>
                <NavLink to={`${PROCUREMENT_ROUTE}/request-categories`}>
                  Request Categories
                </NavLink>
              </Menu.Item>
            </Menu.SubMenu>
          }
          {authService.userHasAnyRole(currentUser.role, [EMPLOYEE_ROLE.ROLE_PROCUREMENT_OFFICER, EMPLOYEE_ROLE.ROLE_PROCUREMENT_MANAGER]) && 
            <Menu.Item key={`/app/quotations`}>
              <NavLink to={`/app/quotations`}>
                <ProfileOutlined />
                <span>Quotations</span>
              </NavLink>
            </Menu.Item>
          }
          {authService.userHasAnyRole(currentUser.role, [EMPLOYEE_ROLE.ROLE_PROCUREMENT_OFFICER, EMPLOYEE_ROLE.ROLE_PROCUREMENT_MANAGER]) && 
            <Menu.Item key={`/app/local-purchase-orders`}>
              <NavLink to={`/app/local-purchase-orders`}>
                <ShoppingCartOutlined />
                <span>Local Purchase Orders</span>
              </NavLink>
            </Menu.Item>
          }
          {/* {authService.userHasAnyRole(currentUser.role, [EMPLOYEE_ROLE.ROLE_STORE_OFFICER]) && 
            <Menu.Item key="/app/store" icon={<ShopOutlined />}>
              <NavLink to="/app/store">
                Store
              </NavLink>
            </Menu.Item>
          } */}
          {/* {authService.userHasAnyRole(currentUser.role, [EMPLOYEE_ROLE.ROLE_ACCOUNT_OFFICER, EMPLOYEE_ROLE.ROLE_CHIEF_ACCOUNT_OFFICER, EMPLOYEE_ROLE.ROLE_AUDITOR]) && 
            <Menu.SubMenu  
              key="/app/account" 
              title="Accounts" 
              icon={<AccountBookOutlined />}
            >
              {authService.userHasAnyRole(currentUser.role, [EMPLOYEE_ROLE.ROLE_ACCOUNT_OFFICER]) && 
              <Menu.Item key="/app/account/goods-receive-notes">
                <NavLink to="/app/account/goods-receive-notes">
                  Make Payment
                </NavLink>
              </Menu.Item>
              }
              {authService.userHasAnyRole(currentUser.role, [EMPLOYEE_ROLE.ROLE_ACCOUNT_OFFICER, EMPLOYEE_ROLE.ROLE_AUDITOR]) &&
              <Menu.Item key="/app/account/payments">
                <NavLink to="/app/account/payments">
                  Payments
                </NavLink>
              </Menu.Item>
              }
              {authService.userHasAnyRole(currentUser.role, [EMPLOYEE_ROLE.ROLE_AUDITOR]) &&
                <Menu.Item key="/app/audit/approve-payment">
                  <NavLink to="/app/audit/approve-payment">
                    Aprove Payments
                  </NavLink>
                </Menu.Item>
              }
            </Menu.SubMenu>
          } */}
          {/* <Menu.SubMenu key="/app/audit" title="Audit" icon={<AccountBookOutlined />}>
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
          </Menu.SubMenu> */}
          {authService.userHasAnyRole(currentUser.role, FUNCTIONAL_ROLES.listDepartmentsRoles) && 
            <Menu.Item key="department">
              <NavLink to="/app/departments">
                <AppstoreOutlined />
                <span>Departments</span>
              </NavLink>
            </Menu.Item>
          }
          {authService.userHasAnyRole(currentUser.role, [EMPLOYEE_ROLE.ROLE_PROCUREMENT_OFFICER, EMPLOYEE_ROLE.ROLE_PROCUREMENT_MANAGER]) && 
            <Menu.Item key="/app/suppliers">
              <NavLink to="/app/suppliers">
                <UsergroupAddOutlined />
                <span>Supplier Management</span>
              </NavLink>
            </Menu.Item>
          }
          {authService.userHasAnyRole(currentUser.role, FUNCTIONAL_ROLES.listUserRoles) && 
          
            <Menu.Item key="employee">
              
              <NavLink to="/app/employees">
                <UsergroupAddOutlined />
                <span>User Management</span>
              </NavLink>
            </Menu.Item>
          }
          <Menu.Item key="setting" icon={<SettingOutlined />}>
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
        <Header 
          className="bs-site-layout-background" 
          style={{ padding: 0 }}
        >
          <Row>
            <Col span={2}>
              {collapsed ? <MenuUnfoldOutlined className="bs-trigger" onClick={toggle} /> : <MenuFoldOutlined onClick={toggle} className="bs-trigger" />}
            </Col>
            <Col span={14}>
              {props.title && (
                <span style={{fontSize: 20, fontWeight: "lighter", color: "#6e7273"}}>{props.title}</span>
              )}
            </Col>
            <Col span={8}>
              <div 
                style={{float: 'right', marginRight: 10, display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', 
                alignItems: 'center', cursor: 'pointer', height: '100%'}}
              >
                {/* <UserOutlined /> <span>{currentUser.fullName}</span> */}
                <Dropdown.Button overlay={profileMenu} placement="bottomLeft" icon={<UserOutlined />}>
                  {currentUser.fullName}
                </Dropdown.Button>
              </div>
            </Col>
          </Row>
          {/* {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'bs-trigger',
            onClick: toggle,
          })} */}
          
        </Header>
        <Content
          className="bs-site-layout-content"
          style={{
            minHeight: 380
          }}
        >
          {props.subNav && (
            <Row className="bs-sub-nav-header">
              <Col span={24}>
                {props.subNav}
              </Col>
            </Row>
          )}
          <Row>
            <Col span={24} style={{padding: 10}}>
              {props.children}
            </Col>
          </Row>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          {`Blueskies Procurement System ©${new Date().getFullYear()} Created by Tech-Bridge`}
        </Footer>
      </Layout>
    </Layout>
  )
}

CollapsibleLayout.propTypes = {
  subNav: PropTypes.node,
  title: PropTypes.string
}

export default CollapsibleLayout