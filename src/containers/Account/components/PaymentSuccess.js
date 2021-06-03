import { Result, Button } from 'antd'
import React from 'react'
import { useHistory } from 'react-router'


const PaymentSuccess = (props) => {
  const history = useHistory()
  return (
    <React.Fragment>
      <Result 
        status="success"
        title="Payment Successful!"
        extra={[
          <Button type="primary" key="lpos" onClick={()=>history.push("/app/account/goods-receive-notes")}>
            Back to Goods reeive notes
          </Button>,
          <Button type="primary" key="home" onClick={()=>history.push("/app")}>
            Back to Home
          </Button>
        ]}
      />
    </React.Fragment>
  )
}

export default PaymentSuccess