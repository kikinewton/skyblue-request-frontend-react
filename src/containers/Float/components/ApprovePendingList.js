import { CheckOutlined, CloseOutlined, CommentOutlined, DeleteColumnOutlined, DeleteOutlined, EyeOutlined, SyncOutlined, WarningOutlined } from '@ant-design/icons';
import { Button, Col, Table, Row, Input, Tag, Drawer, Divider, Card, message, List, Form, Tooltip } from 'antd';
import React, {useState } from 'react';
import { formatCurrency, prettifyDateTime } from '../../../util/common-helper';
import { UPDATE_FLOAT_REQUEST_TYPES, FETCH_FLOAT_REQUEST_TYPES } from '../../../util/request-types';
import { FLOAT_ORDERS_COLUMN } from '../../MyRequest/components/Float/List';
import MyPageHeader from "../../../shared/MyPageHeader"
import FloatDetails from './FloatDetails';
import { COMMENT_PROCESS_VALUES, COMMENT_TYPES } from '../../../util/constants';
import MyDrawer from '../../../shared/MyDrawer';
import GenericComment from '../../../shared/GenericComment';


const floatOrderColumns = props => FLOAT_ORDERS_COLUMN.concat([
  {
    title: "Actions",
    dataIndex: "actions",
    key: "actions",
    render: (text, row) => (
      <div style={{display: 'flex', flexDirection: 'row'}}>
        <Tooltip title="Comment">
          <Button size='small' style={{marginRight: 5}} shape='circle' type="default" onClick={() => props.onComment(row)}>
            <CommentOutlined/>
          </Button>
        </Tooltip>
        <Button 
          size='small' 
          type="default" 
          shape="circle"
          onClick={() => props.onViewDetails(row)}
        >
          <EyeOutlined />
        </Button>
      </div>
    )
  }
])

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
    title: "Request Date",
    dataIndex: "createdDate",
    key: "createdDate",
    render: (text) => prettifyDateTime(text)
  },
]

const floatItemsColumns = [
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
    title: "Request Date",
    dataIndex: "createdDate",
    key: "createdDate",
    render: (text) => prettifyDateTime(text)
  },
]

const selectedRequestsColumnsForReject = props => [
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
    title: "Request Date",
    dataIndex: "createdDate",
    key: "createdDate",
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
    selected_float_requests,
    setSelectedFloatRequests,
    resetFloatRequest,
    fetchFloatRequests,
    fetching_float_requests,
    float_submit_success,
    float_submitting,
    float_requests,
    updateFloatRequest,
    updateFloatOrderStatus,
    updating_request,
    update_request_success,
  } = props

  const [confirmDrawer, setConfirmDrawer] = useState(false)
  const [selectedFloatOrder, setSelectedFloatOrder] = useState(null)
  const [comment, setComment] = useState("")
  const [commentRequired, setCommentRequired] = useState(false)
  const [commentVisible, setCommentVisible] = useState(false)
  

  const expandedRowRender = (row) => {
    const expandedColumns = [
      {title: 'Description', dataIndex: 'itemDescription', key: 'itemDescription'},
      {title: 'Estimate Unit Price', dataIndex: 'estimatedUnitPrice', key: 'estimatedUnitPrice', render: text => formatCurrency(text)},
      {title: 'Quantity', dataIndex: 'quantity', key: 'quantity'},
    ]
    return <Table columns={expandedColumns} dataSource={row.floats} pagination={false} rowKey="id" />
  }

  const submit = (actionType) => {
    if((actionType !== UPDATE_FLOAT_REQUEST_TYPES.HOD_ENDORSE) && ((selected_float_requests.filter(it => !it.comment) || []).length > 0)) {
      return message.error("Entries without comments not acccepted")
    }
    if(actionType === UPDATE_FLOAT_REQUEST_TYPES.HOD_COMMENT) {
      const comments = selected_float_requests.map(it => {
        let data = {
          procurementTypeId: it.id,
          comment: { description: it?.comment || "", process: "HOD_REQUEST_ENDORSEMENT"},
        }
        return data
      })
      const payload = {comments: comments, procurementType: "FLOAT"}
      console.log('payload ----', payload)
      props.createComment("FLOAT", payload)
    } else if(actionType === UPDATE_FLOAT_REQUEST_TYPES.HOD_CANCEL) {
      const comments = selected_float_requests.map(it => {
        let data = {
          procurementTypeId: it.id,
          comment: { description: it?.comment || "", process: "HOD_REQUEST_ENDORSEMENT"},
          cancelled: true
        }
        return data
      })
      const payload = {comments: comments, procurementType: "FLOAT"}
      console.log('payload ----', payload)
      props.createComment("FLOAT", payload)
    } else {
      const payload = {
        id: selectedFloatOrder?.id,
        status: 'APPROVE'
      }
      updateFloatOrderStatus(payload.id, payload.status)
    }
  }

  React.useEffect(()=> {
    resetFloatRequest()
    props.fetchFloatRequests({
      requestType: FETCH_FLOAT_REQUEST_TYPES.PENDING_APPROVAL
    })
  }, [])


  React.useEffect(() => {
    if(!float_submitting && float_submit_success) {
      setSelectedFloatRequests([])
      setConfirmDrawer(false)
      props.fetchFloatRequests({
        requestType: FETCH_FLOAT_REQUEST_TYPES.PENDING_APPROVAL
      })
    }
  }, [float_submit_success, float_submitting])

  // React.useEffect(() => {
  //   if(!props.submitting_comment && props.submit_comment_success) {
  //     setSelectedFloatRequests([])
  //     setConfirmDrawer(false)
  //     props.fetchFloatRequests({
  //       requestType: FETCH_FLOAT_REQUEST_TYPES.PENDING_APPROVAL
  //     })
  //   }
  // }, [props.submitting_comment, props.submit_comment_success])

  return (
    <>
      <MyPageHeader title={<>
          <span style={{marginRight: 5}}>Floats awaiting endorsement</span>
          <SyncOutlined spin={fetching_float_requests} onClick={() => {
            props.fetchFloatRequests({
              requestType: FETCH_FLOAT_REQUEST_TYPES.PENDING_APPROVAL
            })
          }} />
        </>} 
      />
      <Card>
        <Row>
          <Col span={24}>
            <Table
              loading={fetching_float_requests}
              size="small"
              columns={floatOrderColumns({
                onViewDetails: row => {
                  setSelectedFloatOrder(row)
                  setConfirmDrawer(row)
                },
                onComment: row => {
                  props.resetComment()
                  props.fetchComments(row?.id, COMMENT_TYPES.FLOAT)
                  setSelectedFloatOrder(row)
                  setCommentVisible(true)
                }
              })}
              dataSource={float_requests}
              rowKey="id"
              bordered
              expandable={{expandedRowRender}}
              pagination={{
                pageSize: 20
              }}
            />
          </Col>
        </Row>
      </Card>
      <Drawer
        forceRender
        visible={confirmDrawer}
        title="Float Details"
        placement="right"
        width={700}
        maskClosable={false}
        onClose={() => {
          setSelectedFloatOrder(null)
          setConfirmDrawer(false)
        }}
      >
        <FloatDetails floatOrder={selectedFloatOrder} />
        {commentRequired && (
          <Card size='small' title="Comment Form" style={{marginTop: 10, marginBottom: 10}}>
            <Row>
              <Col span={24}>
                <Form.Item>
                  <Input
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    type="text"
                  />
                </Form.Item>
              </Col>
            </Row>
          </Card>
        )}
        <Row style={{padding: "10px 0 10px 0"}}>
          <Col span={8} >
            <Button 
              type='default'
              style={{float: "left"}}
              onClick={e => {
                if(!comment) {
                  setComment("")
                  setCommentRequired(true)
                } else {
                  submit(UPDATE_FLOAT_REQUEST_TYPES.HOD_CANCEL)
                }
              }}
            >
              <DeleteOutlined />
              Cancel
            </Button>
          </Col>
          <Col span={8} style={{textAlign: "center"}}>
            {/* <Button 
              type='default'
              onClick={e => {
                if(!comment) {
                  setComment("")
                  setCommentRequired(true)
                } else {
                  submit(UPDATE_FLOAT_REQUEST_TYPES.HOD_COMMENT)
                }
              }}
            >
              <CommentOutlined />
              Comment
            </Button> */}
          </Col>
          <Col span={8} >
            <Button 
              loading={float_submitting}
              style={{float: "right"}}
              type='primary'
              onClick={e => {
                if(comment) {
                  setComment("")
                  setCommentRequired(false)
                } else {
                  submit(UPDATE_FLOAT_REQUEST_TYPES.HOD_APPROVE)
                }
              }}
            >
              <CheckOutlined />
              Approve
            </Button>
          </Col>
        </Row>
      </Drawer>
      <MyDrawer
        visible={commentVisible}
        title="FLOAT COMMENTS"
        onClose={() => {
          setCommentVisible(false)
          setSelectedFloatOrder(null)
        }}
        width={900}
      >
        <GenericComment 
          loading={props.comment_loading}
          itemDescription={<FloatDetails floatOrder={selectedFloatOrder} />}
          comments={props.comments}
          newComment={props.new_comment}
          submitting={props.submitting_comment}
          onCommentChange={newComment => {
            props.setNewComment(newComment)
          }}
          onSubmit={(newComment) => {
            const payload = {
              'description': newComment,
              'process': COMMENT_PROCESS_VALUES.REVIEW_FLOAT_GM
            }
            props.createComment(COMMENT_TYPES.FLOAT, selectedFloatOrder?.id, payload)
          }}
        />
      </MyDrawer>
    </>
  )
}

export default ApprovePendingList