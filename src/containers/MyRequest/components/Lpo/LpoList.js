import { Col, Table, Row, Button, Card, Form, Drawer, Input, List, Badge } from 'antd'
import React, { useState } from 'react'
import { REQUEST_COLUMNS } from '../../../../util/constants'
import { EditOutlined, EyeOutlined } from '@ant-design/icons'
import { useHistory, useRouteMatch } from 'react-router'
import { prettifyDateTime } from '../../../../util/common-helper'
import AppLayout from '../../../AppLayout'
import MyRequestMenu from '../MyRequestMenu'
import MyPageHeader from '../../../../shared/MyPageHeader'
import { debounce } from 'lodash'
import MyDrawer from '../../../../shared/MyDrawer'
import RequestComment from '../../../../shared/RequestComment'

const columns = props => REQUEST_COLUMNS.concat([
  // {
  //   title: "User Department",
  //   dataIndex: "userDepartment",
  //   key: "userDepartment",
  //   render: (text, row) => row.userDepartment?.name
  // },
  {
    title: 'STATUS',
    dataIndex: 'status',
    key: 'status',
    render: (text, row) => (<>
      {row.status === 'COMMENT' ? (<>
        <Badge size='small' dot offset={[0,10]}>
          <Button size='small' type='text'
            onClick={() => {
              props.onViewComment(row)
            }}
          >
            View Comment
          </Button>
        </Badge>
      </>
      ) : row?.status}
    </>)
  },
  {
    title: "ACTIONS",
    dataIndex: "operations",
    key: "operations",
    align: "right",
    render: (text, row) => (
      <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
        {row.status === "COMMENT" && (<EditOutlined onClick={() =>  props.openUpdateRequest(row)} />)}
        <EyeOutlined onClick={() => props.setRequest(row)}/>
      </div>
    )
  }
])

const LpoList = (props) => {
  const { fetchMyRequests, requestLoading, my_requests, updateSingleRequest, updating_request, update_request_success, 
    filtered_my_requests, filterMyRequests, fetchComments } = props

  const [page, setPage] = React.useState(0)
  const history = useHistory()
  const { path } = useRouteMatch()
  const [updateDrawer, setUpdateDrawer] = React.useState(false)
  const [selectedRequest, setSelectedRequest] = React.useState(null)
  const [commentVisible, setCommentVisible] = useState(false)
  const [updatePriceForm] = Form.useForm()

  const [searchTerm, setSearchTerm] = React.useState("");

  const onFilter = debounce((value) => {
    filterMyRequests(value)
  } , 1000)

  React.useEffect(()=> {
    fetchMyRequests({

    })
    fetchComments({procurementType: 'LPO'})
    // eslint-disable-next-line
  }, [])

  React.useEffect(() => {
    if(!updating_request && update_request_success) {
      setSelectedRequest(null)
      setUpdateDrawer(false)
      updatePriceForm.setFieldsValue({
        name: "",
        quantity: ""
      })
    }
    fetchMyRequests({})
  }, [updating_request, update_request_success])
  
  return (
    <React.Fragment>
      <AppLayout
        subNav={<MyRequestMenu />}
      >
        <MyPageHeader 
           title="MY LPO REQUESTS"
           extra={[
            <Button key="add-btn" type="primary" onClick={()=> history.push("/app/my-requests/lpos/add-new")}>
              ADD NEW LPO REQUEST
            </Button>
          ]}
        />
        <Card>
          <Row>
            <Col offset={16} span={8}>
              <Input
                allowClear
                placeholder='reference/description...'
                style={{width: "100%"}}
                value={searchTerm} 
                onChange={e => {
                  setSearchTerm(e.target.value)
                  onFilter(e.target.value)
                }} 
              />
            </Col>
          </Row>
        </Card>
        <Card>
          <Row>
            <Col md={24}>
              <Table
                loading={requestLoading}
                columns={columns({
                  setRequest: (row) => {
                    history.push(`${path}/${row.id}/details`)
                  },
                  openUpdateRequest: (row) => {
                    setSelectedRequest(row)
                    updatePriceForm.setFieldsValue({
                      name: row?.name,
                      quantity: row?.quantity
                    })
                    setUpdateDrawer(true)
                  },
                  onViewComment: row => {
                    setSelectedRequest(row)
                    setCommentVisible(true)
                  }
                })}
                dataSource={filtered_my_requests}
                size="small"
                rowKey="id"
                bordered
                pagination={{pageSize: 20}}
              />
            </Col>
          </Row>
        </Card>
        <Drawer
          forceRender
          visible={updateDrawer}
          title="Update Item Price"
          placement="right"
          width={700}
          maskClosable={false}
          onClose={() => {
            setSelectedRequest([])
            setUpdateDrawer(false)
          }}
        >
          <Row style={{width: "100%", padding: 10, minHeight: 60, backgroundColor: "#e0dddc", borderRadius: 10, marginBottom: 10}}>
            <Col span={24}>
              <List>
                <List.Item>
                  <List.Item.Meta title="Message" description={(selectedRequest?.comment || [])[0]?.description} />
                </List.Item>
                <List.Item>
                  <List.Item.Meta title="Commentor" description={(selectedRequest?.comment || [])[0]?.employee?.fullName} />
                </List.Item>
                <List.Item>
                  <List.Item.Meta title="Commented on" description={prettifyDateTime((selectedRequest?.comment || [])[0]?.createdDate)} />
                </List.Item>
              </List>
            </Col>
          </Row>
          <Form
            layout="vertical"
            form={updatePriceForm}
            initialValues={{
              name: selectedRequest?.name,
              quantity: selectedRequest?.quantity
            }}
            onFinish={(values) => {
              const payload = { description: values.name, quantity: values.quantity }
              updateSingleRequest(selectedRequest?.id, payload)
            }}
          >
            <Form.Item name="name" label="Description">
              <Input />
            </Form.Item>
            <Form.Item name="quantity" label="Quantity">
              <Input type="number" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={updating_request}>Resolve</Button>
            </Form.Item>
          </Form>
        </Drawer>
        <MyDrawer
          visible={commentVisible}
          title='LOP REQUEST COMMENTS'
          onClose={() => {
            setCommentVisible(false)
            setSelectedRequest(null)
          }}
          width={900}
        >
          <RequestComment 
            onCommentChange={(newComment) => {
              props.setNewComment(newComment)
            }}
            newComment={props.new_comment}
            submitting={props.submitting_comment}
            comments={(props.comments || [])}
            request={selectedRequest}
            onSubmit={(newComment) => {
              const commentObj = {
                cancelled: false,
                comment: {
                  'description': newComment,
                  'process': 'HOD_REQUEST_ENDORSEMENT'
                },
                procurementTypeId: selectedRequest?.id
              }
              const payload = {
                comments: [commentObj]
              }
              props.createComment('LPO', payload)
            }}
          />
        </MyDrawer>
      </AppLayout>
    </React.Fragment>
  )
}

export default LpoList