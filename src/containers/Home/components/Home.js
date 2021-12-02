import React from 'react'
import { Card, Table, Row, Col } from 'antd'
import { REQUEST_COLUMNS } from '../../../util/constants';
import { NavLink } from "react-router-dom"


const Home = (props) => {
  const {fetchMyRequests, my_requests, fetching_my_requests} = props

  React.useEffect(() => {
    fetchMyRequests({})
  }, [])
  return (
    <>
      <h1>Home</h1>
      <Card title="My Recent Requests">
        <Row>
          <Col md={24}>
            <Table 
              loading={fetching_my_requests}
              columns={REQUEST_COLUMNS}
              dataSource={my_requests?.slice(0, 5)}
              rowKey="id"
              pagination={false}
              size="small"
            />
          </Col>
        </Row>
        <Row>
          <Col md={24} style={{display:'flex', justifyContent: 'flex-end', alignItems: 'center', padding: 5}}>
            {/* <NavLink to="/app/my-request/lpos">View All</NavLink> */}
            <a href="/app/my-request/lpos">View all</a>
          </Col>
        </Row>

      </Card>
    </>
  )
}

export default Home;