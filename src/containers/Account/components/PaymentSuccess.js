import { Result, Button } from 'antd'
import React from 'react'


const PaymentSuccess = (props) => {
  return (
    <React.Fragment>
      <Result 
        status="success"
        title="Payment Successful!"
        extra={[
          <Button type="primary" key="lpos" onClick={()=> window.location.href = "/#app/account/goods-receive-notes"}>
            Back to Goods reeive notes
          </Button>,
          <Button type="primary" key="home" onClick={()=>window.location.href="/#app"}>
            Back to Home
          </Button>
        ]}
      />
    </React.Fragment>
  )
}

export default PaymentSuccess