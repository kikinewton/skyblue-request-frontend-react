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
      style={{padding: 0, color: "#999594"}}
      title={title}
      extra={extra}
      onBack={onBack}
    />
  )
}

MyPageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  extra: PropTypes.array,
  onBack: PropTypes.func
}

export default MyPageHeader