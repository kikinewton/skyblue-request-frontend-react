import React, { useState } from 'react'
import { Card, Col, Form, Row, Table, Input, Button, Steps, List } from 'antd'
import { BookOutlined, CheckOutlined, ContactsOutlined, FileDoneOutlined, LeftCircleFilled, LeftOutlined, MinusOutlined, RightOutlined, UserOutlined } from '@ant-design/icons'
import { clearLocalState, getLocalState, storeLocalState } from '../../../../services/app-storage'
import { CURRENCY_CODE } from '../../../../util/constants'
import AppLayout from '../../../AppLayout'
import MyPageHeader from '../../../../shared/MyPageHeader'
import { useHistory } from 'react-router-dom' 
const { Step } = Steps

const columns = (props) => [
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
  },
  {
    title: "Action",
    dataIndex: "operation",
    key: "operation",
    align: "right",
    render: (text, row) => (<Button size="small" type="primary" onClick={()=> props.removeEntry(row)}><MinusOutlined /></Button>)
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

const AddNewRequest = (props) => {
  const [requests, setRequests] = React.useState([])
  const { createFloatRequest, submitting_float_request, submit_float_request_success } = props
  const [floatOrder, setFloatOrder] = useState({name: "", phoneNo: "", amount: 0, description: "", staffId: ""})
  const [basicForm] = Form.useForm()
  const [current, setCurrent] = useState(0)
  const [ form ] = Form.useForm()
  const history = useHistory()

  const addToEntires = (values) => {
    const { name, reason, purpose, unitPrice, departmentId, quantity } = values
    const id = requests.length + 2;
    const data = {id: id, name, reason, purpose, unitPrice, quantity}
    const list = requests.concat([data])
    storeLocalState("NEW-FLOAT-REQUEST", list)
    setRequests(list)
    form.resetFields()
  }

  const removeEntry = (item) => {
    const entries = requests.filter(it => it.id !== item.id)
    setRequests(entries)
    storeLocalState("NEW-FLOAT-REQUEST", entries)
  }


  const handleSubmit = async ()=> {
    const payload = {
      items: requests,
      requestedBy: floatOrder.name,
      requestedByPhoneNo: floatOrder.phoneNo,
      requestedByStaffId: floatOrder.staffId,
      description: floatOrder.description,
      amount: floatOrder.amount
    }
    console.log('payload', payload)
    await createFloatRequest(payload)
  }

  React.useEffect(() => {
    if(!submitting_float_request && submit_float_request_success) {
      setRequests([])
      clearLocalState("NEW-FLOAT-REQUEST")
      setCurrent(0)
      setFloatOrder({name: "", description: "", amount: 0, phoneNo: ""})
    }
  }, [submit_float_request_success, submitting_float_request])

  React.useEffect(()=> {
    const localData = getLocalState("NEW-FLOAT-REQUEST")
    if(localData) {
      const fd = JSON.parse(localData)
      setRequests(fd)
    }
    //fetchDepartments({})
    // eslint-disable-next-line
  }, [])
  return (
    <>
      <AppLayout
        title="My Float Requests"
      >
        <MyPageHeader 
          title="Create New Float Entries"
          onBack={()=> history.goBack()}
        />
        <Row style={{padding: "10px 0 10px 0"}}>
          <Col span={24}>
            <Steps current={current} size='small'>
              <Step key={0} icon={<UserOutlined />} title="Float Basic Info" />
              <Step key={1} icon={<BookOutlined />} title="Float Item Entries" />
              <Step key={2} icon={<FileDoneOutlined />} title="Confirm And Submit" />
            </Steps>
          </Col>
        </Row>
        <Card>
          {current === 0 && (
            <>
              <Form
                layout="vertical"
                requiredMark
              >
                <Form.Item required label="Requested By" name="name">
                  <Input 
                    placeholder='Name' 
                    value={floatOrder.name} 
                    onChange={(e) => setFloatOrder({...floatOrder, name: e.target.value})} 
                  />
                </Form.Item>
                <Form.Item required label="Employee Staff ID" name="staffId" 
                  rules={[
                    {required: true, message: "Employee Staff ID required"}
                  ]}
                >
                  <Input 
                    placeholder='ST44526272' 
                    value={floatOrder.staffId} 
                    onChange={e => setFloatOrder({...floatOrder, staffId: e.target.value})}
                  />
                </Form.Item>
                <Form.Item label="User Phone Number" name="phoneNo">
                  <Input 
                    placeholder='Name' 
                    value={floatOrder.phoneNo} 
                    onChange={e => setFloatOrder({...floatOrder, phoneNo: e.target.value})}
                  />
                </Form.Item>
                <Form.Item required label="Float Description" name="description">
                  <Input 
                    placeholder='Name' 
                    value={floatOrder.description} 
                    onChange={e => setFloatOrder({...floatOrder, description: e.target.value})}
                  />
                </Form.Item>
                <Form.Item>
                  <Row>
                    <Col span={24} style={{display: "flex", flexDirection: "row", justifyContent: "flex-end"}}>
                      <Button
                        style={{marginRight: 5}}
                        disabled={!floatOrder.name || !floatOrder.description || !floatOrder?.staffId}
                        onClick={e => {
                          e.preventDefault()
                          setCurrent(1)
                        }}
                      >
                        Add Float Items
                        <RightOutlined />
                      </Button>
                      <Button
                        type='primary'
                        disabled={!floatOrder.name || !floatOrder.description}
                        onClick={e => {
                          e.preventDefault()
                          setCurrent(2)
                        }}
                      >
                        Confirm And Submit
                        <RightOutlined />
                      </Button>
                    </Col>
                  </Row>
                </Form.Item>
              </Form>
            </>
          )}
          {current === 1 && (
            <>
              <Row gutter={24}>
                <Col md={6}>
                  <Card>
                    <Row>
                      <Col md={24}>
                        <Form
                          size="middle"
                          layout="vertical"
                          form={form}
                          name="request-entry"
                          initialValues={{ name: "", purpose: "", quantity: "", unit_price: "" }}
                          onFinish={addToEntires}
                          
                        >
                          <Form.Item label="Description" name="name" rules={[{ required: true, message: 'Description required' }]}>
                            <Input.TextArea rows={3} placeholder="Description" />
                          </Form.Item>
                          <Form.Item label="Purpose" name="purpose" rules={[{ required: true, message: 'Purpose required' }]}>
                            <Input  placeholder="Purpose" />
                          </Form.Item>
                          <Form.Item label="Quantity" name="quantity" rules={[{ required: true, message: 'Quantity required' }]}>
                            <Input type="number"  placeholder="Quantity" />
                          </Form.Item>
                          <Form.Item label={`Estimated Unit Price`} name="unitPrice" rules={[{ required: true, message: 'Unit Price required' }]}>
                            <Input prefix={CURRENCY_CODE} type="number"  placeholder="Unit Price" />
                          </Form.Item>
                          <Form.Item>
                            <Button type="primary" htmlType="submit" className="bs-form-button">
                              Add Entry
                            </Button>
                          </Form.Item>
                        </Form>
                      </Col>
                    </Row>
                    </Card>
                  </Col>
                  <Col md={18}>
                    <Card>
                    <Row>
                      <Col md={24}>
                        <Table 
                          columns={columns({
                            removeEntry: (row)=> {
                              removeEntry(row)
                            }
                          })}
                          dataSource={requests}
                          pagination={false}
                          size="small"
                          rowKey="id"
                        />
                      </Col>  
                    </Row>
                    <Row>
                      <Col md={24} style={{textAlign: 'right', marginTop: 20}}>
                        <Button type="default" style={{float: "left"}} onClick={e => setCurrent(0)}>
                          <LeftOutlined />
                          Enter Float Details
                        </Button>
                        <Button type="primary" 
                          onClick={e => setCurrent(2)}
                          disabled={submitting_float_request}
                        >
                          Confirm And Submit
                          <RightOutlined />
                        </Button>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row>
            </>
          )}
          {current === 2 && (
            <>
              <Row>
                <Col span={24}>
                  <Card size='small' title="Float Order Description">
                    <List>
                      <List.Item>
                        <List.Item.Meta title="Float Description:" description={floatOrder?.description} />
                      </List.Item>
                      <List.Item>
                        <List.Item.Meta title="Requested By:" description={floatOrder?.name} />
                      </List.Item>
                      <List.Item>
                        <List.Item.Meta title="Phone Number:" description={floatOrder?.description || "N/A"} />
                      </List.Item>
                      <List.Item>
                        <List.Item.Meta 
                          title="Float Item Total Amount:"
                          description={`${CURRENCY_CODE} ${requests.map(it => Number(it.unitPrice) || 0).reduce((ac, a) => ac + a, 0)}`}
                        />
                      </List.Item>
                    </List>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Card size='small' title="Entries">
                    <Table 
                      columns={verificationColumns}
                      size='small'
                      bordered
                      dataSource={requests}
                      rowKey="id"
                      pagination={false}
                    />
                  </Card>
                </Col>
              </Row>
              <Row style={{margin: "10px 0 10px 0", padding: 10}}>
                <Col span={24}>
                  <Form.Item label="Estimated Amount">
                    <Input 
                      type="number" 
                      step="0.1" 
                      prefix={CURRENCY_CODE} 
                      onChange={e => setFloatOrder({...floatOrder, amount: e.target.value})}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row style={{padding: "10px 0 10px 0"}}>
                <Col span={24}>
                  <Button style={{float: "left"}} type='default' onClick={() => setCurrent(1)}>
                    <LeftOutlined />
                    Enter Float Items
                  </Button>
                  <Button 
                    style={{float: "right"}} 
                    type='primary' onClick={() => setCurrent(1)}
                    onClick={handleSubmit}
                    disabled={!floatOrder.amount || !floatOrder.description || !floatOrder.name || submitting_float_request}
                    loading={submitting_float_request}
                  >
                    <CheckOutlined />
                    Submit
                  </Button>
                </Col>
              </Row>
            </>
          )}
        </Card>
      </AppLayout>
    </>
  )
}

export default AddNewRequest