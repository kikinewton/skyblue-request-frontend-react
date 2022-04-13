import React, { useState, useEffect } from 'react'
import { Menu } from "antd"
import { CheckOutlined, FileFilled, WalletFilled, WalletOutlined } from "@ant-design/icons"
import { NavLink, useLocation } from 'react-router-dom'
import { userHasAnyRole } from "../../../services/api/auth"
import { EMPLOYEE_ROLE } from '../../../util/datas'
import NotificationBadge from '../../../shared/NotificationBadge'


const PaymentsSubNav = (props) => {
  const [key, setKey] = useState("/app/payments")
  const location = useLocation()
  const {
    currentUser,
    notifications
  } = props

  console.log('current user', currentUser)

  const paymentApprovalNav = () => {
    if(currentUser.role === EMPLOYEE_ROLE.ROLE_AUDITOR) {
      if(notifications.paymentDraftPendingAuditorCheck) {
        return (
          <NotificationBadge count={notifications.paymentDraftPendingAuditorCheck}>
            <span>Check Payments</span>
          </NotificationBadge>
        )
      } else {
        return <span>Check Payments</span>
      }
    } else if(currentUser.role === EMPLOYEE_ROLE.ROLE_GENERAL_MANAGER) {
      if(notifications.paymentDraftPendingApproval) {
        return <NotificationBadge count={notifications.paymentDraftPendingApproval}>
          <span>Approve Payments</span>
        </NotificationBadge>
      } else {
        <span>Approve Payments</span>
      }
    } else if(currentUser.role === EMPLOYEE_ROLE.ROLE_FINANCIAL_MANAGER) {
      if(notifications.paymentDraftPendingAuthorizationFM) {
        return <NotificationBadge count={notifications.paymentDraftPendingAuthorizationFM}>
          <span>Authorize Payments</span>
        </NotificationBadge>
      } else {
        return <span>Authorize Payments</span>
      }
    } else {
      return <span>Approve Payments</span>
    }
  }

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
    } else if(pathname.includes("/app/payments/float/close-retire")) {
      setKey("/app/payments/float/close-retire")
    } else if(pathname.includes("/app/payments/all-drafts")) {
      setKey("/app/payments/all-drafts")
    } else if(pathname.includes("/app/payments/all")) {
      setKey("/app/payments/all")
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
              {notifications.grnReadyForPaymentAccount ? (
                <NotificationBadge count={notifications.grnReadyForPaymentAccount}>
                  <span>Create Payment Entry</span>
                </NotificationBadge>
              ) : <span>Create Payment Entry</span>}
            </NavLink>
          </Menu.Item>
        )}
        {userHasAnyRole(currentUser.role, [EMPLOYEE_ROLE.ROLE_GENERAL_MANAGER, EMPLOYEE_ROLE.ROLE_FINANCIAL_MANAGER, EMPLOYEE_ROLE.ROLE_AUDITOR]) && (
          <Menu.Item
            key="/app/payments/pending-approval"
          >
            <NavLink to="/app/payments/pending-approval">
              <CheckOutlined />
              {paymentApprovalNav()}
            </NavLink>
          </Menu.Item>
        )}
        {userHasAnyRole(currentUser.role, [EMPLOYEE_ROLE.ROLE_ACCOUNT_OFFICER]) && (
          <>
            <Menu.Item key="/app/payments/petty-cash/allocate-funds">
              <NavLink to="/app/payments/petty-cash/allocate-funds">
                <WalletOutlined />
                {notifications?.pettyCashToAllocateFundsAccount ? (
                  <NotificationBadge count={notifications?.pettyCashToAllocateFundsAccount}>
                    <span>Allocate Funds to Petty Cash</span>
                  </NotificationBadge>
                ) : (<span>Allocate Funds to Petty Cash</span>)}
              </NavLink>
            </Menu.Item>
            <Menu.Item key="/app/payments/float/allocate-funds">
              <NavLink to="/app/payments/float/allocate-funds">
                <WalletOutlined />
                {notifications?.floatToAllocateFundsAccount ? (
                  <NotificationBadge count={notifications?.floatToAllocateFundsAccount}>
                    <span>Allocate Funds to Float</span>
                  </NotificationBadge>
                ) : (<span>Allocate Funds to Float</span>)}
              </NavLink>
            </Menu.Item>
            <Menu.Item key="/app/payments/float/close-retire">
              <NavLink to="/app/payments/float/close-retire">
                <WalletOutlined />
                {notifications?.floatToCloseAccount ? (
                  <NotificationBadge count={notifications?.floatToCloseAccount}>
                    <span>Close Float Retirement</span>
                  </NotificationBadge>
                ): (<span>Close Float Retirement</span>)}
              </NavLink>
            </Menu.Item>
          </>
        )}
        <Menu.Item key="/app/payments/all">
          <NavLink to="/app/payments/all">
            <WalletOutlined />
            <span>All payments</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="/app/payments/all-drafts">
          <NavLink to="/app/payments/all-drafts">
            <WalletOutlined />
            <span>All Payment Drafts</span>
          </NavLink>
        </Menu.Item>
      </Menu>
    </>
  )
}

export default PaymentsSubNav