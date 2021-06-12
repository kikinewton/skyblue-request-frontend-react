import React from 'react'
import { Form, Button, Input, Col, Row, Card } from 'antd'

const CreateDepartmentForm = (props)=> {
  const {submitting, createDepartment} = props
  const [ form ] = Form.useForm()

  const handleSubmit = (values)=> {
    const payload = {name: values.name, description: values.description}
    createDepartment(payload)
  }

  React.useEffect(()=> {
    if(!submitting) {
      form.resetFields()
    }
    // eslint-disable-next-line
  }, [submitting])
  return (
    <>
      <Row style={{marginTop: 50}}>
        <Col md={4} sm={1}></Col>
        <Col md={16} sm={22}>
          <Card title="New Department Form">
            <Form
              form={form}
              name="update department form"
              initialValues={{ name: "", description: "" }}
              onFinish={handleSubmit}
            >
              <Form.Item name="name" rules={[{ required: true, message: 'Name required' }]}>
                <Input placeholder="Name" />
              </Form.Item>
              <Form.Item name="description" rules={[{ required: true, message: 'Description required' }]}>
                <Input  placeholder="Description" />
              </Form.Item>
              <Form.Item>
              <Button type="primary" htmlType="submit" className="bs-form-button" loading={submitting}>
                Submit
              </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
        <Col md={4} sm={1}></Col>
      </Row>
    </>
  )
}

export default CreateDepartmentForm