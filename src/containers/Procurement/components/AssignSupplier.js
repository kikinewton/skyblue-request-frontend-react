import { Button, Col, Row, Select, Spin, Table, Tag } from 'antd'
import React from 'react'
import { prettifyDateTime } from '../../../util/common-helper'
import openNotification from '../../../util/notification'
import { FETCH_REQUEST_TYPES, UPDATE_REQUEST_TYPES } from '../../../util/request-types'
import MySwal from '../../../util/sweet-alert'

const COLUMNS = (props) => [
  {
    title: 'Description',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Quatity',
    dataIndex: 'quantity',
    key: 'quantity'
  },
  {
    title: 'Date',
    dataIndex: 'requestDate',
    key: 'requestDate',
    render: (text) => prettifyDateTime(text)
  },
  {
    title: 'Assigned Suppliers',
    dataIndex: 'suppliers',
    key: 'suppliers',
    align: 'right',
    render: (text, row) => {
      return row.suppliers.map(item=> (<Tag key={item.id}>{item.name}</Tag>))
    }
  },
]

const AssignSupplier = (props) => {
  const { currentUser, updateRequest, requests, requestSubmitSuccess,
    fetchRequests, requestLoading, requestSubmitting, suppliers, fetchSuppliers } = props
  const [ selectedRequests, setSelectedRequests ] = React.useState([])
  const [ selectedSuppliers, setSelectedSuppliers ] = React.useState([])

  const initPage = async () => {
    console.log('init get requests')
    fetchSuppliers({})
    await fetchRequests({ requestType: FETCH_REQUEST_TYPES.PROCUREMENT_PENDING_ASSIGN_SUPPLIER_REQUESTS, userId: currentUser.id })
  }

  const handleSupplierSelectChange = (value)=> {
    console.log('values', value)
    setSelectedSuppliers(value)
  }

  const handleSubmit = ()=> {
    if(selectedRequests.length < 1 || selectedSuppliers.length < 1) {
      return openNotification('warning', 'Assign Suppliers', 'Please select suppliers and requests')
    }
    const sups = selectedSuppliers.map(item=> {
      return suppliers.find(sup=> sup.id === item)
    }) //
    console.log('supp', sups)
    MySwal.fire({
      title: "Assign Suppliers",
      showDenyButton: true,
      confirmButtonText: 'Yes',
      preConfirm: async ()=> {
        await updateRequest({
          updateType: UPDATE_REQUEST_TYPES.PROCUREMENT_PENDING_ASSIGN_SUPPLIER_REQUESTS,
          userId: currentUser.id,
          payload: {
            procurementOfficer: { ...currentUser, role: [currentUser.role] },
            requestItems: selectedRequests,
            suppliers: sups
          }
        })
        console.log('let reset')
        setSelectedRequests([])
        //await fetchRequests({ requestType: FETCH_REQUEST_TYPES.PROCUREMENT_PENDING_ASSIGN_SUPPLIER_REQUESTS, userId: currentUser.id })
      }
    })
  }

  


  React.useEffect(()=> {
    console.log('init assign supplier...........')
    initPage() // eslint-disable-next-line
  }, [])

  React.useEffect(()=> {
    if(!requestSubmitting) {
      setSelectedSuppliers([])
      setSelectedRequests([])
      fetchRequests({ requestType: FETCH_REQUEST_TYPES.PROCUREMENT_PENDING_ASSIGN_SUPPLIER_REQUESTS, userId: currentUser.id })
    }
  }, [requestSubmitSuccess])

  return (
    <React.Fragment>
      <Row style={{marginBottom: 10}}>
        <Col md={4}>
          <span className="bs-page-title">Assign Suppliers</span>
        </Col>
        <Col md={20} style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end'}}>
          <Select
            mode="multiple"
            allowClear
            style={{width: '100%'}}
            placeholder="Please select a supplier"
            onChange={handleSupplierSelectChange}
            value={selectedSuppliers}
          >
            {suppliers.map(supplier=> (
              <Select.Option value={supplier.id} key={`supplier-option-${supplier.id}`}>{supplier.name}</Select.Option>
            ))}
          </Select>
          <Button style={{marginLeft: 10}} type="primary" loading={requestSubmitting} onClick={handleSubmit}>
            Assign Suppliers
          </Button>
        </Col>
      </Row>
      <Row>
        <Col md={24}>
          {requestLoading ? <Spin /> : 
            <Table 
              columns={COLUMNS(props)}
              dataSource={requests}
              pagination={{
                pageSize: 20,
              }}
              rowKey="id"
              size="small"
              rowSelection={{
                onChange: ((selectedRowKeys, selectedRows) => {
                  setSelectedRequests(selectedRows)
                })
              }}
            />
          }
        </Col>
      </Row>
    </React.Fragment>
  )
}
export default AssignSupplier