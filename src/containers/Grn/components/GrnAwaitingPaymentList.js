import { Badge, Button, Card, Col, Row, Table } from 'antd'
import React, { useState } from 'react'
import { history } from '../../../util/browser-history'
import { GRN_COLUMNS } from '../../Grn'
import AppLayout from '../../AppLayout'
import { CommentOutlined } from '@ant-design/icons'
import MyDrawer from '../../../shared/MyDrawer'
import { COMMENT_PROCESS_VALUES, COMMENT_TYPES } from '../../../util/constants'
import GrnComment from '../../../shared/GrnComment'
import { EMPLOYEE_ROLE } from '../../../util/datas'


const columns = (props) => GRN_COLUMNS.concat([
  {
    title: "PAYMENT INITIATED",
    dataIndex: "hasPendingPaymentDraft",
    key: "hasPendingPaymentDraft",
    render: (text, row) => row?.hasPendingPaymentDraft ? (
      <>
        <Badge status="success" />
        YES
      </>
    ) : (
      <>
        <Badge status="warning" />
        NO
      </>
    )
  },
  {
    title: "ACTIONS",
    dataIndex: "operation",
    key: "operation",
    align: 'right',
    render: (text, row) => (
      <Row>
        <Col span={6}>
          <Button size="small" type="default" onClick={() => props.onComment(row)}>
            <CommentOutlined />
          </Button>
        </Col>
      </Row>
    )
  },
])

const GrnAwaitingPaymentList = (props) => {
  const {
    grns,
    fetchGrns,
    fetching_grns,
    resetGrn,
    current_user
  } = props

  const [commentVisible, setCommentVisible] = useState(false)
  const [selectedGrn, setSelectedGrn] = useState(null)

  const paymentProcessMethod = () => {
    switch(props.currentUser.role) {
      case EMPLOYEE_ROLE.ROLE_STORE_OFFICER:
        return COMMENT_PROCESS_VALUES.PROCUREMENT_RESPONSE_TO_ACCOUNT_GRN_COMMENT
      case EMPLOYEE_ROLE.ROLE_PROCUREMENT_MANAGER:
        return COMMENT_PROCESS_VALUES.PROCUREMENT_RESPONSE_TO_ACCOUNT_GRN_COMMENT
      case EMPLOYEE_ROLE.ROLE_ACCOUNT_OFFICER:
        return COMMENT_PROCESS_VALUES.REVIEW_GRN_ACCOUNTS
      default:
        return COMMENT_PROCESS_VALUES.GRN_STORES
    }
  }

  const handleGoToNewPayment = (row) => {
    history.push(`/app/payments/goods-receive-notes/${row.id}/add-new-payment`)
  }

  React.useEffect(()=> {
    resetGrn()
    fetchGrns({
      paymentInComplete: true
    })
  }, [])

  return (
    <React.Fragment>
        <Row>
          <Col md={24}>
            <Card size="small" title="GOODS RECEIVE NOTES AWAITING PAYMENT">
              <Table
                columns={columns({...props, onNewPaymentClick: (row)=> handleGoToNewPayment(row), 
                  onComment: row => {
                    props.resetComment()
                    props.fetchComments(row?.id, COMMENT_TYPES.GRN)
                    setSelectedGrn(row)
                    setCommentVisible(true)
                  }
                })}
                dataSource={grns}
                size="small"
                rowKey="id"
                bordered
                loading={fetching_grns}
              />
            </Card>
          </Col>
        </Row>

        <MyDrawer
          visible={commentVisible}
          title="GRN COMMENTS"
          onClose={() => {
            setCommentVisible(false)
            setSelectedGrn(null)
          }}
        >
          <GrnComment 
            loading={props.comments_loading}
            grn={selectedGrn}
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
              props.createComment(COMMENT_TYPES.GRN, selectedGrn?.id, payload)
            }}
          />
        </MyDrawer>
    </React.Fragment>
  )
}
export default GrnAwaitingPaymentList