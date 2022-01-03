import React, { useState } from 'react'
import { Card, Col, Form, Row, Table, Input, Button, Select, PageHeader } from 'antd'
import { CheckOutlined, LeftCircleFilled, MinusOutlined } from '@ant-design/icons'
import { clearLocalState, getLocalState, storeLocalState } from '../../../../services/app-storage'
import { CURRENCY_CODE } from '../../../../util/constants'
import AppLayout from '../../../AppLayout'
import MyPageHeader from '../../../../shared/MyPageHeader'
import { useHistory } from 'react-router-dom'

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

const AddNewRequest = (props) => {
  const [requests, setRequests] = React.useState([])
  const { createFloatRequest, submitting_float_request, submit_float_request_success } = props
  const [userDetails, setUserDetails] = useState({name: "", phoneNo: ""})
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
      requestedBy: userDetails.name,
      requestedByPhoneNo: userDetails.phoneNo
    }
    await createFloatRequest(payload)
  }

  React.useEffect(() => {
    if(submit_float_request_success) {
      setRequests([])
      clearLocalState("NEW-FLOAT-REQUEST")
    }
  }, [submit_float_request_success])

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
        <Card>
          <Row style={{padding: "10px 0 10px 0"}}>
            <Col span={24}>
              <Card title="User Details" size='small'>
                <Row gutter={12}>
                  <Col span={12}>
                    <Form.Item label="Name">
                      <Input 
                        type="text"
                        value={userDetails.name}
                        onChange={(event) => setUserDetails({...userDetails, name: event.target.value})}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Phone Number">
                      <Input 
                        type="text"
                        value={userDetails.phoneNo}
                        onChange={(event) => setUserDetails({...userDetails, phoneNo: event.target.value})}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
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
                  <Button type="primary" onClick={handleSubmit} 
                    loading={submitting_float_request} 
                    disabled={submitting_float_request || requests.length < 1 || !userDetails.name}
                  >
                    <CheckOutlined />
                    SUBMIT FLOAT REQUEST
                  </Button>
                </Col>
              </Row>
              </Card>
            </Col>
          </Row>
        </Card>
      </AppLayout>
    </>
  )
}

export default AddNewRequest