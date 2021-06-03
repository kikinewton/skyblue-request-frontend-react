import { Card, Col, Input, Row, Table } from 'antd'
import React from 'react'
import * as paymentDraftService from '../../../services/api/payment-draft'
import * as supplierService from '../../../services/api/supplier'
import openNotification from '../../../util/notification'

const columns = (props) => [
  {
    title: '',
    dataIndex: '',
    key: ''
  },
  {
    title: '',
    dataIndex: '',
    key: ''
  },
  {
    title: '',
    dataIndex: '',
    key: ''
  },
]

const PaymentList = (props) => {
  const [ payments, setPayments ] = React.useState([])
  const [supplies, setSuppliers] = React.useState([])

  const fetchSuppliers = async () => {
    const response = await supplierService.getSuppliers({})
    if(response.status === 'OK') {
      setSuppliers(response.data)
    }
  }

  const fetchPaymentDrafts = async (query)=> {
    // try {
    //   const response = await paymentDraftService.fetchPaymentDrafts(query)
    //   if(response.status === 'OK') {
    //     setPayments(response.data)
    //   }
    // } catch (error) {
    //   openNotification('error', 'Fetch Payments', error.message || 'Failed!')
    // }
  }

  React.useEffect(()=> {

  }, [])
  return (
    <React.Fragment>
      <Row>
        <Col md={8}>
          <span className="bs-page-title">Payments</span>
        </Col>
        <Col md={16}>
          <Row gutter={12} style={{display: 'flex', alignItems: 'center'}}>
            <Col md={2}>
              <span>Filter</span>
            </Col>
            <Col md={6}>
              <Input type="search" placeholder="Search goods receive note" />
            </Col>
            <Col md={8}>
              <Input type="search" placeholder="Search goods receive note" />
            </Col>
            <Col md={8}>
              <Input type="search" placeholder="Search supplier" />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col md={24}>
          <Card>
            <Table 
              columns={columns({...props})}
              dataSource={payments}
            />
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default PaymentList