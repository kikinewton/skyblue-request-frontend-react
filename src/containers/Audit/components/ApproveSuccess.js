import { Result, Button } from 'antd'
import React from 'react'
import { useHistory } from 'react-router'
import { history } from '../../../util/browser-history'


const ApproveSuccess = (props) => {
  const history = useHistory()
  return (
    <React.Fragment>
      <Result 
        status="success"
        title="Payment Approved Successful!"
        extra={[
          <Button type="primary" key="lpos" onClick={()=> history.push("/#app/account/goods-receive-notes")}>
            Back to Approve Payments
          </Button>,
          <Button type="primary" key="home" onClick={()=> history.push("/#app")}>
            Back to Home
          </Button>
        ]}
      />
    </React.Fragment>
  )
}

export default ApproveSuccess