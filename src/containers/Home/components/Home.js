import React from 'react'
import { Card, Table, Row, Col } from 'antd'
import { REQUEST_COLUMNS } from '../../../util/constants';
import Spinner from '../../../presentation/Spinner';


const Home = (props) => {
  const {myRequests, loading} = props
  return (
    <>
      <h1>Home</h1>
      <Card title="My Recent Requests">
        <Row>
          <Col md={24}>
            {loading 
              ? <Spinner /> 
              : <Table 
                  columns={REQUEST_COLUMNS}
                  dataSource={myRequests && myRequests.slice(0, 5)}
                  rowKey="id"
                  pagination={false}
                  size="small"
                />
            }
          </Col>
        </Row>
        <Row>
          <Col md={24} style={{display:'flex', justifyContent: 'flex-end', alignItems: 'center', padding: 5}}>
            <a href="/app/my-requests">View All</a>
          </Col>
        </Row>

      </Card>
    </>
  )
}

export default Home;