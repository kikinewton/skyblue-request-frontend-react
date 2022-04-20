import { Button, Col, Row, Spin, Table } from 'antd'
import React from 'react'
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

const GrnList = (props) => {
  const {
    grns,
    fetchGrns,
  } = props
  const [ loading, setLoading ] = React.useState(false)

  const handleGoToNewPayment = (row) => {
    history.push(`/app/account/goods-receive-notes/${row.id}/add-new-payment`)
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
          <span className="bs-page-title">Goods Receive Notes With Pending Payments</span>
        </Col>
      </Row>
      <Row>
        <Col md={24}>
          {loading ? <Spin /> : 
            (
              <Table 
                columns={columns({...props, onNewPaymentClick: (row)=> handleGoToNewPayment(row)})}
                dataSource={grns}
                size="small"
                rowKey="id"
                bordered
              />
            )
          }
        </Col>
      </Row>
    </React.Fragment>
  )
}
export default GrnList