import React from 'react';
import { Row, Col, Button, Table, Drawer, Divider, Card } from "antd"
import { REQUEST_ITEMS } from '..';
import { CheckOutlined } from '@ant-design/icons';
import { FETCH_REQUEST_TYPES } from '../../../util/request-types';

const columns = props => [
  {
    title: "Description",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "Reason",
    dataIndex: "reason",
    key: "reason"
  },
  {
    title: "purpose",
    dataIndex: "purpose",
    key: "purpose"
  },
  {
    title: "Priority",
    dataIndex: "priorityLevel",
    key: "priorityLevel"
  },
  {
    title: "Unit Price",
    dataIndex: "unitPrice",
    key: "unitPrice"
  },
  {
    title: "Date",
    dataIndex: "createdAt",
    key: "createdAt"
  },
]

const HodReviewPendingList = (props) => {
  const {
    selected_requests,
    setSelectedRequests,
    resetRequest,
    fetchRequests,
    requests
  } = props
  const [drawer, setDrawer] = React.useState(false)

  const submit = () => {

  }

  React.useEffect(() => {
    resetRequest()
    fetchRequests({
      requestType: FETCH_REQUEST_TYPES.HOD_PENDING_REVIEW
    })
  }, [])

  return (
    <>
      <Card
        size="small"
        title="Requests Pending review from department HOD"
      >
        <Row>
          <Col span={24}>
            <Table
              size="small"
              columns={columns({

              })}
              dataSource={requests}
              rowKey="id"
              pagination={{
                pageSize: 20
              }}
            />
          </Col>
        </Row>
      </Card>
      <Drawer
        forceRender
        visible={drawer}
        title="Review Request Item Price"
        placement="right"
        width={1000}
        maskClosable={false}
        onClose={() => {
          setSelectedRequests([])
          setDrawer(false)
        }}
      >
        <Row style={{marginBottom: 10}}>
          <Col span={24}>
            <Button 
              type="primary" 
              style={{float: "right"}}
              onClick={submit}
            >
              <CheckOutlined /> SUBMIT
            </Button>
          </Col>
        </Row>
        <Divider />
        <Row>
          <Col span={24}>
            <Table 
              columns={columns({})}
              dataSource={selected_requests}
              rowKey="id"
              size="small"
              pagination={false}
            />
          </Col>
        </Row>
      </Drawer>
    </>
  )
}


export default HodReviewPendingList