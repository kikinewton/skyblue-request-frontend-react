import { Card, Col, Row, List, Button, Form, Input } from 'antd'
import Modal from 'antd/lib/modal/Modal'
import React from 'react'
import { connect } from 'react-redux'
import AppLayout from '../AppLayout'
import * as employeeService from '../../services/api/employee'
import openNotification from '../../util/notification'
// import { history } from '../../util/browser-history'


const Settings = (props) => {
  const { currentUser, history } = props
  const [ changePasswordModal, setChangePasswordModal ] = React.useState(false)
  const [changePasswordForm] = Form.useForm()

  const handleCancel = () => {
    setChangePasswordModal(false)
    changePasswordForm.resetFields()
  }

  const handleChangePasswordSubmit = async (values) => {
    console.log('values', values)
    const { oldPassword, newPassword } = values
    try {
      const response = await employeeService.selfChangePassword(currentUser.id, {oldPassword, newPassword })
      if(response.status === 'OK') {
        openNotification('success', 'password change', response.message || 'SUCCESS')
        history.push('/auth/login')
      } else {
        openNotification('error', 'Change password', response.message)
      }
    } catch (error) {
      openNotification('error', 'Change password', error?.response?.message || 'Failed!')
    }
    
  }

  const myList = [
    {
      title: 'First Name',
      desription: currentUser.firstName
    },
    {
      title: 'Last Name',
      desription: currentUser.lastName
    },
    {
      title: 'Email',
      desription: currentUser.email
    },
    {
      title: 'Phone Number',
      desription: currentUser.phoneNo
    },
    {
      title: 'Department',
      desription: currentUser.department?.name
    },
    {
      title: 'Role',
      desription: currentUser?.role
    },
  ]

  return (
    <React.Fragment>
      <AppLayout>
        <Row>
          <Col md={12}>
            <span className="bs-page-title">Settings</span>
          </Col>
        </Row>
        <Row>
          <Col md={24}>
            <Card>
              <Row gutter={24}>
                <Col md={12}>
                  <Row>
                    <Col md={24}>
                      <span>Basic info</span>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={24}>
                      <List 
                        itemLayout="horizontal"
                        dataSource={myList}
                        renderItem={item => (
                          <List.Item>
                            <List.Item.Meta 
                              title={item.title}
                              description={item.desription}
                            />
                          </List.Item>
                        )}
                      />
                    </Col>
                  </Row>
                </Col>
                <Col md={12}>
                  <Row>
                    <Col md={12}>
                      <span>Basic Settings</span>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={24}>
                      <List.Item>
                        <List.Item.Meta 
                          title="Change password"
                          description={<Button onClick={()=> setChangePasswordModal(true)}>Change password</Button>}
                        />
                      </List.Item>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </AppLayout>
      <Modal
        footer={null}
        visible={changePasswordModal} 
        onOk={changePasswordForm.submit} 
        onCancel={handleCancel}
        title="Change Pasword"
      >
        <Form form={changePasswordForm} onFinish={handleChangePasswordSubmit} layout="vertical" initialValues={{
          oldPassword: '',
          newPassword: '',
          confirmPassword: ''
        }}>
          <Form.Item label="Old Password" name="oldPassword" rules={[{required: true, message: 'Old password required'}]}>
            <Input type="password" />
          </Form.Item>
          <Form.Item label="New Password" name="newPassword" rules={[{required: true, message: 'New password required'}]}>
            <Input type="password" />
          </Form.Item>
          <Form.Item label="Confirm Password" name="confirmPassword" rules={[{required: true, message: 'Password required'}]}>
            <Input type="password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="bs-form-button">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </React.Fragment>
  )
}

const mapStateToProps = (store) => ({
  currentUser: store.auth.user
})

export default connect(mapStateToProps, null)(Settings)