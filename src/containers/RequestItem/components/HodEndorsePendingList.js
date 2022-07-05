import { CheckOutlined, CloseOutlined, CommentOutlined } from '@ant-design/icons';
import { Button, Col, Table, Row, Input, Tag, Drawer, Divider, Card, Badge, List } from 'antd';
import React, {useState } from 'react';
import ConfirmModal from '../../../shared/ConfirmModal';
import MyDrawer from '../../../shared/MyDrawer';
import RequestCancelModal from '../../../shared/RequestCancelModal';
import RequestComment from '../../../shared/RequestComment';
import { prettifyDateTime } from '../../../util/common-helper';
import { COMMENT_TYPES, FETCH_REQUEST_TYPES, HOD_REQUEST_COLUMNS } from '../../../util/constants';
import { UPDATE_REQUEST_TYPES } from '../../../util/request-types';

const columns = props => HOD_REQUEST_COLUMNS.concat([
  {
    title: "STATUS",
    dataIndex: "status",
    key: "status",
    render: (text, row) => (
      <>
        {text === "COMMENT" ? (
          <>
            <Button size='small' type='default' 
              onClick={() => {
                props.onComment(row)
              }}
            >
              <CommentOutlined/>
              VIEW COMMENTS
            </Button>
          </>
        ) : text}
      </>
    )
  },
  {
    title: 'ACTIONS',
    dataIndex: 'actions',
    key: 'actions',
    render: (text, row) => (
      <>
        <Button type='default' onClick={() => props.onComment(row)}>
          <CommentOutlined />
        </Button>
        <Button type='default' onClick={() => props.onCancel(row)}>
          <CloseOutlined />
        </Button>
      </>
    )
  }
])

const selectedRequestsColumns = props => [
  {
    title: "DESCRIPTION",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "REASON",
    dataIndex: "reason",
    key: "reason"
  },
  {
    title: "PURPOSE",
    dataIndex: "purpose",
    key: "purpose"
  },
  {
    title: "QUANTITY",
    dataIndex: "quantity",
    key: "quantity"
  },
  {
    title: "PRIORITY",
    dataIndex: "priorityLevel",
    key: "priorityLevel",
    render: (text) => text === "URGENT" ? (<Tag color="red">{text}</Tag>) : text
  },
  {
    title: "REQUEST DATE",
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
    selected_requests,
    setSelectedRequests,
    resetRequest,
    fetching_requests,
    requests,
    updateRequest,
    updating_request,
    update_request_success,
    createComment,
    submitting_comment
  } = props

  const [confirmDrawer, setConfirmDrawer] = useState(false)
  const [actionType, setActionType] = useState(UPDATE_REQUEST_TYPES.HOD_ENDORSE)
  const [selectedRequest, setSelectedRequest] = useState(null)
  const [commentVisible, setCommentVisible] = useState(false)
  const [cancelVisible, setCancelVisible] = useState(false)

  const submit = () => {
    if(actionType === UPDATE_REQUEST_TYPES.HOD_CANCEL) {
      const comments = selected_requests.filter(it => it.comment)
                            .map(it => {
                              let data = {
                                procurementTypeId: it.id,
                                comment: { description: it?.comment || "", process: actionType === UPDATE_REQUEST_TYPES.HOD_CANCEL ? "HOD_REQUEST_ENDORSEMENT" : "HOD_REQUEST_ENDORSEMENT"},
                                cancelled: true
                              }
                              return data
                            })
      const commentPayload = {comments: comments}
      props.createCommentWithCancel("LPO", commentPayload)
    } else {
      updateRequest({
        updateType: actionType,
        role: "hod",
        payload: {requestItems: selected_requests}
      })
    }
  }

  const submitBtnText = () => {
    if(actionType === UPDATE_REQUEST_TYPES.HOD_ENDORSE) {
      return "ENDORSE SELECTED REQUESTS"
    } else if(actionType === UPDATE_REQUEST_TYPES.HOD_CANCEL) {
      return "Cancel Selected Requests"
    } else if(actionType === UPDATE_REQUEST_TYPES.HOD_COMMENT) {
      return "Comment Selected Requests"
    } else {
      return "Submit"
    }
  }

  const drawerTitleText = () => {
    if(actionType === UPDATE_REQUEST_TYPES.HOD_ENDORSE) {
      return "ENDORSE SELECTED REQUESTS"
    } else if(actionType === UPDATE_REQUEST_TYPES.HOD_CANCEL) {
      return "Cancel Selected Requests"
    } else if(actionType === UPDATE_REQUEST_TYPES.HOD_COMMENT) {
      return "Comment Selected Requests"
    } else {
      return actionType
    }
  }

  React.useEffect(()=> {
    props.resetComment()
    resetRequest()
    props.fetchRequests({
      requestType: FETCH_REQUEST_TYPES.HOD_PENDING_ENDORSEMENT_REQUESTS
    })
    // eslint-disable-next-line
  }, [])

  React.useEffect(() => {
    if(!updating_request && update_request_success) {
      setSelectedRequests([])
      setConfirmDrawer(false);
      props.fetchRequests({
        requestType: FETCH_REQUEST_TYPES.HOD_PENDING_ENDORSEMENT_REQUESTS
      })
    }
    // eslint-disable-next-line
  }, [updating_request, update_request_success])

  // React.useEffect(() => {
  //   if(!props.submitting_comment && props.submit_comment_success) {
  //     setSelectedRequests([])
  //     setCancelVisible(false)
  //     setSelectedRequest(null)
  //     props.fetchRequests({
  //       requestType: FETCH_REQUEST_TYPES.HOD_PENDING_ENDORSEMENT_REQUESTS
  //     })
  //   }
  //   // eslint-disable-next-line
  // }, [props.submitting_comment, props.submit_comment_success])

  return (
    <>
      <Card
        size="small"
        title="REQUESTS PENDING ENDORSEMENT" extra={[
        (
          <Row style={{marginBottom: 10}} key="1">
          <Col span={24} style={{display: 'flex', flexDirection: 'row', justifyContent:"flex-end", alignContent: 'center'}}>
            <Button
              type="default"
              style={{marginRight: 5}} 
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
              columns={columns({
                onComment: (row) => {
                  props.resetComment()
                  props.fetchComments(row?.id, COMMENT_TYPES.LPO)
                  setSelectedRequest(row)
                  setCommentVisible(true)
                },
                onCancel: (row) => {
                  setSelectedRequest(row)
                  setCancelVisible(true)
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
        title={drawerTitleText()}
        placement="right"
        width={900}
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
              loading={submitting_comment || updating_request}
              disabled={selected_requests.length < 1 || updating_request}
            >
              <CheckOutlined /> {submitBtnText()}
            </Button>
          </Col>
        </Row>
        <Divider />
        <Row>
          <Col span={24}>
            <Table
              columns={actionType === UPDATE_REQUEST_TYPES.HOD_ENDORSE  ? selectedRequestsColumns({
                actionType,
              }) 
              : selectedRequestsColumnsForReject({
                  onComment: (event, row) => {
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
      <ConfirmModal 
        onSubmit={() => {
          const payload = {
            itemId: selectedRequest?.id
          }
          props.createCommentWithCancel("LPO", payload)
        }}
        loading={props.submitting_comment}
        onCancel={() => {
          setCancelVisible(false)
          setSelectedRequest(null)
        }}
        isVisible={cancelVisible}
      >
        <>
          <Row>
            <Col span={24}>
              <h3>
                Are you sure you want to cancel request?
              </h3>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <List>
                <List.Item key="name">
                  <List.Item.Meta title="DESCRIPTION" description={selectedRequest?.name} />
                </List.Item>
                <List.Item key="reason">
                  <List.Item.Meta title="REASON" description={selectedRequest?.name} />
                </List.Item>
                <List.Item key="qnty">
                  <List.Item.Meta title="QUANTITY" description={selectedRequest?.quantity} />
                </List.Item>
              </List>
            </Col>
          </Row>
        </>
      </ConfirmModal>
      <MyDrawer
        title='COMMENTS'
        visible={commentVisible}
        onClose={() => {
          setCommentVisible(false)
          setSelectedRequest(null)
        }}
      >
        <RequestComment
          loading={props.comments_loading}
          onCommentChange={(newComment) => {
            props.setNewComment(newComment)
          }}
          newComment={props.new_comment}
          submitting={props.submitting_comment}
          comments={props.comments}
          request={selectedRequest}
          onSubmit={(newComment) => {
            const payload = {
              'description': newComment,
              'process': 'HOD_REQUEST_ENDORSEMENT'
            }
            props.createComment('LPO_COMMENT', selectedRequest?.id, payload)
          }}
        />
      </MyDrawer>
    </>
  )
}

export default HodEndorsePendingList