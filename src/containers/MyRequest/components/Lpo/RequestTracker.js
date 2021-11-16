import { ClockCircleOutlined } from '@ant-design/icons'
import { Card, Col, PageHeader, Row, Spin, Timeline } from 'antd'
import React from 'react'
import { useHistory, useParams } from 'react-router'
import { prettifyDateTime } from '../../../../util/common-helper'


const RequestTracker = (props) => {
  const {
    request
  } = props
  const { request_id } = useParams()
  const history = useHistory()
  console.log('request', request_id)

  React.useEffect(() => {
    if(request_id) {
      props.getRequest(request_id)
    }
  }, [request_id])
  return (
    <>
      <PageHeader
        style={{padding: 0}}
        title={`${request?.name} (${request?.requestItemRef})`}
        onBack={() => history.goBack()}
      />
      <Card
        
      >
        <Row>
          <Col span={24}>
            {props.requestLoading ? <Spin /> : 
              (
                <Timeline mode="left">
                  <Timeline.Item dot={<ClockCircleOutlined />} label="Item Requested">
                    {`Item Requested on ${prettifyDateTime(request?.createdDate)}`}
                  </Timeline.Item>
                  <Timeline.Item color={request?.endorsement === "PENDING" ? "yellow" : "green"}>
                    {request?.endorsement === "PENDING" ? "WAITING FOR HOD TO BE ENDORSED" : `Endorsed By HOD at ${prettifyDateTime(request?.endorsementDate)}`}
                  </Timeline.Item>
                  <Timeline.Item color={request?.suppliers.length > 0 ? "green" : "yellow"} label="Assign Request to Supplier/Suppliers">
                    {request?.suppliers.length > 0 ? `Request assigned to supplier/suppliers` : "Pending"}
                  </Timeline.Item>
                  <Timeline.Item color={request?.approval === "PENDING" ? "yellow" : "green"} label="General Manager Approval of request">
                    {request?.approval === "PENDING" ? "Approval Pending..." : `Approved at ${prettifyDateTime(request?.endorsementDate)}`}
                  </Timeline.Item>
                </Timeline>
              )
            }
          </Col>
        </Row>
      </Card>
    </>
  )
}

export default RequestTracker