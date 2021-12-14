import { ShoppingOutlined, SyncOutlined } from '@ant-design/icons'
import { Badge, Button, Col, Row, Spin, Table } from 'antd'
import React from 'react'
import * as grnService from '../../../../services/api/goods-receive-note'
import { prettifyDateTime } from '../../../../util/common-helper'

const columns = (props) => [
  {
    title: 'Reference',
    dataIndex: 'lpoRef',
    key: 'lpoRef',
  },
  {
    title: 'Supplier',
    dataIndex: 'supplierId',
    key: 'supplierId',
    render: (text, row) => row?.requestItems[0]?.suppliers.find(item => item.id === row.supplierId)?.name || 'N/A'
  },
  {
    title: 'Created On',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (text) => prettifyDateTime(text)
  },
  {
    title: 'Delivery Date',
    dataIndex: 'deliveryDate',
    key: 'deliveryDate',
    render: (text) => prettifyDateTime(text)
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'operation',
    align: 'right',
    render: (text, row) => (
      <Button onClick={() => props.onCreateGrnClick(row)} size="small">
        <ShoppingOutlined /> Create Goods Receive Note
      </Button>
    )
  },
]

const LocalPurchaseOrders = (props) => {
  const { 
    history,
    local_purchase_orders,
    fetchLocalPurchaseOrders,
    fetching_local_purchase_orders,
    resetLocalPurchaseOrder
  } = props

  const handleCreateGrn = (row) => {
    history.push(`/app/store/lpos/${row.id}/create-goods-receive-note`)
  }

  const handleDownloadPdf = async (row) => {
    await grnService.getLpoDocument(row.id)
  }

  React.useEffect(() => {
    resetLocalPurchaseOrder()
    fetchLocalPurchaseOrders({lpoWithoutGRN: true})
    // eslint-disable-next-line
  }, [])

  const expandedRowRender = (row) => {
    const expandedColumns = [
      { title: 'Description', dataIndex: 'name', key: 'name' },
      { title: 'Reason', dataIndex: 'reason', key: 'reason' },
      { title: 'Quantity', dataIndex: 'quantity', key: 'quantity' },
      { title: 'Request Date', dataIndex: 'requestDate', key: 'requestDate', render: (text) => prettifyDateTime(text) },
      {
        title: 'Status', dataIndex: 'status', key: 'status', render: (text) => (
          <span><Badge status={text === 'PROCESSED' ? 'success' : 'error'} />{text}</span>
        )
      },
    ]
    return <Table columns={expandedColumns} dataSource={row.requestItems} pagination={false} rowKey="id" />
  }

  return (
    <React.Fragment>
      <Row>
        <Col>
          <span className="bs-page-title">Local Purchase Orders</span>
          <span style={{marginLeft: 10}}><SyncOutlined spin={fetching_local_purchase_orders} disabled={fetching_local_purchase_orders} onClick={()=> fetchLocalPurchaseOrders({})} /></span>
        </Col>
      </Row>
      <Row>
        <Col md={24}>
          {fetching_local_purchase_orders ? (<Spin />) : 
            <Table
              columns={columns({ onDownloadPdfClick: handleDownloadPdf, onCreateGrnClick: (row) => handleCreateGrn(row) })}
              dataSource={local_purchase_orders}
              size="small"
              rowKey="id"
              expandable={{ expandedRowRender }}
              bordered
              loading={fetching_local_purchase_orders}
            />
          }
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default LocalPurchaseOrders