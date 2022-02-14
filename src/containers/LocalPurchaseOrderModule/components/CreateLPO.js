import { DownloadOutlined, SyncOutlined } from '@ant-design/icons'
import { Badge, Button, Col, Row, Table, Drawer, List, message, Divider } from 'antd'
import React, { useState } from 'react'
import { downloadLPODocument } from '../../../services/api/local-purchase-order'
import QuotationDetails from '../../../shared/QuotationDetails'
import { prettifyDateTime } from '../../../util/common-helper'
import { REQUEST_COLUMNS } from '../../../util/constants'

const columns = (props) => [
  {
    title: 'Supplier',
    dataIndex: 'supplierId',
    key: 'supplierId',
    render: (text, row)=> row?.requestItems[0]?.suppliers.find(item=> item.id === row.supplierId)?.name || 'N/A'
  },
  {
    title: 'Created On',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (text) => text ? prettifyDateTime(text) : "N/A"
  },
  {
    title: 'Delivery Date',
    dataIndex: 'deliveryDate',
    key: 'deliveryDate',
    render: (text) => text ? prettifyDateTime(text) : 'N/A'
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'operation',
    align: 'right',
    render: (text, row) => (
      <Row>
        <Col md={24}>
          <Button onClick={() => props.onCreate(row)} size="small">
            Create Local Purchase Order
          </Button>
        </Col>
      </Row>
      
    )
  },
]

export const requestColumns = [
  {
    title: 'Reference',
    dataIndex: 'requestItemRef',
    key: 'requestItemRef'
  },
  {
    title: 'Description',
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
  const { history } = props

  const {
    fetchLocalPurchaseOrders,
    fetchLocalPurchaseOrderDrafts,
    local_purchase_order_drafts,
    resetLocalPurchaseOrder,
    fetching_local_purchase_orders,
    createLocalPurchaseOrder,
    submitting_local_purchase_order,
    submit_local_purchase_order_success,
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

  React.useEffect(()=> {
    //fetchLpos()
    resetLocalPurchaseOrder()
    fetchLocalPurchaseOrderDrafts({draftAwaitingApproval: true})
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
      {title: 'Description', dataIndex: 'name', key: 'name'},
      {title: 'Reason', dataIndex: 'reason', key: 'reason'},
      {title: 'Quantity', dataIndex: 'quantity', key: 'quantity'},
      {title: 'Request Date', dataIndex: 'requestDate', key: 'requestDate', render: (text)=> prettifyDateTime(text) },
      {title: 'Approval', dataIndex: 'approval', key: 'approval', render: (text) => (
        <span><Badge status={text === 'APPROVED' ? 'success' : 'error'} />{text}</span>
      )},
      {title: 'Status', dataIndex: 'status', key: 'status', render: (text) => (
        <span><Badge status={text === 'PROCESSED' ? 'success' : 'error'} />{text}</span>
      )},
    ]
    return <Table columns={expandedColumns} dataSource={row.requestItems} pagination={false} rowKey="id" />
  }

  return (
    <React.Fragment>
      <Row style={{marginBottom: 20}}>
        <Col>
          <span className="bs-page-title">Local Purchase Orders</span>
          <span style={{marginLeft: 5}}><SyncOutlined disabled={loading} spin={loading} onClick={()=> {
            fetchLocalPurchaseOrderDrafts({draftAwaitingApproval: true})
          }} /></span>
        </Col>
      </Row>
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
              Create LPO
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
            <QuotationDetails quotation={selectedDraft} />
          </Col>
        </Row>
      </Drawer>
    </React.Fragment>
  )
}

export default CreateLPO