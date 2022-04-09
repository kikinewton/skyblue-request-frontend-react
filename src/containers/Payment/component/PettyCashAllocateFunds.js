import { EyeOutlined } from '@ant-design/icons'
import { Button, Card, Col, Drawer, List, Row, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import MyPageHeader from '../../../shared/MyPageHeader'
import { formatCurrency, prettifyDateTime } from '../../../util/common-helper'
import { FETCH_PETTY_CASH_REQUEST_TYPES } from '../../../util/request-types'
import AppLayout from '../../AppLayout'
import PaymentsSubNav from './PaymentsSubNav'
import DocumentView from "../../../presentation/DocumentView"

const columns = props => [
  {
    title: "Reference",
    dataIndex: "pettyCashRef",
    key: "pettyCashRef"
  },
  {
    title: "Description",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "Unit Price",
    dataIndex: "amount",
    key: "amount",
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
    render: (text, row) => formatCurrency(row?.amount * row?.quantity)
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
    dataIndex: "pettyCashRef",
    key: "pettyCashRef"
  },
  {
    title: "Description",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "Unit Price",
    dataIndex: "amount",
    key: "amount",
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
    render: (text, row) => formatCurrency(row?.amount * row?.quantity)
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

const PettyCashAllocateFunds = (props) => {
  const {
    current_user,
    petty_cash_requests,
    fetching_petty_cash_requests,
    fetchPettyCashRequests,
    resetPettyCashRequest,
    allocateFundsToPettyCashRequest,
    submitting_petty_cash_request,
    submit_petty_cash_request_success,
  } = props
  const [visible, setVisible] = useState(false)
  const [selectedRequests, setSelectedRequests] = useState([])
  const [selectedRequest, setSelectedRequest] = useState(null)
  const [infoVisible, setInfoVisible] = useState(false)

  useEffect(() => {
    resetPettyCashRequest()
    fetchPettyCashRequests({
      requestType: FETCH_PETTY_CASH_REQUEST_TYPES.PENDING_FUND_ALLOCATION
    })
  }, [])

  useEffect(() => {
    if(!submitting_petty_cash_request && submit_petty_cash_request_success) {
      setSelectedRequests([])
      setVisible(false)
      setSelectedRequest(null)
      setInfoVisible(false)
      fetchPettyCashRequests({
        requestType: FETCH_PETTY_CASH_REQUEST_TYPES.PENDING_FUND_ALLOCATION
      })
    }
  }, [submit_petty_cash_request_success, submitting_petty_cash_request])

  return (
    <>
      <AppLayout
        subNav={<PaymentsSubNav currentUser={current_user} {...props} />}
      >
        <MyPageHeader title="Allocate Funds to Petty Cash" extra={[
          <Button
            disabled={selectedRequests.length < 1} 
            key="allocate-btn" 
            type='default' 
            onClick={() => {
              setVisible(true)
            }}
        >
          Allocate Funds To Selected Petty Cash
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
            dataSource={petty_cash_requests}
            loading={fetching_petty_cash_requests}
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
                loading={submitting_petty_cash_request} 
                type='primary'
                onClick={() => {
                  allocateFundsToPettyCashRequest({
                    pettyCash: selectedRequests
                  })
                }}
              >
                Allocate Funds To Selected Petty Cash Requests 
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
                    <List.Item.Meta title="Reference" description={selectedRequest?.pettyCashRef} />
                  </List.Item>
                  <List.Item>
                    <List.Item.Meta title="Description" description={selectedRequest?.name} />
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
            {selectedRequest?.supportingDocument && (
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
            )}
          </>
        </Drawer>
      </AppLayout>
    </>
  )
}

export default PettyCashAllocateFunds