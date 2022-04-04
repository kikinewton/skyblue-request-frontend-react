import { Badge } from 'antd'
import React from 'react'
import PropTypes from "prop-types"

const NotificationBadge = ({
  count,
  status="processing",
  children
}) => {
  return (
    <Badge count={count} status={status}>
      {children}
    </Badge>
  )
} 

NotificationBadge.propTypes = {
  count: PropTypes.any,
  status: PropTypes.string
}

export default NotificationBadge