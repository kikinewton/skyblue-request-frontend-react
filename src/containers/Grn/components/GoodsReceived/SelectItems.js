import { Col, Row, Table } from 'antd'
import React from 'react'

const columns = (props) => [
  {
    title: 'Description',
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
    key: 'unitPrice'
  },
  {
    title: 'Sub Total',
    dataIndex: 'subtotal',
    key: 'subtotal',
    render: (text, row)=> (row.unitPrice * row.quantity) || 'N/A'
  }
]

const SelectItems = (props) => {
  const { requests, onRequestSelect } = props
  return (
    <React.Fragment>
      <Row>
        <Col md={24}>
          <Table 
            size="small"
            columns={columns(props)}
            dataSource={requests}
            rowSelection={{
              onChange: (selectedKeys, selectedRows)=> onRequestSelect(selectedKeys, selectedRows)
            }}
          />
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default SelectItems;