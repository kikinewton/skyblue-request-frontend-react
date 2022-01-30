import { ShopOutlined, WalletOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'


const ReportMenuItems = props => {
  const [current, setCurrent] = useState("/reports/accounts")
  const{pathname} = useLocation()

  useEffect(() => {
    if(pathname.includes("/reports/accounts/float-ageing-analysis")) {
      setCurrent("/accounts/float-ageing-analysis")
    } else if(pathname.includes("/app/reports/accounts/payments")) {
      setCurrent("/accounts/payments")
    } else if(pathname.includes("/app/reports/accounts/petty-cash-payments")) {
      setCurrent("/accounts/petty-cash-payments")
    } else if(pathname.includes("/app/reports/stores/goods-receive-notes")) {
      setCurrent("/stores/goods-receive-notes")
    } else if(pathname.includes("/app/reports/procurement/items")) {
      setCurrent("/procurement/items")
    }
  }, [current])
  
  return (
    <>
      <Menu
        mode="horizontal"
        selectedKeys={[current]}
        onClick={value => setCurrent(value)}
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
          <Menu.Item key="/procurement/items">
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