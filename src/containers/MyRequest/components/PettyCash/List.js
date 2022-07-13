import React, { useEffect, useState } from 'react';
import { Table, Row, Col, Form, Tag, Button, Card, Drawer, Input, List as AntList, Tooltip } from "antd"
import { useHistory } from 'react-router';
import { COMMENT_PROCESS_VALUES, COMMENT_TYPES, CURRENCY_CODE } from '../../../../util/constants';
import { CommentOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { useForm } from 'antd/lib/form/Form';
import AppLayout from '../../../AppLayout';
import MyRequestMenu from '../MyRequestMenu';
import { formatCurrency, prettifyDateTime } from '../../../../util/common-helper';
import PettyCashDetails from '../../../../shared/PettyCashDetails';
import MyDrawer from '../../../../shared/MyDrawer';
import GenericComment from '../../../../shared/GenericComment';

const columns = props => [
  {
    title: "REFERENCE",
    dataIndex: "pettyCashRef",
    key: "pettyCashRef",
  },
  {
    title: "DESCRIPTION",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "PURPOSE",
    dataIndex: "purpose",
    key: "purpose",
  },
  {
    title: "QUANTITY",
    dataIndex: "quantity",
    key: "quantity",
  },
  {
    title: `UNIT PRICE (${CURRENCY_CODE})`,
    dataIndex: "amount",
    key: "amount",
  },
  {
    title: "ENDORSEMENT",
    dataIndex: "endorsement",
    key: "endorsement",
  },
  {
    title: "STATUS",
    dataIndex: "status",
    key: "status",
    render: (text, row) => {
      let color = "default"
      if(row?.status === "PENDING") {
        color = "processing"
      } else if(row?.status === "APPROVED") {
        color = "success"
      } else if(row?.status === "COMMENT") {
        color = "warning"
      }
      return (<Tag color={color}>{row?.status}</Tag>)
    }
  },
  {
    title: "ACTIONS",
    dataIndex: "actions",
    key: "actions",
    render: (text, row) => (
      <>
        <Row>
          <Col span={8}>
            <Tooltip title="COMMENT">
              <CommentOutlined onClick={() => props.onComment(row)} />
            </Tooltip>
          </Col>
          <Col span={8}>
            {row.status === 'COMMENT' && (
              <EditOutlined onClick={() => props.onEdit(row)} />
            )}
          </Col>
          <Col span={8}>
            <EyeOutlined onClick={() => props.onView(row)} />
          </Col>
        </Row>
        
        
      </>
    )
  }
]

const List = (props) => {
  const history = useHistory()
  const { my_petty_cash_requests, fetching_petty_cash_requests, 
    fetchMyPettyCashRequests, resetPettyCashRequest, updatePettyCashRequest, 
    submitting_petty_cash_request, submit_petty_cash_request_success
  } = props
  const [updateVisible, setUpdateVisible] = useState(false)
  const [viewVisible, setViewVisible] = useState(false)
  const [selectedPettyCash, setSelectedPettyCash] = useState(null)
  const [commentVisible, setCommentVisible] = useState(false)
  const [updateForm] = useForm()

  React.useEffect(() => {
    resetPettyCashRequest()
    fetchMyPettyCashRequests({
      
    })
  }, [])

  useEffect(() => {
    if(!submitting_petty_cash_request && submit_petty_cash_request_success) {
      setSelectedPettyCash(null)
      setUpdateVisible(false)
      fetchMyPettyCashRequests({
      
      })
    }
  }, [submitting_petty_cash_request, submit_petty_cash_request_success])

  return (
    <>
      <AppLayout
        title="My Petty Cash Requests"
        subNav={<MyRequestMenu />}
      >
        <Card
          hoverable
          title="My Petty Cash Requests"
          extra={[
            <Button type="primary"
              onClick={()=> history.push("/app/my-requests/petty-cash-requests/add-new")}
            >
              ADD NEW PETTY CASH REQUEST
            </Button>
          ]}
        >
          <Row>
            <Col span={24}>
              <Table
                columns={columns({
                  onEdit: (row) => {
                    const data = Object.assign({}, row)
                    console.log("data", data)
                    setSelectedPettyCash(data)
                    updateForm.setFieldsValue({name: data?.name, quantity: data?.quantity})
                    setUpdateVisible(true)
                  },
                  onView: row => {
                    const data = Object.assign({}, row)
                    setSelectedPettyCash(data)
                    setViewVisible(true)
                  },
                  onComment: row => {
                    props.resetComment()
                    props.fetchComments(row.id, COMMENT_TYPES.PETTY_CASH)
                    setSelectedPettyCash(row)
                    setCommentVisible(true)
                  }
                })}
                dataSource={my_petty_cash_requests}
                rowKey="id"
                loading={fetching_petty_cash_requests}
                size="small"
                bordered
                pagination={{pageSize: 20}}
              />
            </Col>
          </Row>
        </Card>
        <Drawer
          forceRender
          visible={viewVisible}
          title={`DETAILS`}
          placement="right"
          width={800}
          maskClosable={false}
          onClose={() => {
            setSelectedPettyCash(null)
            setViewVisible(false)
          }}
        >
          <PettyCashDetails 
            pettyCash={selectedPettyCash}
          />
        </Drawer>

        <MyDrawer
          visible={commentVisible}
          title="PAYMENT DRAFT DETAILS"
          onClose={() => {
            setCommentVisible(false)
            setSelectedPettyCash(null)
          }}
        >
          <GenericComment 
            loading={props.comment_loading}
            itemDescription={<PettyCashDetails pettyCash={selectedPettyCash} />}
            comments={props.comments}
            newComment={props.new_comment}
            submitting={props.submitting_comment}
            onCommentChange={newComment => {
              props.setNewComment(newComment)
            }}
            onSubmit={(newComment) => {
              const payload = {
                'description': newComment,
                'process': COMMENT_PROCESS_VALUES.REVIEW_PETTY_CASH_HOD
              }
              props.createComment(COMMENT_TYPES.PETTY_CASH, selectedPettyCash?.id, payload)
            }}
          />
        </MyDrawer>

        <Drawer
          forceRender
          visible={updateVisible}
          title={`Supporting Document`}
          placement="right"
          width={600}
          maskClosable={false}
          onClose={() => {
            setSelectedPettyCash(null)
            setUpdateVisible(false)
          }}
        >
          <Form
            form={updateForm}
            layout="vertical"
            onFinish={values => {
              const payload = {
                description: values?.name,
                quantity: values?.quantity
              }
              updatePettyCashRequest(selectedPettyCash?.id, payload)
            }}
            initialValues={{
              name: selectedPettyCash?.name,
              quantity: selectedPettyCash?.quantity
            }}
          >
            <Form.Item label="Description" name="name">
              <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item label="Quantity" name="quantity">
              <Input type="number" />
            </Form.Item>
            <Form.Item>
              <Button htmlType='submit' loading={submitting_petty_cash_request} type='primary'>Update Petty Cash</Button>
            </Form.Item>
          </Form>
        </Drawer>
      </AppLayout>
    </>
  )
} 

export default List