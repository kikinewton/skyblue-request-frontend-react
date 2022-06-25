import { Col, Table, Row, Button, Card, Form, Drawer, Input, List, Badge } from 'antd'
import React, { useState } from 'react'
import { COMMENT_PROCESS_VALUES, MY_REQUEST_COLUMNS } from '../../../../util/constants'
import { EditOutlined, EyeOutlined } from '@ant-design/icons'
import { useHistory, useRouteMatch } from 'react-router'
import { prettifyDateTime } from '../../../../util/common-helper'
import AppLayout from '../../../AppLayout'
import MyRequestMenu from '../MyRequestMenu'
import MyPageHeader from '../../../../shared/MyPageHeader'
import { debounce } from 'lodash'
import MyDrawer from '../../../../shared/MyDrawer'
import RequestComment from '../../../../shared/RequestComment'

const columns = props => MY_REQUEST_COLUMNS.concat([
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
        <Badge size='small' dot offset={[5,0]}>
          <Button size='small' type='default'
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
      <Row>
        <Col span={12}>
          <Button size='small' type='default' onClick={() => props.setRequest(row)}>
            <EyeOutlined />
          </Button>
        </Col>
        <Col span={12}>
          <Button size='small' onClick={() =>  props.openUpdateRequest(row)} disabled={row.status !== "COMMENT"}>
            <EditOutlined  />
          </Button>
        </Col>
      </Row>
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
    fetchComments({commentType: 'LPO_COMMENT'})
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
            <Button key="add-btn" type="default" onClick={()=> history.push("/app/my-requests/lpos/add-new")}>
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
          <Row style={{width: "100%", padding: 10, minHeight: 60, borderRadius: 10, marginBottom: 10}}>
            <Col span={24}>
              <List>
                <List.Item>
                  <List.Item.Meta title="Description" description={selectedRequest?.name} />
                </List.Item>
                <List.Item>
                  <List.Item.Meta title="Reason" description={selectedRequest?.reason} />
                </List.Item>
                <List.Item>
                  <List.Item.Meta title="Quantity" description={selectedRequest?.quantity} />
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
          title='LPO REQUEST COMMENTS'
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
            showResolveBtn={true}
            onResolve={() => {
              setCommentVisible(false)
              setUpdateDrawer(true)
            }}
            resolveBtnText={'Update Request'}
            onSubmit={(newComment) => {
              const payload = {
                'description': newComment,
                'process': COMMENT_PROCESS_VALUES.HOD_REQUEST_ENDORSEMENT
              }
              props.createComment('LPO_COMMENT', selectedRequest?.id, payload)
            }}
          />
        </MyDrawer>
      </AppLayout>
    </React.Fragment>
  )
}

export default LpoList