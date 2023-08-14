import { EyeOutlined, SyncOutlined } from '@ant-design/icons'
import { Table , Card, Row, Col, Select, Pagination, Drawer, Spin, Input, Button } from 'antd'
import React, { useEffect, useState } from 'react'
import { PAYMENT_COLUMNS } from '..'
import { RESPONSE_SUCCESS_CODE } from '../../../services/api/apiRequest'
import { fetchPayments, cancelPayment, fetchPaymentDrafts } from '../../../services/api/payment-draft'
import MyPageHeader from '../../../shared/MyPageHeader'
import { REQUEST_STATUS } from '../../../util/datas'
import openNotification from '../../../util/notification'
import AppLayout from '../../AppLayout'
import PaymentsSubNav from './PaymentsSubNav'

const columns = (props) => PAYMENT_COLUMNS.concat([
  {
    title: "actions",
    dataIndex: "actions",
    key: "actions",
    render: (text, row) => <EyeOutlined onClick={e =>  props.onView(row)} />
  }
])

const AllPaymentDrafts = (props) => {
  const {
    current_user
  } = props

  const [drafts, setDrafts] = useState([])
  const [meta, setMeta] = useState({currentPage: 0, pageSize: 30, total: 0, totalPages: 0})
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState("all")
  const [selectedPayment, setSelectedPayment] = useState(null)
  const [visible, setVisible] = useState(false)
  const [grnRef, setGrnRef] = useState("")
  const [paymentRef, setPaymentRef] = useState("")
  const [cancelling, setCancelling] = useState(false)

  const resetPagination = () => {
    setMeta({currentPage: 0, pageSize: 30, total: 0, totalPages: 0})
  }

  const handleChange = () => {
    resetPagination()
    fetchPaymentDraftHistory()
  }

  
  const fetchPaymentDraftHistory = async () => {
    setLoading(true)
    const query = {
      pageSize: 20,
        pageNo: 0,
        reference: grnRef ? grnRef : null,
        paymentRef: paymentRef ? paymentRef : null,
        grnRef: grnRef ? grnRef : null
    }
    try {
      const result = await fetchPaymentDrafts(query)
      if(result?.meta) {
        const { currentPage, pageSize, total, totalPages } = result?.meta
        setMeta({...meta, currentPage: currentPage + 1, total: total * totalPages, pageSize, totalPages})
      }
      setDrafts(result?.data)
    } catch (error) {
      
    } finally {
      setLoading(false)
    }
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
      setDrafts(result?.data)
    } catch (error) {
      
    } finally {
      setLoading(false)
    }
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
    fetchPaymentDraftHistory()
  }, [])

  return (
    <>
      <AppLayout subNav={<PaymentsSubNav currentUser={current_user} />}>
        <MyPageHeader
          title={(
            <>
              <span style={{marginRight: 5}}>All Payments</span>
            </>
          )}
        />
        <Card>
          <Row>
            <Col span={2}>Filter: </Col>
            <Col md={4} sm={24} xs={24}>
              <Input placeholder='search by grn' type="search" value={grnRef} onChange={value => {
                setGrnRef(value)
                handleChange()
              }}  />
            </Col>
            <Col md={4} sm={24} xs={24} offset={1}>
              <Input placeholder='search by payment ref' type="search" value={paymentRef} onChange={value => {
                setPaymentRef(value)
                handleChange()
              }}  />
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
                dataSource={requests}
                pagination={false}
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
        </Card>
      </AppLayout>
    </>
  )
}

export default AllPaymentDrafts