import React from 'react'
import PropTypes from "prop-types"
import { Card, List, Table, Row, Col } from 'antd'
import { prettifyDateTime } from '../util/common-helper'
import { MINI_REQUEST_COLUMNS, REQUEST_COLUMNS } from '../util/constants'

const columns = MINI_REQUEST_COLUMNS.concat([])

const LocalPurchaseOrderDetails = (props) => {
  const { lpo, showRequestItems=true } = props
  return (
    <>
      <Card title="Local Purchase Order" size="small">
        <Row>
          <Col span={12}>
            <List>
              <List.Item>
                <List.Item.Meta title="Reference" description={lpo?.lpoRef} />
              </List.Item>
              <List.Item>
                <List.Item.Meta title="Date" description={prettifyDateTime(lpo?.createdAt)} />
              </List.Item>
              <List.Item>
                <List.Item.Meta title="Delivery Date" description={prettifyDateTime(lpo?.deliveryDate)} />
              </List.Item>
            </List>
          </Col>
          <Col span={12}>
            <List>
              <List.Item>
                <List.Item.Meta title="Approval Status" description={lpo?.isApproved ? "Approved" : "Not Approved"} />
              </List.Item>
              {lpo?.isApproved && (
                <List.Item>
                  <List.Item.Meta title="Approved By" description={`${lpo?.approvedBy?.fullName}`} />
                </List.Item>
              )}
            </List>
          </Col>
        </Row>
        {showRequestItems && (
          <>
            <Row style={{marginTop: 20}}>
              <Col span={24}>
                <span style={{fontWeight: "bold"}}>Request Items</span>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Table 
                  columns={columns}
                  dataSource={lpo?.requestItems}
                  size="small"
                  bordered
                  pagination={false}
                  rowKey="id"
                />
              </Col>
            </Row>
          </>
        )}
      </Card>
    </>
  )
}

LocalPurchaseOrderDetails.propTypes = {
  lpo: PropTypes.object,
  showRequestItems: PropTypes.bool
}

export default LocalPurchaseOrderDetails