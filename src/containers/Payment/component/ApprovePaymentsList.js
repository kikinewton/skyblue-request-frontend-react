import { CheckOutlined } from '@ant-design/icons'
import { Button, Card, Col, Drawer, Row, Table, List } from 'antd'
import React, { useEffect, useState } from 'react'
import { PAYMENT_COLUMNS } from '..'
import GrnDocumentReview from '../../../presentation/GrnDocumentReview'
import { userHasAnyRole } from '../../../services/api/auth'
import GoodsReceivedNoteDetails from '../../../shared/GoodsReceivedNoteDetails'
import LocalPurchaseOrderDetails from '../../../shared/LocalPurchaseOrderDetails'
import PaymentDetails from '../../../shared/PaymentDetails'
import QuotationDetails from '../../../shared/QuotationDetails'
import { formatCurrency } from '../../../util/common-helper'
import { EMPLOYEE_ROLE } from '../../../util/datas'
import AppLayout from '../../AppLayout'
import PaymentsSubNav from './PaymentsSubNav'

const APPROVAL_TYPES = {HOD_APPROVE: "HOD_APPROVE", GM_APPROVE: "GM_APPROVE", ACCOUNT_APPROVE: "ACCOUNT_APPROVE", 
  AUDIT_APPROVE:"AUDIT_APPROVE"}

const columns = props => PAYMENT_COLUMNS.concat([
  {
    title: "Actions",
    dataIndex: "actions",
    key: "actions",
    render: (text, row) => (<Button onClick={() => props.onApprove(row)} size="small" type="default">
      <CheckOutlined />{props.buttonLabel}
    </Button>)
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

  const buttonLabel = () => {
    switch(current_user.role) {
      case EMPLOYEE_ROLE.ROLE_AUDITOR:
        return "Check Payment"
      case EMPLOYEE_ROLE.ROLE_FINANCIAL_MANAGER:
        return "Authorise Payment"
      default:
        return "Approve Payment"
    }
  }

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
      <AppLayout
        title="Payments"
        subNav={<PaymentsSubNav currentUser={current_user} {...props} />}
      >
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
                  },
                  buttonLabel: buttonLabel()
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
          title="Approve Payment"
          placement="right"
          width={900}
          maskClosable={false}
          onClose={() => {
            setSelectedDraft(null)
            setVisible(false)
          }}
        >
          <Row style={{marginTop: 10}}>
            <Col span={24} style={{textAlign: "right"}}>
              <Button
                loading={submitting_payment}
                type="primary" 
                onClick={() => {
                  const payload = {
                    approval: true
                  }
                  updatePaymentDraft(selectedDraft?.id, payload)
                }}
              ><CheckOutlined />
                {buttonLabel()}
              </Button>
            </Col>
          </Row>
          <Row style={{marginTop: 30, marginBottom: 30}}>
            <Col span={24}>
              <PaymentDetails payment={selectedDraft} />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <GoodsReceivedNoteDetails
                grn={selectedDraft?.goodsReceivedNote}
                invoice={selectedDraft?.goodsReceivedNote?.invoice}
                invoiceDocument={selectedDraft?.goodsReceivedNote?.invoice?.invoiceDocument}
                requestItems={selectedDraft?.goodsReceivedNote?.receivedItems}
              />
            </Col>
          </Row>
          <Row style={{marginTop: 10}}>
            <Col span={24}>
              <LocalPurchaseOrderDetails 
                lpo={selectedDraft?.goodsReceivedNote?.localPurchaseOrder}
                showRequestItems={false}
              />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <QuotationDetails 
                quotation={selectedDraft?.goodsReceivedNote?.localPurchaseOrder?.quotation}
                files={[selectedDraft?.goodsReceivedNote?.localPurchaseOrder?.quotation?.requestDocument]}
                showItems={false}
              />
            </Col>
          </Row>
        </Drawer>
      </AppLayout>
    </>
  )
}

export default ApprovePaymentList