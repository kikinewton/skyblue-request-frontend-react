import React, { useEffect, useState } from 'react';
import { Table, Row, Col, Form, Tag, Button, Card, Drawer, Input, List as AntList } from "antd"
import { useHistory } from 'react-router';
import { CURRENCY_CODE } from '../../../../util/constants';
import { EditOutlined, EyeOutlined } from '@ant-design/icons';
import { useForm } from 'antd/lib/form/Form';
import AppLayout from '../../../AppLayout';
import MyRequestMenu from '../MyRequestMenu';
import { formatCurrency, prettifyDateTime } from '../../../../util/common-helper';

const columns = props => [
  {
    title: "Reference",
    dataIndex: "pettyCashRef",
    key: "pettyCashRef",
  },
  {
    title: "Descrption",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Purpose",
    dataIndex: "purpose",
    key: "purpose",
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity",
  },
  {
    title: `Unit Price (${CURRENCY_CODE})`,
    dataIndex: "amount",
    key: "amount",
  },
  {
    title: "Endorsement",
    dataIndex: "endorsement",
    key: "endorsement",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (text) => {
      let color = "default"
      if(text === "PENDING") {
        color = "processing"
      } else if(text = "APPROVED") {
        color = "success"
      }
      return (<Tag color={color}>{text}</Tag>)
    }
  },
  {
    title: "Actions",
    dataIndex: "actions",
    key: "actions",
    render: (text, row) => (
      <>
        <Row>
          <Col span={12}>
            {row.status === 'COMMENT' && (
              <EditOutlined onClick={() => props.onEdit(row)} />
            )}
          </Col>
          <Col span={12}>
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
              Create New Petty Cash Request
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
          title={`Details`}
          placement="right"
          width={600}
          maskClosable={false}
          onClose={() => {
            setSelectedPettyCash(null)
            setViewVisible(false)
          }}
        >
          <>
            <Row>
              <Col span={24}>
                <AntList>
                  <AntList.Item>
                    <AntList.Item.Meta title="Requested On" description={prettifyDateTime(selectedPettyCash?.createdDate)} />
                  </AntList.Item>
                  <AntList.Item>
                    <AntList.Item.Meta title="Reference" description={selectedPettyCash?.pettyCashRef} />
                  </AntList.Item>
                  <AntList.Item>
                    <AntList.Item.Meta title="Description" description={selectedPettyCash?.name} />
                  </AntList.Item>
                  <AntList.Item>
                    <AntList.Item.Meta title="Purpose" description={selectedPettyCash?.purpose} />
                  </AntList.Item>
                  <AntList.Item>
                    <AntList.Item.Meta title="Quantity" description={selectedPettyCash?.quantity} />
                  </AntList.Item>
                  <AntList.Item>
                    <AntList.Item.Meta title="Unit Price" description={formatCurrency(selectedPettyCash?.amount)} />
                  </AntList.Item>
                  <AntList.Item>
                    <AntList.Item.Meta title="Endorsement Status (BY HOD)" description={selectedPettyCash?.endorsement} />
                  </AntList.Item>
                  <AntList.Item>
                    <AntList.Item.Meta title="Approval Status (By GM)" description={selectedPettyCash?.approval} />
                  </AntList.Item>
                  <AntList.Item>
                    <AntList.Item.Meta title="Status" description={selectedPettyCash?.status} />
                  </AntList.Item>
                  <AntList.Item>
                    <AntList.Item.Meta title="Payment Status" description={selectedPettyCash?.paid ? 'PAID' : "PENDING"} />
                  </AntList.Item>
                </AntList>
              </Col>
            </Row>
          </>
        </Drawer>

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