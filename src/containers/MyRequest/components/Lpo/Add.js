import React from 'react'
import { Card, Col, Form, Row, Table, Input, Button, Select, Checkbox } from 'antd'
import { CheckOutlined, MinusOutlined } from '@ant-design/icons'
import { PRIORITY_LEVELS, REQUEST_REASONS, REQUEST_TYPES } from '../../../../util/datas'
import { clearLocalState, getLocalState, storeLocalState } from '../../../../services/app-storage'
import { useHistory } from 'react-router'
import MyPageHeader from '../../../../shared/MyPageHeader'
import AppLayout from '../../../AppLayout'

const columns = props => [
  {
    title: 'REQUEST TYPE',
    dataIndex: 'requestType',
    key: "requestType"
  },
  {
    title: 'DESCRIPTION',
    dataIndex: 'name',
    key: "name"
  },
  {
    title: 'PURPOSE',
    dataIndex: 'purpose',
    key: "purpose"
  },
  {
    title: 'QUANTITY',
    dataIndex: 'quantity',
    key: "quantity"
  },
  {
    title: 'DEPARTMENT',
    dataIndex: 'userDepartment',
    key: "userDepartment.id",
    render: (text)=> text?.name
  },
  {
    title: 'STORE',
    dataIndex: 'store',
    key: "store.id",
    render: (text)=> text?.name || 'N/A'
  },
  {
    title: 'PURPOSE',
    dataIndex: 'purpose',
    key: "purpose"
  },
  {
    title: "PRIORITY",
    dataIndex: "priorityLevel",
    key: "priorityLevel"
  },
  {
    title: "ACTIONS",
    dataIndex: "operation",
    key: "operation",
    render: (text, row) => (<Button type="default" onClick={() => props.removeEntry(row)}><MinusOutlined color="red" /></Button>)
  }
]

const AddNewRequest = (props) => {
  const [requests, setRequests] = React.useState([])
  const { departments, fetchDepartments, createRequest, departmentLoading, currentUser, 
    requestSubmitting, submitSuccess, fetchStores, stores, loading_stores } = props
  const [ form ] = Form.useForm()
  const departmentFieldRef = React.createRef()
  const history = useHistory()
  const [requestType, setRequestType] = React.useState(REQUEST_TYPES[1]?.id)

  const addToEntires = (values) => {
    const { name, reason, purpose, requestType, departmentId, quantity, priorityLevel, storeId } = values
    const department = departments.filter(item => item.id === departmentId)[0]
    const store = stores.filter(item => item.id === storeId)[0]
    const id = requests.length + 2;
    const data = {id: id, name, reason, purpose, requestType, userDepartment: department, quantity, priorityLevel, store: store}
    if(requestType !== REQUEST_TYPES[1]?.id) {
      data["quantity"] = 1;
    }
    const list = requests.concat([data])
    storeLocalState("NEW-REQUEST", list)
    setRequests(list)
    form.resetFields(["name", "reason", "purpose", "quantity"])
    departmentFieldRef.current.focus()
  }

  const handleSubmit = async ()=> {
    const payload = {
      multipleRequestItem: requests.map(it=> {
        let dt = it
        dt['quantity'] = it.quantity
        if(it.requestType !== REQUEST_TYPES[1]?.id) {
          dt['quantity'] = 1
        }
        dt['receivingStore'] = it.store
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
    fetchDepartments({})
    fetchStores({})
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <AppLayout>
        <Row>
          <Col span={24}>
            <MyPageHeader 
              title="REQUEST NEW ITEM(S)"
              onBack={() => history.goBack()}
            />
          </Col>
        </Row>
        <Card 
          title="CREATE NEW LPO REQUEST"
        >
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
                    initialValues={{ name: "", reason: "", purpose: "", quantity: "", storeId: undefined,
                      requestType: REQUEST_TYPES[1]?.id, departmentId: currentUser?.department?.id || undefined, priorityLevel: "NORMAL"}}
                    onFinish={addToEntires}
                  >
                    <Form.Item label="DEPARTMENT" name="departmentId" rules={[{ required: true, message: 'Department required' }]}>
                      <Select loading={departmentLoading}  ref={departmentFieldRef}>
                        {departments && departments.map(department=> (
                          <Select.Option key={`dept-option-${department.id}`} value={department.id}>{department.name}</Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item label="STORE" name="storeId" rules={[{ required: true, message: 'Store To receive Item required' }]}>
                      <Select loading={loading_stores}>
                        {stores && stores.map(store=> (
                          <Select.Option key={`store-option-${store.id}`} value={store.id}>{store.name}</Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item label="REQUEST TYPE" name="requestType" rules={[{ required: true, message: 'Request Type required' }]}>
                      <Select onChange={(value) =>setRequestType(value)}>
                        {REQUEST_TYPES.map(rt => (
                          <Select.Option key={`request-type-${rt.id}`} value={rt.id}>{rt.label}</Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item label="PRIORITY" name="priorityLevel" rules={[{ required: true, message: 'Priority required' }]}>
                      <Select >
                        {PRIORITY_LEVELS.map(it=> (
                          <Select.Option key={`priority-${it.key}`} value={it.key}>{it.name}</Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item label="DESCRIPTION" name="name" rules={[{ required: true, message: 'Description required' }]}>
                      <Input.TextArea placeholder="Description" rows={3} />
                    </Form.Item>
                    <Form.Item label="REASON" name="reason" rules={[{ required: true, message: 'Reason required' }]}>
                      <Select>
                        {REQUEST_REASONS.map(item=> (
                          <Select.Option key={`reason-${item.id}`} value={item.id}>{item.label}</Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item label="PURPOSE" name="purpose" rules={[{ required: true, message: 'Purpose required' }]}>
                      <Input  placeholder="Purpose" />
                    </Form.Item>
                    {(requestType === REQUEST_TYPES[1]?.id) && (
                      <Form.Item label="QUANTITY" name="quantity" rules={[{ required: true, message: 'Quantity required' }]}>
                        <Input type="number"  placeholder="Quantity" />
                      </Form.Item>
                    )}
                    <Form.Item>
                      <Button type="primary" htmlType="submit" className="bs-form-button">
                        ADD ITEM
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
                      bordered
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
        </Card>
      </AppLayout>
    </>
  )
}

export default AddNewRequest