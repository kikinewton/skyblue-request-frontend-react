import React from 'react'
import { Row, Col, Card } from 'antd'
import DashboardCard from '../../../presentation/DashboardCard'
import { BarChart, PieChart } from '../../../presentation/Chart'
import MyPieChart from '../../../shared/MyPieChart'


const Dashboard = (props) => {
  const { data } = props
  const { countOfRequestPerCurrentMonth, countOfGRNForToday, costPerDepartmentForCurrentMonth, countOfPaymentDueWithinOneWeek,
      approvedNumberRequestItemsAndUserDepartmentToday, countPaymentsMadeToday, supplierSpendAnalysis, 
      requestsPerCurrentMonthPerDepartment, requestPerCategoryForToday } = data
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
                title="This month's requests"
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
    </React.Fragment>
  )
}

export default Dashboard