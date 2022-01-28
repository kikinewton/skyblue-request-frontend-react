import { DollarOutlined, EyeOutlined, MoneyCollectOutlined, NumberOutlined, OneToOneOutlined, PhoneOutlined, SyncOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Card, Col, Drawer, List, Row, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import MyPageHeader from '../../../shared/MyPageHeader'
import { formatCurrency, prettifyDateTime } from '../../../util/common-helper'
import { FETCH_FLOAT_REQUEST_TYPES } from '../../../util/request-types'
import AppLayout from '../../AppLayout'
import PaymentsSubNav from './PaymentsSubNav'
import DocumentView from "../../../presentation/DocumentView"
import { FLOAT_ORDERS_COLUMN } from '../../MyRequest/components/Float/List'
import { CURRENCY_CODE } from '../../../util/constants'
import FloatDetails from '../../Float/components/FloatDetails'


const columns = props => FLOAT_ORDERS_COLUMN.concat([
  {
    title: "Actions",
    dataIndex: "actions",
    key: "actions",
    render: (text, row) => (
      <>
        <EyeOutlined onClick={() => props.onOpenDetails(row)} />
      </>
    ) 
  },
])

const floatEntriesColumns = [
  {
    title: "Descrption",
    dataIndex: "itemDescription",
    key: "itemDescription",
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity",
  },
  {
    title: `Unit Price (${CURRENCY_CODE})`,
    dataIndex: "estimatedUnitPrice",
    key: "estimatedUnitPrice",
    render: text => formatCurrency(text)
  },
  {
    title: `Total Amount (${CURRENCY_CODE})`,
    dataIndex: "totalAmount",
    key: "totalAmount",
    render: (text, row) => formatCurrency(row?.estimatedUnitPrice*row?.quantity)
  }
]

const summaryColumns = [
  {
    title: "Reference",
    dataIndex: "floatRef",
    key: "floatRef"
  },
  {
    title: "Description",
    dataIndex: "itemDescription",
    key: "itemDescription"
  },
  {
    title: "Unit Price",
    dataIndex: "estimatedUnitPrice",
    key: "estimatedUnitPrice",
    render: (text) => formatCurrency(text)
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity"
  },
  {
    title: "Total Amount",
    dataIndex: "amountTotal",
    key: "amountTotal",
    render: (text, row) => formatCurrency(row?.estimatedUnitPrice * row?.quantity)
  },
  {
    title: "Requested By",
    dataIndex: "createdBy",
    key: "createdBy",
    render: (text, row) => row?.createdBy?.fullName
  },
  {
    title: "Requested On",
    dataIndex: "createdDate",
    key: "createdDate",
    render: (text) => prettifyDateTime(text)
  },
  {
    title: "Approval Status",
    dataIndex: "approval",
    key: "approval"
  },
]

const FloatAllocateFunds = (props) => {
  const {
    current_user,
    float_requests,
    fetching_float_requests,
    fetchFloatRequests,
    resetFloatRequest,
    allocateFundsToFloatRequest,
    submitting_float_request,
    submit_float_request_success,
  } = props
  const [visible, setVisible] = useState(false)
  const [selectedRequests, setSelectedRequests] = useState([])
  const [selectedRequest, setSelectedRequest] = useState(null)
  const [infoVisible, setInfoVisible] = useState(false)


  const expandedRowRender = (row) => {
    const expandedColumns = [
      {title: 'Description', dataIndex: 'itemDescription', key: 'itemDescription'},
      {title: 'Purpose', dataIndex: 'purpose', key: 'purpose'},
      {title: 'Quantity', dataIndex: 'quantity', key: 'quantity'},
    ]
    return <Table columns={expandedColumns} dataSource={row.floats} pagination={false} rowKey="id" />
  }

  useEffect(() => {
    resetFloatRequest()
    fetchFloatRequests({
      requestType: FETCH_FLOAT_REQUEST_TYPES.PENDING_FUND_ALLOCATION
    })
  }, [])

  useEffect(() => {
    if(!submitting_float_request && submit_float_request_success) {
      setSelectedRequests([])
      setVisible(false)
      setSelectedRequest(null)
      setInfoVisible(false)
      fetchFloatRequests({
        requestType: FETCH_FLOAT_REQUEST_TYPES.PENDING_FUND_ALLOCATION
      })
    }
  }, [submit_float_request_success, submitting_float_request])

  return (
    <>
      <AppLayout
        subNav={<PaymentsSubNav currentUser={current_user} />}
      >
        <MyPageHeader 
          title={
            <Row>
              <Col span={24}>
                <span style={{marginRight: 10}}>Allocate Funds to Float</span>
                <SyncOutlined
                  spin={fetching_float_requests}  
                  size="small" 
                  onClick={() => fetchFloatRequests({requestType: FETCH_FLOAT_REQUEST_TYPES.PENDING_FUND_ALLOCATION})}  />
              </Col>
            </Row>
          }
        />
        <Card>
          <Table 
            columns={columns({
              onOpenDetails: (row) => {
                setInfoVisible(true)
                setSelectedRequest(Object.assign({}, row))
              }
            })}
            rowKey="id"
            dataSource={float_requests}
            loading={fetching_float_requests}
            size='small'
            bordered
            pagination={{pageSize: 30}}
            expandable={{expandedRowRender}}
          />
        </Card>
        <Drawer
          visible={visible}
          width={900}
          onClose={() => {
            setVisible(false)
          }}
          title="Allocate Funds"
          forceRender
        >

          <Row>
            <Col span={24}>
              <Button
                loading={submitting_float_request} 
                type='primary'
                onClick={() => {
                  allocateFundsToFloatRequest(selectedRequest?.id, {})
                }}
              >
                Allocate Funds To Selected Float Requests 
              </Button>
            </Col>
          </Row>
          <Table 
            columns={summaryColumns}
            rowKey="id"
            dataSource={selectedRequests}
            size='small'
            bordered
            pagination={false}
          />
        </Drawer>

        <Drawer
          visible={infoVisible}
          width={700}
          onClose={() => {
            setInfoVisible(false)
          }}
          forceRender
          title="Allocate Funds Form"
        >
          <>
            <FloatDetails floatOrder={selectedRequest} />
            <Row>
              <Col span={24}>
                <Table 
                  columns={floatEntriesColumns}
                  dataSource={selectedRequest?.floats}
                  size='small'
                  bordered
                  pagination={false}
                />
              </Col>
            </Row>
            <Row style={{padding: "10px 0 10px 0"}}>
              <Col span={24}>
                <Button
                  loading={submitting_float_request} 
                  type='primary'
                  onClick={() => {
                    allocateFundsToFloatRequest(selectedRequest?.id, {})
                  }}
                >
                  Allocate Funds To Selected Float Requests 
                </Button>
              </Col>
            </Row>
          </>
        </Drawer>
      </AppLayout>
    </>
  )
}

export default FloatAllocateFunds