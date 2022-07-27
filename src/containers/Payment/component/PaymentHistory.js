import { EyeOutlined } from '@ant-design/icons'
import { Table , Card, Row, Col, Pagination, Modal, Input, Button, Form, List, Drawer } from 'antd'
import React, { useEffect, useState } from 'react'
import { PAYMENT_COLUMNS } from '..'
import { RESPONSE_SUCCESS_CODE } from '../../../services/api/apiRequest'
import { userHasAnyRole } from '../../../services/api/auth'
import { fetchPayments, cancelPayment } from '../../../services/api/payment-draft'
import MyPageHeader from '../../../shared/MyPageHeader'
import PaymentDetails from '../../../shared/PaymentDetails'
import { EMPLOYEE_ROLE } from '../../../util/datas'
import openNotification from '../../../util/notification'
import AppLayout from '../../AppLayout'
import PaymentsSubNav from './PaymentsSubNav'

const columns = (props) => PAYMENT_COLUMNS.concat([
  {
    title: "actions",
    dataIndex: "actions",
    key: "actions",
    render: (text, row) =>  (
      <>
        <Button size="small" type="default" onClick={() => props.onView(row)}>
          <EyeOutlined /> View
        </Button>
        <Button style={{marginLeft: 5}} disabled={row.deleted} size="small" type="default" danger onClick={() => props.onCancel(row)}>
          Cancel
        </Button>
      </>
    )
  }
])

const PaymentHistory = (props) => {
  const {
    current_user
  } = props

  const [requests, setRequests] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [meta, setMeta] = useState({currentPage: 0, pageSize: 30, total: 0, totalPages: 0})
  const [purchaseNumber, setPurchaseNumber] = useState("")
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
  const [cancelForm] = Form.useForm();

  const handleChange = () => {
    resetPagination()
    fetchPaymentHistory()
  }

  
  const fetchPaymentHistory = async () => {
    setLoading(true)
    const query = {
      pageSize: 5,
        pageNo: 0,
        reference: grnRef ? grnRef : null,
        purchaseNumber: paymentRef ? paymentRef : null,
    }
    try {
      const result = await fetchPayments(query)
      console.log('result', result.data)
      if(result?.meta) {
        const { currentPage, pageSize, total, totalPages } = result?.meta
        setMeta({...meta, currentPage: currentPage + 1, total: total * totalPages, pageSize, totalPages})
      }
      
      setRequests(result?.data)
      setFilteredData(result?.data)
    } catch (error) {
      
    } finally {
      setLoading(false)
    }
  }

  const onFilter = (value) => {
    setFilteredData(requests.filter(request => {
      return request?.purchaseNumber?.toLowerCase().includes(value?.toLowerCase())
    }) || [])
  }

  const handlePageChange = async(page, pageSize) => {
    setLoading(true)
    setMeta({...meta, currentPage: page})
    const query = {
      pageNo: page - 1,
      pageSize: meta?.pageSize
    }

    try {
      const result = await fetchPayments(query)
      const { currentPage, pageSize, total, totalPages } = result?.meta
      setMeta({...meta, currentPage: currentPage + 1, pageSize, totalPages})
      setRequests(result?.data)
    } catch (error) {
      
    } finally {
      setLoading(false)
    }
  }

  const handleCancelPayment = async (values) => {
    setCancelling(true)
    try {
      const payload = {
        comment: values.comment,
        chequeNumber: selectedPayment?.chequeNumber
      }
      const result = await cancelPayment(selectedPayment?.id, payload)
      console.log('response', result)
      if(result.status === RESPONSE_SUCCESS_CODE) {
        openNotification("success", "Cancel Payment", result?.message)
        setCancelVisible(false)
        setSelectedPayment(null)
        cancelForm.resetFields()
        fetchPaymentHistory()
      } else {
        openNotification("error", "Cancel Payment", result?.message)
      }
    } catch (error) {
      const message = error?.response?.data?.message || "Failed to cancel payment"
      openNotification("success", "Cancel Payment", message)
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
              <span style={{marginRight: 5}}>All Payments</span>
            </>
          )}
        />
        <Card>
          <Row>
            <Col span={4}>Filter: </Col>
            <Col span={20}>
              <Input placeholder='purchase number' type="search" 
                value={purchaseNumber}
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
                    setCancelVisible(false)
                    setVisible(true)
                  },
                  onCancel: row => {
                    setSelectedPayment(row)
                    setVisible(false)
                    setCancelVisible(true)
                  }
                })}
                dataSource={filteredData}
                pagination={{
                  pageSize: 30,
                }}
                rowKey="id"
                size='small'
                bordered
              />
            </Col>
          </Row>
          <Row>
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
          </Row>
        </Card>
        <Drawer
          visible={visible}
          title="Payment Details"
          width={720}
          placement="right"
          onClose={() => {
            setSelectedPayment(null)
            setVisible(false)
          }}
        >
          <PaymentDetails 
            payment={selectedPayment}
          />
        </Drawer>
        <Modal
          visible={cancelVisible}
          footer={false}
          title="Cancel Payment"
          onCancel={() => {
            setCancelVisible(false)
            setSelectedPayment(null)
          }}
        >
          <Form
            form={cancelForm}
            initialValues={{comment: ""}}
            onFinish={values => {
              handleCancelPayment(values)
            }}
            layout="vertical"
          >
            <Form.Item>
              <List>
                <List.Item>
                  <List.Item.Meta title="Payment Status" description={selectedPayment?.paymentStatus} />
                </List.Item>
                <List.Item>
                  <List.Item.Meta title="Payment Purchase Number" description={selectedPayment?.purchaseNumber} />
                </List.Item>
                <List.Item>
                  <List.Item.Meta title="Cheque Number" description={selectedPayment?.chequeNumber} />
                </List.Item>
              </List>
            </Form.Item>
            <Form.Item name="comment" label="Comment" rules={[{required: true, message: "Comment required"}]}>
              <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item>
              <Button disabled={!userHasAnyRole(props?.current_user?.role, [EMPLOYEE_ROLE.ROLE_ACCOUNT_OFFICER])} type="primary" danger htmlType="submit" loading={cancelling}>
                Cancel Payment
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </AppLayout>
    </>
  )
}

export default PaymentHistory