import React from 'react'
import PropTypes from "prop-types"
import { Card, List, Table } from 'antd'
import { prettifyDateTime } from '../util/common-helper'
import { REQUEST_COLUMNS } from '../util/constants'

const columns = REQUEST_COLUMNS.concat([])

const LocalPurchaseOrderDetails = (props) => {
  const { lpo, showRequestItems=true } = props
  return (
    <>
      <Card title="Local Purchase Order">
        <Card title="Details" size='small'>
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
            <List.Item>
              <List.Item.Meta title="Approval Status" description={lpo?.isApproved ? "Approved" : "Not Approved"} />
            </List.Item>
            {lpo?.isApproved && (
              <List.Item>
                <List.Item.Meta title="Approved By" description={`${lpo?.approvedBy?.fullName}`} />
              </List.Item>
            )}
          </List>
        </Card>
        {showRequestItems && (
          <Card title="Request Items" size='small'>
            <Table 
              columns={columns}
              dataSource={lpo?.requestItems}
              size="small"
              bordered
              pagination={false}
              rowKey="id"
            />
          </Card>
        )}
      </Card>
    </>
  )
}

LocalPurchaseOrderDetails.propTypes = {
  lpo: PropTypes.object.isRequired,
  showRequestItems: PropTypes.bool
}

export default LocalPurchaseOrderDetails