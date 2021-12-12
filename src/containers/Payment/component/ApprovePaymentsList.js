import { CheckOutlined } from '@ant-design/icons'
import { Button, Card, Col, Drawer, Row, Table, List } from 'antd'
import React, { useEffect, useState } from 'react'
import { PAYMENT_COLUMNS } from '..'
import GrnDocumentReview from '../../../presentation/GrnDocumentReview'
import { formatCurrency } from '../../../util/common-helper'
import { EMPLOYEE_ROLE } from '../../../util/datas'

const APPROVAL_TYPES = {HOD_APPROVE: "HOD_APPROVE", GM_APPROVE: "GM_APPROVE", ACCOUNT_APPROVE: "ACCOUNT_APPROVE", 
  AUDIT_APPROVE:"AUDIT_APPROVE"}

const columns = props => PAYMENT_COLUMNS.concat([
  {
    title: "Actions",
    dataIndex: "actions",
    key: "actions",
    render: (text, row) => (<Button onClick={() => props.onApprove(row)} size="small" shape="round"><CheckOutlined /></Button>)
  }
])


const ApprovePaymentList = (props) => {
  const {
    current_user,
    payment_drafts,
    fetchPaymentDrafts,
    fetching_payments,
    updatePaymentDraft,
    resetPayment,
    resetPaymentDraft,
    submitting_payment,
    submit_payment_success,
  } = props
  const [visible, setVisible] = useState(false)
  const [ selectedDraft, setSelectedDraft] = useState(null)

  useEffect(() => {
    resetPayment()
    resetPaymentDraft()
    fetchPaymentDrafts({})
  }, [])

  useEffect(() => {
    if(!submitting_payment && submit_payment_success) {
      setSelectedDraft(null)
      setVisible(false)
      fetchPaymentDrafts({})
    }
  }, [submitting_payment, submit_payment_success])

  return (
    <>
      <Row>
        <Col span={24}>

        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Card
            size="small"
            title="Payments awaiting approval"
          >
            <Table 
              columns={columns({
                onApprove: (row) => {
                  setSelectedDraft(row)
                  setVisible(true)
                }
              })}
              dataSource={payment_drafts}
              loading={fetching_payments}
              size="small"
              bordered
              pagination={{pageSize: 20}}
            />
          </Card>
        </Col>
      </Row>
      <Drawer
        forceRender
        visible={visible}
        title="Review and endorse"
        placement="right"
        width={800}
        maskClosable={false}
        onClose={() => {
          setSelectedDraft(null)
          setVisible(false)
        }}
      >
        <GrnDocumentReview 
          grn={selectedDraft?.goodsReceivedNote}
          invoice={selectedDraft?.goodsReceivedNote?.invoice}
          invoiceDocument={selectedDraft?.goodsReceivedNote?.invoice?.invoiceDocument}
        />
        <Row style={{marginTop: 30}}>
          <Col span={24}>
            <Card
              title="Payment Details"
              size="small"
            >
              <List>
                <List.Item key="amount">
                  <List.Item.Meta title="Amount Paid" description={formatCurrency(selectedDraft?.amount)} />
                </List.Item>
                <List.Item key="method">
                  <List.Item.Meta title="Payment channel" description={selectedDraft?.paymentMethod} />
                </List.Item>
                <List.Item key="cheque">
                  <List.Item.Meta title="Cheque No" description={selectedDraft?.chequeNumber} />
                </List.Item>
                <List.Item key="status">
                  <List.Item.Meta title="Payment type" description={selectedDraft?.paymentStatus} />
                </List.Item>
              </List>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Button 
              loading={submitting_payment}
              type="primary" onClick={() => {
              const payload = {
                approval: true
              }
              updatePaymentDraft(selectedDraft?.id, payload)
            }}><CheckOutlined /> APPROVE PAYMENT</Button>
          </Col>
        </Row>
      </Drawer>
    </>
  )
}

export default ApprovePaymentList