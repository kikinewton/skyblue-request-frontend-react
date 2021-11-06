import React from 'react';
import { Table, Row, Col, PageHeader, Badge, Tag, Pagination, Button, Card } from "antd"
import { useHistory } from 'react-router';
import { CURRENCY_CODE } from '../../../../util/constants';

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
    title: `Unit Price (${CURRENCY_CODE})`,
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
      
    })
  }, [])

  return (
    <>
      <Card
        hoverable
        title="My Petty Cash Requests"
        extra={[
          <Button type="primary"
            onClick={()=> history.push("/app/my-requests/petty-cash-requests/add-new")}
          >
            Create New Petty Cash Request
          </Button>
        ]}
      >
        <Row>
          <Col span={24}>
            <Table
              columns={columns}
              dataSource={my_petty_cash_requests}
              rowKey="id"
              loading={fetching_petty_cash_requests}
              size="small"
              bordered
            />
          </Col>
        </Row>
      </Card>
    </>
  )
} 

export default List