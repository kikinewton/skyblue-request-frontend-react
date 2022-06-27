import React from 'react'
import PropTypes from 'prop-types'
import { Button, Form, Input, List, Modal } from 'antd'

const RequestCancelModal = ({request, isVisible, onSubmit, loading, onCancel, initialValues}) => {
  return (
    <>
      <Modal
        visible={isVisible}
        footer={false}
        onCancel={() => onCancel()}
      >
        <Form
          onFinish={values => {
            onSubmit(values)
          }}
          requiredMark={false}
          initialValues={initialValues}
          layout="vertical"

        >
          <Form.Item>
            <List>
              <List.Item>
                <List.Item.Meta title="Description" description={request?.name || request?.description} />
              </List.Item>
              <List.Item>
                <List.Item.Meta title="Reason" description={request?.reason} />
              </List.Item>
            </List>
          </Form.Item>
          <Form.Item label="Comment" name="comment">
            <Input.TextArea rows={3}  />
          </Form.Item>
          <Form.Item>
            <Button type='primary' loading={loading}>
              CANCEL REQUEST
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

RequestCancelModal.propTypes = {
  request: PropTypes.object.isRequired,
  isVisible: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired
}

export default RequestCancelModal