import { Button, Card, Drawer, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import MyPageHeader from '../../../shared/MyPageHeader'
import { FETCH_PETTY_CASH_REQUEST_TYPES } from '../../../util/request-types'
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


const PettyCashAllocateFunds = (props) => {
  const {
    current_user,
    petty_Cash_requests,
    fetching_petty_cash_requests,
    fetchPettyCashRequests,
    resetPettyCashRequest,
    allocateFundsToPettyCashRequest,
    submitting_petty_cash_request,
    submit_petty_cash_request_success,
  } = props
  const [visible, setVisible] = useState(false)
  const [selectedRequests, setSelectedRequests] = useState([])

  useEffect(() => {
    resetPettyCashRequest()
    fetchPettyCashRequests({
      requestType: FETCH_PETTY_CASH_REQUEST_TYPES.PENDING_FUND_ALLOCATION
    })
  }, [])

  useEffect(() => {
    if(!submitting_petty_cash_request && submit_petty_cash_request_success) {
      setSelectedRequests([])
      setVisible(false)
    }
  }, [submit_petty_cash_request_success, submitting_petty_cash_request])

  return (
    <>
      <AppLayout
        subNav={<PaymentsSubNav currentUser={current_user} />}
      >
        <MyPageHeader title="Allocate Funds to Petty Cash" extra={[
          <Button key="allocate-btn" type='default'>Allocate Funds To Selected Petty Cash</Button>
        ]} />
        <Card>
          <Table 
            columns={columns({

            })}
            dataSource={petty_Cash_requests}
            loading={fetching_petty_cash_requests}
            size='small'
            bordered
            rowSelection={{
              onChange: (selectedRowKeys, selectedRows) => {
                setSelectedRequests(selectedRows.map(it => Object.assign({},it)))
              }
            }}
          />
        </Card>
        <Drawer
          visible={visible}
          width={700}
          onClose={() => {
            setVisible(false)
          }}
        >
          
        </Drawer>
      </AppLayout>
    </>
  )
}

export default PettyCashAllocateFunds