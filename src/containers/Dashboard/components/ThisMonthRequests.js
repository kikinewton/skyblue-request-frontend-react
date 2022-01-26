import { Row, Col, Table, Tag } from 'antd'
import React from 'react'
import PropTypes from "prop-types"
import { REQUEST_ITEM_COLUMNS } from '..'

const ThisMonthRequests = props => {
  const {
    requests
  } = props
  return (
    <>
      <Row>
        <Col span={24}>
          <span style={{fontWeight: "bold"}}>Requests For Current Month</span>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Table 
            columns={REQUEST_ITEM_COLUMNS}
            dataSource={requests}
            size='small'
            pagination={{pageSize: 30}}
            bordered
            rowKey="id"
          />
        </Col>
      </Row>
    </>
  )
}

ThisMonthRequests.propTypes = {
  requests: PropTypes.array
}


export default ThisMonthRequests