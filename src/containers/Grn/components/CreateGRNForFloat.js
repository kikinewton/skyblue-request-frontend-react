import { Breadcrumb, Col, Form, List } from 'antd'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

const CreateGRNForFloat = (props) => {
  const {

  } = props

  const [floatOrder, setFloatOrder] = useState(null)

  return (
    <>
      <Row>
        <Col span={24}>
          <Breadcrumb>
            <Breadcrumb.Item>
              <NavLink>
                FLOATS AWAITING GRN
              </NavLink>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              CREATE GRN FOR FLOAT
            </Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <List>
            <List.Item>
              <List.Item.Meta title="Date Requested" description={floatOrder?.dateCreated} />
            </List.Item>
          </List>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form
            onFinish={values => {
              console.log('values', values)
            }}
            layout="vertical"
          >
            <Form.Item label="">
              
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  )

}

export default CreateGRNForFloat