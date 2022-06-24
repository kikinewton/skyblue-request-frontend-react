import React from 'react'
import PropTypes from "prop-types"
import { Card, Col, Row } from 'antd'

const MyCommentText = () => {
  
  return (
    <>
      <Card>
        <Row>
          <Col span={24}>
            <Row>
              <Col span={6}>
                
              </Col>
              <Col span={18}>

              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
    </>
  )
}

MyCommentText.propTypes = {
  message: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  initials: PropTypes.string
}

export default MyCommentText