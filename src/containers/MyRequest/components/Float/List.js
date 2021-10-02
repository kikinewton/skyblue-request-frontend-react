import React from 'react';
import { Table, Row, Col, PageHeader } from "antd"

const columns = [
  {
    title: "Department",
    dataIndex: "department",
    key: "department",
  },
  {
    title: "Descrption",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Purpose",
    dataIndex: "purpose",
    key: "purpose",
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity",
  },
  {
    title: "Unit Price",
    dataIndex: "unit_price",
    key: "unit_price",
  },
]

const List = (props) => {
  const { my_float_requests, fetchMyFloatRequests, fetching_float_requests } = props

  React.useEffect(() => {
    console.log('lets fetch my floats')
    fetchMyFloatRequests({})
  }, [])

  return (
    <>
      <Row>
        <Col span={24}>
          <PageHeader
            style={{padding: 0}}
            title="My Float Requests"
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Table
            columns={columns}
            dataSource={my_float_requests}
            rowKey="id"
          />
        </Col>
      </Row>
    </>
  )
} 

export default List