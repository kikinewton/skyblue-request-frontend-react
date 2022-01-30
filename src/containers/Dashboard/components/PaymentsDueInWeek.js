import { Row, Col, Table, Tag } from 'antd'
import React from 'react'
import PropTypes from "prop-types"
import { REQUEST_ITEM_COLUMNS } from '..'
import { PAYMENT_COLUMNS } from '../../Payment'
import { prettifyDateTime } from "../../../util/common-helper" 

const columns = [
  {
    title: "Payment Date",
    dataIndex: "paymentDate",
    key: "paymentDate",
    render: text => prettifyDateTime(text)
  },
  {
    title: "Supplier",
    dataIndex: "finalSupplier",
    key: "finalSupplier",
    render: (text, row) => row?.finalSupplier?.name
  },
  {
    title: "Local Purchase Order Ref",
    dataIndex: "localPurchaseOrder",
    key: "localPurchaseOrder",
    render: (text, row) => row?.localPurchaseOrder?.lpoRef
  },
  {
    title: "Item Delivery Date",
    dataIndex: "itemDeliveryDate",
    key: "itemDeliveryDate",
    render: (text, row) => prettifyDateTime(row?.localPurchaseOrder?.deliveryDate)
  },
]

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
            columns={columns}
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