import { CheckOutlined, CloseOutlined, WarningOutlined } from '@ant-design/icons';
import { Button, Col, Table, Row, Input, Tag, Drawer, Divider, Card } from 'antd';
import React, {useState } from 'react';
import { prettifyDateTime } from '../../../util/common-helper';
import { FETCH_REQUEST_TYPES } from '../../../util/constants';
import { FETCH_FLOAT_TYPES, FLOAT_UPDATE_TYPES } from '../../../util/float-request-types';
import { UPDATE_REQUEST_TYPES } from '../../../util/request-types';

const columns = props => [
  {
    title: "Reference",
    dataIndex: "floatRef",
    key: "floatRef"
  },
  {
    title: "Description",
    dataIndex: "itemDescription",
    key: "itemDescription"
  },
  {
    title: "purpose",
    dataIndex: "purpose",
    key: "purpose"
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity"
  },
  {
    title: "Request Date",
    dataIndex: "requestDate",
    key: "requestDate",
    render: (text) => prettifyDateTime(text)
  },
]

const selectedRequestsColumns = props => [
  {
    title: "Reference",
    dataIndex: "floatRef",
    key: "floatRef"
  },
  {
    title: "Description",
    dataIndex: "itemDescription",
    key: "itemDescription"
  },
  {
    title: "purpose",
    dataIndex: "purpose",
    key: "purpose"
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity"
  },
  {
    title: "Request Date",
    dataIndex: "requestDate",
    key: "requestDate",
    render: (text) => prettifyDateTime(text)
  },
]

const selectedRequestsColumnsForReject = props => [
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
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity"
  },
  {
    title: "Request Date",
    dataIndex: "requestDate",
    key: "requestDate",
    render: (text) => prettifyDateTime(text)
  },
  {
    title: "Comment",
    dataIndex: "comment",
    key: "comment",
    render: (text, row) => (<Input type="text" defaultValue={text} onChange={(value) => props.onComment(value, row)} />)
  }
]

const HodEndorsePendingList = (props) => {
  const {
    selected_float_requests,
    setSelectedFloatRequests,
    resetFloatRequest,
    fetchFloatRequests,
    fetching_float_requests,
    float_requests,
    updateFloatRequest,
    updating_request,
    update_request_success,
  } = props
  console.log('selected_float_requests', selected_float_requests)
  const [confirmDrawer, setConfirmDrawer] = useState(false)
  const [actionType, setActionType] = useState(FLOAT_UPDATE_TYPES.HOD_ENDORSE)

  const submit = () => {
    console.log("action", actionType)
    updateFloatRequest({
      updatetype: actionType,
      
    })
  }

  React.useEffect(()=> {
    resetFloatRequest()
    props.fetchFloatRequests({
      requestType: FETCH_FLOAT_TYPES.HOD_PENDING_ENDORSEMENT
    })
  }, [])

  return (
    <>
      <Card title="Requests pending Endorsement" extra={[
        (
          <Row style={{marginBottom: 10}}>
          <Col span={24} style={{display: 'flex', flexDirection: 'row', justifyContent:"flex-end", alignContent: 'center'}}>
            <Button 
              disabled={selected_float_requests.length < 1} 
              style={{backgroundColor: "yellow", marginRight: 5}}
              onClick={() => {
                setActionType(UPDATE_REQUEST_TYPES.HOD_REJECT)
                setConfirmDrawer(true)
              }}
            >
              <WarningOutlined /> Reject With Comment
            </Button>
            <Button
              style={{backgroundColor: "red", marginRight: 5, color: "#ffffff"}} 
              disabled={selected_float_requests.length < 1}
              onClick={() => {
                setActionType(UPDATE_REQUEST_TYPES.HOD_CANCEL)
                setConfirmDrawer(true)
              }}
            >
              <CloseOutlined />
              Cancel
            </Button>
            <Button 
              disabled={selected_float_requests.length < 1} 
              type="primary" style={{marginRight: 5}}
              onClick={() => {
                setActionType(UPDATE_REQUEST_TYPES.HOD_ENDORSE)
                setConfirmDrawer(true)
              }}
            >
              <CheckOutlined />
              Endorse
            </Button>
          </Col>
        </Row>
        )
      ]}>
        <Row>
          <Col span={24}>
            <Table
              loading={fetching_float_requests}
              size="small"
              columns={columns({})}
              dataSource={float_requests}
              rowKey="id"
              bordered
              pagination={{
                pageSize: 20
              }}
              rowSelection={{
                onChange: (selectedRowKeys, selectedRows) => {
                  setSelectedFloatRequests(selectedRows)
                },
                selectedRowKeys: selected_float_requests?.map(it=> it.id),
              }}
            />
          </Col>
        </Row>
      </Card>
      <Drawer
        forceRender
        visible={confirmDrawer}
        title={`${actionType} REQUESTS`}
        placement="right"
        width={1000}
        maskClosable={false}
        onClose={() => {
          setSelectedFloatRequests([])
          setConfirmDrawer(false)
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
              columns={actionType !== "REJECT" ? selectedRequestsColumns({
                actionType,
              }) 
              : selectedRequestsColumnsForReject({
                  onComment: (event, row) => {
                    console.log('row', row, 'value', event.target.value)
                    const data = selected_float_requests.map(it => {
                      let dt = it
                      if(dt.id === row.id) {
                        dt['comment'] = event?.target?.value
                      }
                      return dt;
                    })
                    setSelectedFloatRequests(data)
                  },
              })}
              dataSource={selected_float_requests}
              size="small"
              rowKey="id"
              bordered
              pagination={false}
            />
          </Col>
        </Row>
      </Drawer>
    </>
  )
}

export default HodEndorsePendingList