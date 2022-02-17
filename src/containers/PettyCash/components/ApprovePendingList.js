import { CheckOutlined, CloseOutlined, CommentOutlined, EyeFilled, SyncOutlined, WarningOutlined } from '@ant-design/icons';
import { Button, Col, Table, Row, Input, Tag, Drawer, Divider, Card, List } from 'antd';
import React, {useEffect, useState } from 'react';
import { prettifyDateTime, formatCurrency } from '../../../util/common-helper';
import { CURRENCY_CODE } from '../../../util/constants';
import { FETCH_PETTY_CASH_REQUEST_TYPES, UPDATE_PETTY_CASH_REQUEST_TYPES } from '../../../util/request-types';

const columns = props => [
  {
    title: "Reference",
    dataIndex: "pettyCashRef",
    key: "pettyCashRef"
  },
  {
    title: "Description",
    dataIndex: "name",
    key: "name"
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
    title: "Unit Price",
    dataIndex: "amount",
    key: "amount",
    render: (text) => `${CURRENCY_CODE} ${text}`
  },
  {
    title: "Request Date",
    dataIndex: "createdDate",
    key: "createdDate",
    render: (text) => prettifyDateTime(text)
  },
  {
    title: "Endorsement Status",
    dataIndex: "endorsement",
    key: "endorsement"
  },
  {
    title: "Actions",
    dataIndex: "actions",
    key: "actions",
    align: "right",
    render: (text, row) => (<EyeFilled onClick={() => props.viewDetails(row)} />)
  }
]

const selectedRequestsColumns = props => [
  {
    title: "Reference",
    dataIndex: "pettyCashRef",
    key: "pettyCashRef"
  },
  {
    title: "Description",
    dataIndex: "name",
    key: "name"
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
    title: "Unit Price",
    dataIndex: "amount",
    key: "amount",
    render: (text) => `${CURRENCY_CODE} ${text}`
  },
  {
    title: "Request Date",
    dataIndex: "createdDate",
    key: "createdDate",
    render: (text) => prettifyDateTime(text)
  },
  {
    title: "Endorsement Status",
    dataIndex: "endorsement",
    key: "endorsement"
  },
]

const selectedRequestsColumnsForReject = props => [
  {
    title: "Reference",
    dataIndex: "pettyCashRef",
    key: "pettyCashRef"
  },
  {
    title: "Description",
    dataIndex: "name",
    key: "name"
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
    title: "Unit Price",
    dataIndex: "amount",
    key: "amount",
    render: (text) => `${CURRENCY_CODE} ${text}`
  },
  {
    title: "Request Date",
    dataIndex: "createdDate",
    key: "createdDate",
    render: (text) => prettifyDateTime(text)
  },
  {
    title: "Endorsement Status",
    dataIndex: "endorsement",
    key: "endorsement"
  },
  {
    title: "Comment",
    dataIndex: "comment",
    key: "comment",
    render: (text, row) => (<Input type="text" defaultValue={text} onChange={(value) => props.onComment(value, row)} />)
  }
]

const ApprovePendingList = (props) => {
  const {
    selected_petty_cash_requests,
    setSelectedPettyCashRequests,
    resetPettyCashRequest,
    fetchPettyCashRequests,
    fetching_petty_cash_requests,
    petty_cash_requests,
    updateBulkPettyCashRequest,
    createComment,
    submitting_petty_cash,
    submit_petty_cash_success,
    submitting_comment,
    submit_comment_success,
    petty_cash_submitting,
    petty_cash_submit_success

  } = props
  const [confirmDrawer, setConfirmDrawer] = useState(false)
  const [infoVisible, setInfoVisible] = useState(false)
  const [actionType, setActionType] = useState(UPDATE_PETTY_CASH_REQUEST_TYPES.HOD_ENDORSE)
  const [selectedRequest, setSelectedRequest] = useState(null)

  const fetchRequests = () => {
    props.fetchPettyCashRequests({
      requestType: FETCH_PETTY_CASH_REQUEST_TYPES.GM_PENDING_APPROVAL
    })
  }

  const submit = () => {
    console.log("action", actionType)
    if(actionType === UPDATE_PETTY_CASH_REQUEST_TYPES.GM_COMMENT) {
      const comments = selected_petty_cash_requests.map(it => {
        let data = {
          procurementTypeId: it.id,
          comment: { description: it?.comment || "", process: "REQUEST_APPROVAL_GM" },
        }
        return data
      })
      const payload = {comments: comments, procurementType: "PETTY_CASH"}
      console.log('create comment payload', payload)
      createComment("PETTY_CASH", payload)
    } else if(actionType === UPDATE_PETTY_CASH_REQUEST_TYPES.GM_CANCEL) {
      const comments = selected_petty_cash_requests.filter(it => it.comment)
                            .map(it => {
                              let data = {
                                procurementTypeId: it.id,
                                comment: { description: it?.comment || "", process: "REQUEST_APPROVAL_GM" },
                                cancelled: true
                              }
                              return data
                            })
      const commentPayload = {comments: comments}
      createComment("PETTY_CASH", commentPayload)
    } else {
      updateBulkPettyCashRequest({
        statusChange: "APPROVE",
        items: selected_petty_cash_requests,
      })
    }
  }

  React.useEffect(()=> {
    console.log('lets fetch petty cash pending endorse')
    resetPettyCashRequest()
    fetchRequests()
  }, [])

  useEffect(() => {
    if(!petty_cash_submitting && petty_cash_submit_success) {
      setConfirmDrawer(false)
      setSelectedPettyCashRequests([])
      fetchRequests()
    }
  }, [petty_cash_submitting, petty_cash_submit_success])

  useEffect(() => {
    if(!submitting_comment && submit_comment_success) {
      setConfirmDrawer(false)
      setSelectedPettyCashRequests([])
      props.fetchPettyCashRequests({
        requestType: FETCH_PETTY_CASH_REQUEST_TYPES.HOD_PENDING_ENDORSEMENT_REQUESTS
      })
    }
  }, [submitting_comment, submit_comment_success])

  return (
    <>
      <Card 
        size='small'
        title={(<Row>
          <Col span={24}>
            <span style={{marginRight: 5}}>Approve Petty Cash List</span>
            <SyncOutlined spin={fetching_petty_cash_requests} onClick={() => fetchRequests()} />
          </Col>
        </Row>)} 
        extra={[
        (
          <Row style={{marginBottom: 10}} key="extras-first">
          <Col span={24} style={{display: 'flex', flexDirection: 'row', justifyContent:"flex-end", alignContent: 'center'}}>
            <Button 
              disabled={selected_petty_cash_requests.length < 1} 
              type="default"
              style={{marginRight: 5}}
              onClick={() => {
                setActionType(UPDATE_PETTY_CASH_REQUEST_TYPES.GM_COMMENT)
                setConfirmDrawer(true)
              }}
            >
              <CommentOutlined /> Comment
            </Button>
            <Button
              style={{marginRight: 5}} 
              disabled={selected_petty_cash_requests.length < 1}
              onClick={() => {
                setActionType(UPDATE_PETTY_CASH_REQUEST_TYPES.GM_COMMENT)
                setConfirmDrawer(true)
              }}
            >
              <CloseOutlined />
              Cancel
            </Button>
            <Button 
              disabled={selected_petty_cash_requests.length < 1}
              type="primary" style={{marginRight: 5}} 
              onClick={() => {
                setActionType(UPDATE_PETTY_CASH_REQUEST_TYPES.GM_APPROVE)
                setConfirmDrawer(true)
              }}
            >
              <CheckOutlined />
              Approve
            </Button>
          </Col>
        </Row>
        )
      ]}>
        <Row>
          <Col span={24}>
            <Table
              loading={fetching_petty_cash_requests}
              size="small"
              columns={columns({
                viewDetails: (row) => {
                  setSelectedRequest(row)
                  setInfoVisible(true)
                }
              })}
              dataSource={petty_cash_requests}
              rowKey="id"
              bordered
              pagination={{
                pageSize: 20
              }}
              rowSelection={{
                onChange: (selectedRowKeys, selectedRows) => {
                  console.log("selected row", selectedRows)
                  setSelectedPettyCashRequests(selectedRows.map(it => Object.assign({}, it)))
                },
                selectedRowKeys: selected_petty_cash_requests?.map(it=> it.id),
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
          setSelectedPettyCashRequests([])
          setConfirmDrawer(false)
        }}
      >
        <Row style={{marginBottom: 10}}>
          <Col span={24}>
            <Button 
              type="primary" 
              style={{float: "right"}}
              onClick={submit}
              loading={submitting_comment || petty_cash_submitting}
            >
              <CheckOutlined /> SUBMIT
            </Button>
          </Col>
        </Row>
        <Divider />
        <Row>
          <Col span={24}>
            <Table 
              columns={actionType === UPDATE_PETTY_CASH_REQUEST_TYPES.GM_APPROVE ? selectedRequestsColumns({
                actionType,
              }) 
              : selectedRequestsColumnsForReject({
                  onComment: (event, row) => {
                    console.log('row', row, 'value', event.target.value)
                    const data = selected_petty_cash_requests.map(it => {
                      let dt = it
                      if(dt.id === row.id) {
                        dt['comment'] = event?.target?.value
                      }
                      return dt;
                    })
                    setSelectedPettyCashRequests(data)
                  },
              })}
              dataSource={selected_petty_cash_requests}
              size="small"
              rowKey="id"
              bordered
              pagination={false}
            />
          </Col>
        </Row>
      </Drawer>

      <Drawer
        forceRender
        visible={infoVisible}
        title={`Supporting Document`}
        placement="right"
        width={1000}
        maskClosable={false}
        onClose={() => {
          setSelectedRequest(null)
          setInfoVisible(false)
        }}
      >
        <Row>
          <Col span={24}>
          <List>
              <List.Item>
                <List.Item.Meta title="Requested On" description={prettifyDateTime(selectedRequest?.createdDate)} />
              </List.Item>
              <List.Item>
                <List.Item.Meta title="Reference" description={selectedRequest?.pettyCashRef} />
              </List.Item>
              <List.Item>
                <List.Item.Meta title="Description" description={selectedRequest?.name} />
              </List.Item>
              <List.Item>
                <List.Item.Meta title="Purpose" description={selectedRequest?.purpose} />
              </List.Item>
              <List.Item>
                <List.Item.Meta title="Quantity" description={selectedRequest?.quantity} />
              </List.Item>
              <List.Item>
                <List.Item.Meta title="Unit Price" description={formatCurrency(selectedRequest?.amount)} />
              </List.Item>
              <List.Item>
                <List.Item.Meta title="Endorsement Status (BY HOD)" description={selectedRequest?.endorsement} />
              </List.Item>
              <List.Item>
                <List.Item.Meta title="Approval Status (By GM)" description={selectedRequest?.approval} />
              </List.Item>
              <List.Item>
                <List.Item.Meta title="Status" description={selectedRequest?.status} />
              </List.Item>
              <List.Item>
                <List.Item.Meta title="Payment Status" description={selectedRequest?.paid ? 'PAID' : "PENDING"} />
              </List.Item>
            </List>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            
          </Col>
        </Row>
      </Drawer>
    </>
  )
}

export default ApprovePendingList