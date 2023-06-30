import { CheckOutlined, CloseOutlined, CommentOutlined } from '@ant-design/icons';
import { Button, Col, Table, Row, Input, Tag, Drawer, Divider, Card, PageHeader, message, Badge, List, Select, Typography } from 'antd';
import React, {useState } from 'react';
import RequestDocumentReview from '../../../presentation/RequestDocumentReview';
import MyDrawer from '../../../shared/MyDrawer';
import RequestComment from '../../../shared/RequestComment';
import { prettifyDateTime } from '../../../util/common-helper';
import { COMMENT_PROCESS_VALUES, COMMENT_TYPES, FETCH_REQUEST_TYPES } from '../../../util/constants';
import { UPDATE_REQUEST_TYPES } from '../../../util/request-types';
import ConfirmModal from '../../../shared/ConfirmModal'


const columns = props => [
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
    title: "REQUESTED ON",
    dataIndex: "requestDate",
    key: "requestDate",
    render: (text) => prettifyDateTime(text)
  },
  {
    title: 'STATUS',
    dataIndex: 'status',
    key: 'status',
    render: (text, row) => (
      <>
        {text === 'COMMENT' ? (
          <>
            <Badge size='small' dot offset={[5,0]}></Badge>
            <Button type="default" onClick={() => props.onComment(row)}>
              VIEW COMMENT
            </Button>
          </>
        ) : text}
      </>
    )
  },
  {
    title: "ACTIONS",
    dataIndex: "actions",
    key: "actions",
    align: "right",
    render: (text, row) => (
    <Row>
      <Col span={8}>
        <Button size='small' type="default" onClick={() => props.onComment(row)}>
          <CommentOutlined/>
        </Button>
      </Col>
      <Col span={6} offset={1}>
        <Button size='small' danger type='default' onClick={() => props.onCancel(row)}>
          <CloseOutlined />
        </Button>
      </Col>
      <Col span={8} offset={1}>
        <Button disabled={row.status === 'PENDING'} size='small' type="primary" onClick={() => props.onReview(row)}>REVIEW</Button>
      </Col>
    </Row>)
  }
]

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
    title: "REQUESTED ON",
    dataIndex: "requestDate",
    key: "requestDate",
    render: (text) => prettifyDateTime(text)
  },
]

const selectedRequestsColumnsForReject = props => [
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
    title: "REQUESTED ON",
    dataIndex: "requestDate",
    key: "requestDate",
    render: (text) => prettifyDateTime(text)
  },
  {
    title: "COMMENT",
    dataIndex: "comment",
    key: "comment",
    render: (text, row) => (<Input type="text" defaultValue={text} onChange={(value) => props.onComment(value, row)} />)
  }
]

//componet starts

const ApprovePendingList = (props) => {
  const {
    selected_requests,
    setSelectedRequests,
    resetRequest,
    fetching_requests,
    filtered_requests,
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
  const [commentVisible, setCommentVisible] = useState(false)
  const [cancelVisible, setCancelVisible] = useState(false)
  const [selectedDepartment, setSelectedDepartment] = useState("")

  const submit = () => {
    if((actionType === UPDATE_REQUEST_TYPES.GM_CANCEL || actionType === UPDATE_REQUEST_TYPES.GM_COMMENT) && selected_requests.filter(it => !it.comment).length > 0) {
      return message.error("Please make sure comment field is not empty")
    }
    if(actionType === UPDATE_REQUEST_TYPES.GM_CANCEL) {
      const comments = selected_requests.map(it => {
        let data = {
          procurementTypeId: it.id,
          comment: { description: it?.comment || "", process: "REQUEST_APPROVAL_GM"},
          cancelled: true
        }
        return data
      })
      const payload = {comments: comments, procurementType: "LPO"}
      props.createCommentWithCancel("LPO", payload)
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
    props.fetchDepartments({})
    props.fetchRequests({
      requestType: FETCH_REQUEST_TYPES.GENERAL_MANAGER_PENDING_APPROVE_REQUESTS
    })
    // props.fetchComments({
    //   commentType: 'LPO_COMMENT'
    // })
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
      <PageHeader title="REQUESTS AWAITING APPROVAL" extra={[
        (
          <Row style={{marginBottom: 10}} key="actions">
            <Col span={24} style={{display: 'flex', flexDirection: 'row', justifyContent:"flex-end", alignItems: 'center'}}>
              {/* <Button
                disabled={selected_requests.length < 1} 
                style={{marginRight: 5}}
                type="default"
                onClick={() => {
                  setActionType(UPDATE_REQUEST_TYPES.GM_COMMENT)
                  setConfirmDrawer(true)
                }}
              >
                <CommentOutlined /> Comment Selected List
              </Button> */}
              {/* <Button
                style={{marginRight: 5}} 
                type="default"
                disabled={selected_requests.length < 1}
                onClick={() => {
                  setActionType(UPDATE_REQUEST_TYPES.GM_CANCEL)
                  setConfirmDrawer(true)
                }}
              >
                <CloseOutlined />
                CANCEL SELECTED REQUESTS
              </Button> */}
              {/* <div style={{ display: 'flex', alignItems: 'center' }}>
                <Typography>
                  By Department
                </Typography>
              </div> */}
              {/* <Typography style={{ merginRight: 2 }}>
                  DEPARTMENT
                </Typography> */}
              <Select
                placeholder="department"
                style={{ minWidth: 200, marginRight: 5 }}
                onChange={(val) => {
                  //console.log('e', e)
                  setSelectedDepartment(val)
                  props.filterRequestsByDepartment(val)
                }}
                loading={props?.departmentsLoading}
                value={selectedDepartment}
              >
                <Select.Option value="">
                  All departments
                </Select.Option>
                {props?.departments?.map(it => (
                  <Select.Option key={it.id} value={it.id}>
                    {it.name}
                  </Select.Option>
                ))}
              </Select>
              <Button 
                disabled={selected_requests.length < 1} 
                type="primary" style={{marginRight: 5}} 
                onClick={() => {
                  setActionType(UPDATE_REQUEST_TYPES.GM_APPROVE)
                  setConfirmDrawer(true)
                }}
              >
                <CheckOutlined />
                APPROVE SELECTED REQUESTS
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
                },
                onComment: row => {
                  props.resetComment()
                  props.fetchComments(row?.id, COMMENT_TYPES.LPO)
                  setSelectedRequest(row)
                  setCommentVisible(true)
                },
                onCancel: row => {
                  setSelectedRequest(row)
                  setCancelVisible(true)
                }
              })}
              dataSource={filtered_requests}
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

      <MyDrawer
        title='COMMENTS'
        visible={commentVisible}
        onClose={() => {
          setCommentVisible(false)
          setSelectedRequest(null)
        }}
      >
        <RequestComment
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
              'process': COMMENT_PROCESS_VALUES.REQUEST_APPROVAL_GM
            }
            createComment('LPO_COMMENT', selectedRequest?.id, payload)
          }}
        />
      </MyDrawer>
    </>
  )
}

export default ApprovePendingList