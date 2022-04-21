import { CheckOutlined, LeftOutlined } from '@ant-design/icons'
import { Button, Card, Col, List, Row, Table } from 'antd'
import React from 'react'
import { formatCurrency } from '../../../../util/common-helper'

const columns = props => [
  {
    title: 'Requested Item',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    key: 'quantity'
  },
  {
    title: 'Unit Price',
    dataIndex: 'unitPrice',
    key: 'unitPrice',
    render: (text) => formatCurrency(text, props.currency)
  },
]

const Confirm = (props) => {
  const { formData, selectedItems, submitting, local_purchase_order } = props
  return (
    <React.Fragment>
      <Row>
        <Col md={24}>
          <Card title="Invoice">
            <List>
              <List.Item.Meta title="Invoice Number" description={formData.invoiceNumber} />
              <List.Item.Meta title="Amount" description={formatCurrency(formData.invoiceAmountPayable, local_purchase_order?.requestItems[0]?.currency)} />
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
                description={<Table 
                  columns={columns({currency: local_purchase_order?.requestItems[0]?.currency})} rowKey="id" dataSource={selectedItems} pagination={false} size="small" bordered />} />
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