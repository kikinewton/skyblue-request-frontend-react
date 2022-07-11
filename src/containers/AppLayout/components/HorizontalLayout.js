import '../../../styles/css/layout-new.less'
import UserProfileButton from '../user-profile-btn';
import { Layout, Row, Col, Menu } from 'antd';
import React, { useEffect } from 'react'
import AuthMiddleware from '../../../middleware/auth-middleware';
import logo from "../../../assets/logo512.png"
import { NavLink } from 'react-router-dom';
import { 
  BankOutlined, DashboardOutlined, FunnelPlotOutlined, GroupOutlined, HomeOutlined, PieChartOutlined, 
  ReconciliationOutlined, SettingOutlined, ShopOutlined, ShoppingOutlined, UserSwitchOutlined, WalletOutlined 
} from '@ant-design/icons';
import NotificationBadge from '../../../shared/NotificationBadge';

const { Header, Content, Footer } = Layout;

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




const HorizontalLayout = (props) => {

  const { currentUser, notifications, fetchNotifications } = props

  const items = [
    getItem(<NavLink to='/'>HOME</NavLink>, '/', <HomeOutlined/>),
    getItem(<NavLink to='/dashboard'>DASHBOARD</NavLink>, 'dashboard', <DashboardOutlined/>),
    getItem(<NavLink to='/dashboard'>MY REQUESTS</NavLink>, 'my-requests', <DashboardOutlined/>),
    getItem(<span>
      LPO REQUESTS
      {notifications?.requestPendingEndorsementHOD || notifications.requestPendingApprovalGM || 
                     notifications.requestEndorsedByHOD ? <NotificationBadge /> : null}
      </span>, 'requests', <ReconciliationOutlined/>, [
      getItem(<NavLink to='/inventory/products'>ENDORSE REQUESTS</NavLink>, 'inventory/products', <ShopOutlined/>),
      getItem(<NavLink to='/inventory/product-categories'>APPROVE REQUESTS</NavLink>, 'inventory/product-categories', <GroupOutlined/>),
      getItem(<NavLink to='/inventory/skus'>REVIEW QUOTATION</NavLink>, 'inventory/skus', <FunnelPlotOutlined/>),
      getItem(<NavLink to='lpo-requests/all'>ALL REQUESTS</NavLink>, 'all-lpo-requests', <FunnelPlotOutlined/>)
    ]),
    getItem(<span>
      FLOATS
      {notifications?.requestPendingEndorsementHOD || notifications.requestPendingApprovalGM || 
                     notifications.requestEndorsedByHOD ? <NotificationBadge /> : null}
      </span>, 'floats', <ReconciliationOutlined/>, [
      getItem(<NavLink to='/inventory/products'>ENDORSE FLOATS</NavLink>, 'inventory/products', <ShopOutlined/>),
      getItem(<NavLink to='/inventory/product-categories'>APPROVE FLOATS</NavLink>, 'inventory/product-categories', <GroupOutlined/>),
      getItem(<NavLink to='lpo-requests/all'>ALL FLOATS</NavLink>, 'all-lpo-requests', <FunnelPlotOutlined/>)
    ]),
    getItem(<span>
      PETTY CASH
      {notifications?.requestPendingEndorsementHOD || notifications.requestPendingApprovalGM || 
                     notifications.requestEndorsedByHOD ? <NotificationBadge /> : null}
      </span>, 'petty-cash', <ReconciliationOutlined/>, [
      getItem(<NavLink to='/inventory/products'>ENDORSE PETTY CASH</NavLink>, 'inventory/products', <ShopOutlined/>),
      getItem(<NavLink to='/inventory/product-categories'>APPROVE PETTY CASH</NavLink>, 'inventory/product-categories', <GroupOutlined/>),
      getItem(<NavLink to='lpo-requests/all'>ALL PETTY CASH</NavLink>, 'all-lpo-requests', <FunnelPlotOutlined/>)
    ]),
    getItem('Reports', 'reports', <PieChartOutlined/>, [
      getItem(<NavLink to='/reports/sales'>Sales Report</NavLink>, '/reports/sales', <ShoppingOutlined/>),
      getItem(<NavLink to='/reports/purchase'>Purchase Report</NavLink>, '/reports/purchases', <BankOutlined/>),
      getItem(<NavLink to='/reports/financial'>Financial Report</NavLink>, '/reports/financial', <WalletOutlined/>)
    ]),
    getItem(<NavLink to='/users'>User Management</NavLink>, '/users', <UserSwitchOutlined/>),
    getItem(<NavLink to='/settings'>System Settings</NavLink>, '/settings', <SettingOutlined/>)
  ]

  //Effects
  useEffect(() => {
    fetchNotifications()
  }, [])

  return (
    <AuthMiddleware>
      <Layout className='app-layout' style={{width: '100%', padding: 0, margin: 0}}>
        <Header>
          <Row>
            <Col xs={24} sm={24} md={2}>
              <div style={{color: '#fff', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <img width="40" height="40" src={logo} alt="company_logo" />
                <span>Blueskies</span>
              </div>
            </Col>
            <Col xs={24} sm={24} md={18}>
              <Menu
                mode='horizontal'
                items={items}
                defaultSelectedKeys={['/']}
              />
            </Col>
            <Col xs={24} sm={24} md={4}>
              <UserProfileButton username='etoretornam' name='etornam anyidoho' />
            </Col>
          </Row>
        </Header>
        <Content style={{ padding: '50px 50px 50px 50px' }}>
          {props.children}
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          {`Blueskies Procurement System ©${new Date().getFullYear()} Created by Tech-Bridge`}
        </Footer>
        {/* <Footer>
          <Copyright dateYear={new Date().getFullYear()} />
        </Footer> */}
      </Layout>
    </AuthMiddleware>
  )
}

export default HorizontalLayout