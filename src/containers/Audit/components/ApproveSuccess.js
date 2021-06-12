import { Result, Button } from 'antd'
import React from 'react'
import { useHistory } from 'react-router'


const ApproveSuccess = (props) => {
  const history = useHistory()
  return (
    <React.Fragment>
      <Result 
        status="success"
        title="Payment Approved Successful!"
        extra={[
          <Button type="primary" key="lpos" onClick={()=> window.location.href = "/#app/account/goods-receive-notes"}>
            Back to Approve Payments
          </Button>,
          <Button type="primary" key="home" onClick={()=>window.location.href="/#app"}>
            Back to Home
          </Button>
        ]}
      />
    </React.Fragment>
  )
}

export default ApproveSuccess