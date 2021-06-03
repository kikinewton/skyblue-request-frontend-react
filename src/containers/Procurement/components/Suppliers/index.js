import { Col, Row } from 'antd'
import React from 'react'
import List from './components/List'


const Suppliers = (props) => {
  return (
    <React.Fragment>
      <Row>
        <Col md={24}>
          <List {...props} />
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default Suppliers