import { SyncOutlined } from '@ant-design/icons'
import { Badge, Button, Col, Row, Table, Drawer, Pagination, message, Divider } from 'antd'
import React, { useState } from 'react'
import { downloadLPODocument } from '../../../services/api/local-purchase-order'
import MyPageHeader from '../../../shared/MyPageHeader'
import QuotationDetails from '../../../shared/QuotationDetails'
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
    title: 'MESSAGE',
    dataIndex: 'message',
    key: 'message',
    render: (text, row) => {
      return (row?.requestItems.filter(rq => rq?.approval !== 'APPROVED').length > 0) ? 
        'Some items are not approved' : 
        'All items are approved'
    }
  },
  {
    title: 'ACTION',
    dataIndex: 'action',
    key: 'operation',
    align: 'right',
    render: (text, row) => (
      <Row>
        <Col md={24}>
          <Button 
            onClick={() => props.onCreate(row)} 
            size="small"
            disabled={row?.requestItems.filter(rq => rq?.approval !== 'APPROVED').length > 0}
          >
            CREATE LOCAL PURCHASE ORDER
          </Button>
        </Col>
      </Row>
      
    )
  },
]

export const requestColumns = [
  {
    title: 'REFERENCE',
    dataIndex: 'requestItemRef',
    key: 'requestItemRef'
  },
  {
    title: 'DESCRIPTION',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'REASON',
    dataIndex: 'reason',
    key: 'reason'
  },
  {
    title: 'PURPOSE',
    dataIndex: 'purpose',
    key: 'purpose'
  },
  {
    title: 'QUANTITY',
    dataIndex: 'quantity',
    key: 'quantity'
  },
  {
    title: 'UNIT PRICE',
    dataIndex: 'unitPrice',
    key: 'unitPrice',
    render: (text, row) => `${row.currency}${row?.unitPrice}`
  },
  {
    title: 'APPROVAL',
    dataIndex: 'approval',
    key: 'approval'
  },
]

const CreateLPO = (props) => {
  const [ lpos, setLpos ] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [visible, setVisible] = useState(false)
  const [selectedDraft, setSelectedDraft] = useState(null)
  const [filter, setFilter] = useState('')
  const { history } = props

  const {
    fetchLocalPurchaseOrderDrafts,
    local_purchase_order_drafts,
    resetLocalPurchaseOrder,
    fetching_local_purchase_orders,
    createLocalPurchaseOrder,
    submitting_local_purchase_order,
    submit_local_purchase_order_success,
    local_purchase_orders_meta,
  } = props

  const handleCreateLocalPurchaseOrder = (row)=> {
    if(selectedDraft?.requestItems?.filter(rq => rq.status === "COMMENT").length > 0) {
      return message.error("Please make sure all request items are approved!")
    }
    if(selectedDraft?.requestItems?.filter(rq => rq.approval !== "APPROVED").length > 0) {
      return message.error("Please make sure all request items are approved!")
    }
    const payload = {draftId: selectedDraft?.id}
    createLocalPurchaseOrder(payload)
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
    }
    if(value) {
      fetchLocalPurchaseOrderDrafts({...query, })
    } else {
      fetchLocalPurchaseOrderDrafts({...query})
    }
  }

  const handlePageChange = async(page, pageSize) => {
    resetLocalPurchaseOrder()
    const query = {
      draftAwaitingApproval: true,
      pageNo: page - 1,
      pageSize: local_purchase_orders_meta?.pageSize,
    }
    fetchLocalPurchaseOrderDrafts(query)
  }

  React.useEffect(()=> {
    //fetchLpos()
    resetLocalPurchaseOrder()
    fetchLocalPurchaseOrderDrafts({
      draftAwaitingApproval: true,
      pageSize: local_purchase_orders_meta?.pageSize,
      pageNo: local_purchase_orders_meta?.currentPage,
    })
  }, [])

  React.useEffect(() => {
    if(!submitting_local_purchase_order && submit_local_purchase_order_success) {
      setVisible(false)
      setSelectedDraft(null)
      fetchLocalPurchaseOrderDrafts({draftAwaitingApproval: true})
    }
  }, [submitting_local_purchase_order, submit_local_purchase_order_success])

  const expandedRowRender = (row) => {
    const expandedColumns = [
      {title: 'DESCRIPTION', dataIndex: 'name', key: 'name'},
      {title: 'REASON', dataIndex: 'reason', key: 'reason'},
      {title: 'QUANTITY', dataIndex: 'quantity', key: 'quantity'},
      {title: 'UNIT PRICE', dataIndex: 'unitPrice', key: 'unitPrice', render: (text, row) => formatCurrency(row.unitPrice, row.currency)},
      {title: 'REQUESTED ON', dataIndex: 'requestDate', key: 'requestDate', render: (text)=> prettifyDateTime(text) },
      {title: 'APPROVAL', dataIndex: 'approval', key: 'approval', render: (text) => (
        <span><Badge status={text === 'APPROVED' ? 'success' : 'error'} />{text}</span>
      )},
      {title: 'STATUS', dataIndex: 'status', key: 'status', render: (text) => (
        <span><Badge status={text === 'PROCESSED' ? 'success' : 'error'} />{text}</span>
      )},
    ]
    return <Table columns={expandedColumns} dataSource={row.requestItems} pagination={false} rowKey="id" />
  }

  return (
    <React.Fragment>
      <MyPageHeader 
        title={(
          <Row style={{marginBottom: 20}}>
            <Col>
              <span className="bs-page-title">LOCAL PURCHASE ORDER DRAFTS</span>
              <span style={{marginLeft: 5}}><SyncOutlined disabled={fetching_local_purchase_orders} spin={fetching_local_purchase_orders} onClick={()=> {
                fetchLocalPurchaseOrderDrafts({draftAwaitingApproval: true})
              }} /></span>
            </Col>
          </Row>
        )}
        extra={[
          
        ]}
      />
      
      <Row>
        <Col md={24}>
          <Table 
            columns={columns({ onDownloadPdfClick: handleDownloadPdf, 
              onCreate: (row)=> {
                setSelectedDraft(row)
                setVisible(true)
              } })}
            dataSource={local_purchase_order_drafts}
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
        visible={visible}
        onClose={() => {
          setSelectedDraft(null)
          setVisible(false)
        }}
        width={900}
      >
        <Divider />
        <Row style={{marginTop: 30}}>
          <Col span={24}>
            <Button 
              style={{float: "right"}} 
              type="primary" 
              onClick={() => handleCreateLocalPurchaseOrder()}
              loading={submitting_local_purchase_order}
            >
              CREATE LPO
            </Button>
          </Col>
        </Row>
        {/* <Row>
          <Col span={24}>
            <List>
              <List.Item>
                <List.Item.Meta title="Supplier" description={selectedDraft?.requestItems[0]?.suppliers.filter(sp => sp.id === selectedDraft.supplierId)[0]?.name} />
              </List.Item>
              <List.Item>
                <List.Item.Meta title="Delivery Date" description={prettifyDateTime(selectedDraft?.deliveryDate)} />
              </List.Item>
            </List>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <span style={{fontWeight: "bold"}}>Entries</span>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Table 
              columns={requestColumns}
              dataSource={selectedDraft?.requestItems}
              pagination={false}
              size="small"
              bordered
            />
          </Col>
        </Row> */}
        <Row>
          <Col span={24}>
            <QuotationDetails quotation={selectedDraft} showItems={true} />
          </Col>
        </Row>
      </Drawer>
    </React.Fragment>
  )
}

export default CreateLPO