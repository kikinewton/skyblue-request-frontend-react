import React, { useState } from 'react';
import { Table, Row, Col, Card, Button, Tag, Badge, Drawer, List, Tooltip } from "antd"
import { CommentOutlined, EditOutlined, EyeOutlined, SyncOutlined } from "@ant-design/icons"
import { useHistory } from 'react-router';
import { COMMENT_PROCESS_VALUES, COMMENT_TYPES, CURRENCY_CODE } from '../../../../util/constants';
import UpdateFloatForm from './UpdateForm';
import AppLayout from '../../../AppLayout';
import MyRequestMenu from '../MyRequestMenu';
import { prettifyDateTime } from '../../../../util/common-helper';
import { useRouteMatch } from "react-router-dom"
import MyPageHeader from '../../../../shared/MyPageHeader';
import MyDrawer from '../../../../shared/MyDrawer';
import GenericComment from '../../../../shared/GenericComment';
import FloatDetails from '../../../../shared/FloatDetails';


const SELECTION_TYPES = {UPDATE: "UPDATE", VIEW: "VIEW"}

const retirmentStatus = row => {
  if(row.hasDocument) {
    return 'Retired'
  } else if(row.fundsReceived) {
    return 'Awaiting Retirement'
  } else {
    return 'Cannot Retire'
  }
}

export const FLOAT_ORDERS_COLUMN = [
  {
    title: "REFERENCE",
    dataIndex: "floatOrderRef",
    key: "floatOrderRef"
  },
  {
    title: "DESCRIPTION",
    dataIndex: "description",
    key: "description"
  },
  {
    title: "REQUESTED BY",
    dataIndex: "requestedBy",
    key: "requestedBy"
  },
  {
    title: "PHONE",
    dataIndex: "requestedByPhoneNo",
    key: "requestedByPhoneNo"
  },
  {
    title: "REQUESTED ON",
    dataIndex: "createdDate",
    key: "createdDate",
    render: (text, row) => prettifyDateTime(text)
  },
]

const myColumns = props => FLOAT_ORDERS_COLUMN.concat([
  {
    title: "ENDORSEMENT",
    dataIndex: "endorsement",
    key: "endorsement"
  },
  {
    title: "APPROVAL",
    dataIndex: "approval",
    key: "approval"
  },
  {
    title: "STATUS",
    dataIndex: "status",
    key: "status"
  },
  {
    title: "ACTIONS",
    dataIndex: "operations",
    key: "operations",
    render: (text, row) => (
      <Row>
        <Col span={8}>
          <Tooltip title="comment">
            <Button shape='circle' size='small' onClick={() => props.onComment(row)}>
              <CommentOutlined />
            </Button>
          </Tooltip>
        </Col>
        <Col span={8}>
          <Tooltip title="">
            <Button 
              shape="circle"
              style={{marginRight: 5}}
              size='small' 
              type='default'
              onClick={() => props.onShowMore(row)}
            >
              <EyeOutlined />
            </Button>
          </Tooltip>
        </Col>
        {!row.comment && (
          <Col span={8}>
            <Tooltip>
              <Button
                disabled={row?.retired}
                shape="circle"
                size='small' 
                type='default'
                onClick={() => props.onEdit(row)}
              >
                <EditOutlined />
              </Button>
            </Tooltip>
          </Col>
        )}
      </Row>
    )
  }
])

// const floatEntriesColumns = [
//   {
//     title: "Reference",
//     dataIndex: "floatRef",
//     key: "floatRef"
//   },
//   {
//     title: "Descrption",
//     dataIndex: "itemDescription",
//     key: "itemDescription",
//   },
//   {
//     title: "Purpose",
//     dataIndex: "purpose",
//     key: "purpose",
//   },
//   {
//     title: "Quantity",
//     dataIndex: "quantity",
//     key: "quantity",
//   },
//   {
//     title: `Unit Price (${CURRENCY_CODE})`,
//     dataIndex: "estimatedUnitPrice",
//     key: "estimatedUnitPrice",
//   }
// ]

const FloatList = (props) => {
  const { fetchMyFloatRequests, fetching_float_requests, 
    updateSingleFloatRequest, submiting_float_request, submit_float_request_success, fetchFloatOrders, 
    float_orders, resetFloatRequest } = props
  const history = useHistory()
  const [visible, setVisible] = React.useState(false)
  const [selectionDetails, setSelectionDetails] = React.useState({type: SELECTION_TYPES.VIEW, row: null})
  const [selectedFloatForRetirement, setSelectedFloatForRetirement] = useState(null)
  const [viewDetailsVisible, setViewDetailsVisible] = useState(false)
  const { path } = useRouteMatch()
  const [editVisible, setEditVisible] = useState(false)
  const [selectedFloatOrder, setSelectedFloatOrder] = useState(null)
  const [commentVisible, setCommentVisible] = useState(false)

  const expandedRowRender = (row) => {
    const expandedColumns = [
      {title: 'Description', dataIndex: 'itemDescription', key: 'itemDescription'},
      {title: 'Purpose', dataIndex: 'purpose', key: 'purpose'},
      {title: 'Quantity', dataIndex: 'quantity', key: 'quantity'},
    ]
    return <Table columns={expandedColumns} dataSource={row.floats} pagination={false} rowKey="id" />
  }

  React.useEffect(() => {
    //fetchMyFloatRequests({})
    resetFloatRequest()
    fetchFloatOrders({myRequest: true})
  }, [])

  React.useEffect(() => {
    if(!submiting_float_request && submit_float_request_success) {
      setVisible(false)
      setSelectionDetails({type: SELECTION_TYPES.VIEW, row: null})
      fetchMyFloatRequests({})
    }
  }, [submit_float_request_success, submiting_float_request])

  

  return (
    <>
      <AppLayout
        title="My Float Requests"
        subNav={<MyRequestMenu />}
      >
        <MyPageHeader 
          title={(
            <>
              <span style={{marginRight: 5}}>My Floats</span>
              <SyncOutlined 
                spin={fetching_float_requests} 
                onClick={e => {
                  fetchFloatOrders({myRequest: true})
                }}
              />
            </>
          )}
          extra={[
            <Button key="create-new-float-btn" size="small" type="primary" onClick={() => history.push("/app/my-requests/float-requests/add-new")}>
              Create New Float Request
            </Button>
          ]}
        />
        <Card>
          <Row>
            <Col span={24}>
              <Table
                loading={fetching_float_requests}
                columns={myColumns({
                  handleView: (row) => {
                    console.log('lets view')
                    setSelectionDetails({type: SELECTION_TYPES.VIEW, row})
                    setVisible(true)
                  },
                  onEdit: (row) => {
                    //setSelectedFloatOrder(row)
                    //setEditVisible(true)
                    history.push(`${path}/${row?.id}/edit`)
                  },
                  onShowMore: (row) => {
                    setSelectedFloatForRetirement(row)
                    setViewDetailsVisible(true)
                  },
                  onComment: row => {
                    props.resetComment()
                    props.fetchComments(row?.id, COMMENT_TYPES.FLOAT)
                    setSelectedFloatOrder(row)
                    setCommentVisible(true)
                  }
                })}
                dataSource={float_orders}
                rowKey="id"
                bordered
                size="small"
                expandable={{expandedRowRender}}
                pagination={{pageSize: 20}}
              />
            </Col>
          </Row>
        </Card>
        <Drawer
          forceRender
          visible={viewDetailsVisible}
          title="Float Info"
          placement='right'
          width={800}
          onClose={() => {
            setSelectedFloatForRetirement(null)
            setViewDetailsVisible(false)
          }}
        >
          <>
            <Row>
              <Col span={24} style={{display: "flex", flexDirection: "row", justifyContent: "flex-end"}}>
                <Button type='primary' style={{marginRight: 5}}
                  disabled={selectedFloatForRetirement?.hasDocument}
                  onClick={() => {
                    history.push(`${path}/${selectedFloatForRetirement?.id}/edit`)
                  }}
                >
                  Edit / Add Items To Float
                </Button>
                {/* <Button type='primary'
                  disabled={!selectedFloatForRetirement?.fundsReceived || selectedFloatForRetirement.hasDocument}
                  onClick={() => {
                    history.push(`${path}/${selectedFloatForRetirement?.id}/retire`)
                  }}
                >
                  Retire Float
                </Button> */}
              </Col>
            </Row>
            <FloatDetails 
              floatOrder={selectedFloatForRetirement}
            />
          </>
        </Drawer>


        <Drawer
          forceRender
          visible={editVisible}
          title={"Edit Float"}
          placement="right"
          width={700}
          maskClosable={false}
          onClose={() => {
            setSelectedFloatOrder(null)
            setEditVisible(false)
          }}
        >
          <UpdateFloatForm 
            onSubmit={(values) => {
              console.log('values', values)
              const payload = { description: values.description, quantity: values.quantity, estimatedPrice: values.estimatedUnitPrice }
              
              updateSingleFloatRequest(selectedFloatOrder?.id, payload)
            }}
            loading={submiting_float_request}
            float={selectedFloatOrder}
          />
        </Drawer>
        <MyDrawer
          visible={commentVisible}
          title="PAYMENT DRAFT DETAILS"
          onClose={() => {
            setCommentVisible(false)
            setSelectedFloatOrder(null)
          }}
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
                'process': COMMENT_PROCESS_VALUES.REVIEW_FLOAT_HOD
              }
              props.createComment(COMMENT_TYPES.FLOAT, selectedFloatOrder?.id, payload)
            }}
          />
        </MyDrawer>
      </AppLayout>
    </>
  )
} 

export default FloatList