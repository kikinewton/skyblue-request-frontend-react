import { CheckOutlined, CloseOutlined, DeleteOutlined } from '@ant-design/icons'
import { Card, Col, Table, Row, Button } from 'antd'
import React from 'react'
import { REQUEST_COLUMNS } from '../../../util/constants'
import openNotification from '../../../util/notification'
import { FETCH_REQUEST_TYPES } from '../../../util/request-types'
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


const Endorse = (props)=> {
  const { requests, updateRequest, requestSubmitting, requestLoading, fetchRequests, currentUser, resetRequests, submitSuccess } = props
  const [selectedRequests, setSelectedRequests] = React.useState([])

  const handleSubmit = (type)=> {
    if(selectedRequests.length < 1) {
      openNotification('error', `${type} request`, 'Please select at least one request')
      return
    }

    const updateType = type === 'endorse' ? 'ENDORSE' : 'CANCEL'
    console.log('----------------->USER ID', currentUser.id)
    let data = {userId: currentUser.id, updateType: updateType}
    if(type === 'endorse') {
      data['payload'] = {endorsedList: selectedRequests}
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
        await fetchRequests({ requestType: FETCH_REQUEST_TYPES.HOD_PENDING_REQUEST, userId: currentUser.id, departmentId: currentUser.department.id })
      }
    })
  }

  const initPage = async ()=> {
    resetRequests()
    if(currentUser.id && currentUser?.department?.id) {
      fetchRequests({ requestType: FETCH_REQUEST_TYPES.HOD_PENDING_REQUEST, userId: currentUser.id, departmentId: currentUser.department.id })
    }
  }
  React.useEffect(()=> {
    initPage()
  }, [])

  return (
    <React.Fragment>
      <Row style={{marginBottom: 10}}>
        <Col md={12}>
          <span className="bs-page-title">Endorse Requests</span>
        </Col>
        <Col md={12} style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end'}}>
          <Button type="primary" style={{marginRight: 10}} loading={requestSubmitting} onClick={()=> handleSubmit('endorse')}>
            <CheckOutlined />
            Endorse
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
            <Table 
              columns={columns}
              dataSource={requests}
              rowKey="id"
              rowSelection={{
                onChange: (selectedRowKeys, selectedRows) => {
                  setSelectedRequests(selectedRows)
                }
              }}
            />
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default Endorse