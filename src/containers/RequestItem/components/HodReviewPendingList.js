import React from 'react';
import { Row, Col, Button, Table, Drawer, Divider, Card, List, Image, PageHeader } from "antd"
import { REQUEST_ITEMS } from '..';
import { CheckOutlined, DownloadOutlined } from '@ant-design/icons';
import { FETCH_REQUEST_TYPES, UPDATE_REQUEST_TYPES } from '../../../util/request-types';
import { formatCurrency, prettifyDateTime } from '../../../util/common-helper';
import { BASE_URL } from '../../../services/api/urls';

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
    key: "unitPrice",
    render: (text) => formatCurrency(text)
  },
  {
    title: "Date",
    dataIndex: "createdDate",
    key: "createdDate"
  },
  {
    title: "Reviewed",
    dataIndex: "requestReview",
    key: "requestReview"
  },
  {
    title: "Actions",
    dataIndex: "actions",
    key: "actions",
    render: (text, row) => (<Button type="primary" onClick={() => props.onReview(row)}>Review</Button>)
  }
]

const HodReviewPendingList = (props) => {
  const {
    selected_requests,
    setSelectedRequests,
    resetRequest,
    fetchRequests,
    requests,
    updateRequest
  } = props
  const [drawer, setDrawer] = React.useState(false)
  const [selectedRequest, setSelectedRequest] = React.useState(null)
  const [imagePreview, setImagePreview] = React.useState(false)

  const submit = () => {
    updateRequest({
      updateType: "HOD_REVIEW",
      role: "hod",
      payload: {requestItems: selected_requests}
    })
  }

  React.useEffect(() => {
    resetRequest()
    fetchRequests({
      requestType: FETCH_REQUEST_TYPES.HOD_PENDING_REVIEW
    })
  }, [])

  return (
    <>
      <PageHeader style={{padding: 0}} title="Requests Pending review from department HOD" extra={[
        <Button 
          key="submit-btn" 
          disabled={selected_requests.length < 1} 
          type="primary"
          onClick={() => {
            updateRequest({
              updateType: UPDATE_REQUEST_TYPES.HOD_REVIEW,
              role: "hod",
              payload: {requestItems: selected_requests}
            })
          }}
        >
          <CheckOutlined /> CONFIRM SELECTED REQUESTS
        </Button>
      ]} />
      <Card
      >
        <Row>
          <Col span={24}>
            <Table
              size="small"
              columns={columns({
                onReview: (row) => {
                  console.log('row', row)
                  const myRow = { ...row, quotation: row?.quotations?.filter(qt => qt?.supplier?.id == row?.suppliedBy)[0] }
                  console.log('myRow', myRow)
                  setSelectedRequest(myRow)
                  setDrawer(true)
                } 
              })}
              loading={props.requestLoading}
              dataSource={requests}
              rowKey="id"
              pagination={{
                pageSize: 20
              }}
              rowSelection={{
                onChange: (selectedRowKeys, selectedRows) => {
                  console.log('selectedrow', selectedRows)
                  setSelectedRequests(selectedRows)
                },
                selectedRowKeys: selected_requests.map(it => it.id)
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
          setDrawer(false)
        }}
      >
        <Row>
          <Col span={24}>
            <List 
              itemLayout="horizontal"
              
            >
              <List.Item>
                <List.Item.Meta title="Quotation Reference" description={selectedRequest?.quotation?.quotationRef || "N/A"} />
              </List.Item>
              <List.Item>
                <List.Item.Meta title="Created Date" description={prettifyDateTime(selectedRequest?.quotation?.createdAt) || "N/A"} />
              </List.Item>
              <List.Item>
                <List.Item.Meta title="Supplier" description={selectedRequest?.quotation?.supplier?.name} />
              </List.Item>
              <List.Item>
                <List.Item.Meta title="Description" description={selectedRequest?.name} />
              </List.Item>
              <List.Item>
                <List.Item.Meta title="Price" description={formatCurrency(selectedRequest?.unitPrice)} />
              </List.Item>
            </List>
          </Col>
        </Row>
        <Row style={{minHeight: 300, border: "#000 1px solid"}}>
          <Col span={24}>
            <Row>
              <Col span={24}>

              </Col>
            </Row>
            <Row>
              <Col span={24}>
                {selectedRequest?.quotation?.requestDocument?.documentType.includes("image/") && (
                  <Image 
                    onClick={() => setImagePreview(true)}
                    preview={imagePreview}
                    width={200}
                    src={`${BASE_URL}/requestDocument/download/${selectedRequest?.quotation?.requestDocument?.fileName}`}
                  />
                )}
                {selectedRequest?.quotation?.requestDocument?.documentType.includes("pdf/") && (
                  <a href={`${BASE_URL}/requestDocument/download/${selectedRequest?.quotation?.requestDocument?.fileName}`}><DownloadOutlined /> Download PDF</a>
                )}
                {selectedRequest?.quotation?.requestDocument?.documentType.includes("excel/") && (
                  <a href={`${BASE_URL}/requestDocument/download/${selectedRequest?.quotation?.requestDocument?.fileName}`}><DownloadOutlined /> Download PDF</a>
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      </Drawer>
    </>
  )
}


export default HodReviewPendingList