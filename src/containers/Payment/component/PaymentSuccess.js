import { Result, Button } from 'antd'
import React from 'react'
import { history } from '../../../util/browser-history'


const PaymentSuccess = (props) => {
  return (
    <React.Fragment>
      <Result 
        status="success"
        title="Payment Successful!"
        extra={[
          <Button type="primary" key="lpos" onClick={()=> history.push("/app/payments/goods-receive-notes")}>
            Back to Goods reeive notes
          </Button>,
          <Button type="primary" key="home" onClick={()=> history.push("/#app")}>
            Back to Home
          </Button>
        ]}
      />
    </React.Fragment>
  )
}

export default PaymentSuccess