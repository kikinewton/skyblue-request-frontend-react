import { Result, Button } from 'antd'
import React, { useEffect } from 'react'
import { history } from '../../../util/browser-history'
import AppLayout from '../../AppLayout'
import PaymentsSubNav from './PaymentsSubNav'


const PaymentSuccess = (props) => {
  const {
    current_user
  } = props

  useEffect(() => {
    props.resetPayment()
  }, [])
  return (
    <React.Fragment>
      <AppLayout
        subNav={<PaymentsSubNav currentUser={current_user} {...props} />}
      >
        <Result 
          status="success"
          title="Payment Inititated Successful!"
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