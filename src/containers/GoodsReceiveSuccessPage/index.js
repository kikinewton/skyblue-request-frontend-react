import { Button, Result } from 'antd'
import React from 'react'
import { useHistory } from 'react-router'

const GoodsReceiveSuccessPage = (props)=> {
  const history = useHistory()
  return (
    <React.Fragment>
      <Result 
        status="success"
        title="Successfully Created Goods Receive Note and invoice"
        extra={[
          <Button type="primary" key="lpos" onClick={()=>history.push("/app/store/lpos")}>
            Back to Local Purchase Orders
          </Button>,
          <Button type="primary" key="home" onClick={()=>history.push("/app")}>
            Back to Home
          </Button>
        ]}
      />
    </React.Fragment>
  )
}

export default GoodsReceiveSuccessPage