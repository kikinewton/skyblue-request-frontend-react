import React, { useEffect, useState } from 'react'
import MyPageHeader from '../../../shared/MyPageHeader'
import { Button, Card, Col, List, Row, Table, Tooltip } from 'antd'
import { prettifyDateTime } from '../../../util/common-helper'
import { CheckOutlined, CommentOutlined, InfoOutlined } from '@ant-design/icons'
import MyDrawer from '../../../shared/MyDrawer'
import QuotationDetails from '../../../shared/QuotationDetails'
import { COMMENT_PROCESS_VALUES, COMMENT_TYPES } from '../../../util/constants'
import GenericComment from '../../../shared/GenericComment'
import { EMPLOYEE_ROLE } from '../../../util/datas'
import { UPDATE_REQUEST_TYPES } from '../../../util/request-types'

const columns = (props) => [
  {
    title: 'DELIVERY DATE',
    dataIndex: 'deliveryDate',
    key: 'deliveryDate',
    render: text => prettifyDateTime(text)
  },
  {
    title: 'CREATED ON',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (text, row) => prettifyDateTime(row?.quotation?.createdAt)
  },
  {
    title: 'SUPPLIER',
    dataIndex: 'supplier',
    key: 'supplier',
    render: (text, row) => row?.quotation?.supplier?.name
  },
  {
    title: 'QUOTATION REF',
    dataIndex: 'quotationRef',
    key: 'quotationRef',
    render: (text, row) => row?.quotation?.quotationRef
  },
  {
    title: 'DEPARTMENT',
    dataIndex: 'department',
    key: 'department',
    render: (text, row) => row?.department?.name
  },
  {
    title: 'ACTION',
    dataIndex: 'action',
    key: 'action',
    width: '10%',
    render: (text, row) => (
      <Row>
        <Col span={12}>
          <Tooltip title="Comment">
            <Button size='small' shape='circle' onClick={() => props.onComment(row)}>
              <CommentOutlined />
            </Button>
          </Tooltip>
        </Col>
        <Col span={12}>
          <Tooltip title="View and review">
            <Button size='small' shape='circle' onClick={() => props.onView(row)}>
              <InfoOutlined />
            </Button>
          </Tooltip>
        </Col>
      </Row>
    )
  }
]


const RequestPendingQuotationReview = (props) => {

  const [selectedRow, setSelectedRow] = useState(null)
  const [visible, setVisible] = useState(false)
  const [commentVisible, setCommentVisible] = useState(false)

  // const fetchRequestPendingQuotationReview = () => {
  //   try {
  //     const response = fetchLpoDraftsPendingApproval({draftAwaitingApproval: })
  //   } catch(e) {

  //   }
  // }
  const getCommentProcess = () => {
    switch(props.currentUser?.role) {
      case EMPLOYEE_ROLE.ROLE_GENERAL_MANAGER:
        return COMMENT_PROCESS_VALUES.REVIEW_QUOTATION_GM
      case EMPLOYEE_ROLE.ROLE_HOD:
        return COMMENT_PROCESS_VALUES.REVIEW_QUOTATION_HOD
      default:
        return COMMENT_PROCESS_VALUES.PROCUREMENT_RESPONSE_TO_QUOTATION_REVIEW
    }
  }

  useEffect(() => {
    props.fetchLocalPurchaseOrderDrafts({underReview: true})
    // eslint-disable-next-line
  }, [])
  
  return (
    <>
      <MyPageHeader
        title="QUOTATIONS AWAITING REVIEW"
      />
      <Card>
        <Row>
          <Col span={24}>
            <Table 
              loading={props.local_purchase_order_drafts_loading}
              columns={columns({
                onView: (row) => {
                  props.fetchComments(row?.quotation?.id, COMMENT_TYPES.QUOTATION)
                  setSelectedRow(row)
                  setVisible(true)
                },
                onComment: row => {
                  props.resetComment()
                  props.fetchComments(row?.quotation?.id, COMMENT_TYPES.QUOTATION)
                  setSelectedRow(row)
                  setCommentVisible(true)
                }
              })}
              dataSource={props.local_purchase_order_drafts}
              rowKey="id"
              size='small'
              bordered
            />
          </Col>
        </Row>
      </Card>
      <MyDrawer
        titlw="QUOTATION INFO"
        visible={visible}
        width={900}
        onClose={() => {
          setSelectedRow(null)
          setVisible(false)
        }}
      >
        <Row>
          <Col span={12} style={{textAlign: "left"}}>
            <Button type='default' loading={props.updating_request} onClick={() => {
              setVisible(false)
              setCommentVisible(true)
            }}>
              <CommentOutlined />
              {`QUOTATION COMMENTS - ${(props?.comments || []).length}`}
            </Button>
          </Col>
          <Col span={12} style={{textAlign: "right"}}>
            <Button type='primary' loading={props.updating_request} onClick={() => {
              props.updateRequest({
                updateType: UPDATE_REQUEST_TYPES.HOD_REVIEW,
                role: "hod",
                payload: {requestItems: selectedRow?.requestItems}
              })
            }}>
              <CheckOutlined/>
              REVIEW QUOTATION
            </Button>
          </Col>
        </Row>
        <QuotationDetails 
          quotation={selectedRow?.quotation}
          showItems={true}
          requestItems={selectedRow?.requestItems}
        />
      </MyDrawer>
      
      <MyDrawer
        visible={commentVisible}
        width={900}
        onClose={() => {
          setSelectedRow(null)
          setCommentVisible(false)
        }}
      >
        <GenericComment
          loading={props.comments_loading}
          onCommentChange={(newComment) => {
            props.setNewComment(newComment)
          }}
          itemDescription={(
            <>
              <List>
                <List.Item>
                  <List.Item.Meta title="SUPPLIER" description={selectedRow?.quotation?.supplier?.name} />
                </List.Item>
              </List>
            </>
          )}
          newComment={props.new_comment}
          submitting={props.submitting_comment}
          comments={props.comments}
          onSubmit={(newComment) => {
            const payload = {
              'description': newComment,
              'process': getCommentProcess()
            }
            props.createComment(COMMENT_TYPES.QUOTATION, selectedRow?.quotation?.id, payload)
          }}
        />
      </MyDrawer>
    </>
  )
}

export default RequestPendingQuotationReview