import { Row, Col, List, Timeline, Card, Button } from 'antd'
import React from 'react'
import { prettifyDateTime } from '../../../util/common-helper'
import PropTypes from "prop-types"
import { FileExcelOutlined } from '@ant-design/icons'
const { Item } = Timeline

const RequestItemStatus = (props) => {
  const {
    requestItem,
    requestItemStatus
  } = props
  return (
    <>
      <Row>
        <Col span={24} style={{textAlign: 'right'}}>
          <Button type='default' disabled={props.comments.length < 1 || !props.showCommentDownload} onClick={()=> props.onCommentDownload()}>
            <FileExcelOutlined/> EXPORT COMMENTS
          </Button>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <List>
            <List.Item>
              <List.Item.Meta title="REFERENCE" 
                description={requestItem?.requestItemRef} />
            </List.Item>
            <List.Item>
              <List.Item.Meta title="DESCRIPTION"
                description={requestItem?.name} />
            </List.Item>
            <List.Item>
              <List.Item.Meta title="REASON"
                description={requestItem?.reason} />
            </List.Item>
            <List.Item>
              <List.Item.Meta title="PURPOSE"
                description={requestItem?.purpose} />
            </List.Item>
            <List.Item>
              <List.Item.Meta title="Quantity"
                description={requestItem?.quantity} />
            </List.Item>
            <List.Item>
              <List.Item.Meta title="REQUESTED ON" 
                description={prettifyDateTime(requestItem?.createdDate)} />
            </List.Item>
          </List>
        </Col>
        <Col span={12}>
          <List>
            <List.Item>
              <List.Item.Meta title="Quantity"
                description={requestItem?.quantity} />
            </List.Item>
            <List.Item>
              <List.Item.Meta title="ASSIGNED TO"
                description={requestItem?.quantity} />
            </List.Item>
            <List.Item>
              <List.Item.Meta title="DEPARTMENT"
                description={requestItem?.userDepartment?.name} />
            </List.Item>
            <List.Item>
              <List.Item.Meta title="ENDORSEMENT"
                description={requestItem?.endorsement} />
            </List.Item>
            <List.Item>
              <List.Item.Meta title="APPROVAL"
                description={requestItem?.approval} />
            </List.Item>
            <List.Item>
              <List.Item.Meta title="STATUS"
                description={requestItem?.status} />
            </List.Item>
          </List>
        </Col>
      </Row>
      <Card title="Status Tracker" style={{marginTop: 20}}>
        <Row>
          <Col span={24}>
            <Timeline mode='left'>
              <Item label="REQUESTED ON">{prettifyDateTime(requestItem?.createdDate)}</Item>
              <Item label="ENDORSEMENT">{requestItemStatus?.endorsement}</Item>
              {requestItemStatus?.approval && (
                <Item label="LPO ISSUED">{requestItemStatus?.approval}</Item>
              )}
              {requestItemStatus?.lpoIssued && (
                <Item label="LPO ISSUED">{requestItemStatus?.lpoIssued}</Item>
              )}
              {requestItemStatus?.requestReview && (
                <Item label="REVIEWED BY HOD">{requestItemStatus?.requestReview}</Item>
              )}
              {requestItemStatus?.procurementAdvise && (
                <Item label="PROCUREMENT ADVISED">{requestItemStatus?.procurementAdvise}</Item>
              )}
              {requestItemStatus?.grnIssued && (
                <Item label="GRN ISSUED">{requestItemStatus?.grnIssued}</Item>
              )}
              {requestItemStatus?.grnHodEndorse && (
                <Item label="GRN ENDORSEMENT">{requestItemStatus?.grnHodEndorse}</Item>
              )}
              {requestItemStatus?.grnHodApprove && (
                <Item label="GRN APPROVL">{requestItemStatus?.grnHodApprove}</Item>
              )}
              {requestItemStatus?.paymentInitiated && (
                <Item label="PAYMENT INITIATION">{requestItemStatus?.paymentInitiated}</Item>
              )}
              {requestItemStatus?.paymentAuditorCheck && (
                <Item label="PAYMENT CHECKED BY AUDITOR">{requestItemStatus?.paymentAuditorCheck}</Item>
              )}
              {requestItemStatus?.paymentFMAuthorise && (
                <Item label="PAYMENT AUTHORIZED BY FINANCIAL MANAGER">{requestItemStatus?.paymentFMAuthorise}</Item>
              )}
              {requestItemStatus?.paymentGMApprove && (
                <Item label="PAYMENT APPROVED BY GENERAL MANAGER">{requestItemStatus?.paymentGMApprove}</Item>
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
  requestItemStatus: PropTypes.object.isRequired,
  comments: PropTypes.array,
  onCommentDownload: PropTypes.func,
  showCommentDownload: PropTypes.bool
}

export default RequestItemStatus