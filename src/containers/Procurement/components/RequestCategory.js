import { Button, Col, Row, Table, Form, Input } from 'antd'
import Modal from 'antd/lib/modal/Modal'
import React from 'react'

const columns = (props) => [
  {
    title: '#ID',
    dataIndex: 'id',
    key: 'id',
    render: (text)=> `#${text}`
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description'
  }
]

const RequestCategory = (props) => {
  const { requestCategories, fetchRequestCategories, createRequestCategory, requestCategorySubmitting, requestCategorySubmitSuccess } = props
  const [ addModal, setAddModal ] = React.useState(false)
  const [form] = Form.useForm()

  const handleSubmit = async (values)=> {
    const { name, description } = values
    const payload = {name, description}
    await createRequestCategory(payload)
    console.log('success', requestCategorySubmitSuccess)
    form.resetFields()
    setAddModal(false)
    await fetchRequestCategories({})
    
  }

  const handleCancel = () => {
    setAddModal(false)
  }

  React.useEffect(()=> {
    fetchRequestCategories({})
  }, [])

  return (
    <React.Fragment>
      <Row style={{marginBottom: 10}}>
        <Col md={12}>
          <span className="bs-page-title">Item Category</span>
        </Col>
        <Col md={12}>
          <Button type="primary" style={{float: 'right'}} onClick={()=> setAddModal(true)}>
            Add New
          </Button>
        </Col>
      </Row>
      <Row>
        <Col md={24}>
          <Table 
            columns={columns(props)}
            dataSource={requestCategories}
            size="small"
            rowKey="id"
            key="id"
          />
        </Col>
      </Row>
      <Modal 
        footer={null}
        visible={addModal} 
        onOk={form.submit} 
        onCancel={handleCancel}
        title="Add New Request Category"
      >
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Name required' }]}>
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item label="Description" name="description" rules={[{ required: false, message: 'Description required' }]}>
            <Input placeholder="Description" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="bs-form-button" loading={requestCategorySubmitting}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </React.Fragment>
  )
}

export default RequestCategory