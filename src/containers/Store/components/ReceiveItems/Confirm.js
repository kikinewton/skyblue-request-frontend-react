import { CheckOutlined, LeftOutlined } from '@ant-design/icons'
import { Button, Card, Col, List, Row, Table } from 'antd'
import React from 'react'

const columns = [
  {
    title: 'Requested Item',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Received Items',
    dataIndex: 'replacement',
    key: 'replacement',
  },
  {
    title: 'Unit Price',
    dataIndex: 'unitPrice',
    key: 'unitPrice'
  },
  {
    title: 'Invoice unit Price',
    dataIndex: 'invoiceUnitPrice',
    key: 'invoiceUnitPrice',
    width: '200px'
  },
]

const Confirm = (props) => {
  const { formData, selectedItems, submitting } = props
  return (
    <React.Fragment>
      <Row>
        <Col md={24}>
          <Card title="Invoice">
            <List>
              <List.Item.Meta title="Invoice Number" description={formData.invoiceNumber} />
              <List.Item.Meta title="Invoice Amount Payable" description={formData.invoiceAmountPayable} />
              <List.Item.Meta title="Number Of Days Payment Due" description={formData.numberOfDaysToPayment} />
            </List>
          </Card>
        </Col>
      </Row>
      <Row style={{marginTop: 20}}>
        <Col md={24}>
          <Card title="Goods Received">
            <List>
              <List.Item.Meta title="Comment" description={formData.comment} />
              <List.Item.Meta title="Invoice Amount Payable" 
                description={<Table columns={columns} dataSource={selectedItems} pagination={false} size="small" bordered />} />
            </List>
          </Card>
        </Col>
      </Row>
      <Row style={{marginTop: 30}}>
        <Col md={12}>
          <Button type="primary" onClick={()=> props.onStep(1)} disabled={submitting}>
            <LeftOutlined /> Prev
          </Button>
        </Col>
        <Col md={12}>
          <Button style={{float:'right'}} type="primary" onClick={()=> props.onSubmit()} disabled={submitting} loading={submitting}>
            <CheckOutlined /> Confirm and Submit
          </Button>
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default Confirm