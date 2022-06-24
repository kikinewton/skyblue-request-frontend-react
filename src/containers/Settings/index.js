import { Card, Col, Row, List, Button, Form, Input } from 'antd'
import Modal from 'antd/lib/modal/Modal'
import React from 'react'
import { connect } from 'react-redux'
import AppLayout from '../AppLayout'
import * as employeeService from '../../services/api/employee'
import openNotification from '../../util/notification'
import { RESPONSE_SUCCESS_CODE } from '../../services/api/apiRequest'
import { signOut } from '../../services/api/auth'
// import { history } from '../../util/browser-history'


const Settings = (props) => {
  const { currentUser } = props
  const [ changePasswordModal, setChangePasswordModal ] = React.useState(false)
  const [changePasswordForm] = Form.useForm()
  const [changingPassword, setChangingPassword] = React.useState(false)

  const handleCancel = () => {
    setChangePasswordModal(false)
    changePasswordForm.resetFields()
  }

  const handleChangePasswordSubmit = async (values) => {
    const { oldPassword, newPassword } = values
    setChangingPassword(true)
    try {
      const response = await employeeService.selfChangePassword(currentUser.id, {oldPassword, newPassword })
      setChangingPassword(false)
      if(response.status === RESPONSE_SUCCESS_CODE) {
        openNotification('success', 'Change password', "Password Chnage Successful")
        setChangePasswordModal(false)
        signOut()
      } else {
        openNotification('error', 'Change password', response.message)
      }
    } catch (error) {
      setChangingPassword(false)
      openNotification('error', 'Change password', error?.response?.data?.message || 'Failed!')
    }
    
  }
  
  const myList = [
    {
      title: 'FIRST NAME',
      desription: currentUser.firstName
    },
    {
      title: 'LAST NAME',
      desription: currentUser.lastName
    },
    {
      title: 'EMAIL',
      desription: currentUser.email
    },
    {
      title: 'PHONE NUMBER',
      desription: currentUser.phoneNo
    },
    {
      title: 'DEPARTMENT',
      desription: currentUser.department?.name
    },
    {
      title: 'USER ROLE',
      desription: currentUser?.role
    },
  ]

  return (
    <React.Fragment>
      <AppLayout>
        <Row>
          <Col md={12}>
            <span className="bs-page-title">SETTINGS</span>
          </Col>
        </Row>
        <Row>
          <Col md={24}>
            <Card>
              <Row gutter={24}>
                <Col md={12}>
                  <Row>
                    <Col md={24}>
                      <span>BASIC INFO</span>
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
                      <span>BASIC SETTINGS</span>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={24}>
                      <List.Item>
                        <List.Item.Meta 
                          title="CHANGE PASSWORD"
                          description={<Button onClick={()=> setChangePasswordModal(true)}>CHANGE PASSWORD</Button>}
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
        title="CHANGE PASSWORD FORM"
      >
        <Form form={changePasswordForm} onFinish={handleChangePasswordSubmit} layout="vertical" initialValues={{
          oldPassword: '',
          newPassword: '',
          confirmPassword: ''
        }}>
          <Form.Item 
            label="OLD PASSWORD" 
            name="oldPassword" 
            rules={[{required: true, message: 'Old password required'}]}
          >
            <Input type="password" />
          </Form.Item>
          <Form.Item 
            label="NEW PASSWORD" 
            name="newPassword" 
            rules={[{required: true, message: 'New password required'}]}
          >
            <Input type="password" />
          </Form.Item>
          <Form.Item 
            label="CONFIRM NEW PASSWORD" 
            name="confirmPassword" 
            dependencies={['newPassword']}
            hasFeedback
            rules={[
              {required: true, message: 'Password required'},
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if(!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject('The two passwords that you entered do not match')
                }
              })
            ]}
          >
            <Input type="password" />
          </Form.Item>
          <Form.Item>
            <Button 
              loading={changingPassword}
              type="primary" 
              htmlType="submit" 
              className="bs-form-button"
            >
              SUBMIT
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