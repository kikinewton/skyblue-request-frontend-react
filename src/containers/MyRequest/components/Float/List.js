import React from 'react';
import { Table, Row, Col, Card, Button, Tag, Form } from "antd"
import { EditOutlined, EyeOutlined } from "@ant-design/icons"
import { useHistory } from 'react-router';
import { CURRENCY_CODE } from '../../../../util/constants';

const columns = [
  {
    title: "Reference",
    dataIndex: "floatRef",
    key: "floatRef"
  },
  {
    title: "Descrption",
    dataIndex: "itemDescription",
    key: "itemDescription",
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
    dataIndex: "estimatedUnitPrice",
    key: "estimatedUnitPrice",
  },
  {
    title: "Endorsement",
    dataIndex: "endorsement",
    key: "endorsement",
  },
  {
    title: "Approval",
    dataIndex: "approval",
    key: "approval",
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
  {
    title: "Actions",
    dataIndex: "actions",
    key: "actions",
    render: (text, row) => (<>
      {row.status === "COMMENT" && <EditOutlined />}
      <EyeOutlined />
    </>)
  }
]

const List = (props) => {
  const { my_float_requests, fetchMyFloatRequests, fetching_float_requests } = props
  const history = useHistory()

  const updateForm = () => (
    <Form onSub>

    </Form>
  )

  React.useEffect(() => {
    fetchMyFloatRequests({})
  }, [])

  

  return (
    <>
      <Card
        size="small"
        title="My Float Requests"
        extra={[
          <Button size="small" type="primary" onClick={() => history.push("/app/my-requests/float-requests/add-new")}>
            Create New Float Request
          </Button>
        ]}
      >
        <Row>
          <Col span={24}>
            <Table
              loading={fetching_float_requests}
              columns={columns}
              dataSource={my_float_requests}
              rowKey="id"
              bordered
              size="small"
            />
          </Col>
        </Row>
      </Card>
    </>
  )
} 

export default List