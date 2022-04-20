import { Table , Card, Row, Col, Pagination, Drawer, Input, Button, Form } from 'antd'
import React, { useEffect, useState } from 'react'
import { PAYMENT_COLUMNS } from '..'
import { RESPONSE_SUCCESS_CODE } from '../../../services/api/apiRequest'
import { cancelPayment, fetchPaymentDraftsHistory } from '../../../services/api/payment-draft'
import MyPageHeader from '../../../shared/MyPageHeader'
import openNotification from '../../../util/notification'
import AppLayout from '../../AppLayout'
import PaymentsSubNav from './PaymentsSubNav'

const columns = (props) => PAYMENT_COLUMNS.concat([
  
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
  const [grnRef, setGrnRef] = useState("")
  const [paymentRef, setPaymentRef] = useState("")
  const [cancelling, setCancelling] = useState(false)
  const [cancelVisible, setCancelVisible] = useState(false)

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
      const goodsReceivedNote = request?.goodsReceivedNote || []
      const supplier = goodsReceivedNote?.finalSupplier || {}
      return supplier?.name?.toLowerCase().includes(value.toLowerCase())
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
              <span style={{marginRight: 5}}>Recent payment drafts</span>
            </>
          )}
        />
        <Card>
          <Row>
            <Col span={4}>Filter: </Col>
            <Col span={20}>
              <Input 
                placeholder='search by grn' 
                type="search" value={grnRef} 
                onChange={e => {
                  setGrnRef(e.target.value)
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
                  }
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
            title="Payment Details"
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
                <Button loading={cancelling} type="danger" onClick={e => handleCancelPayment()}>Cancel Payment</Button>
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
        </Card>
      </AppLayout>
    </>
  )
}

export default PaymentDraftHistory