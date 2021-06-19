import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { Card, Col, Table, Row, Button, Spin } from 'antd'
import React from 'react'
import openNotification from '../../../util/notification'
import MySwal from '../../../util/sweet-alert'

const columns =  [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: 'NAME',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'REASON',
    dataIndex: 'reason',
    key: 'reason'
  },
  {
    title: 'PURPOSE',
    dataIndex: 'purpose',
    key: 'purpose'
  },
  {
    title: 'QUANTITY',
    dataIndex: 'quantity',
    key: 'quantity'
  }
]


const Approve = (props)=> {
  const { requests, updateRequest, requestSubmitting, requestLoading, fetchRequests, currentUser, resetRequests } = props
  const [selectedRequests, setSelectedRequests] = React.useState([])

  const handleSubmit = async (type)=> {
    if(selectedRequests.length < 1) {
      openNotification('error', `${type} request`, 'Please select at least one request')
      return
    }

    const updateType = type === 'endorse' ? 'APPROVE' : 'CANCEL'
    console.log('----------------->USER ID', currentUser.id)
    let data = {userId: currentUser.id, updateType: updateType}
    if(type === 'endorse') {
      data['payload'] = {approvalList: selectedRequests}
    } else {
      data['payload'] = {cancelList: selectedRequests, employeeId: currentUser.id}
    }
    MySwal.fire({
      title: `Are you sure you want to ${type} request?`,
      showDenyButton: true,
      confirmButtonText: 'Yes',
      preConfirm: async ()=> {
        await updateRequest(data)
        await setSelectedRequests([])
        await initPage()
      }
    })
  }

  const initPage = async ()=> {
    resetRequests()
    if(currentUser.id) {
      fetchRequests({ toBeApproved: true })
    }
  }

  React.useEffect(()=> {
    initPage() // eslint-disable-next-line
  }, [])

  return (
    <React.Fragment>
      <Row style={{marginBottom: 10}}>
        <Col md={12}>
          <span className="bs-page-title">Approve Requests</span>
        </Col>
        <Col md={12} style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end'}}>
          <Button type="primary" style={{marginRight: 10}} loading={requestSubmitting} onClick={()=> handleSubmit('endorse')}>
            <CheckOutlined />
            Approve
          </Button>
          <Button type="primary" danger loading={requestSubmitting} onClick={()=> handleSubmit('cancel')}>
            <CloseOutlined />
            Cancel
          </Button>
        </Col>
      </Row>
      <Row>
        <Col md={24}>
          <Card>
            {requestLoading ? <Spin /> : 
              <Table 
                columns={columns}
                dataSource={requests || []}
                rowKey="id"
                rowSelection={{
                  onChange: (selectedRowKeys, selectedRows) => {
                    setSelectedRequests(selectedRows)
                  }
                }}
              />
            }
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default Approve