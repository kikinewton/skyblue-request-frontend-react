import React from 'react'
import PropTypes from 'prop-types'
import { Card, Col, List, Row } from 'antd'
import { formatCurrency } from '../util/common-helper'

const PettyCashDetails = ({ pettyCash={} }) => {
  return (
    <Card title="PETTY CASH INFO" size='small'>
      <Row>
        <Col span={12}>
          <List>
            <List.Item>
              <List.Item.Meta title="REFERENCE" description={pettyCash?.pettyCashRef} />
            </List.Item>
            <List.Item>
              <List.Item.Meta title="DESCRIPTION" description={pettyCash?.name} />
            </List.Item>
            <List.Item>
              <List.Item.Meta title="REQUESTED ON" description={pettyCash?.createdDate} />
            </List.Item>
            <List.Item>
              <List.Item.Meta title="PURPOSE" description={pettyCash?.purpose} />
            </List.Item>
            <List.Item>
              <List.Item.Meta title="QUANTITY" description={pettyCash?.quantity} />
            </List.Item>
          </List>
        </Col>
        <Col span={12}>
          <List>
            <List.Item>
              <List.Item.Meta title="AMOUNT" description={formatCurrency(pettyCash?.amount)} />
            </List.Item>
            <List.Item>
              <List.Item.Meta title="ENDORSEMENT STATUS" description={pettyCash?.endorsement} />
            </List.Item>
            <List.Item>
              <List.Item.Meta title="APPROVAL STATUS" description={pettyCash?.approval} />
            </List.Item>
            <List.Item>
              <List.Item.Meta title="STATUS" description={pettyCash?.status} />
            </List.Item>
            <List.Item>
              <List.Item.Meta title="PAYMENT STATUS" description={pettyCash?.paid ? 'PAID' : "PENDING"} />
            </List.Item>
          </List>
        </Col>
      </Row>
    </Card>
  )
}

PettyCashDetails.propTypes = {
  pettyCash: PropTypes.object.isRequired
}

export default PettyCashDetails