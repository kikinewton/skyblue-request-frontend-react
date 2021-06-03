import { Form, Button, Input, Col, Row, Card, Select } from 'antd'
import React from 'react'
import { useParams } from 'react-router'
import Spinner from '../../../presentation/Spinner'
import { USER_ROLES } from '../../../util/datas'


const Edit = (props) => {
  const { employee, getEmployee, loading, submitting, departmentLoading, departments, updateEmployee } = props
  const { employeeId } = useParams()
  console.log('EMPLOYEE ID', employeeId)
  const [ form ] = Form.useForm()

  const handleSubmit = (values)=> {
    const { firstName, lastName, email, phoneNo, role, departmentId } = values
    const payload = {
      firstName, lastName, email, phoneNo, role, 
      department: {id: departmentId, name: ""}
    }

  }

  React.useEffect(()=> {
    getEmployee(employeeId)
  }, [])
  return (
    <>
      <Row>
        <Col md={6} sm={1}>

        </Col>
        <Col md={12} sm={1}>
          <Card title="Edit Employee Form">
            {loading ? <Spinner /> : 
              <Form
                layout="vertical"
                form={form}
                name="create employee form"
                initialValues={{
                  firstName: employee.firstName, 
                  lastName: employee.lastName, 
                  email: employee.email, 
                  phoneNo: employee.phoneNo, 
                  role: (employee || {}).role, 
                  departmentId: (employee || {}).department?.id
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
                  UPDATE
                </Button>
                </Form.Item>
              </Form>
            }
          </Card>
        </Col>
        <Col md={6} sm={1}>

        </Col>
      </Row>
    </>
  )
}
export default Edit