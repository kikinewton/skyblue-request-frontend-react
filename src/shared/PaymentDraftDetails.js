import React from 'react'
import PropTypes from "prop-types"
import { Card, List, Row, Col } from 'antd'
import { formatCurrency, prettifyDateTime } from '../util/common-helper'

const PaymentDraftDetails = (props) => {
  const {
    payment,
  } = props

  return (
    <Card size='small' title="PAYMENT DRAFT DETAILS">
      <Row>
        <Col span={11}>
          <List>
            <List.Item>
              <List.Item.Meta title="PURCHASE NUMBER" description={payment?.purchaseNumber} />
            </List.Item>
            <List.Item>
              <List.Item.Meta title="PAYMENT METHOD" description={payment?.paymentMethod} />
            </List.Item>
            <List.Item>
              <List.Item.Meta title="PAYMENT STATUS" description={payment?.paymentStatus} />
            </List.Item>
            <List.Item>
              <List.Item.Meta title="PAYMENT DRAFT CREATED BY" description={`${payment?.createdBy?.fullName} (${payment?.createdBy?.email})`} />
            </List.Item>
            <List.Item>
              <List.Item.Meta title="PAYMENT METHOD" description={payment?.paymentMethod} />
            </List.Item>
          </List>
        </Col>
        <Col span={11} offset={2}>
          <List>
            <List.Item>
              <List.Item.Meta title="CHEQUE NUMBER" description={payment?.chequeNumber} />
            </List.Item>
            <List.Item>
              <List.Item.Meta title="PAYMENT DATE" description={prettifyDateTime(payment?.createdDate)} />
            </List.Item>
            <List.Item>
              <List.Item.Meta title="WITHHOLDING TAX(%)" description={payment?.withholdingTaxAmount ? `${payment?.withholdingTaxPercentage * 100}%` : '0%'} />
            </List.Item>
            <List.Item>
              <List.Item.Meta title="AMOUNT PAYABLE" description={formatCurrency(payment?.paymentAmount)} />
            </List.Item>
            <List.Item>
              <List.Item.Meta title="WITHHOLDING AMOUNT" description={formatCurrency(payment?.withholdingTaxAmount)} />
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