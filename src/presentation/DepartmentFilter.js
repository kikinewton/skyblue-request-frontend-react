import { Col, Row, Select } from 'antd'
import React from 'react'
import PropTypes from 'prop-types'

const DepartmentFilter = ({
  data,
  loading,
  onChange,
  value,
  width = 200,
}) => {
  return (
    <Row>
      <Col span={24}>
        <Select value={value} onChange={v => onChange(v)} loading={loading} style={{ width }}>
          <Select.Option key="default-all" value="">All</Select.Option>
          {data.map(it => (
            <Select.Option key={it.id} value={it.id}>
              {it?.name}
            </Select.Option>
          ))}
        </Select>
      </Col>
    </Row>
  )
}

DepartmentFilter.propTypes = {
  data: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.any,
  width: PropTypes.number
}

export default DepartmentFilter