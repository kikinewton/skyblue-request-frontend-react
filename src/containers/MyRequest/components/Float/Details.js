import { WarningFilled } from '@ant-design/icons'
import { Col, Row, Timeline } from 'antd'
import React from 'react'
import { prettifyDateTime } from '../../../../util/common-helper'


const FloatDetails = (props) => {
  const {
    float
  } = props
  return (
    <>
      <Row>
        <Col span={24}>
          <Timeline mode="alternate">
            <Timeline.Item>{`Float initiated on ${prettifyDateTime(float?.createdDate)}`}</Timeline.Item>
            {float?.status === "COMMENT" && (<Timeline.Item dot={<WarningFilled />}>{`REQUEST NEEDS ATTENTION`}</Timeline.Item>)}
            <Timeline.Item>{float?.endorsement === "ENDORSED" ? `float endorsed` : "Pending Endorsement"}</Timeline.Item>
            <Timeline.Item color={float?.approval === "APPROVED" ? "green" : "blue"}>{float?.approval === "PENDING" ? "Pending approval" : "Float Approved"}</Timeline.Item>
          </Timeline>
        </Col>
      </Row>
    </>
  )
}

export default FloatDetails