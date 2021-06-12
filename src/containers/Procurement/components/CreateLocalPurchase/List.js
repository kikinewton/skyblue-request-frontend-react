import { Col, Row, Select, Table } from 'antd'
import React from 'react'
import { REQUEST_COLUMNS } from '../../../../util/constants'

const columns = REQUEST_COLUMNS

const List = (props)=> {
  console.log('props..............', props)
  const { suppliers, requests, onSelectSupplier, selectedRequests, onSelectRequests, selectedSupplier } = props

  const handleSupplierSelect = (value) => {
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
          <Select style={{width: '100%'}} placeholder="Select a supplier" defaultValue={selectedSupplier} onChange={(value)=>handleSupplierSelect(value)}>
            <Select.Option value={undefined}>Select Supplier...</Select.Option >
            {suppliers && suppliers.map(item => (
              <Select.Option value={item.id} key={`supplier-select-${item.id}`}>{item.name}</Select.Option>
            ))}
          </Select>
        </Col>
      </Row>
      <Row style={{marginTop: 20}}>
        <Col md={24}>
          <Table 
            columns={columns}
            dataSource={requests}
            pagination={{
              pageSize: 30
            }}
            size="small"
            rowSelection={{
              onChange: (keys, rows) => handleRowSelection(keys, rows),
              selectedRowKeys: selectedRequests.map(item=> item.id),
              rowKey: "id"
            }}
            rowKey="id"
          />
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default List