import { CheckOutlined, RightOutlined, CommentOutlined } from '@ant-design/icons'
import { Card, Row, Col, Button, Table, Drawer, Form, DatePicker, Tooltip } from 'antd'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { GRN_COLUMNS } from '..'
import GrnDocumentReview from '../../../presentation/GrnDocumentReview'
import GrnComment from '../../../shared/GrnComment'
import LocalPurchaseOrderDetails from '../../../shared/LocalPurchaseOrderDetails'
import MyDrawer from '../../../shared/MyDrawer'
import { COMMENT_PROCESS_VALUES, COMMENT_TYPES } from '../../../util/constants'
import { EMPLOYEE_ROLE } from '../../../util/datas'



const columns = props => GRN_COLUMNS.concat([
  {
    title: "Actions",
    dataIndex: "actions",
    key: "actions",
    align: "right",
    render: (text, row) => (<div style={{display: 'flex', flexDirection: 'row'}}>
          <Tooltip title="COMMENT">
            <Button onClick={e => props.onComment(row)} size='small' style={{merginRight: 5}}>
              <CommentOutlined />
            </Button>
          </Tooltip>
          <Tooltip>
            <Button size="small" type="default" onClick={() => props.onSelect(row)}>Advise Payment <RightOutlined /></Button>
          </Tooltip>
    </div>)
  }
])


const GrnPendingPaymentAdvice = (props) => {
  const {
    grns,
    fetchGrns,
    updateGrn,
    fetching_grns,
    submitting_grn,
    submit_grn_success
  } = props
  const [visible, setVisible] = useState(false)
  const [selectedGrn, setSelectedGrn] = useState(null)
  const [form] = Form.useForm()
  const [commentVisible, setCommentVisible] = useState(false)

  const paymentProcessMethod = () => {
    switch(props?.currentUser.role) {
      case EMPLOYEE_ROLE.ROLE_STORE_OFFICER:
        return COMMENT_PROCESS_VALUES.GRN_STORES
      case EMPLOYEE_ROLE.ROLE_PROCUREMENT_MANAGER:
        return COMMENT_PROCESS_VALUES.PROCUREMENT_RESPONSE_TO_ACCOUNT_GRN_COMMENT
      case EMPLOYEE_ROLE.ROLE_ACCOUNT_OFFICER:
        return COMMENT_PROCESS_VALUES.REVIEW_GRN_ACCOUNTS
      default:
        return COMMENT_PROCESS_VALUES.GRN_STORES
    }
  }

  useEffect(() => {
    fetchGrns({needPaymentAdvice: true})
  }, [])

  useEffect(() => {
    if(!submitting_grn && submit_grn_success) {
      setVisible(false)
      setSelectedGrn(null)
      fetchGrns({needPaymentAdvice: true})
      form.setFieldsValue({payment_date: ""})
    }
  }, [submit_grn_success, submitting_grn])

  return (
    <>
      <Card size="small" title="Goods Received Note Awaiting Payment Advice">
        <Row>
          <Col span={24}>
            <Table
              columns={columns({
                onSelect: (row) => {
                  setSelectedGrn(Object.assign({}, row))
                  setVisible(true)
                },
                onComment: row => {
                  props.resetComment()
                  props.fetchComments(row.id, COMMENT_TYPES.GRN)
                  setSelectedGrn(row)
                  setCommentVisible(true)
                }
              })}
              dataSource={grns}
              size="small"
              bordered
              loading={fetching_grns}
              rowKey="id"
            />
          </Col>
        </Row>
      </Card>
      <Drawer
        forceRender
        visible={visible}
        title="Advise Payment"
        placement="right"
        width={800}
        maskClosable={false}
        onClose={() => {
          setSelectedGrn(null)
          setVisible(false)
          form.setFieldsValue({payment_date: ""})
        }}
      >
        <GrnDocumentReview 
          grn={selectedGrn}
          invoice={selectedGrn?.invoice}
          invoiceDocument={selectedGrn?.invoice?.invoiceDocument}
        />
        <LocalPurchaseOrderDetails 
          lpo={selectedGrn?.localPurchaseOrder}
          showRequestItems={false}
        />
        <Row style={{marginTop: 40}}>
          <Col span={24}>
            <Form
              form={form}
              layout="vertical"
              initialValues={{
                payment_date: ""
              }}
              onFinish={values => {
                const payload = {
                  paymentDate: moment(values?.payment_date).format("YYYY-MM-DD"),
                  paymentAdvice: true
                }
                console.log('payload', payload)
                updateGrn(selectedGrn?.id, payload)
              }}
            >
              <Form.Item name="payment_date" label="Payment Date" rules={[
                {required: true, message: "Payment Date requireq!"}
              ]}>
                <DatePicker 
                  style={{width: "100%"}}
                  showTime={false}
                />
              </Form.Item>
              <Form.Item>
                <Button loading={submitting_grn} type="primary" htmlType="submit">
                  <CheckOutlined />
                  Advice Payment
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Drawer>
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
    </>
  )
}

export default GrnPendingPaymentAdvice