import { CheckOutlined, CloseOutlined, CommentOutlined } from '@ant-design/icons';
import { Button, Col, Table, Row, Input, Tag, Drawer, Divider, Card, PageHeader, message } from 'antd';
import React, {useState } from 'react';
import RequestDocumentReview from '../../../presentation/RequestDocumentReview';
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
  {
    title: "Actions",
    dataIndex: "actions",
    key: "actions",
    align: "right",
    render: (text, row) => (<><Button type="default" onClick={() => props.onReview(row)}>Review Document</Button></>)
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

const ApprovePendingList = (props) => {
  const {
    selected_requests,
    setSelectedRequests,
    resetRequest,
    fetching_requests,
    requests,
    updateRequest,
    updating_request,
    update_request_success,
    createComment,
    submitting_comment,
    submit_comment_success,
  } = props
  const [confirmDrawer, setConfirmDrawer] = useState(false)
  const [actionType, setActionType] = useState(UPDATE_REQUEST_TYPES.HOD_ENDORSE)
  const [reviewDrawer, setReviewDrawer] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState(null)

  const submit = () => {
    console.log("action", actionType)
    if((actionType === UPDATE_REQUEST_TYPES.GM_CANCEL || actionType === UPDATE_REQUEST_TYPES.GM_COMMENT) && selected_requests.filter(it => !it.comment).length > 0) {
      return message.error("Please make sure comment field is not empty")
    }
    if(actionType === UPDATE_REQUEST_TYPES.GM_COMMENT) {
      const comments = selected_requests.map(it => {
        let data = {
          procurementTypeId: it.id,
          comment: { description: it?.comment || "", process: "REQUEST_APPROVAL_GM"},
        }
        return data
      })
      const payload = {comments: comments, procurementType: "LPO"}
      console.log('payload', payload)
      createComment("LPO", payload)
    } else if(actionType === UPDATE_REQUEST_TYPES.GM_CANCEL) {
      const comments = selected_requests.map(it => {
        let data = {
          procurementTypeId: it.id,
          comment: { description: it?.comment || "", process: "REQUEST_APPROVAL_GM"},
          cancelled: true
        }
        return data
      })
      const payload = {comments: comments, procurementType: "LPO"}
      console.log('payload', payload)
      createComment("LPO", payload)
    } else {
      updateRequest({
        updateType: actionType,
        role: "gm",
        payload: {requestItems: selected_requests}
      })
    }
  }

  const submitBtnText = () => {
    switch(actionType) {
      case UPDATE_REQUEST_TYPES.GM_APPROVE:
        return "Approve Selected Requests"
      case UPDATE_REQUEST_TYPES.GM_CANCEL:
        return "Cancel Selected Requests"
      case UPDATE_REQUEST_TYPES.GM_COMMENT:
        return "Comment Selected Requests"
      default:
        return "SUBMIT"
    }
  }

  React.useEffect(()=> {
    resetRequest()
    props.fetchRequests({
      requestType: FETCH_REQUEST_TYPES.GENERAL_MANAGER_PENDING_APPROVE_REQUESTS
    })
    // eslint-disable-next-line
  }, [])

  React.useEffect(() => {
    if(!updating_request && update_request_success) {
      setSelectedRequests([])
      setConfirmDrawer(false);
      props.fetchRequests({
        requestType: FETCH_REQUEST_TYPES.GENERAL_MANAGER_PENDING_APPROVE_REQUESTS
      })
    }
    // eslint-disable-next-line
  }, [updating_request, update_request_success])

  React.useEffect(() => {
    if(!submitting_comment && submit_comment_success) {
      setSelectedRequests([])
      setConfirmDrawer(false);
      props.fetchRequests({
        requestType: FETCH_REQUEST_TYPES.GENERAL_MANAGER_PENDING_APPROVE_REQUESTS
      })
    }
    // eslint-disable-next-line
  }, [submitting_comment, submit_comment_success])

  return (
    <>
      <PageHeader title="Requests awaiting approval" extra={[
        (
          <Row style={{marginBottom: 10}} key="actions">
            <Col span={24} style={{display: 'flex', flexDirection: 'row', justifyContent:"flex-end", alignContent: 'center'}}>
              <Button
                disabled={selected_requests.length < 1} 
                style={{marginRight: 5}}
                type="default"
                onClick={() => {
                  setActionType(UPDATE_REQUEST_TYPES.GM_COMMENT)
                  setConfirmDrawer(true)
                }}
              >
                <CommentOutlined /> Comment Selected List
              </Button>
              <Button
                style={{marginRight: 5}} 
                type="default"
                disabled={selected_requests.length < 1}
                onClick={() => {
                  setActionType(UPDATE_REQUEST_TYPES.GM_CANCEL)
                  setConfirmDrawer(true)
                }}
              >
                <CloseOutlined />
                Reject Selected List
              </Button>
              <Button 
                disabled={selected_requests.length < 1} 
                type="primary" style={{marginRight: 5}} 
                onClick={() => {
                  console.log('action type on click', UPDATE_REQUEST_TYPES.GM_APPROVE)
                  setActionType(UPDATE_REQUEST_TYPES.GM_APPROVE)
                  setConfirmDrawer(true)
                }}
              >
                <CheckOutlined />
                Approve Selected List
              </Button>
            </Col>
          </Row>
        )
      ]} />
      <Card>
        <Row>
          <Col span={24}>
            <Table
              loading={fetching_requests}
              size="small"
              columns={columns({
                onReview: (row) => {
                  setSelectedRequest(row)
                  setReviewDrawer(true)
                }
              })}
              dataSource={requests}
              rowKey="id"
              bordered
              pagination={{
                pageSize: 20
              }}
              rowSelection={{
                onChange: (selectedRowKeys, selectedRows) => {
                  setSelectedRequests(selectedRows.map(it => Object.assign({}, it)))
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
        title={submitBtnText()}
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
              loading={updating_request || submitting_comment}
            >
              <CheckOutlined /> {submitBtnText()}
            </Button>
          </Col>
        </Row>
        <Divider />
        <Row>
          <Col span={24}>
            <Table 
              columns={actionType === UPDATE_REQUEST_TYPES.GM_APPROVE ? selectedRequestsColumns({
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
      <Drawer
        forceRender
        visible={reviewDrawer}
        title={`${actionType} REQUESTS`}
        placement="right"
        width={900}
        maskClosable={false}
        onClose={() => {
          setSelectedRequest(null)
          setReviewDrawer(false)
        }}
      >
        <RequestDocumentReview
          requestItem={selectedRequest}
          quotation={selectedRequest?.quotations.filter(qt => qt?.supplier?.id === selectedRequest.suppliedBy)[0]}
        />
      </Drawer>
    </>
  )
}

export default ApprovePendingList