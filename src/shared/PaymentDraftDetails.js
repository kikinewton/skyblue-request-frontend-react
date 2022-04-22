import React from 'react'
import PropTypes from "prop-types"
import { Card, List, Row, Col } from 'antd'
import { formatCurrency, prettifyDateTime } from '../util/common-helper'

const PaymentDraftDetails = (props) => {
  const {
    payment
  } = props

  return (
    <Card size='small' title="Payment Details">
      <Row>
        <Col span={11}>
          <List>
            <List.Item>
              <List.Item.Meta title="Purchase Number" description={payment?.purchaseNumber} />
            </List.Item>
            <List.Item>
              <List.Item.Meta title="Payment Method" description={payment?.paymentMethod} />
            </List.Item>
            <List.Item>
              <List.Item.Meta title="Payment Status" description={payment?.paymentStatus} />
            </List.Item>
            <List.Item>
              <List.Item.Meta title="Payment By" description={`${payment?.createdBy?.fullName} (${payment?.createdBy?.email})`} />
            </List.Item>
            <List.Item>
              <List.Item.Meta title="Payment Method" description={payment?.paymentMethod} />
            </List.Item>
          </List>
        </Col>
        <Col span={11} offset={2}>
          <List>
            <List.Item>
              <List.Item.Meta title="Cheque Number" description={payment?.chequeNumber} />
            </List.Item>
            <List.Item>
              <List.Item.Meta title="Payment Date" description={prettifyDateTime(payment?.createdDate)} />
            </List.Item>
            <List.Item>
              <List.Item.Meta title="Payment Withholding Tax(%)" description={payment?.withholdingTaxAmount ? `${payment?.withholdingTaxPercentage * 100}%` : '0%'} />
            </List.Item>
            <List.Item>
              <List.Item.Meta title="Amount Paid" description={formatCurrency(payment?.paymentAmount)} />
            </List.Item>
            <List.Item>
              <List.Item.Meta title="WithHolding Amount" description={formatCurrency(payment?.withholdingTaxAmount)} />
            </List.Item>
          </List>
        </Col>
      </Row>
    </Card>
  )
}

PaymentDraftDetails.propTypes = {
  payment: PropTypes.object
}

export default PaymentDraftDetails