import React from 'react'
import { Card, Col, Form, Row, Table, Input, Button, Select, PageHeader } from 'antd'
import { CheckOutlined, MinusOutlined } from '@ant-design/icons'
import { PRIORITY_LEVELS, REQUEST_REASONS, REQUEST_TYPES } from '../../../../util/datas'
import { clearLocalState, getLocalState, storeLocalState } from '../../../../services/app-storage'

const columns = props => [
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
  {
    title: "Priority",
    dataIndex: "priorityLevel",
    key: "priorityLevel"
  },
  {
    title: "Actions",
    dataIndex: "operation",
    key: "operation",
    render: (text, row) => (<Button type="default" onClick={() => props.removeEntry(row)}><MinusOutlined color="red" /></Button>)
  }
]

const AddNewRequest = (props) => {
  const [requests, setRequests] = React.useState([])
  const { departments, fetchDepartments, createRequest, departmentLoading, currentUser, requestSubmitting, submitSuccess } = props
  const [ form ] = Form.useForm()
  const departmentFieldRef = React.createRef()

  const addToEntires = (values) => {
    const { name, reason, purpose, requestType, departmentId, quantity, priorityLevel } = values
    const department = departments.filter(item => item.id === departmentId)[0]
    const id = requests.length + 2;
    const data = {id: id, name, reason, purpose, requestType, userDepartment: department, quantity, priorityLevel}
    const list = requests.concat([data])
    storeLocalState("NEW-REQUEST", list)
    setRequests(list)
    form.resetFields()
    departmentFieldRef.current.focus()
  }


  const handleSubmit = async ()=> {
    const payload = {
      multipleRequestItem: requests.map(it=> {
        let dt = it
        dt['quantity'] = it.quantity
        return dt
      })
    }
    await createRequest(payload)
   
  }

  const handleRemove = (row) => {
    const entries = requests.filter(it => it.id !== row.id)
    storeLocalState("NEW-REQUEST", entries)
    setRequests(entries)
  }

  React.useEffect(() => {
    if(submitSuccess) {
      setRequests([])
      clearLocalState("NEW-REQUEST")
    }
  }, [submitSuccess])

  React.useEffect(()=> {
    const localData = getLocalState("NEW-REQUEST")
    departmentFieldRef.current.focus()
    if(localData) {
      const fd = JSON.parse(localData)
      setRequests(fd)
    }
    fetchDepartments({}) // eslint-disable-next-line
  }, [])

  return (
    <>
      <Row>
        <Col span={24}>
          <PageHeader 
            style={{padding: 0}}
            title="Create New LPO request"
          />
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
                  initialValues={{ name: "", reason: "", purpose: "", quantity: "", requestType: undefined, departmentId: undefined, priorityLevel: "NORMAL" }}
                  onFinish={addToEntires}
                >
                  <Form.Item label="Department" name="departmentId" rules={[{ required: true, message: 'Department required' }]}>
                    <Select loading={departmentLoading}  ref={departmentFieldRef}>
                      {departments && departments.map(department=> (
                        <Select.Option key={`dept-option-${department.id}`} value={department.id}>{department.name}</Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item label="Request Type" name="requestType" rules={[{ required: true, message: 'Request Type required' }]}>
                    <Select>
                      {REQUEST_TYPES.map(rt => (
                        <Select.Option key={`request-type-${rt.id}`} value={rt.id}>{rt.label}</Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item label="PRIORITY" name="priorityLevel" rules={[{ required: true, message: 'Priority required' }]}>
                    <Select >
                      {PRIORITY_LEVELS.map(it=> (
                        <Select.Option key={`priority-${it.key}`} value={it.id}>{it.name}</Select.Option>
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
                  <Form.Item label="Purpose" name="purpose" rules={[{ required: true, message: 'Purpose required' }]}>
                    <Input  placeholder="Purpose" />
                  </Form.Item>
                  <Form.Item label="Quantity" name="quantity" rules={[{ required: true, message: 'Quantity required' }]}>
                    <Input type="number"  placeholder="Quantity" />
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
              <Row>
                <Col md={24}>
                  <Table 
                    columns={columns({
                      removeEntry: (row) => {
                        handleRemove(row)
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
                  <Button type="primary" onClick={handleSubmit} loading={requestSubmitting} disabled={requestSubmitting || requests.length < 1}>
                    <CheckOutlined />
                    SUBMIT REQUEST
                  </Button>
                </Col>
              </Row>
          </Col>
        </Row>
    </>
  )
}

export default AddNewRequest