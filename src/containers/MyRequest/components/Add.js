import React from 'react'
import { Card, Col, Form, Row, Table, Input, Button, Select } from 'antd'
import { SendOutlined } from '@ant-design/icons'
import { REQUEST_REASONS, REQUEST_TYPES } from '../../../util/datas'
import { clearLocalState, getLocalState, storeLocalState } from '../../../services/app-storage'

const columns = [
  {
    title: 'Request Type',
    dataIndex: 'requestType',
    key: "requestType"
  },
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
    title: 'Department',
    dataIndex: 'userDepartment',
    key: "userDepartment.id",
    render: (text)=> text.name
  },
  {
    title: 'Purpose',
    dataIndex: 'purpose',
    key: "purpose"
  },
]

const AddNewRequest = (props) => {
  const [requests, setRequests] = React.useState([])
  const { departments, fetchDepartments, createRequest, departmentLoading, currentUser, requestSubmitting, submitSuccess } = props
  const [ form ] = Form.useForm()

  const addToEntires = (values) => {
    const { name, reason, purpose, requestType, departmentId, quantity } = values
    const department = departments.filter(item => item.id === departmentId)[0]
    const id = requests.length + 2;
    const data = {id: id, name, reason, purpose, requestType, userDepartment: department, quantity}
    const list = requests.concat([data])
    storeLocalState("NEW-REQUEST", list)
    setRequests(list)
    form.resetFields()
  }


  const handleSubmit = async ()=> {
    const payload = {
      employee_id: currentUser.id,
      multipleRequestItem: requests
    }
    await createRequest(payload)
    // console.log('SUBMIT SUCCESS', submitSuccess)
    // const localData = JSON.parse(getLocalState("NEW-REQUEST")) || []
    console.log('SUBMI LOADING', submitSuccess)
   
  }

  React.useEffect(() => {
    setRequests([])
    clearLocalState("NEW-REQUEST")
  }, [submitSuccess])

  React.useEffect(()=> {
    const localData = getLocalState("NEW-REQUEST")
    if(localData) {
      const fd = JSON.parse(localData)
      console.log('DATA', fd)
      setRequests(fd)
    }
    fetchDepartments({}) // eslint-disable-next-line
  }, [])
  return (
    <>
        <Row gutter={12}>
          <Col md={6}>
            <Row>
              <Col md={24}>
                <Form
                  size="middle"
                  layout="vertical"
                  form={form}
                  name="request-entry"
                  initialValues={{ name: "", reason: "", purpose: "", quantity: "", requestType: undefined, departmentId: undefined }}
                  onFinish={addToEntires}
                >
                  <Form.Item label="Request Type" name="requestType" rules={[{ required: true, message: 'Request Type required' }]}>
                    <Select>
                      {REQUEST_TYPES.map(rt => (
                        <Select.Option key={`request-type-${rt.id}`} value={rt.id}>{rt.label}</Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item label="Description" name="name" rules={[{ required: true, message: 'Description required' }]}>
                    <Input placeholder="Description" />
                  </Form.Item>
                  <Form.Item label="Reason" name="reason" rules={[{ required: true, message: 'Reason required' }]}>
                    <Select>
                      {REQUEST_REASONS.map(item=> (
                        <Select.Option key={`reason-${item.id}`} value={item.id}>{item.label}</Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item label="Department" name="departmentId" rules={[{ required: true, message: 'Department required' }]}>
                    <Select loading={departmentLoading}>
                      {departments && departments.map(department=> (
                        <Select.Option key={`dept-option-${department.id}`} value={department.id}>{department.name}</Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item label="Purpose" name="purpose" rules={[{ required: true, message: 'Purpose required' }]}>
                    <Input  placeholder="Purpose" />
                  </Form.Item>
                  <Form.Item label="Quantity" name="quantity" rules={[{ required: true, message: 'Quantity required' }]}>
                    <Input  placeholder="Quantity" />
                  </Form.Item>
                  <Form.Item>
                  <Button type="primary" htmlType="submit" className="bs-form-button">
                    Add Entry
                  </Button>
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </Col>
          <Col md={18}>
            <Card>
              <Row>
                <Col md={24} style={{textAlign: 'right', marginBottom: 5}}>
                  <Button type="primary" onClick={handleSubmit} loading={requestSubmitting} disabled={requestSubmitting || requests.length < 1}>
                    <SendOutlined />
                    Send Request
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col md={24}>
                  <Table 
                    columns={columns}
                    dataSource={requests}
                    pagination={false}
                    size="small"
                    rowKey="id"
                  />
                </Col>  
              </Row>
            </Card>
          </Col>
        </Row>
    </>
  )
}

export default AddNewRequest