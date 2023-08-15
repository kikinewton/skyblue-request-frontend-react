import React from 'react'
import { Card, Table, Row, Col, List, Breadcrumb } from 'antd'
import { REQUEST_COLUMNS } from '../../../util/constants';
import { NavLink } from "react-router-dom"
import { userHasAnyRole } from '../../../services/api/auth';
import { EMPLOYEE_ROLE } from '../../../util/datas';
import { connect } from 'react-redux';


const Home = (props) => {
  const {fetchMyRequests, my_requests, fetching_my_requests, currentUser, resetRequest} = props

  React.useEffect(() => {
    resetRequest()
    //fetch my requests if user is a regular employee
    if(userHasAnyRole(currentUser?.role, [EMPLOYEE_ROLE.ROLE_REGULAR])) {
      fetchMyRequests({
        pageNo: 0,
        pageSize: 20
      }) 
    }
  }, [])
  
  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item >
          <NavLink to="/app">HOME</NavLink>
        </Breadcrumb.Item>
      </Breadcrumb>
        {userHasAnyRole(currentUser?.role, [EMPLOYEE_ROLE.ROLE_REGULAR]) ? (
          <>
            <Card title="My Recent Requests">
              <Row>
                <Col md={24}>
                  <Table 
                    loading={fetching_my_requests}
                    columns={REQUEST_COLUMNS}
                    dataSource={my_requests?.slice(0, 10)}
                    rowKey="id"
                    pagination={false}
                    size="small"
                  />
                </Col>
              </Row>
              <Row>
                <Col md={24} style={{display:'flex', justifyContent: 'flex-end', alignItems: 'center', padding: 5}}>
                  <NavLink to="/app/my-requests/lpos">View All</NavLink>
                  {/* <a href="/app/my-request/lpos">View all</a> */}
                </Col>
              </Row>
            </Card>
          </>
        ) : (
          <>
            <Card title={`You are welcome, ${currentUser?.fullName}`}>
              <Row>
                <Col span={24}>
                  <List>
                    <List.Item>
                      <List.Item.Meta title="FIRST NAME" description={currentUser?.firstName} />
                    </List.Item>
                    <List.Item>
                      <List.Item.Meta title="LAST NAME" description={currentUser?.lastName} />
                    </List.Item>
                    <List.Item>
                      <List.Item.Meta title="EMAIL" description={currentUser?.email} />
                    </List.Item>
                    <List.Item>
                      <List.Item.Meta title="PHONE NUMBER" description={currentUser?.phoneNo} />
                    </List.Item>
                    <List.Item>
                      <List.Item.Meta title="DEPARTMENT" description={currentUser?.department?.name} />
                    </List.Item>
                    <List.Item>
                      <List.Item.Meta title="USER ROLE" description={currentUser?.role} />
                    </List.Item>
                  </List>
                </Col>
              </Row>
            </Card>
          </>
        )}
    </>
  )
}

const mapStateToProps = (state) => ({
  currentUser: state.auth.user,
})

export default connect(mapStateToProps, null)(Home);