import React from 'react';
import { Table, Row, Col, PageHeader, Badge, Tag, Pagination, Button } from "antd"
import { useHistory } from 'react-router';

const columns = [
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
    dataIndex: "amount",
    key: "amount",
  },
  {
    title: "Endorsement",
    dataIndex: "endorsement",
    key: "endorsement",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (text) => {
      let color = "default"
      if(text === "PENDING") {
        color = "processing"
      } else if(text = "APPROVED") {
        color = "success"
      }
      return (<Tag color={color}>{text}</Tag>)
    }
  },
]

const List = (props) => {
  const history = useHistory()
  const { my_petty_cash_requests, fetching_petty_cash_requests, fetchMyPettyCashRequests } = props

  React.useEffect(() => {
    fetchMyPettyCashRequests({
      pageNo: 2,
      pageSize: 5
    })
  }, [])

  return (
    <>
      <Row>
        <Col span={24}>
          <PageHeader
            style={{padding: 0}}
            title="My Petty Cash Requests"
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Table
            columns={columns}
            dataSource={my_petty_cash_requests}
            rowKey="id"
            loading={fetching_petty_cash_requests}
            size="small"
            pagination={false}
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Pagination
            size="small"
            defaultCurrent={0}
            defaultPageSize={20}
            current
          />
        </Col>
      </Row>
    </>
  )
} 

export default List