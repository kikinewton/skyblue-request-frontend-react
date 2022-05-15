import { Row, Col, List, Timeline, Card } from 'antd'
import React from 'react'
import { prettifyDateTime } from '../../../util/common-helper'
import PropTypes from "prop-types"
const { Item } = Timeline

const RequestItemStatus = (props) => {
  const {
    requestItem,
    requestItemStatus
  } = props
  return (
    <>
      <Row>
        <Col span={12}>
          <List>
            <List.Item>
              <List.Item.Meta title="Reference" 
                description={requestItem?.requestItemRef} />
            </List.Item>
            <List.Item>
              <List.Item.Meta title="Description"
                description={requestItem?.name} />
            </List.Item>
            <List.Item>
              <List.Item.Meta title="Quantity"
                description={requestItem?.quantity} />
            </List.Item>
          </List>
        </Col>
        <Col span={12}>
          <List>
            <List.Item>
              <List.Item.Meta title="Date Created" 
                description={prettifyDateTime(requestItem?.createdDate)} />
            </List.Item>
            <List.Item>
              <List.Item.Meta title="Department"
                description={requestItem?.userDepartment?.name} />
            </List.Item>
            <List.Item>
              <List.Item.Meta title="Quantity"
                description={requestItem?.quantity} />
            </List.Item>
          </List>
        </Col>
      </Row>
      <Card title="Status Tracker" style={{marginTop: 20}}>
        <Row>
          <Col span={24}>
            <Timeline mode='left'>
              <Item label="Request created on">{prettifyDateTime(requestItem?.createdDate)}</Item>
              <Item label="Endorsement by HOD">{requestItemStatus?.endorsement}</Item>
              {requestItemStatus?.approval && (
                <Item label="Lpo issued">{requestItemStatus?.approval}</Item>
              )}
              {requestItemStatus?.lpoIssued && (
                <Item label="Lpo issued">{requestItemStatus?.lpoIssued}</Item>
              )}
              {requestItemStatus?.requestReview && (
                <Item label="HOD Review Request">{requestItemStatus?.requestReview}</Item>
              )}
              {requestItemStatus?.procurementAdvise && (
                <Item label="Procurement Advise">{requestItemStatus?.procurementAdvise}</Item>
              )}
              {requestItemStatus?.grnIssued && (
                <Item label="GRN Issued">{requestItemStatus?.grnIssued}</Item>
              )}
              {requestItemStatus?.grnHodEndorse && (
                <Item label="GRN Endorsement">{requestItemStatus?.grnHodEndorse}</Item>
              )}
              {requestItemStatus?.grnHodApprove && (
                <Item label="GRN Approval">{requestItemStatus?.grnHodApprove}</Item>
              )}
              {requestItemStatus?.paymentInitiated && (
                <Item label="Payment Initiation">{requestItemStatus?.paymentInitiated}</Item>
              )}
              {requestItemStatus?.paymentAuditorCheck && (
                <Item label="Auditor check payment">{requestItemStatus?.paymentAuditorCheck}</Item>
              )}
              {requestItemStatus?.paymentFMAuthorise && (
                <Item label="Payment Authorization By Financial Manager">{requestItemStatus?.paymentFMAuthorise}</Item>
              )}
              {requestItemStatus?.paymentGMApprove && (
                <Item label="Payment Approval by General Manager">{requestItemStatus?.paymentGMApprove}</Item>
              )}
            </Timeline>
          </Col>
        </Row>
      </Card>
    </>
  )
}

RequestItemStatus.propTypes = {
  requestItem: PropTypes.object.isRequired,
  requestItemStatus: PropTypes.object.isRequired
}

export default RequestItemStatus