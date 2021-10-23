import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { Card, Col, Table, Row, Button, Spin } from 'antd'
import React from 'react'
import openNotification from '../../../util/notification'
import MySwal from '../../../util/sweet-alert'

const columns =  [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Reason',
    dataIndex: 'reason',
    key: 'reason'
  },
  {
    title: 'Purpose',
    dataIndex: 'purpose',
    key: 'purpose'
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    key: 'quantity'
  }
]


const Endorse = (props)=> {
  const { requests, updateRequest, requestSubmitting, requestSubmitSuccess, requestLoading, fetchRequests, currentUser, resetRequests } = props
  const [selectedRequests, setSelectedRequests] = React.useState([])

  const handleSubmit = (type)=> {
    if(selectedRequests.length < 1) {
      openNotification('error', `${type} request`, 'Please select at least one request')
      return
    }

    const updateType = type === 'endorse' ? 'ENDORSE' : 'CANCEL'
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
    if(requestSubmitSuccess) {
      fetchRequests({ requestType: FETCH_REQUEST_TYPES.HOD_PENDING_REQUEST, userId: currentUser.id, departmentId: currentUser.department.id })
    }
    // eslint-disable-next-line
  }, [requestSubmitSuccess])

  React.useEffect(()=> {
    initPage()
    // eslint-disable-next-line
  }, [])

  return (
    <React.Fragment>
      <Row style={{marginBottom: 10}}>
        <Col md={12}>
          <span className="bs-page-title">Endorse Requests</span>
        </Col>
        <Col md={12} style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end'}}>
          <Button type="primary" 
            style={{marginRight: 10}}
            onClick={()=> handleSubmit('endorse')}
            loading={requestSubmitting}
          >
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
            {requestLoading ? (<Spin />) : 
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
            }
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default Endorse