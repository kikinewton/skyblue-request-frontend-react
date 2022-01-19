import { FilePdfOutlined } from '@ant-design/icons'
import { Button, Card, Col, DatePicker, List, message, Row } from 'antd'
import React from 'react'
import { connect } from 'react-redux'
import AppLayout from '../AppLayout'
import * as reportApi from '../../services/api/report'
import { getMetabaseUri } from '../../util/common-helper'

const Report = (props) => {
  

  return (
    <React.Fragment>
      <AppLayout>
        <Row>
          <Col span={24}>
            
          </Col>
        </Row>
      </AppLayout>
    </React.Fragment>
  )
}

const mapStateToProps = (store) => ({
  currentUser: store.auth.user
})

export default connect(mapStateToProps, null)(Report)