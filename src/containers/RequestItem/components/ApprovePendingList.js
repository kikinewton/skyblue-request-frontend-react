import { CheckOutlined, CloseOutlined, WarningOutlined } from '@ant-design/icons';
import { Button, Col, Table, Row, Input, Tag, Drawer, Divider, Card } from 'antd';
import React, {useState } from 'react';
import { prettifyDateTime } from '../../../util/common-helper';
import { FETCH_REQUEST_TYPES } from '../../../util/constants';
import { UPDATE_REQUEST_TYPES } from '../../../util/request-types';

const columns = props => [
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

const ApprovePendingList = (props) => {
  const {
    selected_requests,
    setSelectedRequests,
    resetRequest,
    fetchRequests,
    fetching_requests,
    requests,
    updateRequest,
    updating_request,
    update_request_success,
  } = props
  const [confirmDrawer, setConfirmDrawer] = useState(false)
  const [actionType, setActionType] = useState(UPDATE_REQUEST_TYPES.HOD_ENDORSE)

  const submit = () => {
    console.log("action", actionType)
    updateRequest({
      updateType: actionType,
      role: "hod",
      payload: {requestItems: selected_requests}
    })
  }

  React.useEffect(()=> {
    resetRequest()
    props.fetchRequests({
      requestType: FETCH_REQUEST_TYPES.HOD_PENDING_ENDORSEMENT_REQUESTS
    })
  }, [])

  React.useEffect(() => {
    if(!updating_request && update_request_success) {
      setSelectedRequests([])
      setConfirmDrawer(false);
      props.fetchRequests({
        requestType: FETCH_REQUEST_TYPES.HOD_PENDING_ENDORSEMENT_REQUESTS
      })
    }
  }, [updating_request, update_request_success])

  return (
    <>
      <Card title="Requests pending Endorsement" extra={[
        (
          <Row style={{marginBottom: 10}}>
          <Col span={24} style={{display: 'flex', flexDirection: 'row', justifyContent:"flex-end", alignContent: 'center'}}>
            <Button
              disabled={selected_requests.length < 1} 
              style={{backgroundColor: "yellow", marginRight: 5}}
              onClick={() => {
                setActionType(UPDATE_REQUEST_TYPES.HOD_COMMENT)
                setConfirmDrawer(true)
              }}
            >
              <WarningOutlined /> Comment
            </Button>
            <Button
              style={{backgroundColor: "red", marginRight: 5, color: "#ffffff"}} 
              disabled={selected_requests.length < 1}
              onClick={() => {
                setActionType(UPDATE_REQUEST_TYPES.HOD_CANCEL)
                setConfirmDrawer(true)
              }}
            >
              <CloseOutlined />
              Cancel
            </Button>
            <Button 
              disabled={selected_requests.length < 1} 
              type="primary" style={{marginRight: 5}} 
              onClick={() => {
                console.log('action type on click', UPDATE_REQUEST_TYPES.HOD_ENDORSE)
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
              loading={fetching_requests}
              size="small"
              columns={columns({})}
              dataSource={requests}
              rowKey="id"
              bordered
              pagination={{
                pageSize: 20
              }}
              rowSelection={{
                onChange: (selectedRowKeys, selectedRows) => {
                  setSelectedRequests(selectedRows)
                },
                selectedRowKeys: selected_requests?.map(it=> it.id),
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
          setSelectedRequests([])
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
              columns={actionType !== UPDATE_REQUEST_TYPES.HOD_COMMENT ? selectedRequestsColumns({
                actionType,
              }) 
              : selectedRequestsColumnsForReject({
                  onComment: (event, row) => {
                    console.log('row', row, 'value', event.target.value)
                    const data = selected_requests.map(it => {
                      let dt = it
                      if(dt.id === row.id) {
                        dt['comment'] = event?.target?.value
                      }
                      return dt;
                    })
                    setSelectedRequests(data)
                  },
              })}
              dataSource={selected_requests}
              size="small"
              rowKey="id"
              bordered
              pagination={false}
            />
          </Col>
        </Row>
      </Drawer>
    </>
  )
}

export default ApprovePendingList