import { FileOutlined } from '@ant-design/icons'
import { Card, Col, PageHeader, Table, Button, Row } from 'antd'
import React, { useEffect } from 'react'
import { prettifyDateTime } from '../../../util/common-helper'


const columns = (props) => [
  {
    title: 'Supplier',
    dataIndex: 'supplierId',
    key: 'supplierId',
    render: (text, row)=> row?.requestItems[0]?.suppliers.find(item=> item.id === row.supplierId)?.name || 'N/A'
  },
  {
    title: 'Date',
    dataIndex: 'createdDate',
    key: 'createdDate',
    render: (text) => prettifyDateTime(text) || 'N/A'
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'operation',
    align: 'right',
    render: (text, row) => (
      <Row>
        <Col md={24}>
          <Button onClick={() => props.onDownloadPdfClick(row)} size="small">
            <FileOutlined /> Download
          </Button>
        </Col>
      </Row>
      
    )
  },
]

const List = (props) => {
  const {
    local_purchase_orders,
    fetchLocalPurchaseOrders,
    fetching_local_purchase_orders,
  } = props

  useEffect(() => {
    fetchLocalPurchaseOrders({})
  }, [])

  return (
    <>
      <PageHeader 
        style={{padding: 0}} 
        title="Local Purchase Orders" 
        extra={[
          <span>Filter</span>
        ]}
      />
        <Card>
          <Table 
            loading={fetching_local_purchase_orders}
            columns={columns({})}
            dataSource={local_purchase_orders}
            rowKey="id"
            size="small"
            bordered
          />
        </Card>
    </>
  )
}

export default List