import { EyeOutlined, SyncOutlined } from '@ant-design/icons'
import { Button, Card, Col, Drawer, List, Row, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import MyPageHeader from '../../../shared/MyPageHeader'
import { formatCurrency, prettifyDateTime } from '../../../util/common-helper'
import { FETCH_FLOAT_REQUEST_TYPES } from '../../../util/request-types'
import AppLayout from '../../AppLayout'
import PaymentsSubNav from './PaymentsSubNav'
import DocumentView from "../../../presentation/DocumentView"

const columns = props => [
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
                <span style={{marginRight: 10}}>Allocate Funds to Petty Cash</span>
                <SyncOutlined
                  spin={fetching_float_requests}  
                  size="small" 
                  onClick={() => fetchFloatRequests({requestType: FETCH_FLOAT_REQUEST_TYPES.PENDING_FUND_ALLOCATION})}  />
              </Col>
            </Row>
          } 
          extra={[
          <Button
            disabled={selectedRequests.length < 1} 
            key="allocate-btn" 
            type='default' 
            onClick={() => {
              setVisible(true)
            }}
        >
          Allocate Funds To Selected Float
        </Button>
        ]} />
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
            rowSelection={{
              onChange: (selectedRowKeys, selectedRows) => {
                setSelectedRequests(selectedRows.map(it => Object.assign({},it)))
              },
              selectedRowKeys: selectedRequests.map(it => it.id)
            }}
          />
        </Card>
        <Drawer
          visible={visible}
          width={900}
          onClose={() => {
            setVisible(false)
          }}
        >
          <Row>
            <Col span={24}>
              <Button
                loading={submitting_float_request} 
                type='primary'
                onClick={() => {
                  allocateFundsToFloatRequest({
                    floats: selectedRequests
                  })
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
        >
          <>
            <Row>
              <Col span={24}>
                <List>
                  <List.Item>
                    <List.Item.Meta title="Reference" description={selectedRequest?.FloatRef} />
                  </List.Item>
                  <List.Item>
                    <List.Item.Meta title="Description" description={selectedRequest?.itemDescription} />
                  </List.Item>
                  <List.Item>
                    <List.Item.Meta title="Unit Price" description={formatCurrency(selectedRequest?.amount)} />
                  </List.Item>
                  <List.Item>
                    <List.Item.Meta title="Quantity" description={selectedRequest?.quantity} />
                  </List.Item>
                  <List.Item></List.Item>
                  <List.Item>
                    <List.Item.Meta title="Total Amount" description={formatCurrency(selectedRequest?.amount * selectedRequest?.quantity)} />
                  </List.Item>
                  <List.Item>
                    <List.Item.Meta title="Requested By" description={selectedRequest?.createdBy?.fullName} />
                  </List.Item>
                  <List.Item>
                    <List.Item.Meta title="Phone Number" description={selectedRequest?.createdBy?.phoneNo} />
                  </List.Item>
                </List>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Card size='small' title="Supporting DOcument">
                  {/* <DocumentView 
                    docFormat={}
                    src={}
                  /> */}
                </Card>
              </Col>
            </Row>
          </>
        </Drawer>
      </AppLayout>
    </>
  )
}

export default FloatAllocateFunds