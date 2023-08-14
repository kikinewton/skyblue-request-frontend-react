import React from 'react'
import PropTypes from 'prop-types'
import { Button, Form, Input } from 'antd'

const StoreForm = props => {
  const {
    initialValues,
    onSubmit,
    submitting,
    submitText = "SUBMIT",
    form
  } = props

  return (
    <>
      <Form
        layout='vertical'
        requiredMark={false}
        initialValues={initialValues}
        onFinish={(values) => onSubmit(values)}
        form={form}
      >
        <Form.Item
          label="Name"
          name="name"
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit'>
            {submitText}
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

StoreForm.propTypes = {
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  submitText: PropTypes.string
}

export default StoreForm