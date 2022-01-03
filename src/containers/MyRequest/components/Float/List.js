import React from 'react';
import { Table, Row, Col, Card, Button, Tag, Form, Drawer, Descriptions } from "antd"
import { EditOutlined, EyeOutlined } from "@ant-design/icons"
import { useHistory } from 'react-router';
import { CURRENCY_CODE } from '../../../../util/constants';
import UpdateFloatForm from './UpdateForm';
import FloatDetails from './Details';
import AppLayout from '../../../AppLayout';
import MyRequestMenu from '../MyRequestMenu';
import { prettifyDateTime } from '../../../../util/common-helper';

const SELECTION_TYPES = {UPDATE: "UPDATE", VIEW: "VIEW"}

const FLOAT_ORDERS_COLUMN = props => [
  {
    title: "Float Reference",
    dataIndex: "floatRef",
    key: "floatRef"
  },
  {
    title: "Requested By",
    dataIndex: "requestedBy",
    key: "requestedBy"
  },
  {
    title: "Phone Number",
    dataIndex: "requestedByPhoneNo",
    key: "requestedByPhoneNo"
  },
  {
    title: "Request Date",
    dataIndex: "createdDate",
    key: "createdDate",
    render: (text, row) => prettifyDateTime(text)
  },
]

const columns = props => [
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
    render: (text, row) => (<div style={{display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
      {(row?.status === "COMMENT") && <EditOutlined onClick={() => props.handleEdit(row)}/>}
      <EyeOutlined onClick={() => props.handleView(row)} />
    </div>)
  }
]

const List = (props) => {
  const { my_float_requests, fetchMyFloatRequests, fetching_float_requests, 
    updateSingleFloatRequest, submiting_float_request, submit_float_request_success, fetchFloatOrders, float_orders } = props
  const history = useHistory()
  const [visible, setVisible] = React.useState(false)
  const [selectionDetails, setSelectionDetails] = React.useState({type: SELECTION_TYPES.VIEW, row: null})

  const updateForm = () => (
    <Form onSub>

    </Form>
  )

  React.useEffect(() => {
    //fetchMyFloatRequests({})
    fetchFloatOrders({myRequest: true})
  }, [])

  React.useEffect(() => {
    if(!submiting_float_request && submit_float_request_success) {
      setVisible(false)
      setSelectionDetails({type: SELECTION_TYPES.VIEW, row: null})
      fetchMyFloatRequests({})
    }
  }, [submit_float_request_success, submiting_float_request])

  

  return (
    <>
      <AppLayout
        title="My Float Requests"
        subNav={<MyRequestMenu />}
      >
        <Card
          size="small"
          title="My Float Requests"
          extra={[
            <Button key="create-new-float-btn" size="small" type="primary" onClick={() => history.push("/app/my-requests/float-requests/add-new")}>
              Create New Float Request
            </Button>
          ]}
        >
          <Row>
            <Col span={24}>
              <Table
                loading={fetching_float_requests}
                columns={FLOAT_ORDERS_COLUMN({
                  handleView: (row) => {
                    console.log('lets view')
                    setSelectionDetails({type: SELECTION_TYPES.VIEW, row})
                    setVisible(true)
                  },
                  handleEdit: (row) => {
                    console.log('lets update')
                    setSelectionDetails({type:SELECTION_TYPES.UPDATE, row})
                    setVisible(true)
                  },
                })}
                dataSource={float_orders}
                rowKey="id"
                bordered
                size="small"
              />
            </Col>
          </Row>
        </Card>
        <Drawer
          forceRender
          visible={visible}
          title={selectionDetails.type === SELECTION_TYPES.VIEW ? `REQUEST DETAILS` : "UPDATE FLOAT"}
          placement="right"
          width={700}
          maskClosable={false}
          onClose={() => {
            setSelectionDetails(SELECTION_TYPES.VIEW, null)
            setVisible(false)
          }}
        >
          {selectionDetails.type === SELECTION_TYPES.UPDATE && (
            <UpdateFloatForm 
              onSubmit={(values) => {
                console.log('values', values)
                const payload = { description: values.description, quantity: values.quantity, estimatedPrice: values.estimatedUnitPrice }
                
                updateSingleFloatRequest(selectionDetails?.row?.id, payload)
              }}
              loading={submiting_float_request}
              float={selectionDetails?.row}
            />
          )}
          {selectionDetails.type === SELECTION_TYPES.VIEW && (
            <FloatDetails float={selectionDetails.row} />
          )}
        </Drawer>
      </AppLayout>
    </>
  )
} 

export default List