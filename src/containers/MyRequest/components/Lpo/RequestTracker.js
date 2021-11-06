import { ClockCircleOutlined } from '@ant-design/icons'
import { Card, Col, Row, Spin, Timeline } from 'antd'
import React from 'react'
import { useParams } from 'react-router'


const RequestTracker = (props) => {
  const {
    request
  } = props
  const { request_id } = useParams()
  console.log('request', request_id)

  React.useEffect(() => {
    if(request_id) {
      props.getRequest(request_id)
    }
  }, [request_id])
  return (
    <>
      <Card
        title="My Lpo Request Details"
      >
        <Row>
          <Col span={24}>
            {props.requestLoading ? <Spin /> : 
              (<Timeline mode="left">
              <Timeline.Item dot={<ClockCircleOutlined />} label={request?.createdDate}>Item request on</Timeline.Item>
              <Timeline.Item label={request?.endorsement === 'PENDING' ? 'PENDING' : `${request?.endorsementDate}`}>Request Endorsed</Timeline.Item>
            </Timeline>)
            }
          </Col>
        </Row>
      </Card>
    </>
  )
}

export default RequestTracker