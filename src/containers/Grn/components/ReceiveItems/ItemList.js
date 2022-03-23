import React from 'react'
import { RightOutlined } from '@ant-design/icons'
import { Button, Col, Row, Table, Spin } from 'antd'
import { formatCurrency } from '../../../../util/common-helper'

const columns = [
  {
    title: 'Description',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Unit Price',
    dataIndex: 'unitPrice',
    key: 'unitPrice',
    render: (text, row) => formatCurrency(row.unitPrice, row.currency)
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    key: 'quantity'
  }
]

const ItemList = (props) => {
  const { items, onItemSelect, selectedItems, onStep, loading } = props
  return (
    <React.Fragment>
      <Row>
        <Col md={24}>
          {loading ? <Spin /> :
            <Table 
              columns={columns}
              dataSource={items || []}
              pagination={false}
              rowKey="id"
              bordered
              size="small"
              rowSelection={{
                onChange: (selectedkeys, selectedRows) => onItemSelect(selectedkeys, selectedRows),
                selectedRowKeys: selectedItems.map(item=> item.id)
              }}
            />
          }
        </Col>
      </Row>
      <Row style={{marginTop: 20}}>
        <Col md={24}>
          <Button style={{float: 'right'}} type="primary" disabled={selectedItems.length < 1} onClick={()=> onStep(1)}>
            Next <RightOutlined />
          </Button>
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default ItemList