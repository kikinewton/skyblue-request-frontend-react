import { ShopOutlined, WalletOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'


const ReportMenuItems = props => {
  const [current, setCurrent] = useState("/reports/accounts")
  
  return (
    <>
      <Menu
        mode="horizontal"
        selectedKeys={[current]}
      >
        <Menu.SubMenu
          key="/reports/accounts"
          title="Accounts"
          icon={<WalletOutlined/>}
        >
          <Menu.Item key="/accounts/float-ageing-analysis">
            <NavLink to="/app/reports/accounts/float-ageing-analysis">
              Float ageing analysis
            </NavLink>
          </Menu.Item>
          <Menu.Item key="/accounts/payments">
            <NavLink to="/app/reports/accounts/payments">
              Payments
            </NavLink>
          </Menu.Item>
          <Menu.Item key="/accounts/petty-cash-payments">
            <NavLink to="/app/reports/accounts/petty-cash-payments">
              Petty Cash Payments
            </NavLink>
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu
          key="/reports/stores"
          title="Stores"
          icon={<ShopOutlined/>}
        >
          <Menu.Item key="/stores/goods-receive-notes">
            <NavLink to="/app/reports/stores/goods-receive-notes">
              Goods Receive Notes
            </NavLink>
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu
          key="/reports/procurement"
          title="Procurement"
          icon={<ShopOutlined/>}
        >
          <Menu.Item key="/procurement/goods-receive-notes">
            <NavLink to="/app/reports/procurement/items">
              Items Procured
            </NavLink>
          </Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </>
  )
}

export default ReportMenuItems