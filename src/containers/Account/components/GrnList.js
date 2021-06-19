import { Button, Col, Row, Spin, Table } from 'antd'
import React from 'react'
import * as grnService from '../../../services/api/goods-receive-note'
import openNotification from '../../../util/notification'
import { history } from '../../../util/browser-history'

const columns = (props) => [
  {
    title: "Supplier",
    dataIndex: "invoice",
    key: "invoiceSupplier",
    render: (text, row) => row.invoice?.supplier?.name
  },
  {
    title: "Invoice Number",
    dataIndex: "invoiceNumber",
    key: "invoiceNumber",
    render: (text, row) => row.invoice.invoiceNumber
  },
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
]

const GrnList = (props) => {
  const [ grns, setGrns ] = React.useState([])
  const [ loading, setLoading ] = React.useState(false)

  const fetchGrnsPendingPayment = async () => {
    setLoading(true)
    try {
      const response = await grnService.getAllGoodsReceiveNotes({status: "Not-paid"})
      if(response.status === 'OK') {
        console.log('yes grns success')
        setGrns(response.data)
      }
    } catch (error) {
      openNotification('error', 'Fetch Grns', error.message || 'Failed')
    }
    setLoading(false)
  }

  const handleGoToNewPayment = (row) => {
    history.push(`/app/account/goods-receive-notes/${row.id}/add-new-payment`)
  }

  React.useEffect(()=> {
    fetchGrnsPendingPayment()
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
              />
            )
          }
        </Col>
      </Row>
    </React.Fragment>
  )
}
export default GrnList