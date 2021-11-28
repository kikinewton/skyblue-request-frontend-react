import React from 'react'
import { Button, Form, Input } from "antd"

const UpdateFloatForm = (props) => {
  const {
    float,
    onSubmit
  } = props

  return (
    <>
      <Form
        onFinish={onSubmit}
        layout="vertical"
        requiredMark={false}
        initialValues={{
          description: float?.itemDescription,
          quantity: float?.quantity,
          estimatedUnitPrice: float?.estimatedUnitPrice
        }}
      >
        <Form.Item name="description" label="Description">
          <Input.TextArea rows={4}  />
        </Form.Item>
        <Form.Item name="estimatedUnitPrice" label="Estimated Unit Price">
          <Input type="number" step="0.1" />
        </Form.Item>
        <Form.Item name="quantity" label="Quantity">
          <Input type="number"  />
        </Form.Item>
        <Form.Item>
          <Button loading={props.loading} disabled={props.loading} type="primary" htmlType="submit">UPDATE FLOAT</Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default UpdateFloatForm