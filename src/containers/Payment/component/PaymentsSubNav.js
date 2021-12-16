import React, { useState, useEffect } from 'react'
import { Menu } from "antd"
import { CheckOutlined, FileFilled } from "@ant-design/icons"
import { NavLink, useLocation } from 'react-router-dom'


const PaymentsSubNav = (props) => {
  const [key, setKey] = useState("/app/payments")
  const location = useLocation()

  useEffect(() => {
    const { pathname } = location
    if(pathname.includes("/app/payments/goods-receive-notes")) {
      setKey("/app/payments/goods-receive-notes")
    } else if(pathname.includes("/app/payments/pending-approval")) {
      setKey("/app/payments/pending-approval")
    }
  }, [])
  return (
    <>
      <Menu
        mode="horizontal"
        selectedKeys={[key]}
      >
        <Menu.Item
          key="/app/payments/goods-receive-notes"
        >
          <NavLink to="/app/payments/goods-receive-notes">
            <FileFilled />
            <span>Goods Receive notes pending payments</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item
          key="/app/payments/pending-approval"
        >
          <NavLink to="/app/payments/pending-approval">
            <CheckOutlined />
            <span>Approve Payments</span>
          </NavLink>
        </Menu.Item>
      </Menu>
    </>
  )
}

export default PaymentsSubNav