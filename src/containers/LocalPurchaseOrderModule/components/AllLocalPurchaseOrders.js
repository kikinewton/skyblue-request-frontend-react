import { EyeOutlined, SyncOutlined } from '@ant-design/icons'
import { Badge, Button, Col, Row, Table, Pagination, Drawer, Select } from 'antd'
import React, { useState } from 'react'
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
    local_purchase_orders,
    fetching_local_purchase_orders,
    resetLocalPurchaseOrder,
    fetchSuppliers,
    local_purchase_orders_meta,
    suppliers
  } = props

  // const handleCreateGrn = (row)=> {
  //   history.push(`/app/stores/lpos/${row.id}/create-goods-receive-note`)
  // }

  const handleOnSearch = (value) => {
    console.log('filter value', value)
    setFilter(value)
    let query = {
      supplierName: value,
      pageNo: 0,
      pageSize: local_purchase_orders_meta?.pageSize,
    }
    if(value) {
      fetchLocalPurchaseOrders({...query, })
    } else {
      fetchLocalPurchaseOrders({...query})
    }
  }

  const handlePageChange = async(page, pageSize) => {
    resetLocalPurchaseOrder()
    const query = {
      supplierName: filter,
      pageNo: page - 1,
      pageSize: local_purchase_orders_meta?.pageSize,
    }
    fetchLocalPurchaseOrders(query)
  }

  const onViewClick = (row)=> {
    setSelectedLpo(row)
    setView(true)
  }

  React.useEffect(()=> {
    resetLocalPurchaseOrder()
    fetchLocalPurchaseOrders({
      supplierName: filter,
      pageSize: local_purchase_orders_meta?.pageSize,
      pageNo: local_purchase_orders_meta?.currentPage,
    })
    fetchSuppliers({})
  }, [])

  const expandedRowRender = (row) => {
    const expandedColumns = [
      {title: 'Description', dataIndex: 'name', key: 'name'},
      {title: 'Reason', dataIndex: 'reason', key: 'reason'},
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
          <Select 
            showSearch
            style={{width: 400}}
            placeholder="Search to Select"
            optionFilterProp="children"
            options={suppliers.map(supplier => {
              return {label: supplier?.name, value:supplier?.name}
            })}
            filterOption={(input, option) => {
              setFilter(input || '')
              return option?.label?.toLowerCase().includes(input?.toLowerCase())
            }}
            value={filter}
            allowClear
            onSelect={value => handleOnSearch(value)}
            onClear={() => {
              setFilter('')
              handleOnSearch('')
            }}
          />
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
            pagination={false}
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Pagination 
            showSizeChanger={false}
            defaultCurrent={local_purchase_orders_meta.currentPage + 1}
            total={local_purchase_orders_meta.totalPages * local_purchase_orders_meta.pageSize}
            current={local_purchase_orders_meta.currentPage + 1}
            defaultPageSize={local_purchase_orders_meta.pageSize}
            pageSize={local_purchase_orders_meta.pageSize}
            size='small'
            onChange={handlePageChange}
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