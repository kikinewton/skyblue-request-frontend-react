import { Col, Row, Table } from 'antd';
import React from 'react';

const columns = props => [
  {
    title: "Date Created",
    dataIndex: "createdAt",
    key: "createdAt"
  },
  {
    title: "Supplier",
    dataIndex: "supplier",
    key: "supplier",
    render: (text, row) => row?.name
  },
]

const QuotationList = (props) => {
  const {
    quotations
  } = props
  return (
    <>
      <Row>
        <Col span={24}>
          <Table 
            columns={columns({})}
            dataSource={quotations}
            rowKey="id"
            size="small"
            pagination={{
              pageSize: 20
            }}
          />
        </Col>
      </Row>
    </>
  )
}

export default QuotationList