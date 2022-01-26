import { Row, Col, Table, Tag } from 'antd'
import React from 'react'
import PropTypes from "prop-types"
import { REQUEST_ITEM_COLUMNS } from '..'
import { PAYMENT_COLUMNS } from '../../Payment'

const PaymentsDueInWeek = props => {
  const {
    payments
  } = props
  return (
    <>
      <Row>
        <Col span={24}>
          <span style={{fontWeight: "bold"}}>Payments Due In A Week</span>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Table 
            columns={PAYMENT_COLUMNS}
            dataSource={payments}
            size='small'
            pagination={{pageSize: 30}}
            bordered
            rowKey="id"
          />
        </Col>
      </Row>
    </>
  )
}

PaymentsDueInWeek.propTypes = {
  payments: PropTypes.array
}


export default PaymentsDueInWeek