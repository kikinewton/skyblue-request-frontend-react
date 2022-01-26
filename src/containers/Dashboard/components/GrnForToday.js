import { Row, Col, Table, Tag } from 'antd'
import React from 'react'
import PropTypes from "prop-types"
import { REQUEST_ITEM_COLUMNS } from '..'
import { GRN_COLUMNS } from '../../Grn'

const GrnForToday = props => {
  const {
    grns
  } = props
  return (
    <>
      <Row>
        <Col span={24}>
          <span style={{fontWeight: "bold"}}>Goods Received Notes For Today</span>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Table 
            columns={GRN_COLUMNS}
            dataSource={grns}
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

GrnForToday.propTypes = {
  grns: PropTypes.array
}


export default GrnForToday