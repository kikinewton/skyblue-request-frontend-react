import { DownloadOutlined, SyncOutlined } from '@ant-design/icons'
import { Badge, Button, Col, Row, Table, Pagination, Select } from 'antd'
import React, { useState } from 'react'
import { downloadLPODocument } from '../../../services/api/local-purchase-order'
import { prettifyDateTime } from '../../../util/common-helper'

const columns = (props) => [
  {
    title: 'SUPPLIER',
    dataIndex: 'supplierId',
    key: 'supplierId',
    render: (text, row)=> row?.quotation?.supplier
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
          <Button onClick={() => props.onDownloadPdfClick(row)} size="small">
            <DownloadOutlined /> Download
          </Button>
        </Col>
      </Row>
      
    )
  },
]

const List = (props) => {
  const [ lpos, setLpos ] = React.useState([])
  const [loading, setLoading] = React.useState(false)
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
    local_purchase_orders_meta,
    suppliers
  } = props

  const handleCreateGrn = (row)=> {
    history.push(`/app/stores/lpos/${row.id}/create-goods-receive-note`)
  }

  const handleDownloadPdf = async (row)=> {
    //console.log('lets download pdf', row)
    //const response = await grnService.getLpoDocument(row.id)
    try {
      await downloadLPODocument({lpoId: row.id})
    } catch (error) {
      
    }
  }

  const handleOnSearch = (value) => {
    console.log('filter value', value)
    setFilter(value)
    let query = {
      supplierName: value,
      pageNo: 0,
      pageSize: local_purchase_orders_meta?.pageSize,
      lpoWithoutGRN: true,
    }
    if(value) {
      fetchLocalPurchaseOrders({...query, })
    } else {
      fetchLocalPurchaseOrders({...query})
    }
  }

  const handlePageChange = async(page, pageSize) => {
    // setMyRequestMeta({ ...local_purchase_orders_meta, currentPage: page - 1 })
    resetLocalPurchaseOrder()
    const query = {
      supplierName: filter,
      pageNo: page - 1,
      pageSize: local_purchase_orders_meta?.pageSize,
      lpoWithoutGRN: true,
    }
    fetchLocalPurchaseOrders(query)
  }

  React.useEffect(()=> {
    //fetchLpos()
    resetLocalPurchaseOrder()
    fetchSuppliers({})
    fetchLocalPurchaseOrders({
      lpoWithoutGRN: true,
      supplierName: filter,
      pageSize: local_purchase_orders_meta?.pageSize,
      pageNo: local_purchase_orders_meta?.currentPage,
    })
  }, [])

  const expandedRowRender = (row) => {
    const expandedColumns = [
      {title: 'Description', dataIndex: 'name', key: 'name'},
      {title: 'Reason', dataIndex: 'reason', key: 'reason'},
      {title: 'Quantity', dataIndex: 'quantity', key: 'quantity'},
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
          <span className="bs-page-title">LOCAL PURCHASE ORDERS</span>
          <span style={{marginLeft: 5}}><SyncOutlined disabled={loading} spin={loading} onClick={()=> {
            fetchLocalPurchaseOrders({lpoWithoutGRN: true})
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
          {/* <AutoComplete
            options={suppliers.map(supplier => {
              return {label: supplier?.name, value:supplier?.name}
            })}
            dropdownMatchSelectWidth={500}
            style={{width: 400}}
            onSelect={value => handleOnSearch(value)}
            value={filter}
            onClear={value => handleOnSearch('')}
            
            filterOption={(input, option) => {
              setFilter(input || '')
              return option?.label?.toLowerCase().indexOf(input?.toLowerCase()) !== -1
            }}
          >
            <Input.Search placeholder='supplier name' />
          </AutoComplete> */}
        </Col>
      </Row>
      <Row>
        <Col md={24}>
          <Table 
            columns={columns({ onDownloadPdfClick: handleDownloadPdf, onCreateGrnClick: (row)=> handleCreateGrn(row) })}
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
    </React.Fragment>
  )
}

export default List