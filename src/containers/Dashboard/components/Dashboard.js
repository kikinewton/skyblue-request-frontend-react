import React from 'react'
import { Row, Col, Card } from 'antd'
import DashboardCard from '../../../presentation/DashboardCard'
import { BarChart, PieChart } from '../../../presentation/Chart'


const Dashboard = (props) => {
  const { data } = props
  const { countOfRequestPerCurrentMonth, countOfGRNForToday, costPerDepartmentForCurrentMonth, countOfPaymentDueWithinOneWeek,
      approvedNumberRequestItemsAndUserDepartmentToday, countPaymentsMadeToday, supplierSpendAnalysis } = data
  return (
    <React.Fragment>
      <Row>
        <Col md={24}>
          <span className="bs-page-title">Dashboard</span>
        </Col>
      </Row>
      <Row>
        <Col md={24}>
          <Row gutter={12}>
            <Col md={6}>
              <DashboardCard
                title="Number of requests this month"
                value={countOfRequestPerCurrentMonth}
              />
            </Col><Col md={6}>
              <DashboardCard 
                title="Payments due in a week"
                value={countOfPaymentDueWithinOneWeek}
              />
            </Col>
            <Col md={6}>
              <DashboardCard 
                title="Payments made today"
                value={countPaymentsMadeToday}
              />
            </Col>
            <Col md={6}>
              <DashboardCard 
                title="GRN for today"
                value={countOfGRNForToday}
              />
            </Col>
          </Row>
          <Row gutter={12} style={{marginTop: 20}}>
            <Col md={12}>
              <Card style={{height: 350}} title="Supplier Spend Analysis">
                {(supplierSpendAnalysis || []).length < 1 ? "N/A" : 
                  <PieChart
                    type="doughnut"
                    maintainAspectRatio={false}
                    label="Cost per department for this month"
                    labels={(supplierSpendAnalysis || []).map(item=> item.name)}
                    data={(supplierSpendAnalysis || []).map(item=> item.paymentAmount)}
                  />
                }
              </Card>
            </Col>
            <Col md={12}>
              <Card style={{height: 350}} title="Approved number of requests per department">
                {(approvedNumberRequestItemsAndUserDepartmentToday || []).length < 1 ? "N/A" : 
                  <PieChart
                    type="doughnut"
                    maintainAspectRatio={false}
                    label="Cost per department for this month"
                    labels={(approvedNumberRequestItemsAndUserDepartmentToday || []).map(item=> item.userDepartment)}
                    data={(approvedNumberRequestItemsAndUserDepartmentToday || []).map(item=> item.totalPrice)}
                  />
                }
              </Card>
            </Col>
          </Row>
          <Row style={{marginTop: 20}}>
            <Col md={24}>
              <Card style={{height: 350}} title="Cost per department for this month">
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
          </Row>
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default Dashboard