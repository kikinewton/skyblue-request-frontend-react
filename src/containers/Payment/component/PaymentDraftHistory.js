import { CommentOutlined, EyeOutlined } from '@ant-design/icons'
import { Table , Card, Row, Col, Drawer, Input, Button, Form } from 'antd'
import React, { useEffect, useState } from 'react'
import { PAYMENT_COLUMNS } from '..'
import { RESPONSE_SUCCESS_CODE } from '../../../services/api/apiRequest'
import { userHasAnyRole } from '../../../services/api/auth'
import { cancelPayment, fetchPaymentDraftsHistory } from '../../../services/api/payment-draft'
import MyDrawer from '../../../shared/MyDrawer'
import MyPageHeader from '../../../shared/MyPageHeader'
import PaymentComment from '../../../shared/PaymentComment'
import PaymentDraftDetails from '../../../shared/PaymentDraftDetails'
import { COMMENT_PROCESS_VALUES, COMMENT_TYPES } from '../../../util/constants'
import { EMPLOYEE_ROLE } from '../../../util/datas'
import openNotification from '../../../util/notification'
import AppLayout from '../../AppLayout'
import PaymentsSubNav from './PaymentsSubNav'

const columns = (props) => PAYMENT_COLUMNS.concat([
  {
    title: "ACTIONS",
    dataIndex: "actions",
    key: "actions",
    render: (text, row) => (<Row>
      <Col span={12}>
        <Button size='small' onClick={e =>  props.onView(row)}>
          <EyeOutlined />
        </Button>
      </Col>
      <Col span={12}>
        <Button 
          disabled={!userHasAnyRole(props.userRole, [EMPLOYEE_ROLE.ROLE_FINANCIAL_MANAGER, EMPLOYEE_ROLE.ROLE_AUDITOR, EMPLOYEE_ROLE.ROLE_GENERAL_MANAGER])} 
          size='small' onClick={() => props.onComment(row)}>
          <CommentOutlined />
        </Button>
      </Col>
    </Row>)
  }
])

const PaymentDraftHistory = (props) => {
  const {
    current_user
  } = props

  const [requests, setRequests] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [meta, setMeta] = useState({currentPage: 0, pageSize: 30, total: 0, totalPages: 0})
  const [loading, setLoading] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState(null)
  const [visible, setVisible] = useState(false)
  const [purchaseNumber, setPurchaseNumber] = useState("")
  const [cancelling, setCancelling] = useState(false)
  const [cancelVisible, setCancelVisible] = useState(false)
  const [commentVisible, setCommentVisible] = useState(false)

  const paymentProcessMethod = () => {
    switch(current_user.role) {
      case EMPLOYEE_ROLE.ROLE_AUDITOR:
        return COMMENT_PROCESS_VALUES.REVIEW_PAYMENT_DRAFT_AUDITOR
      case EMPLOYEE_ROLE.ROLE_FINANCIAL_MANAGER:
        return COMMENT_PROCESS_VALUES.REVIEW_PAYMENT_DRAFT_FM
      case EMPLOYEE_ROLE.ROLE_GENERAL_MANAGER:
        return COMMENT_PROCESS_VALUES.REVIEW_PAYMENT_DRAFT_GM
      default:
        return COMMENT_PROCESS_VALUES.REVIEW_PAYMENT_DRAFT_AUDITOR
    }
  }

  const resetPagination = () => {
    setMeta({currentPage: 0, pageSize: 30, total: 0, totalPages: 0})
  }

  const handleChange = () => {
    resetPagination()
    fetchPaymentHistory()
  }

  
  const fetchPaymentHistory = async () => {
    setLoading(true)
    const query = {}
    try {
      const result = await fetchPaymentDraftsHistory({})
      // if(result?.meta) {
      //   const { currentPage, pageSize, total, totalPages } = result?.meta
      //   setMeta({...meta, currentPage: currentPage + 1, total: total * totalPages, pageSize, totalPages})
      // }
      setRequests(result?.data)
      setFilteredData(result?.data)
    } catch (error) {
      
    } finally {
      setLoading(false)
    }
  }

  // const handlePageChange = async(page, pageSize) => {
  //   setLoading(true)
  //   const query = {}
  //   try {
  //     const result = await fetchPaymentDraftsHistory(query)
  //     const { currentPage, pageSize, total, totalPages } = result?.meta
  //     setMeta({...meta, currentPage: currentPage + 1, pageSize, totalPages})
  //     setRequests(result?.data)
  //   } catch (error) {
      
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  const onFilter = (value) => {
    setFilteredData(requests.filter(request => {
      return request?.purchaseNumber?.toLowerCase().includes(value.toLowerCase())
    }))
  }

  const handleCancelPayment = async () => {
    setCancelling(true)
    try {
      const result = await cancelPayment(selectedPayment?.id)
      if(result.status === RESPONSE_SUCCESS_CODE) {
        openNotification("success", "Cancel Payment", result?.message)
        setVisible(false)
      }
    } catch (error) {
      openNotification("success", "Cancel Payment", "Failed")
    } finally {
      setCancelling(false)
    }
  }

  useEffect(() => {
    fetchPaymentHistory()
  }, [])

  return (
    <>
      <AppLayout subNav={<PaymentsSubNav currentUser={current_user} {...props} />}>
        <MyPageHeader
          title={(
            <>
              <span style={{marginRight: 5}}>PAYMENT DRAFTS</span>
            </>
          )}
        />
        <Card>
          <Row>
            <Col span={4}>Filter: </Col>
            <Col span={20}>
              <Input 
                placeholder='Purchase number' 
                type="search" value={purchaseNumber} 
                onChange={e => {
                  setPurchaseNumber(e.target.value)
                  onFilter(e.target.value)
                }}  
              />
            </Col>
          </Row>
        </Card>
        <Card>
          <Row>
            <Col span={24}>
              <Table
                loading={loading}
                columns={columns({
                  onView: row =>  {
                    setSelectedPayment(row)
                    setVisible(true)
                  },
                  onComment: row => {
                    props.resetComment()
                    props.fetchComments(row.id, COMMENT_TYPES.PAYMENT)
                    setSelectedPayment(row)
                    setCommentVisible(true)
                  },
                  userRole: props?.current_user?.role
                })}
                dataSource={filteredData}
                pagination={{
                  pageSize: 10
                }}
                rowKey="id"
                size='small'
              />
            </Col>
          </Row>
          {/* <Row>
            <Col span={24}>
              <Pagination
                showSizeChanger={false}
                defaultCurrent={meta.currentPage + 1}
                total={meta.total}
                current={meta.currentPage}
                defaultPageSize={meta.pageSize}
                pageSize={meta?.pageSize}
                onChange={handlePageChange}
                size='small'
              />
            </Col>
          </Row> */}
          <Drawer
            title="PAYMENT DRAFT DETAILS"
            visible={visible}
            width={800}
            placement="right"
            onClose={() => {
              setSelectedPayment(null)
              setVisible(false)
            }}
          >
            <Row>
              <Col span={24}>
                <PaymentDraftDetails 
                  payment={selectedPayment}
                />
              </Col>
            </Row>
          </Drawer>
          <Drawer
            visible={cancelVisible}
            title="Payment Details"
            width={800}
            placement="right"
            onClose={() => {
              setSelectedPayment(null)
              setVisible(false)
            }}
          >
            <Row>
              <Col span={24}>
                <Form
                  onFinish={values => {
                    console.log('finish', values)
                    const paylaod = {
                      comment: values.comment,
                      paymentId: selectedPayment?.id
                    }
                  }}
                  initialValues={{comment: ""}}
                  layout="vertical"
                >
                  <Form.Item
                    label="Comment" 
                    name="comment"
                    rules={[
                      {required: true, message: "Comment required"}
                    ]}
                  >
                    <Input.TextArea placeholder='Comment...' rows={6} />
                  </Form.Item>
                  <Form.Item>
                    <Button type='primary' htmlType='submit'>
                      Cancel Payment
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </Drawer>
          <MyDrawer
            visible={commentVisible}
            title="PAYMENT DRAFT DETAILS"
            onClose={() => {
              setCommentVisible(false)
              setSelectedPayment(null)
            }}
          >
            <PaymentComment 
              payment={selectedPayment}
              comments={props.comments}
              newComment={props.new_comment}
              submitting={props.submitting_comment}
              onSubmit={(newComment) => {
                const payload = {
                  'description': newComment,
                  'process': paymentProcessMethod()
                }
                props.createComment(COMMENT_TYPES.PAYMENT, selectedPayment?.id, payload)
              }}
            />
          </MyDrawer>
        </Card>
      </AppLayout>
    </>
  )
}

export default PaymentDraftHistory