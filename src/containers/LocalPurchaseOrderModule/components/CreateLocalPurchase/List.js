import { RightOutlined } from '@ant-design/icons'
import { Col, Row, Select, Table, Button, Spin } from 'antd'
import React from 'react'
import { REQUEST_COLUMNS } from '../../../../util/constants'

const columns = REQUEST_COLUMNS

const List = (props)=> {
  const { suppliers, requests, onSelectSupplier, selectedRequests, onSelectRequests, selectedSupplier, supplierLoading, requestLoading } = props

  const handleSupplierSelect = (value) => {
    console.log('selecte dsupplier', value)
    if(!value) {
      onSelectSupplier(undefined)
      onSelectRequests([])
    }
    onSelectSupplier(value)
  }


  const handleRowSelection = (selectedRowKeys, selectedRows)=> {
    console.log('row', selectedRows)
    onSelectRequests(selectedRows)
  }

  return (
    <React.Fragment>
      <Row>
        <Col md={24}>
          <Select 
            loading={supplierLoading} 
            style={{width: '100%'}} 
            placeholder="Select a supplier" 
            defaultValue={selectedSupplier} 
            onChange={(value)=>handleSupplierSelect(value)}
          >
            <Select.Option value={undefined}>Select Supplier...</Select.Option >
            {suppliers && suppliers.map(item => (
              <Select.Option value={item.id} key={`supplier-select-${item.id}`}>{item.name}</Select.Option>
            ))}
          </Select>
        </Col>
      </Row>
      <Row style={{marginTop: 20}}>
        <Col md={24}>
          {requestLoading ? (<Spin />) : 
            <Table 
              columns={columns}
              dataSource={requests || []}
              pagination={false}
              size="small"
              rowKey="id"
              rowSelection={{
                onChange: (keys, rows) => handleRowSelection(keys, rows),
                selectedRowKeys: selectedRequests && selectedRequests.length > 0 && selectedRequests.map(item=> item.id)
              }}
            />
          }
        </Col>
      </Row>
      <Row>
        <Col md={24} className="bs-stepper-nav">
          <Button 
            type="primary" 
            disabled={requests.length < 1 || selectedRequests.length < 1} onClick={()=> props.onStep(1)}>
            Next <RightOutlined />
          </Button>
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default List