import { Form, Input, Button, Card } from 'antd'
import React from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons'

const Login = (props) => {
  const { loginUser, loading } = props
  const onFinish = (values) => {
    const payload = { email: values['email']?.trim(), password: values['password'] }
    loginUser(payload)
  }

  return (
    <>
      <Card title="LOGIN">
        <Form
          name="bs-form"
          initialValues={{ email: '', password: '' }}
          onFinish={onFinish}
        >
          <Form.Item name="email" rules={[{ required: true, message: 'Please enter your email' }]}>
            <Input prefix={<UserOutlined className="bs-form-item-icon"/>} placeholder="Email" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: 'Please enter your password' }]}>
            <Input prefix={<LockOutlined className="bs-form-item-icon"/>} placeholder="Password" type="password" />
          </Form.Item>
          <Form.Item>
          <Button type="primary" htmlType="submit" className="bs-form-button" loading={loading}>
            LOG IN
          </Button>
        </Form.Item>
        </Form>
      </Card>
    </>
  )
}

export default Login;

