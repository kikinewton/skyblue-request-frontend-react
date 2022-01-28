import React, { useState, useEffect } from 'react'
import { Menu } from "antd"
import { CheckOutlined, FileFilled, WalletFilled, WalletOutlined } from "@ant-design/icons"
import { NavLink, useLocation } from 'react-router-dom'
import { userHasAnyRole } from "../../../services/api/auth"
import { EMPLOYEE_ROLE } from '../../../util/datas'


const PaymentsSubNav = (props) => {
  const [key, setKey] = useState("/app/payments")
  const location = useLocation()
  const {
    currentUser
  } = props

  console.log('current user', currentUser)

  useEffect(() => {
    const { pathname } = location
    if(pathname.includes("/app/payments/goods-receive-notes")) {
      setKey("/app/payments/goods-receive-notes")
    } else if(pathname.includes("/app/payments/pending-approval")) {
      setKey("/app/payments/pending-approval")
    } else if(pathname.includes("/app/payments/petty-cash/allocate-funds")) {
      setKey("/app/payments/petty-cash/allocate-funds")
    } else if(pathname.includes("/app/payments/float/allocate-funds")) {
      setKey("/app/payments/float/allocate-funds")
    }
  }, [key])

  return (
    <>
      <Menu
        mode="horizontal"
        selectedKeys={[key]}
      >
        {userHasAnyRole(currentUser.role, [EMPLOYEE_ROLE.ROLE_ACCOUNT_OFFICER]) && (
          <Menu.Item
            key="/app/payments/goods-receive-notes"
          >
            <NavLink to="/app/payments/goods-receive-notes">
              <FileFilled />
              <span>Create Payment Entry</span>
            </NavLink>
          </Menu.Item>
        )}
        {userHasAnyRole(currentUser.role, [EMPLOYEE_ROLE.ROLE_GENERAL_MANAGER, EMPLOYEE_ROLE.ROLE_FINANCIAL_MANAGER, EMPLOYEE_ROLE.ROLE_AUDITOR]) && (
          <Menu.Item
            key="/app/payments/pending-approval"
          >
            <NavLink to="/app/payments/pending-approval">
              <CheckOutlined />
              <span>Approve Payments</span>
            </NavLink>
          </Menu.Item>
        )}
        {userHasAnyRole(currentUser.role, [EMPLOYEE_ROLE.ROLE_ACCOUNT_OFFICER]) && (
          <>
            <Menu.Item key="/app/payments/petty-cash/allocate-funds">
              <NavLink to="/app/payments/petty-cash/allocate-funds">
                <WalletOutlined />
                <span>Allocate Funds to Petty Cash</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="/app/payments/float/allocate-funds">
              <NavLink to="/app/payments/float/allocate-funds">
                <WalletOutlined />
                <span>Allocate Funds to Float</span>
              </NavLink>
            </Menu.Item>
          </>
        )}
      </Menu>
    </>
  )
}

export default PaymentsSubNav