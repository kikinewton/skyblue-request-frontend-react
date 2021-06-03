import { Card, Col, Row, Form, Input, Button } from 'antd'
import React from 'react'
import { useParams } from 'react-router'
import Spinner from '../../../presentation/Spinner'


const Edit = (props) => {
  const { department, getDepartment, loading, submitting } = props
  const { departmentId } = useParams()
  console.log('DEPARTMENT ID', departmentId)
  const [ form ] = Form.useForm()

  const handleSubmit = (values)=> {

  }

  React.useEffect(()=> {
    getDepartment(departmentId)
  }, [])
  return (
    <>
      <Row>
        <Col md={6} sm={1}>

        </Col>
        <Col md={12} sm={1}>
          <Card title="Edit Department Form">
            {loading ? <Spinner /> : 
              <Form
                form={form}
                name="update department form"
                initialValues={{ name: department.name, description: department.description }}
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