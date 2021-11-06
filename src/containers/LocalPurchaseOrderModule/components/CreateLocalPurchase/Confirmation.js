import { CheckOutlined, LeftOutlined } from '@ant-design/icons'
import { Col, Row, Table, Button } from 'antd'
import React from 'react'
import { CURRENCY_CODE } from '../../../../util/constants'


const columns = [
  {
    title: 'Desciption',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Reason',
    dataIndex: 'reason',
    key: 'reason'
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    key: 'quantity'
  },
  {
    title: `Unit Price (${CURRENCY_CODE})`,
    dataIndex: 'unitPrice',
    key: 'unitPrice'
  },
  {
    title: `(${CURRENCY_CODE}) Sub Total`,
    dataIndex: 'total',
    key: 'total',
    render: (text, row) => (
      <div style={{ backgroundColor: '#e0dfdc', padding: 5, borderRadius: 10, width: 'auto' }}>{row.quantity * row.unitPrice}</div>
    )
  }
]
const Confirmation = (props) => {
  const { selectedRequests, suppliers, selectedSupplier, requestSubmitting, deliveryDate } = props
  return (
    <React.Fragment>
      <Row style={{padding: 5}}>
          <Col md={24}>
            <span style={{fontWeight: 'bold'}}>SUPPLIER: {suppliers.find(item=> item.id === selectedSupplier)?.name}</span>
          </Col>
      </Row>
      <Row style={{padding: 5}}>
          <Col md={24}>
            <span style={{fontWeight: 'bold'}}>Delivery Date: {deliveryDate?.format("YYYY-MM-DD")}</span>
          </Col>
      </Row>
      <Row>
        <Col md={24}>
          <Table 
            columns={columns}
            dataSource={selectedRequests}
            pagination={false}
            size="small"
            rowKey="id"
          />
        </Col>
      </Row>
      <Row>
        <Col md={24} className="bs-stepper-nav">
          <Button type="primary" onClick={()=> props.onStep(1)}>
            <LeftOutlined /> Prev
          </Button>
          <Button 
            className="submit-btn"
            onClick={()=> props.onDone()} 
            loading={requestSubmitting}
          >
            <CheckOutlined /> SUBMIT LOCAL PURCHASE ORDER
          </Button>
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default Confirmation