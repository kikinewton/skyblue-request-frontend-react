import { Button, Card, Col, Row, Spin, Table } from 'antd'
import React from 'react'
import * as grnService from '../../../services/api/goods-receive-note'
import openNotification from '../../../util/notification'
import { history } from '../../../util/browser-history'
import { GRN_COLUMNS } from '../../Grn'

const columns = (props) => GRN_COLUMNS.concat([
  {
    title: "Actions",
    dataIndex: "operation",
    key: "operation",
    align: 'right',
    render: (text, row) => (
      <Row>
        <Col span={24}>
          <Button onClick={()=> props.onNewPaymentClick(row)}>Make Payment</Button>
        </Col>
      </Row>
    )
  },
])

const GrnPendingList = (props) => {
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
      <Row>
        <Col md={24}>
          <Card title="Goods Receive Notes With Pending Payments">
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
    </React.Fragment>
  )
}
export default GrnPendingList