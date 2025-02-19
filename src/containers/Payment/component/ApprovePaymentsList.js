import { CheckOutlined, CommentOutlined } from '@ant-design/icons'
import { Button, Card, Col, Drawer, Row, Table, List } from 'antd'
import React, { useEffect, useState } from 'react'
import { PAYMENT_COLUMNS } from '..'
import GrnDocumentReview from '../../../presentation/GrnDocumentReview'
import { userHasAnyRole } from '../../../services/api/auth'
import GoodsReceivedNoteDetails from '../../../shared/GoodsReceivedNoteDetails'
import LocalPurchaseOrderDetails from '../../../shared/LocalPurchaseOrderDetails'
import MyDrawer from '../../../shared/MyDrawer'
import MyPageHeader from '../../../shared/MyPageHeader'
import PaymentComment from '../../../shared/PaymentComment'
import PaymentDetails from '../../../shared/PaymentDetails'
import QuotationDetails from '../../../shared/QuotationDetails'
import { COMMENT_PROCESS_VALUES, COMMENT_TYPES } from '../../../util/constants'
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
    render: (text, row) => (
      <Row>
        <Col span={7}>
          <Button size='small' type='default' onClick={() => props.onComment(row)}>
            <CommentOutlined />
          </Button>
        </Col>
        <Col span={16} offset={1}>
          <Button onClick={() => props.onApprove(row)} size="small" type="primary">
            <CheckOutlined/> {props.buttonLabel}
          </Button>
        </Col>
      </Row>
    )
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
  const [commentVisible, setCommentVisible] = useState(false)

  const buttonLabel = () => {
    switch(current_user.role) {
      case EMPLOYEE_ROLE.ROLE_AUDITOR:
        return "CHECK"
      case EMPLOYEE_ROLE.ROLE_FINANCIAL_MANAGER:
        return "AUTHORISE"
      default:
        return "APPROVE"
    }
  }

  const paymentProcessMethod = () => {
    switch(current_user.role) {
      case EMPLOYEE_ROLE.ROLE_AUDITOR:
        return COMMENT_PROCESS_VALUES.REVIEW_PAYMENT_DRAFT_AUDITOR
      case EMPLOYEE_ROLE.ROLE_FINANCIAL_MANAGER:
        return COMMENT_PROCESS_VALUES.REVIEW_PAYMENT_DRAFT_FM
      case EMPLOYEE_ROLE.ROLE_GENERAL_MANAGER:
        return COMMENT_PROCESS_VALUES.REVIEW_PAYMENT_DRAFT_GM
      case EMPLOYEE_ROLE.ROLE_ACCOUNT_OFFICER:
        return COMMENT_PROCESS_VALUES.ACCOUNT_OFFICER_RESPONSE_TO_AUDITOR_COMMENT
      default:
        return COMMENT_PROCESS_VALUES.REVIEW_PAYMENT_DRAFT_AUDITOR
    }
  }

  const pageTitle = () => {
    switch(current_user.role) {
      case EMPLOYEE_ROLE.ROLE_AUDITOR:
        return "check"
      case EMPLOYEE_ROLE.ROLE_FINANCIAL_MANAGER:
        return "authorisation"
      default:
        return "approval"
    }
  }

  const drawerTitle = () => {
    switch(current_user.role) {
      case EMPLOYEE_ROLE.ROLE_AUDITOR:
        return "CHECK PAYMENT"
      case EMPLOYEE_ROLE.ROLE_FINANCIAL_MANAGER:
        return "AURHORISE PAYMENT"
      default:
        return "APPROVE PAYMENT"
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
        <MyPageHeader
          title={`Payments awaiting ${pageTitle()}`}
        />
        <Row>
          <Col span={24}>
            <Card>
              <Table 
                columns={columns({
                  onApprove: (row) => {
                    setSelectedDraft(row)
                    setVisible(true)
                  },
                  onComment: (row) => {
                    props.resetComment()
                    props.fetchComments(row?.id, COMMENT_TYPES.PAYMENT)
                    setSelectedDraft(row)
                    setCommentVisible(true)
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
          title={drawerTitle()}
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
          <Row style={{marginTop: 10}}>
            <Col span={24}>
              <QuotationDetails 
                quotation={selectedDraft?.goodsReceivedNote?.localPurchaseOrder?.quotation}
                files={[selectedDraft?.goodsReceivedNote?.localPurchaseOrder?.quotation?.requestDocument]}
                showItems={false}
              />
            </Col>
          </Row>
        </Drawer>
        <MyDrawer
          visible={commentVisible}
          title="PAYMENT DRAFT DETAILS"
          onClose={() => {
            setCommentVisible(false)
            setSelectedDraft(null)
          }}
        >
          <PaymentComment 
            loading={props.comments_loading}
            payment={selectedDraft}
            comments={props.comments}
            newComment={props.new_comment}
            submitting={props.submitting_comment}
            onCommentChange={newComment => {
              props.setNewComment(newComment)
            }}
            onSubmit={(newComment) => {
              const payload = {
                'description': newComment,
                'process': paymentProcessMethod()
              }
              props.createComment(COMMENT_TYPES.PAYMENT, selectedDraft?.id, payload)
            }}
          />
        </MyDrawer>
      </AppLayout>
    </>
  )
}

export default ApprovePaymentList