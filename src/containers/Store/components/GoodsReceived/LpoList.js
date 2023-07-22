import { RightOutlined } from '@ant-design/icons'
import { Button, Col, Row, Table } from 'antd'
import React from 'react'

const columns = (props) => [
  {title: 'ID', dataIndex: 'id', key: 'id'},
  {title: 'Supplier', dataIndex: 'supplierId', key: 'supplierId', render: (text, row) => {
    console.log('text', row.suppliedBy, 'row', row.requestItems)
    const value = row.requestItems.filter(item=> item.id===text)[0]?.name || 'N/A'
    return value
  }},
  {title: 'Action', dataIndex: 'operation', align: 'right', key: 'operation', render: (text, row) => (<Button onClick={()=> props.onSelectLpo(row)}><RightOutlined /></Button>)},
]

const LpoList = (props) => {
  const { lpos, selectedLpo, onNext, onStepChange } = props
  return (
    <React.Fragment>
      <Row>
        <Col md={24}>
          <span style={{fontWeight: 'bold'}}>Selected Lpo: {selectedLpo?.id}</span>
        </Col>
      </Row>
      <Row>
        <Col md={24}>
          <Table 
            columns={columns(props)}
            dataSource={lpos}
            size="small"
            bordered
            rowKey="id"
            pagination={{
              pageSize: 30
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <Button type="primary" disabled={!selectedLpo.id} onClick={()=> onStepChange(1)}>Next <RightOutlined /></Button>
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default LpoList