import React from 'react'
import { Modal } from 'antd'

const ConfirmModal = (props)=> {
  const { onCancel, onOK, children, title, visible } = props
  return (
    <Modal title={title} visible={visible} maskClosable={false}
      onOk={onOK}
      onCancel={onCancel}
    >
      {children}
    </Modal>
  )
}
export default ConfirmModal