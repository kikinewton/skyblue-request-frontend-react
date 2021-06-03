import { Button, Result } from 'antd'
import React from 'react'
import { useHistory } from 'react-router'
import { HOME_ROUTE } from '../../util/routes'

const NotAuthorized = () => {
  const history = useHistory()
  return (
    <Result 
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={<Button type="primary" onClick={()=> history.push(HOME_ROUTE)}>Back Home</Button>}
    />
  )
}

export default NotAuthorized