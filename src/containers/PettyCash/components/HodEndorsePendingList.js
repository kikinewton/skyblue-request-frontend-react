import { CheckOutlined, CloseOutlined, EyeFilled, WarningOutlined } from '@ant-design/icons';
import { Button, Col, Table, Row, Input, Tag, Drawer, Divider, Card, List } from 'antd';
import React, {useState } from 'react';
import { prettifyDateTime } from '../../../util/common-helper';
import { CURRENCY_CODE } from '../../../util/constants';
import { FETCH_PETTY_CASH_REQUEST_TYPES, UPDATE_REQUEST_TYPES } from '../../../util/request-types';

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
    title: "purpose",
    dataIndex: "purpose",
    key: "purpose"
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity"
  },
  {
    title: "Unit Price",
    dataIndex: "amount",
    key: "amount",
    render: (text) => `${CURRENCY_CODE} ${text}`
  },
  {
    title: "Request Date",
    dataIndex: "createdDate",
    key: "createdDate",
    render: (text) => prettifyDateTime(text)
  },
  {
    title: "Endorsement Status",
    dataIndex: "endorsement",
    key: "endorsement"
  },
  {
    title: "Actions",
    dataIndex: "actions",
    key: "actions",
    align: "right",
    render: (text, row) => (<EyeFilled onClick={() => props.viewDetails(row)} />)
  }
]

const selectedRequestsColumns = props => [
  {
    title: "Description",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "Reason",
    dataIndex: "reason",
    key: "reason"
  },
  {
    title: "purpose",
    dataIndex: "purpose",
    key: "purpose"
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity"
  },
  {
    title: "Priority",
    dataIndex: "priorityLevel",
    key: "priorityLevel",
    render: (text) => text === "URGENT" ? (<Tag color="red">{text}</Tag>) : text
  },
  {
    title: "Request Date",
    dataIndex: "requestDate",
    key: "requestDate",
    render: (text) => prettifyDateTime(text)
  },
]

const selectedRequestsColumnsForReject = props => [
  {
    title: "Description",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "Reason",
    dataIndex: "reason",
    key: "reason"
  },
  {
    title: "purpose",
    dataIndex: "purpose",
    key: "purpose"
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity"
  },
  {
    title: "Priority",
    dataIndex: "priorityLevel",
    key: "priorityLevel",
    render: (text) => text === "URGENT" ? (<Tag color="red">{text}</Tag>) : text
  },
  {
    title: "Request Date",
    dataIndex: "requestDate",
    key: "requestDate",
    render: (text) => prettifyDateTime(text)
  },
  {
    title: "Comment",
    dataIndex: "comment",
    key: "comment",
    render: (text, row) => (<Input type="text" defaultValue={text} onChange={(value) => props.onComment(value, row)} />)
  }
]

const HodEndorsePendingList = (props) => {
  const {
    selected_petty_cash_requests,
    setSelectedPettyCashRequests,
    resetPettyCashRequest,
    fetchPettyCashRequests,
    fetching_petty_cash_requests,
    petty_cash_requests,
    updatePettyCashRequest,
    updating_request,
    update_request_success,
  } = props
  const [confirmDrawer, setConfirmDrawer] = useState(false)
  const [infoVisible, setInfoVisible] = useState(false)
  const [actionType, setActionType] = useState(UPDATE_REQUEST_TYPES.HOD_ENDORSE)
  const [selectedRequest, setSelectedRequest] = useState(null)

  const submit = () => {
    console.log("action", actionType)
    updatePettyCashRequest({
      updateType: actionType,
    })
  }

  React.useEffect(()=> {
    console.log('lets fetch petty cash pending endorse')
    resetPettyCashRequest()
    props.fetchPettyCashRequests({
      requestType: FETCH_PETTY_CASH_REQUEST_TYPES.HOD_PENDING_ENDORSEMENT_REQUESTS
    })
  }, [])

  return (
    <>
      <Card title="Requests pending Endorsement" extra={[
        (
          <Row style={{marginBottom: 10}} key="extras-first">
          <Col span={24} style={{display: 'flex', flexDirection: 'row', justifyContent:"flex-end", alignContent: 'center'}}>
            <Button 
              disabled={selected_petty_cash_requests.length < 1} 
              style={{backgroundColor: "yellow", marginRight: 5}}
              onClick={() => {
                setActionType(UPDATE_REQUEST_TYPES.HOD_REJECT)
                setConfirmDrawer(true)
              }}
            >
              <WarningOutlined /> Reject With Comment
            </Button>
            <Button
              style={{backgroundColor: "red", marginRight: 5, color: "#ffffff"}} 
              disabled={selected_petty_cash_requests.length < 1}
              onClick={() => {
                setActionType(UPDATE_REQUEST_TYPES.HOD_CANCEL)
                setConfirmDrawer(true)
              }}
            >
              <CloseOutlined />
              Cancel
            </Button>
            <Button 
              disabled={selected_petty_cash_requests.length < 1} 
              type="primary" style={{marginRight: 5}} 
              onClick={() => {
                setActionType(UPDATE_REQUEST_TYPES.HOD_ENDORSE)
                setConfirmDrawer(true)
              }}
            >
              <CheckOutlined />
              Endorse
            </Button>
          </Col>
        </Row>
        )
      ]}>
        <Row>
          <Col span={24}>
            <Table
              loading={fetching_petty_cash_requests}
              size="small"
              columns={columns({
                viewDetails: (row) => {
                  setSelectedRequest(row)
                  setInfoVisible(true)
                }
              })}
              dataSource={petty_cash_requests}
              rowKey="id"
              bordered
              pagination={{
                pageSize: 20
              }}
              rowSelection={{
                onChange: (selectedRowKeys, selectedRows) => {
                  console.log("selected row", selectedRows)
                  setSelectedPettyCashRequests(selectedRows)
                },
                selectedRowKeys: selected_petty_cash_requests?.map(it=> it.id),
              }}
            />
          </Col>
        </Row>
      </Card>
      <Drawer
        forceRender
        visible={confirmDrawer}
        title={`${actionType} REQUESTS`}
        placement="right"
        width={1000}
        maskClosable={false}
        onClose={() => {
          setSelectedPettyCashRequests([])
          setConfirmDrawer(false)
        }}
      >
        <Row style={{marginBottom: 10}}>
          <Col span={24}>
            <Button 
              type="primary" 
              style={{float: "right"}}
              onClick={submit}
            >
              <CheckOutlined /> SUBMIT
            </Button>
          </Col>
        </Row>
        <Divider />
        <Row>
          <Col span={24}>
            <Table 
              columns={actionType !== "REJECT" ? selectedRequestsColumns({
                actionType,
              }) 
              : selectedRequestsColumnsForReject({
                  onComment: (event, row) => {
                    console.log('row', row, 'value', event.target.value)
                    const data = selected_petty_cash_requests.map(it => {
                      let dt = it
                      if(dt.id === row.id) {
                        dt['comment'] = event?.target?.value
                      }
                      return dt;
                    })
                    setSelectedPettyCashRequests(data)
                  },
              })}
              dataSource={selected_petty_cash_requests}
              size="small"
              rowKey="id"
              bordered
              pagination={false}
            />
          </Col>
        </Row>
      </Drawer>

      <Drawer
        forceRender
        visible={infoVisible}
        title={`Supporting Document`}
        placement="right"
        width={1000}
        maskClosable={false}
        onClose={() => {
          setSelectedRequest(null)
          setInfoVisible(false)
        }}
      >
        <Row>
          <Col span={24}>
            <List>
              <List.Item>
                <List.Item.Meta title="Petty Cash Reference" description={selectedRequest?.pettyCashRef} />
              </List.Item>
              <List.Item>
                <List.Item.Meta title="Description" description={selectedRequest?.name} />
              </List.Item>
              <List.Item>
                <List.Item.Meta title="Date" description={ prettifyDateTime(selectedRequest?.createdDate)} />
              </List.Item>
            </List>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            
          </Col>
        </Row>
      </Drawer>
    </>
  )
}

export default HodEndorsePendingList