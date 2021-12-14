import { Card, Table } from 'antd'
import React, { useState } from 'react'
import { PAYMENT_COLUMNS } from '..'

const columns = PAYMENT_COLUMNS.concat([

])


const PaymentIncompleteList = (props) => {
  const {
    paymentDrafts,
    fetching_payments
  } = props
  const [selectedDraft, setSelectedDraft] = useState(null)

  return (
    <>
      <Card
        size="small"
        title="Payements incomplete"
      >
        <Table 
          columns={columns}
          dataSource={paymentDrafts}
          size="small"
          bordered
          rowKey="id"
          pagination={{pageSize: 20}}
          loading={fetching_payments}
        />
      </Card>
    </>
  )
}

export default PaymentIncompleteList



