import { CheckOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons'
import { Button, Col, Form, Input, Row, Table } from 'antd'
import React from 'react'
import LpoList from './LpoList'

const columns = [
  {
    title: 'Description',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    key: 'quantity'
  },
  {
    title: 'Unit Price',
    dataIndex: 'unitPrice',
    key: 'unitPrice'
  },
]


const AddGrn = (props) => {
  const { lpo, onStepChange, onDone, submitting } = props
  const [ comment, setComment ] = React.useState("")
  const [selectedRequests, setSelectedRequests] = React.useState([])
  return (
    <React.Fragment>
      <Row>
        <Col md={24} style={{display: 'flex', flexDirection: 'column'}}>
          <Form.Item label="Comment">
            <Input value={comment} onChange={(event) => {setComment(event.target.value)}} />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col md={24}>
          <span>Mark Received Items</span>
        </Col>
      </Row>
      <Row>
        <Col md={24}>
          <Table 
            rowKey="id"
            columns={columns}
            dataSource={lpo.requestItems}
            pagination={false}
            rowSelection={{
              onChange: (keys, rows)=> setSelectedRequests(rows),
              value: (item)=>item.id
            }}
          />
        </Col>
      </Row>
      <Row style={{marginTop: 10}}>
        <Col md={12}>
          <Button type="primary" onClick={()=> {onStepChange(3)}}>
            <LeftOutlined /> Previous
          </Button>
        </Col>
        <Col md={12}>
          <Button 
            style={{float: 'right'}} 
            type="primary" 
            onClick={()=> {onDone({ comment, items: selectedRequests })}}
            loading={submitting}
            disabled={submitting || !comment || selectedRequests.length < 1}
          >
            <CheckOutlined /> Done
          </Button>
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default AddGrn