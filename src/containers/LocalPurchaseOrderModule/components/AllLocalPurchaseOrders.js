import { DownloadOutlined, EyeOutlined, SyncOutlined } from '@ant-design/icons'
import { Badge, Button, Col, Row, Table, Spin, Drawer, Input, AutoComplete } from 'antd'
import React, { useState } from 'react'
import { downloadLPODocument } from '../../../services/api/local-purchase-order'
import LocalPurchaseOrderDetails from '../../../shared/LocalPurchaseOrderDetails'
import { formatCurrency, prettifyDateTime } from '../../../util/common-helper'

const columns = (props) => [
  {
    title: 'SUPPLIER',
    dataIndex: 'supplierId',
    key: 'supplierId',
    render: (text, row)=> row?.requestItems[0]?.suppliers.find(item=> item.id === row.supplierId)?.name || 'N/A'
  },
  {
    title: 'CREATED ON',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (text) => text ? prettifyDateTime(text) : "N/A"
  },
  {
    title: 'DELIVERY DATE',
    dataIndex: 'deliveryDate',
    key: 'deliveryDate',
    render: (text) => text ? prettifyDateTime(text) : 'N/A'
  },
  {
    title: 'ACTION',
    dataIndex: 'action',
    key: 'operation',
    align: 'right',
    render: (text, row) => (
      <Row>
        <Col md={24}>
          <Button onClick={() => props.onView(row)} size="small">
            <EyeOutlined /> View
          </Button>
        </Col>
      </Row>
      
    )
  },
]

const AllLocalPurchaseOrders = (props) => {
  const [ lpos, setLpos ] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [view, setView] = useState(false)
  const [selectedLpo, setSelectedLpo]= useState(null)
  const [filter, setFilter] = useState('')
  const { history } = props

  const {
    fetchLocalPurchaseOrders,
    fetchLocalPurchaseOrderDrafts,
    local_purchase_orders,
    local_purchase_order_drafts,
    fetching_local_purchase_orders,
    resetLocalPurchaseOrder,
    fetchSuppliers,
    fetching_suppliers,
    suppliers
  } = props

  const handlefetch = (e) => {
    fetchLocalPurchaseOrders({supplierName: filter})
  }

  const handleCreateGrn = (row)=> {
    history.push(`/app/stores/lpos/${row.id}/create-goods-receive-note`)
  }

  const handleOnSearch = (value) => {
    console.log('filter value', value)
    setFilter(value)
    if(value) {
      fetchLocalPurchaseOrders({supplierName: value})
    } else {
      fetchLocalPurchaseOrders({})
    }
    
  }

  const onViewClick = (row)=> {
    //console.log('lets download pdf', row)
    //const response = await grnService.getLpoDocument(row.id)
    setSelectedLpo(row)
    setView(true)
  }

  React.useEffect(()=> {
    //fetchLpos()
    resetLocalPurchaseOrder()
    fetchLocalPurchaseOrders({})
    fetchSuppliers({})
  }, [])

  const expandedRowRender = (row) => {
    const expandedColumns = [
      {title: 'Description', dataIndex: 'name', key: 'name'},
      {title: 'Reason', dataIndex: 'reason', key: 'reason'},
      {title: 'Purpose', dataIndex: 'purpose', key: 'purpose'},
      {title: 'Quantity', dataIndex: 'quantity', key: 'quantity'},
      {title: 'Unit Price', dataIndex: 'unitPrice', key: 'unitPrice', render: (text, row) => text ? formatCurrency(row?.unitPrice, row?.currency): "N/A"},
      {title: 'Request Date', dataIndex: 'requestDate', key: 'requestDate', render: (text)=> prettifyDateTime(text) },
      {title: 'Status', dataIndex: 'status', key: 'status', render: (text) => (
        <span><Badge status={text === 'PROCESSED' ? 'success' : 'error'} />{text}</span>
      )},
    ]
    return <Table columns={expandedColumns} dataSource={row.requestItems} pagination={false} rowKey="id" />
  }

  return (
    <React.Fragment>
      <Row style={{marginBottom: 20}}>
        <Col span={12}>
          <span className="bs-page-title">ALL LOCAL PURCHASE ORDERS</span>
          <span style={{marginLeft: 5}}><SyncOutlined disabled={loading} spin={loading} onClick={()=> {
            fetchLocalPurchaseOrders({withGRN: false})
          }} /></span>
        </Col>
        <Col span={12}>
          <AutoComplete
            options={suppliers.map(supplier => {
              return {label: supplier?.name, value:supplier?.name}
            })}
            dropdownMatchSelectWidth={500}
            style={{width: 400}}
            onSelect={value => handleOnSearch(value)}
            value={filter}
            onClear={value => handleOnSearch(null)}
            allowClear
          >
            <Input.Search placeholder='supplier name' />
          </AutoComplete>
          {/* <Row>
            <Col span={20}>
              <Input type='search' value={filter} onChange={(e) => setFilter(e.target.value)}  />
            </Col>
            <Col span={4}>
              <Button type='primary' onClick={handlefetch}>
                Search
              </Button>
            </Col>
          </Row> */}
        </Col>
      </Row>
      <Row>
        <Col md={24}>
          <Table 
            columns={columns({ onView: onViewClick})}
            dataSource={local_purchase_orders}
            size="small"
            rowKey="id"
            expandable={{expandedRowRender}}
            bordered
            loading={fetching_local_purchase_orders}
          />
        </Col>
      </Row>
      <Drawer
        visible={view}
        width={900}
        placement="right"
        title="Local Purchase Order Details"
        onClose={() => {
          setView(false)
          setSelectedLpo(null)
        }}
      >
        <LocalPurchaseOrderDetails 
          lpo={selectedLpo}
        />
      </Drawer>
    </React.Fragment>
  )
}

export default AllLocalPurchaseOrders