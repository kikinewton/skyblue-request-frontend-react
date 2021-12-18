import { Card, Table } from 'antd'
import React from 'react'
import MyPageHeader from '../../../shared/MyPageHeader'
import AppLayout from '../../AppLayout'
import PaymentsSubNav from './PaymentsSubNav'

const columns = props => [
  {
    title: "",
    dataIndex: "",
    key: ""
  },
  {
    title: "",
    dataIndex: "",
    key: ""
  },
  {
    title: "",
    dataIndex: "",
    key: ""
  },
  {
    title: "",
    dataIndex: "",
    key: ""
  },
]


const FloatAllocateFunds = (props) => {
  const {
    current_user
  } = props
  return (
    <>
      <AppLayout
        subNav={<PaymentsSubNav currentUser={current_user} />}
      >
        <MyPageHeader title="Allocate Funds to Float" />
        <Card>
          <Table 

          />
        </Card>
      </AppLayout>
    </>
  )
}

export default FloatAllocateFunds