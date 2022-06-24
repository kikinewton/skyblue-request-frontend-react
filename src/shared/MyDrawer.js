import { Drawer } from 'antd'
import React from 'react'
import PropTypes from 'prop-types'

const MyDrawer = (props) => {
  const {
    visible,
    children,
    placement='right',
    width=800,
    title,
    onClose
  } = props
  return (
    <Drawer
      visible={visible}
      placement={placement}
      width={width}
      title={title}
      onClose={() => {
        onClose()
      }}
    >
      {children}
    </Drawer>
  )
}

MyDrawer.propTypes = {
  visible: PropTypes.bool.isRequired,
  children: PropTypes.any.isRequired,
  placement: PropTypes.oneOf(['right', 'left', 'top', 'bottom']),
  width: PropTypes.number,
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired
}

export default MyDrawer