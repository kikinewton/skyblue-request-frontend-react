import { Col, Row } from 'antd'
import React from 'react'
import MyPageHeader from '../../../../shared/MyPageHeader'
import AppLayout from '../../../AppLayout'
import MyRequestMenu from '../MyRequestMenu'

const FloatsPendingUploadDocument = (props) => {
  const {
    float_requests,
    fetching_float_requests,
  } = props

  return (
    <>
      <AppLayout
        subNav={<MyRequestMenu />}
      >
        <MyPageHeader
          title="My Floats Awaiting Supporting Documents Upload"
        />
        <Row>
          <Col>
            
          </Col>
        </Row>
      </AppLayout>
    </>
  )
}

export default FloatsPendingUploadDocument