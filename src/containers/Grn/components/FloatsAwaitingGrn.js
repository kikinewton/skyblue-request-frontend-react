import { CheckOutlined } from '@ant-design/icons'
import { Breadcrumb, Button, Col, Input, Modal, Row, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import FloatDetails from '../../../shared/FloatDetails'
import { formatCurrency } from '../../../util/common-helper'
import { FLOAT_COLUMNS } from '../../../util/constants'
import { FETCH_FLOAT_REQUEST_TYPES } from '../../../util/request-types'

const columns = (props) => [
  {
    title: 'Reference',
    dataIndex: 'floatOrderRef',
    key: 'floatOrderRef'
  },
  {
    title: 'Requested By',
    dataIndex: 'requestedBy',
    key: 'requestedBy'
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description'
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
    render: (text) => formatCurrency(text)
  },
  {
    title: 'Float Type',
    dataIndex: 'floatType',
    key: 'floatType'
  },
  {
    title: 'Actions',
    dataIndex: 'actions',
    key: 'actions',
    render: (text, row) => (<>
      <Button size='small' type='primary' onClick={() => props.onCreateGrn(row)}>CREATE GRN</Button>
    </>)
  },
]

const floatItemsColumns = [
  {title: 'Description', dataIndex: 'itemDescription', key: 'itemDescription'},
  {title: 'Estimate Unit Price', dataIndex: 'estimatedUnitPrice', key: 'estimatedUnitPrice', render: text => formatCurrency(text)},
  {title: 'Quantity', dataIndex: 'quantity', key: 'quantity'},
]

const FloatsAwaitingGrn = (props) => {
  const {
    fetchFloatRequests,
    fetching_float_requests,
    float_requests,
    filtered_float_requests,
    filterFloatRequests,
    createFloatGrn,
    submitting_grn,
    resetGrn,
    resetFloatRequest,
    submit_grn_success
  } = props

  const [filter, setFilter] = useState("")
  const [visible, setVisible] = useState(false)
  const [selectedFloat,setSelectedFloat] = useState(null)
  const [selectedItems, setSelectedItems] = useState([])

  const expandedRowRender = (row) => {
    const expandedColumns = [
      {title: 'Description', dataIndex: 'itemDescription', key: 'itemDescription'},
      {title: 'Estimate Unit Price', dataIndex: 'estimatedUnitPrice', key: 'estimatedUnitPrice', render: text => formatCurrency(text)},
      {title: 'Quantity', dataIndex: 'quantity', key: 'quantity'},
    ]
    return <Table columns={expandedColumns} dataSource={row.floats} pagination={false} rowKey="id" />
  }


  useEffect(() => {
    resetFloatRequest()
    resetGrn()
    fetchFloatRequests({requestType: FETCH_FLOAT_REQUEST_TYPES.FLOAT_PENDING_GRN})
  }, [])


  useEffect(() => {
    if (submit_grn_success && !submitting_grn) {
      setVisible(false)
      setSelectedFloat(null)
      fetchFloatRequests({requestType: FETCH_FLOAT_REQUEST_TYPES.FLOAT_PENDING_GRN})
    }
  }, [submit_grn_success, submitting_grn])

  return (
    <>
      <Row>
        <Col md={8} sm={24}>
          <Breadcrumb>
            <Breadcrumb.Item>
              FLOATS AWAITING GRN
            </Breadcrumb.Item>
          </Breadcrumb>
        </Col>
        <Col md={16} sm={24} style={{textAlign: 'right'}}>
          <Input.Search 
            value={filter} 
            style={{width: 300}}
            placeholder="Search..."
            onChange={(e) => {
              const value = e.target.value
              setFilter(value)
              filterFloatRequests(value)
            }} 
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Table 
            loading={fetching_float_requests}
            columns={columns({
              onCreateGrn: (float) => {
                setSelectedItems([])
                setSelectedFloat(float)
                setVisible(true)
              }
            })}
            dataSource={filtered_float_requests}
            size="small"
            bordered
            rowKey="id"
            expandable={{expandedRowRender}}
          />
        </Col>
      </Row>
      <Modal
        visible={visible}
        footer={false}
        onCancel={() => {
          setVisible(false)
          setSelectedFloat(null)
        }}
        width={700}
        title="Create GRN"
      >
        <FloatDetails
          floatOrder={selectedFloat}
        />
        <Row>
          <Col span={24}>
            <Table
              columns={floatItemsColumns}
              dataSource={selectedFloat?.floats}
              size="small"
              bordered
              rowKey="id"
              rowSelection={{
                onChange: (selectedRowKeys, selectedRows) => {
                  setSelectedItems(selectedRows.map(it => Object.assign({}, it)))
                },
                selectedRowKeys: selectedItems.map(it => it.id)
              }}
            />
          </Col>
        </Row>
        <Row style={{marginTop: 10}}>
          <Col span={24} style={{textAlign: "right"}}>
            <Button 
              disabled={selectedItems?.length < 1}
              loading={submitting_grn}
              onClick={() => {
                const payload = {
                  floats: selectedFloat?.floats
                }
                createFloatGrn(payload)
              }} 
            type='primary'><CheckOutlined/> CREATE GRN</Button>
          </Col>
        </Row>
      </Modal>
    </>
  )
}

export default FloatsAwaitingGrn