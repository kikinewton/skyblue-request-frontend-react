import React from 'react'
import { Form, Button, Input, Col, Row, Card, Select } from 'antd'
import { USER_ROLES } from '../../../util/datas'

const Add = (props)=> {
  const { submitting, createEmployee, fetchDepartments, departments, submitSuccess, departmentLoading } = props
  const [ form ] = Form.useForm()

  const handleSubmit = (values)=> {
    const { firstName, lastName, email, phoneNo, role, departmentId } = values
    const payload = {
      firstName, lastName, email, phoneNo, role,
      department: {id: departmentId, name: ""}
    }
    createEmployee(payload)
    if(submitSuccess) {
      form.resetFields()
    }
  }

  React.useEffect(()=> {
    fetchDepartments({})
  }, [])
  return (
    <>
      <Row style={{marginTop: 50}}>
        <Col md={4} sm={1}></Col>
        <Col md={16} sm={22}>
          <Card title="New Employee Form">
            <Form
              layout="vertical"
              form={form}
              name="create employee form"
              initialValues={{
                 firstName: "", lastName: "", email: "", phoneNo: "", role: undefined, departmentId: undefined
              }}
              onFinish={handleSubmit}
            >
              <Form.Item label="First Name" name="firstName" rules={[{ required: true, message: 'First name required' }]}>
                <Input placeholder="First Name" />
              </Form.Item>
              <Form.Item label="Last Name" name="lastName" rules={[{ required: true, message: 'Last name required' }]}>
                <Input placeholder="Last Name" />
              </Form.Item>
              <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Email required' }]}>
                <Input placeholder="Email" />
              </Form.Item>
              <Form.Item label="Phone Number" name="phoneNo" rules={[{ required: true, message: 'Phone number required' }]}>
                <Input placeholder="Phone Number" />
              </Form.Item>
              <Form.Item label="Department" name="departmentId" rules={[{ required: true, message: 'Department required' }]}>
                <Select loading={departmentLoading}>
                  {departments && departments.map(department=> (
                    <Select.Option key={`dept-option-${department.id}`} value={department.id}>{department.name}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label="Role" name="role" rules={[{ required: true, message: 'Role required' }]}>
                <Select>
                  {USER_ROLES.map(role=> (
                    <Select.Option key={`role-${role.id}`} value={role.id}>{role.label}</Select.Option>
                  ))}
                </Select>
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

export default Add