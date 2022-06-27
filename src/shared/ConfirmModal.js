import { Modal } from 'antd'
import React from 'react'
import PropTypes from "prop-types"

const ConfirmModal = ({isVisible, text, onSubmit, onCancel, loading, submitBtnText="YES", cancelBtnText="CANCEL", title, children}) => {

  return (
    <Modal
      visible={isVisible}
      title={title}
      onCancel={() => onCancel()}
      onOk={() => onSubmit()}
      confirmLoading={loading}
      okText={submitBtnText}
      cancelText={cancelBtnText}
    >
      {children}
    </Modal>
  )
}

ConfirmModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  text: PropTypes.string,
  title: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  submitBtnText: PropTypes.string,
  cancelBtnText: PropTypes.string,
  children: PropTypes.element
}

export default ConfirmModal