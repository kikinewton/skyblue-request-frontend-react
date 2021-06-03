import React from 'react'


const Modal = (props)=> {
  const { onCancel, onOK, children, title, visible } = props
  return (
    <Modal title={title} visible={visible} maskClosable={false}
      okButtonProps={{style: {display: onOK ? 'flex' : 'none'}}}
      cancelButtonProps={{style: {display: 'none'}}}
      onCancel={onCancel}
    >
      {children}
    </Modal>
  )
}
export default Modal