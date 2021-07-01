import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { Col, InputNumber, Row, Select, Table, Button, DatePicker, Card } from 'antd'
import React from 'react'

const columns = (props)=> [
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
    title: 'Reason',
    dataIndex: 'reason',
    key: 'reason'
  },
  {
    title: 'Request Category',
    dataIndex: 'requestCategory',
    key: 'requestCategory',
    render: (text, row) => {
      return (
        <Select style={{width: '100%'}} defaultValue={row?.requestCategory} onChange={(value)=> props.onRequestCategoryUpdate(row, value)}>
          <Select.Option value={undefined}>Select Request Category</Select.Option>
          {props.requestCategories.map(item=> (
            <Select.Option key={`rqc-${item?.id}`} value={item?.id}>{item?.name}</Select.Option>
          ))}
        </Select>
      )
    }
  },
  {
    title: 'Unit price',
    dataIndex: 'unitPrice',
    key: 'unitPrice',
    render: (text, row) => {
      return (
        <InputNumber min={1} defaultValue={row['unitPrice'] || 0} onChange={(value)=> props.onPriceChange(row, value)} />
      )
    }
  },
]

const UpdatePrice = (props) => {
  const { selectedRequests, onUnitPriceUpdate, suppliers, selectedSupplier, onDateSelect, deliveryDate } = props
  const handleUnitPriceOnChange = (row, value)=> {
    onUnitPriceUpdate(row, value)
    //console.log('row', row)
  }

  return (
    <React.Fragment>
      <Row style={{paddingTop: 20, paddingBottom: 20}}>
        <Col md={24}>
          <Card>
          <Row style={{marginBottom: 20, borderBottom: "1px #bdbdbd solid"}}>
            <Col md={24}>
              <span style={{fontWeight: 'bold'}}>SUPPLIER: {suppliers.find(item=> item.id === selectedSupplier)?.name}</span>
            </Col>
          </Row>
            <Row>
              <Col md={6}>Delivery Date:</Col>
              <Col md={18}>
                <DatePicker
                  format="YYYY-MM-DD"
                  style={{width: "100%"}} 
                  value={deliveryDate}
                  onChange={(date, dateStr)=> {
                    console.log('date', date)
                    onDateSelect(date)
                  }} 
                />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={24}>
          <Table 
            columns={columns({...props, onPriceChange: (row, value)=> handleUnitPriceOnChange(row, value)})}
            dataSource={selectedRequests || []}
            size="small"
            rowKey="id"
            pagination={false}
          />
        </Col>
      </Row>
      <Row>
        <Col md={24} className="bs-stepper-nav">
          <Button type="primary" onClick={()=> props.onStep(0)}>
            <LeftOutlined /> Prev
          </Button>
          <Button type="primary" onClick={()=> props.onStep(2)}>
            Next <RightOutlined />
          </Button>
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default UpdatePrice