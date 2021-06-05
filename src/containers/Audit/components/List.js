import { Col, Row, Table } from 'antd'
import React from 'react'

const columns = (props) => [
  {
    title: '',
    dataIndex: '',
    key: ''
  }
]

const List = (props) => {
  return (
    <React.Fragment>
      <Row>
        <Col md={24}>
          <span className="bs-page-title">Payments</span>
        </Col>
      </Row>
      <Row>
        <Col md={24}>
          <Table 
            columns={}
            dataSource={}
          />
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default List