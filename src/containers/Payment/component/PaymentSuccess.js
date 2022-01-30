import { Result, Button } from 'antd'
import React from 'react'
import { history } from '../../../util/browser-history'
import AppLayout from '../../AppLayout'
import PaymentsSubNav from './PaymentsSubNav'


const PaymentSuccess = (props) => {
  const {
    current_user
  } = props
  return (
    <React.Fragment>
      <AppLayout
        subNav={<PaymentsSubNav currentUser={current_user} />}
      >
        <Result 
          status="success"
          title="Payment Successful!"
          extra={[
            <Button type="primary" key="lpos" onClick={()=> history.push("/app/payments/goods-receive-notes")}>
              Back to GRNs awaiting payment
            </Button>,
            <Button type="primary" key="home" onClick={()=> history.push("/#app")}>
              Back to Home
            </Button>
          ]}
        />
      </AppLayout>
    </React.Fragment>
  )
}

export default PaymentSuccess