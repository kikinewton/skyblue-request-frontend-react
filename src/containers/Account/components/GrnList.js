import { Col, Row, Table } from 'antd'
import React from 'react'
import { useHistory } from 'react-router'
import * as grnService from '../../../services/api/goods-receive-note'
import openNotification from '../../../util/notification'

const columns = (props) => [
  {
    title: "#ID",
    dataIndex: "id",
    key: "id"
  },
  {
    title: "Invoice Number",
    dataIndex: "invoiceNumber",
    key: "invoiceNumber",
    render: (text, row) => row.invoice.invoiceNumber
  },
  {
    title: "",
    dataIndex: "",
    key: ""
  },
]

const GrnList = (props) => {
  const [ grns, setGrns ] = React.useState([])
  const history = useHistory()

  const fetchGrnsPendingPayment = () => {
    try {
      const response = grnService.getAllGoodsReceiveNotes()
      if(response.status === 'OK') {
        setGrns(response.data)
      }
    } catch (error) {
      openNotification('error', 'Fetch Grns', error.message || 'Failed')
    }
  }

  React.useEffect(()=> {
    fetchGrnsPendingPayment()
  }, [])

  return (
    <React.Fragment>
      <Row>
        <Col md={24}>
          <span className="bs-page-title">Goods Receive Notes</span>
        </Col>
      </Row>
      <Row>
        <Col md={24}>
          <Table 
            columns={columns({...props, onNewPaymentClick: (row)=> { history.push(`/app/account/goods-receive-notes/${row.id}/new-payment`) }})}
            dataSource={grns}
          />
        </Col>
      </Row>
    </React.Fragment>
  )
}
export default GrnList