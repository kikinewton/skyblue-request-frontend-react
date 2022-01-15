import React, { useState } from 'react';
import { Table, Row, Col, Card, Button, Tag, Badge, Drawer } from "antd"
import { EditOutlined, EyeOutlined } from "@ant-design/icons"
import { useHistory } from 'react-router';
import { CURRENCY_CODE } from '../../../../util/constants';
import UpdateFloatForm from './UpdateForm';
import FloatDetails from './Details';
import AppLayout from '../../../AppLayout';
import MyRequestMenu from '../MyRequestMenu';
import { prettifyDateTime } from '../../../../util/common-helper';

const SELECTION_TYPES = {UPDATE: "UPDATE", VIEW: "VIEW"}

export const FLOAT_ORDERS_COLUMN = [
  {
    title: "Float Reference",
    dataIndex: "floatOrderRef",
    key: "floatOrderRef"
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description"
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

const myColumns = props => FLOAT_ORDERS_COLUMN.concat([
  {
    title: "Actions",
    dataIndex: "operations",
    key: "operations",
    render: (text, row) => (
      <>
        {!row.ready && (
          <Button 
            size='small' 
            type='default'
            onClick={() => props.onRetire(row)}
          >
            Retire
          </Button>
        )}
      </>
    )
  }
])

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
  const { fetchMyFloatRequests, fetching_float_requests, 
    updateSingleFloatRequest, submiting_float_request, submit_float_request_success, fetchFloatOrders, 
    float_orders, resetFloatRequest } = props
  const history = useHistory()
  const [visible, setVisible] = React.useState(false)
  const [retireVisible, setRetireVisible] = useState(false)
  const [selectionDetails, setSelectionDetails] = React.useState({type: SELECTION_TYPES.VIEW, row: null})
  const [selectedFloatForRetirement, setSelectedFloatForRetirement] = useState(null)
  const [viewDetailsVisible, setViewDetailsVisible] = useState(false)

  const expandedRowRender = (row) => {
    const expandedColumns = [
      {title: 'Description', dataIndex: 'itemDescription', key: 'itemDescription'},
      {title: 'Purpose', dataIndex: 'purpose', key: 'purpose'},
      {title: 'Quantity', dataIndex: 'quantity', key: 'quantity'},
    ]
    return <Table columns={expandedColumns} dataSource={row.floats} pagination={false} rowKey="id" />
  }

  React.useEffect(() => {
    //fetchMyFloatRequests({})
    resetFloatRequest()
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
                columns={myColumns({
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
                  onRetire: (row) => {
                    setSelectedFloatForRetirement(row)
                    setRetireVisible(true)
                  }
                })}
                dataSource={float_orders}
                rowKey="id"
                bordered
                size="small"
                expandable={{expandedRowRender}}
              />
            </Col>
          </Row>
        </Card>
        <Drawer
          forceRender
          visible={viewDetailsVisible}
          title="Float Info"
          placement='right'
          width={600}

        >

        </Drawer>


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