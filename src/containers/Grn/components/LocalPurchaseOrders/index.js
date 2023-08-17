import { FileOutlined, ShoppingOutlined, SyncOutlined } from '@ant-design/icons'
import { Badge, Button, Col, Input, Row, Spin, Table } from 'antd'
import React from 'react'
import { RESPONSE_SUCCESS_CODE } from '../../../../services/api/apiRequest'
import * as grnService from '../../../../services/api/goods-receive-note'
import MyPageHeader from '../../../../shared/MyPageHeader'
import { prettifyDateTime } from '../../../../util/common-helper'
import { PAGE_SIZE } from '../../../../util/constants'

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
    render: (text, row) => row?.quotation?.supplier || 'N/A'
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
  const [loading, setLoading] = React.useState(false)
  const [searchTerm, setSearchTerm] = React.useState("")
  const { 
    history,
    local_purchase_orders,
    fetchLocalPurchaseOrders,
    fetching_local_purchase_orders,
    resetLocalPurchaseOrder,
    filtered_local_purchase_orders,
    filterLocalPurchaseOrders
  } = props

  const handleCreateGrn = (row) => {
    history.push(`/app/grn/lpos/${row.id}/create-goods-receive-note`)
  }

  const handleDownloadPdf = async (row) => {
    const response = await grnService.getLpoDocument(row.id)
  }

  React.useEffect(() => {
    resetLocalPurchaseOrder()
    fetchLocalPurchaseOrders({lpoWithoutGRN: true})
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
      {/* <Row>
        <Col>
          <span className="bs-page-title">Local Purchase Orders</span>
          <span style={{marginLeft: 10}}><SyncOutlined spin={loading} disabled={loading} onClick={()=> fetchLocalPurchaseOrders({})} /></span>
        </Col>
      </Row> */}
      <MyPageHeader 
        title={(
          <>
            <span style={{marginRight: 5}}>Local Purchase Orders </span>
            <SyncOutlined spin={loading} disabled={loading} onClick={()=> fetchLocalPurchaseOrders({})} />
          </>
        )}
        extra={[
          <span key="filter">Filter:</span>,
          <Input
            key="search"
            style={{width: 300}}
            type="search"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              filterLocalPurchaseOrders(e.target.value)
            }}
          />
        ]}
      />
      <Row>
        <Col md={24}>
          {loading ? (<Spin />) : 
            <Table
              columns={columns({ onDownloadPdfClick: handleDownloadPdf, onCreateGrnClick: (row) => handleCreateGrn(row) })}
              dataSource={filtered_local_purchase_orders}
              size="small"
              rowKey="id"
              expandable={{ expandedRowRender }}
              bordered
              loading={fetching_local_purchase_orders}
              pagination={{ pageSize: PAGE_SIZE }}
            />
          }
        </Col>
      </Row>
      
    </React.Fragment>
  )
}

export default LocalPurchaseOrders