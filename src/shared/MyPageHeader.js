import { PageHeader } from 'antd'
import React from 'react'
import PropTypes from "prop-types"

const MyPageHeader = (props) => {
  const {
    extra = [],
    title,
    onBack,
  } = props

  return (
    <PageHeader 
      style={{padding: 0, color: "#999594", textTransform: 'uppercase'}}
      title={title}
      extra={extra}
      onBack={onBack}
    />
  )
}

MyPageHeader.propTypes = {
  title: PropTypes.node.isRequired,
  extra: PropTypes.array,
  onBack: PropTypes.func
}

export default MyPageHeader