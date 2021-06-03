import { Col, Row, Table } from 'antd'
import React from 'react'

const columns = [
  {
    title: '',
    dataIndex: '',
    key: ''
  },
  {
    title: '',
    dataIndex: '',
    key: ''
  },
  {
    title: '',
    dataIndex: '',
    key: ''
  },
  {
    title: '',
    dataIndex: '',
    key: ''
  },
]

const LocalPurchaseOrders = (props) => {
  const {  } = props
  return (
    <React.Fragment>
      <Row>
        <Col md={24}>
          <Table 
            columns={columns}
            dataSource={localPurchaseOrders}
          />
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default LocalPurchaseOrders