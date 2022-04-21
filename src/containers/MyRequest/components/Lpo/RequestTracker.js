import { ClockCircleOutlined } from '@ant-design/icons'
import { Card, Col, message, Row, Spin, Timeline } from 'antd'
import React, { useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { getRequestItemStatus } from '../../../../services/api/item-request'
import MyPageHeader from '../../../../shared/MyPageHeader'
import { prettifyDateTime } from '../../../../util/common-helper'
import AppLayout from '../../../AppLayout'
import RequestItemStatus from '../../../RequestItem/components/RequestItemStatus'


const RequestTracker = (props) => {
  const {
    request
  } = props
  const { request_id } = useParams()
  const history = useHistory()
  const [requestStatus, setRequestStatus] = useState(null)
  const [loadingStatus, setLoadingStatus] = useState(false)

  const fetchRequestItemStatus = async (id) => {
    setLoadingStatus(true)
    try {
      const result = await getRequestItemStatus(id)
      setRequestStatus(result?.data)
    } catch (error) {
      message.error("Error fetching Request Status")
    } finally {
      setLoadingStatus(false)
    }
  }

  React.useEffect(() => {
    props.resetRequest()
    if(request_id) {
      props.getRequest(request_id)
      fetchRequestItemStatus(request_id)
    }
  }, [request_id])
  return (
    <>
      <AppLayout>
        <MyPageHeader
          style={{padding: 0}}
          title={props.requestLoading || loadingStatus ? <Spin /> : `${request?.name} (${request?.requestItemRef})`}
          onBack={() => history.goBack()}
        />
        <Card>
          <Row>
            <Col span={24}>
              {props.requestLoading || loadingStatus ? <Spin /> : 
                (
                  // <Timeline mode="left">
                  //   <Timeline.Item dot={<ClockCircleOutlined />} label="Item Requested">
                  //     {`Item Requested on ${prettifyDateTime(request?.createdDate)}`}
                  //   </Timeline.Item>
                  //   <Timeline.Item color={request?.endorsement === "PENDING" ? "yellow" : "green"}>
                  //     {request?.endorsement === "PENDING" ? "WAITING FOR HOD TO BE ENDORSED" : `Endorsed By HOD at ${prettifyDateTime(request?.endorsementDate)}`}
                  //   </Timeline.Item>
                  //   <Timeline.Item color={request?.suppliers.length > 0 ? "green" : "yellow"} label="Assign Request to Supplier/Suppliers">
                  //     {request?.suppliers.length > 0 ? `Request assigned to supplier/suppliers` : "Pending"}
                  //   </Timeline.Item>
                  //   <Timeline.Item color={request?.approval === "PENDING" ? "yellow" : "green"} label="General Manager Approval of request">
                  //     {request?.approval === "PENDING" ? "Approval Pending..." : `Approved at ${prettifyDateTime(request?.endorsementDate)}`}
                  //   </Timeline.Item>
                  // </Timeline>
                  <RequestItemStatus 
                    requestItemStatus={requestStatus}
                    requestItem={request}
                  />
                )
              }
            </Col>
          </Row>
        </Card>
      </AppLayout>
    </>
  )
}

export default RequestTracker