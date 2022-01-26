import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Drawer, Table, Spin } from 'antd'
import DashboardCard from '../../../presentation/DashboardCard'
import { BarChart, PieChart } from '../../../presentation/Chart'
import MyPieChart from '../../../shared/MyPieChart'
import ThisMonthRequests from './ThisMonthRequests'
import MyPageHeader from "../../../shared/MyPageHeader"
import { SyncOutlined } from '@ant-design/icons'
import PaymentsDueInWeek from './PaymentsDueInWeek'
import PaymentsMadeToday from './PaymentsMadeToday'
import GrnForToday from './GrnForToday'

const REPORT_TYPES = {
  REQUESTS_FOR_CURRENT_MONTH: "REQUESTS_FOR_CURRENT_MONTH",
  PAYMENTS_DUE_IN_A_WEEK: "PAYMENTS_DUE_IN_A_WEEK",
  PAYMENTS_MADE_TODAY: "PAYMENTS_MADE_TODAY",
  GRN_FOR_TODAY: "GRN_FOR_TODAY"
}


const Dashboard = (props) => {
  const { data, dashboard_data, fetching_dashboard_data, fetchDashboardData } = props
  const { countOfRequestPerCurrentMonth, countOfGRNForToday, costPerDepartmentForCurrentMonth, countOfPaymentDueWithinOneWeek,
      approvedNumberRequestItemsAndUserDepartmentToday, countPaymentsMadeToday, supplierSpendAnalysis, 
      requestsPerCurrentMonthPerDepartment, requestPerCategoryForToday, requestForThisMonth, paymentDueInAWeek,
      paymentsMadeToday, grnIssuedToday } = dashboard_data
  const [visible, setVisible] = useState(false)
  const [reportType, setReportType] = useState()

  useEffect(() => {
    fetchDashboardData()
  }, [])

  return (
    <React.Fragment>
      <MyPageHeader 
        title={(
          <>
            <span style={{marginRight: 5}}>Dashboard</span>
            <SyncOutlined spin={fetching_dashboard_data} onClick={() => fetchDashboardData()} />
          </>
        )} 
      />
      {fetching_dashboard_data ? <Spin/> : (
        <Row>
          <Col md={24}>
            <Row gutter={12}>
              <Col md={6}>
                <DashboardCard
                  title="This month's requests"
                  value={countOfRequestPerCurrentMonth}
                  onClick={() => {
                    setReportType(REPORT_TYPES.REQUESTS_FOR_CURRENT_MONTH)
                    setVisible(true)
                  }}
                />
              </Col><Col md={6}>
                <DashboardCard 
                  title="Payments due in a week"
                  value={countOfPaymentDueWithinOneWeek}
                  onClick={() => {
                    setReportType(REPORT_TYPES.PAYMENTS_DUE_IN_A_WEEK)
                    setVisible(true)
                  }}
                />
              </Col>
              <Col md={6}>
                <DashboardCard 
                  title="Payments made today"
                  value={countPaymentsMadeToday}
                  onClick={() => {
                    setReportType(REPORT_TYPES.PAYMENTS_MADE_TODAY)
                    setVisible(true)
                  }}
                />
              </Col>
              <Col md={6}>
                <DashboardCard 
                  title="GRN for today"
                  value={countOfGRNForToday}
                  onClick={() => {
                    setReportType(REPORT_TYPES.GRN_FOR_TODAY)
                    setVisible(true)
                  }}
                />
              </Col>
            </Row>
            <Row gutter={12} style={{marginTop: 20}}>
              <Col md={8}>
                <Card style={{height: 350}} title="Approved number of requests per department" hoverable>
                  {(supplierSpendAnalysis || []).length < 1 ? "N/A" : 
                    <PieChart
                      type="doughnut"
                      maintainAspectRatio={false}
                      label="Cost per department for this month"
                      labels={(supplierSpendAnalysis || []).map(item=> item.name)}
                      data={(supplierSpendAnalysis || []).map(item=> item.paymentAmount)}
                    />
                  }
                  {/* {(supplierSpendAnalysis || []).length < 1 ? "N/A" : 
                    <MyPieChart
                      data={(supplierSpendAnalysis || []).map(item=> {
                        return {type: item?.name, value: item?.paymentAmount}
                      })}
                    />
                  } */}
                </Card>
              </Col>
              <Col md={8}>
                <Card style={{height: 350}} title="Approved number of requests per department" hoverable>
                  {(approvedNumberRequestItemsAndUserDepartmentToday || []).length < 1 ? "N/A" : 
                    <PieChart
                      type="doughnut"
                      maintainAspectRatio={false}
                      label="Approved number of requests per department"
                      labels={(approvedNumberRequestItemsAndUserDepartmentToday || []).map(item=> item.userDepartment)}
                      data={(approvedNumberRequestItemsAndUserDepartmentToday || []).map(item=> item.numOfRequest)}
                    />
                  }
                </Card>
              </Col>
              <Col md={8}>
                <Card style={{height: 350}} title="Request per department for this month" hoverable>
                  {(requestsPerCurrentMonthPerDepartment || []).length < 1 ? "N/A" : 
                    <PieChart
                      type="Pie"
                      maintainAspectRatio={false}
                      label="Request per department for this month"
                      labels={(requestsPerCurrentMonthPerDepartment || []).map(item=> item.department)}
                      data={(requestsPerCurrentMonthPerDepartment || []).map(item=> item.num_of_Request)}
                    />
                  }
                </Card>
              </Col>
            </Row>
            <Row style={{marginTop: 20}} gutter={12}>
              <Col md={12}>
                <Card style={{height: 350}} title="Cost per department for this month" hoverable>
                  {(costPerDepartmentForCurrentMonth || []).length < 1 ? "N/A" : 
                    <BarChart
                      maintainAspectRatio={false}
                      label="Cost per department for this month"
                      labels={(costPerDepartmentForCurrentMonth || []).map(item=> item.userDepartment)}
                      data={(costPerDepartmentForCurrentMonth || []).map(item=> item.totalPrice)}
                    />
                  }
                </Card>
              </Col>
              <Col md={12}>
                <Card style={{height: 350}} title="Request per category for today" hoverable>
                  {(requestPerCategoryForToday || []).length < 1 ? "N/A" : 
                    <BarChart
                      maintainAspectRatio={false}
                      label="Request per category for today"
                      labels={(requestPerCategoryForToday || []).map(item=> item.requestCategory)}
                      data={(requestPerCategoryForToday || []).map(item=> item.numOfRequest)}
                    />
                  }
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      )}
      <Drawer
        visible={visible}
        placement='right'
        width={800}
        onClose={() => {
          setVisible(false)
        }}
      >
        {reportType === REPORT_TYPES.REQUESTS_FOR_CURRENT_MONTH && (
          <>
            <ThisMonthRequests requests={requestForThisMonth} />
          </>
        )}
        {reportType === REPORT_TYPES.PAYMENTS_DUE_IN_A_WEEK && (
          <>
            <PaymentsDueInWeek payments={paymentDueInAWeek} />
          </>
        )}
        {reportType === REPORT_TYPES.PAYMENTS_MADE_TODAY && (
          <>
            <PaymentsMadeToday payments={paymentsMadeToday} />
          </>
        )}
        {reportType === REPORT_TYPES.GRN_FOR_TODAY && (
          <>
            <GrnForToday grns={grnIssuedToday} />
          </>
        )}
      </Drawer>
    </React.Fragment>
  )
}

export default Dashboard