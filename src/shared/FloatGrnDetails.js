import React from 'react'
import PropTypes from 'prop-types'
import { Card, Col, List, Row, Table } from 'antd'
import FloatDetails from './FloatDetails'
import { formatCurrency, prettifyDateTime } from '../util/common-helper'

const columns = [
  {
    title: "DESCRIPTION",
    dataIndex: "itemDescription",
    key: "itemDescription"
  },
  {
    title: "ESTIMATED UNIT PRICE",
    dataIndex: "estimatedUnitPrice",
    key: "estimatedUnitPrice",
    render: text => formatCurrency(text)
  },
  {
    title: "QUANTITY",
    dataIndex: "quantity",
    key: "quantity"
  },
]

const FloatGrnDetails = props => {
  const {
    floatGrn
  } = props

  console.log('floatGrn', floatGrn?.floatOrder)
  return (
    <>
      <Row>
        <Col span={24}>
          <List>
            <List.Item>
              <List.Item.Meta title="CREATED ON" description={prettifyDateTime(floatGrn?.createdDate)}  />
            </List.Item>
            <List.Item>
              <List.Item.Meta title="CREATED ON" description={`${floatGrn?.createdBy?.firstName} ${floatGrn?.createdBy?.lastName}`}  />
            </List.Item>
          </List>
        </Col>
      </Row>
      <Row style={{marginTop: 10, marginBottom: 10}}>
        <Col span={24}>
          <Card size='small' title="Received items">
            <Table 
              columns={columns}
              dataSource={floatGrn?.receivedFloatItems || []}
              pagination={false}
              size='small'
              bordered
              rowKey="id"
            />
          </Card>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Card size='small' title="Float Order Details">
            <FloatDetails
              showItems={true}
              floatOrder={floatGrn?.floatOrder || {}}
            />
          </Card>
        </Col>
      </Row>
    </>
  )
}

FloatGrnDetails.propTypes = {
  floatGrn: PropTypes.object,
}

export default FloatGrnDetails