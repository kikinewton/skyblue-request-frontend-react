import React from 'react'
import { Row, Col } from 'antd'
import DashboardCard from '../../../presentation/DashboardCard'
import { PieChart } from '../../../presentation/Chart'


const Dashboard = (props) => {
  const { data } = props
  const { countOfRequestPerCurrentMonth, countOfGRNForToday, costPerDepartmentForCurrentMonth, 
      approvedNumberRequestItemsAndUserDepartmentToday, countPaymentsMadeToday, requestPerCategoryForToday } = data
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
                value={countOfRequestPerCurrentMonth}
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
          <Row gutter={12}>
            <Col md={12}>
              
            </Col>
          </Row>
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default Dashboard