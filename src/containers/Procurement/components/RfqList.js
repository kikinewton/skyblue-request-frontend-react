import { Button, Col, PageHeader, Row, Table } from 'antd'
import React from 'react'

const columns = props => [
  {
    title: "Supplier",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "No of requests assigned",
    dataIndex: "",
    key: ""
  },
  {
    title: "Actions",
    dataIndex: "actions",
    key: "actions",
    render: (text, row) => (<Button onClick={() => props.generateRfq(row)} type="default">Generate RFQ</Button>)
  },
]


const RfqList = (props) => {
  return (
    <>
      <PageHeader title="RFQs" style={{padding: 0}}/>
      <Row>
        <Col span={24}>
          <Table 
            columns={}
          />
        </Col>
      </Row>
    </>
  )
}

export default RfqList