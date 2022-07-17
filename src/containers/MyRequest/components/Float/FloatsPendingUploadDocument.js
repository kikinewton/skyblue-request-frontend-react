import React, { useState } from 'react';
import { Table, Row, Col, Card, Button, Tag, Badge, Drawer, List } from "antd"
import { CheckOutlined, EditOutlined, EyeOutlined, SyncOutlined } from "@ant-design/icons"
import { useHistory } from 'react-router';
import { CURRENCY_CODE } from '../../../../util/constants';
import UpdateFloatForm from './UpdateForm';
import AppLayout from '../../../AppLayout';
import UploadFiles from '../../../../shared/UploadFiles'
import MyRequestMenu from '../MyRequestMenu';
import { formatCurrency, prettifyDateTime } from '../../../../util/common-helper';
import { useRouteMatch } from "react-router-dom"
import { saveSingleDocument } from '../../../../services/api/document'
import MyPageHeader from '../../../../shared/MyPageHeader';
import { FETCH_FLOAT_REQUEST_TYPES } from '../../../../util/request-types';
import { RESPONSE_SUCCESS_CODE } from '../../../../services/api/apiRequest';
import FloatDetails from '../../../Float/components/FloatDetails';


const SELECTION_TYPES = {UPDATE: "UPDATE", VIEW: "VIEW"}

const retirmentStatus = row => {
  if(row.hasDocument) {
    return 'Retired'
  } else if(row.fundsReceived) {
    return 'Awaiting Retirement'
  } else {
    return 'Cannot Retire'
  }
}

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
    title: "Status",
    dataIndex: "status",
    key: "status"
  },
  {
    title: "Actions",
    dataIndex: "operations",
    key: "operations",
    render: (text, row) => (
      <>
        <Button
          style={{marginRight: 5}}
          size='small' 
          type='default'
          onClick={() => props.onRetire(row)}
        >
          <CheckOutlined />
          Retire Float
        </Button>
      </>
    )
  }
])

const floatEntriesColumns = [
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
  }
]

const FloatsPendingUploadDocument = (props) => {
  const { fetchMyFloatRequests, fetching_float_requests, 
    updateSingleFloatRequest, submiting_float_request, submit_float_request_success, fetchFloatOrders,  fetchFloatRequests,
    float_orders, float_requests, resetFloatRequest, retireFloatOrder } = props
  const history = useHistory()
  const [visible, setVisible] = React.useState(false)
  const [selectionDetails, setSelectionDetails] = React.useState({type: SELECTION_TYPES.VIEW, row: null})
  const [selectedFloatForRetirement, setSelectedFloatForRetirement] = useState(null)
  const [viewDetailsVisible, setViewDetailsVisible] = useState(false)
  const { path } = useRouteMatch()
  const [editVisible, setEditVisible] = useState(false)
  const [selectedFloatOrder, setSelectedFloatOrder] = useState(null)
  const [files, setFiles] = useState([])
  const [loadingDocument, setLoadingDocument] = useState(false)

  const expandedRowRender = (row) => {
    const expandedColumns = [
      {title: 'Description', dataIndex: 'itemDescription', key: 'itemDescription'},
      {title: 'Estimate Unit Price', dataIndex: 'estimatedUnitPrice', key: 'estimatedUnitPrice', render: text => formatCurrency(text)},
      {title: 'Quantity', dataIndex: 'quantity', key: 'quantity'},
    ]
    return <Table columns={expandedColumns} dataSource={row.floats} pagination={false} rowKey="id" />
  }

  const handleUpload = async(file) => {
    setLoadingDocument(true)
    try {
      const response = await saveSingleDocument({file: file?.file})
      setLoadingDocument(false)
      if(response.status === RESPONSE_SUCCESS_CODE) {
        const dt = response?.data
        const fileDetails = {
          ...dt,
          status: "done",
          name: dt?.fileName,
          size: dt?.fileSize,
          uid: dt?.id,
          url: dt?.fileDownloadUri
        }
        console.log('file details', fileDetails)
        setFiles(files.concat(fileDetails))
      }
    } catch (error) {
      setLoadingDocument(false)
    }
  }

  const onSubmit = () => {
    const payload = {
      documents: files
    }
    retireFloatOrder(selectedFloatForRetirement?.id, payload)
  }

  React.useEffect(() => {
    //fetchMyFloatRequests({})
    resetFloatRequest()
    // fetchFloatOrders({myRequest: true})
    fetchFloatRequests({requestType: FETCH_FLOAT_REQUEST_TYPES.MY_AWAITING_RETIREMENT})
  }, [])

  React.useEffect(() => {
    console.log("float submit status change")
    if(!submiting_float_request && submit_float_request_success) {
      console.log("float submit successful hence lets update state")
      setVisible(false)
      setFiles([])
      setSelectedFloatForRetirement(null)
      fetchFloatRequests({requestType: FETCH_FLOAT_REQUEST_TYPES.MY_AWAITING_RETIREMENT})
      //setSelectionDetails({type: SELECTION_TYPES.VIEW, row: null})
    }
  }, [submit_float_request_success, submiting_float_request])

  

  return (
    <>
      <AppLayout
        title="My Float Requests"
        subNav={<MyRequestMenu />}
      >
        <MyPageHeader 
          title={(
            <>
              <span style={{marginRight: 5}}>Floats Awaiting Retirement</span>
              <SyncOutlined 
                spin={fetching_float_requests} 
                onClick={e => {
                  fetchFloatOrders({myRequest: true})
                }}
              />
            </>
          )}
          extra={[
            <Button key="create-new-float-btn" size="small" type="primary" onClick={() => history.push("/app/my-requests/float-requests/add-new")}>
              Create New Float Request
            </Button>
          ]}
        />
        <Card>
          <Row>
            <Col span={24}>
              <Table
                loading={fetching_float_requests}
                columns={myColumns({
                  onRetire: (row) => {
                    setSelectedFloatForRetirement(row)
                    setVisible(true)
                  }
                })}
                dataSource={float_requests}
                rowKey="id"
                bordered
                size="small"
                pagination={{pageSize: 30}}
                expandable={{expandedRowRender}}
              />
            </Col>
          </Row>
        </Card>
        <Drawer
          forceRender
          visible={visible}
          title="Retire Float Form"
          placement='right'
          width={800}
          onClose={() => {
            setSelectedFloatForRetirement(null)
            setFiles([])
            setVisible(false)
          }}
        >
          <>
            <Row style={{marginBottom: 20}}>
              <Col span={24} style={{display: "flex", flexDirection: "row", justifyContent: "flex-end"}}>
                <Button type='primary'
                  loading={submiting_float_request}
                  disabled={!selectedFloatForRetirement?.fundsReceived || selectedFloatForRetirement.hasDocument || files.length < 1}
                  onClick={() => {
                    onSubmit()
                  }}
                >
                  Retire Float
                  <CheckOutlined />
                </Button>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Card title="Upload Supporting Documents" size='small'>
                  <UploadFiles 
                    onRemove={(file) => {
                      setFiles(files.filter(f => f.uid !== file.uid))
                    }}
                    files={files}
                    onUpload={handleUpload}
                    loading={loadingDocument}
                  />
                </Card>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FloatDetails floatOrder={selectedFloatForRetirement} />
              </Col>
            </Row>
            {/* <Card style={{marginTop: 20}} size='small' title="Float Details">
              <Row>
                <Col span={24}>
                  <List>
                    <List.Item>
                      <List.Item.Meta title="Reference" description={selectedFloatForRetirement?.floatOrderRef} />
                    </List.Item>
                    <List.Item>
                      <List.Item.Meta title="Description" description={selectedFloatForRetirement?.description} />
                    </List.Item>
                    <List.Item>
                      <List.Item.Meta title="Date" description={prettifyDateTime(selectedFloatForRetirement?.createdDate)} />
                    </List.Item>
                  </List>
                </Col>
              </Row>
            </Card>
            <Card style={{marginTop: 20}} size='small' title="Float Entries">
              <Row>
                <Col span={24}>
                  <Table 
                    dataSource={selectedFloatForRetirement?.floats}
                    columns={floatEntriesColumns}
                    size='small'
                    bordered
                    pagination={false}
                    rowKey="id"
                  />
                </Col>
              </Row>
            </Card> */}
          </>
        </Drawer>
      </AppLayout>
    </>
  )
} 

export default FloatsPendingUploadDocument