import { Button, Card, Col, Row, Table } from 'antd'
import React from 'react'
import { history } from '../../../util/browser-history'
import { GRN_COLUMNS } from '../../Grn'
import AppLayout from '../../AppLayout'
import PaymentsSubNav from './PaymentsSubNav'

const columns = (props) => GRN_COLUMNS.concat([
  {
    title: "Actions",
    dataIndex: "operation",
    key: "operation",
    align: 'right',
    render: (text, row) => (
      <Row>
        <Col span={24}>
          <Button size="small" onClick={()=> props.onNewPaymentClick(row)}>Make Payment</Button>
        </Col>
      </Row>
    )
  },
])

const GrnPendingPaymentList = (props) => {
  const {
    grns,
    fetchGrns,
    fetching_grns,
  } = props
  const [ loading, setLoading ] = React.useState(false)

  const handleGoToNewPayment = (row) => {
    history.push(`/app/payments/goods-receive-notes/${row.id}/add-new-payment`)
  }

  React.useEffect(()=> {
    fetchGrns({
      paymentInComplete: true
    })
  }, [])

  return (
    <React.Fragment>
      <AppLayout
        subNav={(
          <PaymentsSubNav />
        )}
      >
        <Row>
          <Col md={24}>
            <Card size="small" title="Goods Receive Notes With Pending Payments">
              <Table
                columns={columns({...props, onNewPaymentClick: (row)=> handleGoToNewPayment(row)})}
                dataSource={grns}
                size="small"
                rowKey="id"
                bordered
                loading={fetching_grns}
              />
            </Card>
          </Col>
        </Row>
      </AppLayout>
    </React.Fragment>
  )
}
export default GrnPendingPaymentList