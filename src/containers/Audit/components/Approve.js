import { Button, Card, Col, Input, List, message, Modal, Row, Spin, Table } from 'antd'
import React from 'react'
import MySwal from '../../../util/sweet-alert'
import * as paymentApi from '../../../services/api/payment-draft'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import openNotification from '../../../util/notification'

const columns = (props) => [
  {
    title: 'Payment Method',
    dataIndex: 'paymentMethod',
    key: 'paymentMethod'
  },
  {
    title: 'Invoice Amount (GHS)',
    dataIndex: 'goodsReceivedNote',
    key: 'goodsReceivedNote',
    render: (text, row)=> row.goodsReceivedNote?.invoiceAmountPayable || "N/A"
  },
  {
    title: 'Payment Amount (GHS)',
    dataIndex: 'paymentAmount',
    key: 'paymentAmount'
  },
  {
    title: 'Bank / Telco',
    dataIndex: 'bank',
    key: 'bank'
  },
  {
    title: 'Cheque Number',
    dataIndex: 'chequeNumber',
    key: 'chequeNumber'
  },
  {
    title: 'Payment Status',
    dataIndex: 'paymentStatus',
    key: 'paymentStatus'
  },
  {
    title: 'Actions',
    dataIndex: 'operation',
    key: 'operation',
    align: "right",
    render: (text, row) => (
      <Row gutter={6}>
        <Col md={12}>
          <Button size="small" onClick={()=> props.onRowClick({...row, actionType: 'approve'})}>
            <CheckOutlined /> Approve
          </Button>
        </Col>
        <Col md={12}>
          <Button danger size="small" onClick={()=> props.onRowClick({...row, actionType: 'cancel'})}>
            <CloseOutlined /> Reject
          </Button>
        </Col>
      </Row>
    )
  },
]

const Approve = (props) => {
  const [ payments, setPayments ] = React.useState([])
  const [ loading, setLoading ] = React.useState(false)
  const [ modal, setModal ] = React.useState(false)
  const [ payment, setPayment ] = React.useState({})
  const [comment, setComment] = React.useState("")
  const [ submitting, setSubmitting ] = React.useState(false)

  const handleRowClick = (row) => {
    setPayment(row)
    setModal(true)
  }

  const fetchAllPaymentDrafts = async (query) => {
    setLoading(true)
    try {
      const response = await paymentApi.getAllPaymentDrafts(query)
      if(response.status === 'OK') {
        setPayments(response.data || [])
      } else {
        message.error(response.message || "Fetch payments failed!")
      }
      setLoading(false)
    } catch (error) {
      message.error(error.response?.message || "Fetch payments failed!")
      setLoading(false)
    }
  }

  

  const handleSubmit = async () => {
    const payload = { comment, status: payment.actionType === 'approve' }
    console.log('query payload', payload)
    setSubmitting(true)
    try {
      const response = await paymentApi.approvePaymentDraft(payment?.id, payload)
      if(response.status === "OK") {
        openNotification("success", `${payment.actionType === 'approve' ? "Approve" : "Cancel"} payment`, response.message||"Success")
        setModal(false)
        fetchAllPaymentDrafts({})
      } else {
        openNotification("error", `${payment.actionType === 'approve' ? "Approve" : "Cancel"} payment`, response.message||"Failed")
      }
    } catch (error) {
      openNotification("error", `${payment.actionType === 'approve' ? "Approve" : "Cancel"} payment`, "Failed")
    }
    setSubmitting(false)
  }

  React.useEffect(()=> {
    fetchAllPaymentDrafts({})
  }, [])

  return (
    <React.Fragment>
      <Row>
        <Col md={24}>
          <span className="bs-page-title">Approve Payments</span>
        </Col>
      </Row>
      <Row>
        <Col md={24}>
          <Card>
            { loading ? <Spin /> : 
              <Table 
                columns={columns({onRowClick: (row)=> handleRowClick(row)})}
                dataSource={payments}
                size="small"
                rowKey="id"
                bordered
              />
            }
          </Card>
        </Col>
      </Row>
      <Modal visible={modal}
        forceRender
        title={`Are you sure you want to ${payment.actionType === 'approve' ? 'APPROVE' : 'REJECT'} payment?`}
        okText={`${payment.actionType === 'approve' ? 'APPROVE' : "REJECT"} PAYMENT`}
        cancelText="Close"
        onCancel={()=> {
          setComment("")
          setModal(false)
        }}
        okButtonProps={{
          danger: payment.actionType !== 'approve'
        }}
        onOk={()=> handleSubmit()}
        confirmLoading={submitting}
      >
        <List>
          <List.Item>
            <List.Item.Meta title="Purchase Number" description={payment.purchaseNumber} />
          </List.Item>
          <List.Item>
            <List.Item.Meta title="Purchase Method" description={payment.paymentMethod} />
          </List.Item>
          <List.Item>
            <List.Item.Meta title="Invoice Amount (GHS)" description={payment.goodsReceivedNote?.invoiceAmountPayable} />
          </List.Item>
          <List.Item>
            <List.Item.Meta title="Payment Amount (GHS)" description={payment.paymentAmount} />
          </List.Item>
          <List.Item>
            <List.Item.Meta title="Bank" description={payment.bank} />
          </List.Item>
          <List.Item>
            <List.Item.Meta title="Cheque Number" description={payment.chequeNumber} />
          </List.Item>
          <List.Item>
            <List.Item.Meta title="Purchase Status" description={payment.paymentStatus} />
          </List.Item>
          <List.Item>
            <List.Item.Meta title="Comment" description={<Input value={comment} onChange={(event)=> setComment(event.target.value)} />} />
          </List.Item>
        </List>
      </Modal>
    </React.Fragment>
  )
}

export default Approve