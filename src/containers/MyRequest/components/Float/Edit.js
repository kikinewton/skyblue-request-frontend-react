import React, { useEffect, useState } from 'react'
import { Card, Col, Form, Row, Table, Input, Button, List, Drawer, Spin } from 'antd'
import { CalendarOutlined, MinusOutlined, NumberOutlined, OneToOneOutlined, PhoneOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons'
import { CURRENCY_CODE } from '../../../../util/constants'
import AppLayout from '../../../AppLayout'
import MyPageHeader from '../../../../shared/MyPageHeader'
import { useHistory, useParams } from 'react-router-dom'
import { prettifyDateTime } from '../../../../util/common-helper'
const columns = (props) => [
  {
    title: 'Description',
    dataIndex: 'itemDescription',
    key: "itemDescription"
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    key: "quantity"
  },
  {
    title: 'Unit Price',
    dataIndex: 'estimatedUnitPrice',
    key: "estimatedUnitPrice"
  },
  {
    title: "Action",
    dataIndex: "operation",
    key: "operation",
    align: "right",
    render: (text, row) => !row.id ? 
      (<Button size="small" type="default" onClick={()=> props.onRemove(row)}><MinusOutlined /></Button>) : (
        <span style={{fontWeight: "bold"}}>Already added</span>
      )
  }
]

const verificationColumns = [
  {
    title: 'Description',
    dataIndex: 'name',
    key: "name"
  },
  {
    title: 'Purpose',
    dataIndex: 'purpose',
    key: "purpose"
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    key: "quantity"
  },
  {
    title: 'Unit Price',
    dataIndex: 'unitPrice',
    key: "unitPrice"
  }
]

const EditFloatOrder = (props) => {
  const { submitting_float_request, 
    submit_float_request_success, float_order, fetchFloatOrder, fetching_float_requests, addItemsToFloatOrder
  } = props
  // const [floatOrder, setFloatOrder] = useState({name: "", phoneNo: "", amount: 0, description: ""})
  // const [basicForm] = Form.useForm()
  // const [current, setCurrent] = useState(0)
  const [addVisible, setAddVisible] = useState(false)
  const [floatItems, setFloatItems] = useState(float_order?.floats || [])
  const [ form ] = Form.useForm()
  const history = useHistory()
  const {id} = useParams()

  const addToEntires = (values) => {
    console.log('values', values)
    const list = floatItems.concat([values])
    setFloatItems(list)
    form.resetFields()
  }

  const removeEntry = (item) => {
    const entries = floatItems.filter(it => it.id !== item.id)
    setFloatItems(entries)
  }

  const submit = () => {
    const newEntries = floatItems.filter(it => !it.id)
    const payload = {
      floats: newEntries
    }
    console.log('entries', payload)
    addItemsToFloatOrder(id, payload)
  }

  React.useEffect(() => {
    if(!submitting_float_request && submit_float_request_success) {
      setFloatItems([])
      fetchFloatOrder(id)
    }
  }, [submit_float_request_success, submitting_float_request])

  React.useEffect(()=> {
    fetchFloatOrder(id)  
  }, [id])

  useEffect(() => {
    if(float_order) {
      setFloatItems(float_order?.floats)
    }
  }, [float_order])

  return (
    <>
      <AppLayout
        title="My Float Requests"
      >
        <MyPageHeader 
          title="Edit Float Order"
          onBack={()=> history.goBack()}
        />
        <Card>
          {fetching_float_requests ? <Spin/> : (
            <>
              <Row>
                <Col span={24}>
                  <List>
                    <List.Item>
                      <List.Item.Meta avatar={<NumberOutlined />} title="Reference" description={float_order?.floatOrderRef} />
                    </List.Item>
                    <List.Item>
                      <List.Item.Meta avatar={<OneToOneOutlined />} title="Description" description={float_order?.description} />
                    </List.Item>
                    <List.Item>
                      <List.Item.Meta avatar={<UserOutlined />} title="Requested By" description={float_order?.requestedBy} />
                    </List.Item>
                    <List.Item>
                      <List.Item.Meta avatar={<PhoneOutlined />} title="Phone Number" description={float_order?.requestedByPhoneNo} />
                    </List.Item>
                    <List.Item>
                      <List.Item.Meta avatar={<CalendarOutlined />} title="Date" description={prettifyDateTime(float_order?.createdDate)} />
                    </List.Item>
                  </List>
                </Col>
              </Row>
              {/* <Row>
                <Col span={24}>
                  <Form.Item>
                    <Input 
                      prefix={CURRENCY_CODE} 
                      type="number"
                      value={float_order?.amount}
                      onChange={e => {
                        float_order['amount'] = e.target.value
                      }}
                    />
                  </Form.Item>
                </Col>
              </Row> */}
              <Row style={{marginTop: 10, marginBottom: 10}}>
                <Col span={24}>
                  <span style={{fontWeight: "bold", float: "left"}}>Entries</span>
                  <Button
                    style={{float: "right"}}
                    type='primary'
                    shape='circle'
                    size='small'
                    onClick={e => {
                      setAddVisible(true)
                    }}
                  >
                    <PlusOutlined />
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Table 
                    columns={columns({
                      onAdd: () => {
                        
                      },
                      onRemove: row => {
                        removeEntry(row)
                      }
                    })}
                    dataSource={floatItems}
                    size="small"
                    bordered
                    rowKey="itemDescription"
                    pagination={false}
                  />
                </Col>
              </Row>
              <Row style={{padding: "10px 0 10px 0"}}>
                <Col span={24}>
                  <Button
                    type="primary"
                    loading={submitting_float_request}
                    onClick={e => {
                      submit()
                    }}
                  >
                    SUBMIT
                  </Button>
                </Col>
              </Row>
            </>
          )} 
        </Card>
        <Drawer
          visible={addVisible}
          onClose={() => {
            setAddVisible(false)
          }}
          width={700}
          placement='right'
          title="Add Float Item"
        >
          <Form
            layout="vertical"
            form={form}
            onFinish={(values) => {
              addToEntires(values)
              setAddVisible(false)
            }}
            initialValues={{
              itemDescription: "",
              quantity: "",
              estimatedUnitPrice: 1,
            }}
            
          >
            <Form.Item name="itemDescription" label="Description" rules={[{requred: true, message: "Description required!"}]}> 
              <Input type="text" />
            </Form.Item>
            <Form.Item name="estimatedUnitPrice" label="Estimated Price" rules={[{requred: true, message: "Estimated Price required!"}]}> 
              <Input type="number" />
            </Form.Item>
            <Form.Item name="quantity" label="Quantity">
              <Input type="number" />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                htmlType='submit'
              >
                Add Float Item
              </Button>
            </Form.Item>
          </Form>
        </Drawer>
      </AppLayout>
    </>
  )
}

export default EditFloatOrder