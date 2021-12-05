import { PageHeader } from 'antd'
import React from 'react'


const MyPageHeader = (props) => {
  const {
    extra,
    title,
    onBack,
  } = props

  return (
    <PageHeader 
      style={{padding: 0, color: "#999594"}}
      title={title}
      extra={extra ? extra : null}
      onBack={onBack ? onBack : null}
    />
  )
}

export default MyPageHeader