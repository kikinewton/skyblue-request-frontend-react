import { Col, Pagination as AntPagination, Row } from 'antd'
import React from 'react'
import PropTypes from 'prop-types'


const Pagination = (props) => {
  const {
    total,
    current,
    pageSize=20,
    onChange,
    defaultCurrent=0,
  } = props

  return (
    <>
      <Row>
        <Col span={24}>
          <AntPagination
            defaultCurrent={defaultCurrent}
            showSizeChanger={false}
            total={total}
            pageSize={pageSize}
            current={current}
            onChange={onChange}
            size='small'
          />
        </Col>
      </Row>
    </>
  )
}

Pagination.propTypes = {
  total: PropTypes.number,
  current: PropTypes.number,
  pageSize: PropTypes.number,
  onChange: PropTypes.func,
  
}

export default Pagination