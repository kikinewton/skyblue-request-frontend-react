import { Col, Table, Row, Button, Spin } from 'antd'
import React from 'react'
import { REQUEST_COLUMNS } from '../../../util/constants'
import { FETCH_REQUEST_TYPES } from '../../../util/request-types'
import { history } from '../../../util/browser-history'



const List = (props) => {
  const { fetchRequests, requests, currentUser, requestLoading } = props

  React.useEffect(()=> {
    fetchRequests({requestType: FETCH_REQUEST_TYPES.MY_REQUESTS, userId: currentUser?.id})
    // eslint-disable-next-line
  }, [])
  return (
    <React.Fragment>
      <Row style={{marginBottom: 10}}>
        <Col md={12}><span className="bs-page-title">My Requests</span></Col>
        <Col md={12} style={{ justifyContent: 'flex-end', display: 'flex' }}>
          <Button type="primary" onClick={()=> history.push("/app/my-requests/add-new")}>
            Add New
          </Button>
        </Col>
      </Row>
      <Row>
        <Col md={24}>
          { requestLoading ? (<Spin />) : 
            <Table
              columns={REQUEST_COLUMNS}
              dataSource={requests}
              size="small"
              pagination={{ pageSize: 10 }}
              rowKey="id"
            />
          }
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default List